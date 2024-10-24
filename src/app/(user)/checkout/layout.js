'use client';

import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { AlertTriangle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CheckoutLayout({ children }) {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const productId = searchParams.get("productId");

    const { user } = useAuth();
    const { data, isLoading } = useUser({ uid: user?.uid });

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (type === "cart" && (!data?.cart || data?.cart?.length === 0)) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center gap-3">
                <AlertTriangle size={30} color="red" />
                <h2 className="text-muted-foreground">Your Cart Is Empty</h2>
            </div>
        )
    }

    if (type === "buynow" && !productId) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center gap-3">
                <AlertTriangle size={30} color="red" />
                <h2 className="text-muted-foreground">Product not found!</h2>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}
