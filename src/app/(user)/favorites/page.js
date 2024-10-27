'use client';

import Loader from "@/components/Loader";
import { ProductCard } from "@/components/Products";
import { useAuth } from "@/context/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import Image from "next/image";

export default function FavoritePage() {
    const { user } = useAuth();
    const { data, isLoading } = useUser({ uid: user?.uid });

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <main className="p-2 md:p-5 flex flex-col gap-3 items-center">
            <h1 className="md:text-4xl text-2xl font-semibold text-center">Favorites</h1>
            {(!data?.favorites || data?.favorites?.length === 0) ? (
                <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
                    <div className="flex justify-center">
                        <Image
                            src="/empty-favorites.png"
                            blurDataURL="/empty-favorites.png"
                            height={1000}
                            width={1000}
                            priority={true}
                            alt="empty"
                            className="h-[200px] w-fit"
                        />
                    </div>
                    <h1 className="text-zinc-600 font-semibold">
                        Please Add Products To Favorites
                    </h1>
                </div>
            ) :
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
                    {data?.favorites?.map((product, id) => (
                        <ProductItem key={id} productId={product} />
                    ))}
                </div>
            }
        </main>
    )
}

function ProductItem({ productId }) {
    const { data: product } = useProduct({ productId: productId })

    return (
        <ProductCard product={product} />
    )
}