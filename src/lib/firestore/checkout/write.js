"use client"

import { db } from "@/lib/firebase"
import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { getProduct } from "../products/read_server"
import { updateProduct } from "../products/write"
import { updateCart, updateUserExpense } from "../user/write"
import { getUser } from "../user/read_server"
import { useProduct } from "../products/read"

async function updateCartAfterCheckout(data, totalAmount, totalProducts) {
    const user = await getUser({ id: data?.uid });
    data?.line_items?.map(async (item) => {
        const productId = item?.product_data?.productId;
        const data = await getProduct({ id: productId });
        const updatedProduct = {
            ...data,
            stock: data?.stock - item?.quantity,
            orders: (data?.orders || 0) + item?.quantity
        }
        await updateProduct({ data: updatedProduct })
    })
    await updateCart({ uid: data?.uid, list: [] })
    await updateUserExpense({ uid: user?.uid, expense: (user?.expense || 0) + totalAmount, products: (user?.products || 0) + totalProducts });
}

export const createCheckoutAndGetURL = async ({ uid, products, address, totalAmount, totalProducts }) => {
    const checkoutId = doc(collection(db, `ids`)).id;
    const ref = doc(db, `orders/${checkoutId}`);

    let line_items = [];

    products.forEach(async (item) => {
        line_items.push({
            product_data: {
                name: item?.product?.name,
                description: item?.product?.description,
                images: [item?.product?.featureImageURL],
                productId: item?.id,
                salePrice: item?.product?.salePrice,
            },
            quantity: item?.quantity,
            totalAmount: item?.quantity * item?.product?.salePrice
        });
    });

    await setDoc(ref, {
        payment_method_types: ["card"],
        mode: "payment",
        paymentMode: "prepaid",
        id: checkoutId,
        uid: uid,
        status: "pending",
        orderedAt: Timestamp.now(),
        totalAmount: totalAmount,
        totalProducts: totalProducts,
        line_items: line_items,
        metadata: {
            checkoutId: checkoutId,
            uid: uid,
            address: JSON.stringify(address)
        },
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout-success/${checkoutId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout-failed/${checkoutId}`,
    });

    await new Promise((res) => setTimeout(res, 2000));

    const checkoutSession = await getDoc(ref);

    if (!checkoutSession?.exists()) {
        throw new Error("Checkout Session Not Found");
    }

    if (checkoutSession?.data()?.error?.message) {
        throw new Error(checkoutSession?.data()?.error?.message);
    }

    const url = checkoutSession.data()?.success_url;

    if (url) {
        await updateCartAfterCheckout(checkoutSession?.data(), totalAmount, totalProducts);

        return url;
    } else {
        await new Promise((res) => setTimeout(res, 2000));
        const checkoutSession = await getDoc(ref);

        if (checkoutSession?.data()?.error?.message) {
            throw new Error(checkoutSession?.data()?.error?.message);
        }

        if (checkoutSession.data()?.url) {
            return checkoutSession.data()?.url;
        } else {
            throw new Error("Something went wrong, please try again");
        }
    }
};

export const createCheckoutCODAndGetId = async ({ uid, products, address, totalAmount, totalProducts }) => {
    const checkoutId = doc(collection(db, `ids`)).id;
    const ref = doc(db, `orders/${checkoutId}`);

    let line_items = [];

    products.forEach((item) => {
        line_items.push({
            product_data: {
                name: item?.product?.name,
                description: item?.product?.description,
                images: [item?.product?.featureImageURL],
                productId: item?.id,
                salePrice: item?.product?.salePrice,
            },
            quantity: item?.quantity,
            totalAmount: item?.quantity * item?.product?.salePrice
        })
    });

    await setDoc(ref, {
        paymentMode: "cod",
        uid: uid,
        id: checkoutId,
        orderedAt: Timestamp.now(),
        status: "pending",
        totalAmount: totalAmount,
        totalProducts: totalProducts,
        line_items: line_items,
        metadata: {
            checkoutId: checkoutId,
            uid: uid,
            address: JSON.stringify(address)
        },
    });

    await new Promise((res) => setTimeout(res, 2000));

    const checkoutSession = await getDoc(ref);

    if (!checkoutSession?.exists()) {
        throw new Error("Checkout Session Not Found");
    }

    if (checkoutSession?.data()?.error?.message) {
        throw new Error(checkoutSession?.data()?.error?.message);
    }

    await updateCartAfterCheckout(checkoutSession?.data(), totalAmount, totalProducts);

    return checkoutId;
};
