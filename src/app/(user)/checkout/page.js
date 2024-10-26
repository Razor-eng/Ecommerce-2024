'use client';

import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { useAllProducts } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import Checkout from "./_components/Checkout";
import { AddAddressModal } from "./_components/AddAddressModal";
import { redirect } from "next/navigation";

export default function CheckoutPage() {
    const { user } = useAuth();
    const { data, isLoading } = useUser({ uid: user?.uid });
    const { data: products } = useAllProducts();

    if (isLoading && (!data?.cart || data?.cart?.length === 0)) {
        return (
            <Loader />
        )
    }

    if (!isLoading && (!data?.cart || data?.cart?.length === 0)) {
        redirect("/dashboard");
    }

    const productList = data?.cart?.map((item) => {
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
