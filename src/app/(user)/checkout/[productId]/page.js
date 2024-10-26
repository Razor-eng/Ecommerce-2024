"use client";

import Loader from "@/components/Loader";
import { useProduct } from "@/lib/firestore/products/read";
import { AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";
import Checkout from "../_components/Checkout";
import { AddAddressModal } from "../_components/AddAddressModal";

export default function CheckoutProductPage() {
    const params = useParams();

    const { data: product, isLoading } = useProduct({ productId: params?.productId });

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (!product) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center gap-3">
                <AlertTriangle size={30} color="red" />
                <h2 className="text-muted-foreground">Product not found!</h2>
            </div>
        )
    }

    const productList = [
        {
            id: product?.id,
            quantity: 1,
            product: product
        }
    ]

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
