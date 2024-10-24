'use client';

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { updateFavorites } from "@/lib/firestore/user/write";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export default function AddFavoriteButton({ productId, size }) {
    const { user } = useAuth();
    const { data, isLoading: isDataLoading } = useUser({ uid: user?.uid });
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (data?.favorites?.includes(productId)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }

        if (!isDataLoading) {
            setIsLoading(false);
        }
    }, [data, isDataLoading]);

    const handleFavorite = async () => {
        setIsLoading(true);
        try {
            if (!user?.uid) {
                router.push(`${pathname}/sign-in`);
                throw new Error("Login to add the product to favorites");
            }
            if (data?.favorites?.includes(productId)) {
                const newList = data?.favorites?.filter((item) => item !== productId);
                await updateFavorites({ list: newList, uid: user?.uid })
                toast.success("Product removed from favorites");
            } else {
                await updateFavorites({
                    list: [...(data?.favorites ?? []), productId],
                    uid: user?.uid
                })
                toast.success("Product added to favorites");
            }
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button size={size} onClick={handleFavorite} disabled={isLoading} variant="outline" className={cn("hover:text-red-500 hover:shadow-sm transition", isFavorite && "text-red-500 shadow-sm")}>
            <Heart fill={isFavorite ? "red" : "white"} />
        </Button>
    )
}
