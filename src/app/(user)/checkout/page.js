'use client';

import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { useProductsByIds } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { AlertTriangle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Checkout from "./_components/Checkout";
import { AddAddressModal } from "./_components/AddAddressModal";

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const productId = searchParams.get("productId");

    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });

    const productIdsList = type === "buynow" ? [productId] : data?.cart?.map((item) => item?.id);

    const { data: products, isLoading } = useProductsByIds({ idsList: productIdsList });

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (!productIdsList || productIdsList?.length === 0) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center gap-3">
                <AlertTriangle size={30} color="red" />
                <h2 className="text-muted-foreground">Product not found!</h2>
            </div>
        )
    }

    const productList = (type === "buynow") ? [
        {
            id: productId,
            quantity: 1,
            product: products[0]
        }
    ] : data?.cart?.map((item) => {
        return {
            ...item,
            product: products?.find((product) => product?.id === item?.id)
        }
    })

    return (
        <main className="p-2 md:p-5 flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between px-2 mt-2 md:mt-0">
                <h1 className="text-2xl md:text-3xl text-center font-semibold">Checkout</h1>
                <AddAddressModal />
            </div>
            <div className="flex-1">
                <Checkout products={productList} />
            </div>
        </main>
    )
}
