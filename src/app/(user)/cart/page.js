'use client';

import { ConfirmRemove } from "@/components/ConfirmRemove";
import DottedSeparator from "@/components/DottedSeparator";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { updateCart } from "@/lib/firestore/user/write";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
    const { user } = useAuth();
    const { data, isLoading: dataLoading } = useUser({ uid: user?.uid });

    if (dataLoading) {
        return (
            <Loader />
        )
    }

    return (
        <main className="p-2 md:p-5 flex flex-col gap-3 items-center justify-between flex-1 h-full">
            <div className="flex flex-col gap-3 items-center">
                <h1 className="md:text-4xl text-2xl font-semibold text-center">Your Cart</h1>
                {(!data?.cart || data?.cart?.length === 0) ? (
                    <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
                        <div className="flex justify-center">
                            <Image
                                height={1000}
                                width={1000}
                                priority={true}
                                src="/empty-cart.png"
                                blurDataURL="/empty-cart.png"
                                alt="empty"
                                className="h-[200px] w-fit"
                            />
                        </div>
                        <h1 className="text-zinc-600 font-semibold">
                            Please Add Products To Your Cart
                        </h1>
                    </div>
                ) :
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
                        {data?.cart?.map((product, id) => (
                            <ProductItem key={id} currentProduct={product} />
                        ))}
                    </div>
                }
            </div>
            {!(!data?.cart || data?.cart?.length === 0) ?
                <div className="flex flex-col w-full gap-3">
                    <DottedSeparator className={"my-2"} />
                    <Link prefetch={false} href={"/checkout"} className="w-full">
                        <Button size="lg" variant="teritary" className="w-full" disabled={dataLoading}>
                            Checkout
                        </Button>
                    </Link>
                </div>
                : null
            }
        </main>
    )
}

function ProductItem({ currentProduct }) {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });
    const { data: product } = useProduct({ productId: currentProduct?.id })
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async (quantity) => {
        setIsUpdating(true);
        try {
            const newList = data?.cart?.map((item) => {
                if (item?.id === currentProduct?.id) {
                    return {
                        ...item,
                        quantity: parseInt(quantity)
                    }
                } else {
                    return item;
                }
            });
            await updateCart({ list: newList, uid: user?.uid })
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsUpdating(false);
        }
    }

    const handleRemoveFromCart = async () => {
        setIsLoading(true);
        try {
            const newList = data?.cart?.filter((item) => item?.id !== currentProduct?.id);
            await updateCart({ list: newList, uid: user?.uid })
            toast.success("Product removed from cart");
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex gap-3 flex-col border p-3 rounded-lg">
            <div className="flex-1 flex gap-3">
                <div className="size-24 p-1">
                    <Image
                        src={product?.featureImageURL}
                        blurDataURL={product?.featureImageURL}
                        height={1000}
                        width={1000}
                        priority={true}
                        alt="image"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex-1 flex flex-col">
                        <h1 className="text-sm font-semibold line-clamp-2">{product?.name}</h1>
                        <h2 className="text-green-600 text-sm">
                            {product?.salePrice}{" "}
                            <span className="line-through text-xs text-zinc-500">{product?.price}</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button disabled={isUpdating || (currentProduct?.quantity < 2)} onClick={() => handleUpdate(currentProduct?.quantity - 1)} size="icon" variant="outline">
                            <Minus />
                        </Button>
                        <Button size="sm" disabled variant="teritary" className="px-5 rounded-sm">
                            {currentProduct?.quantity}
                        </Button>
                        <Button disabled={isUpdating || (currentProduct?.quantity === product?.stock)} onClick={() => handleUpdate(currentProduct?.quantity + 1)} size="icon" variant="outline">
                            <Plus />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <DottedSeparator />
                <ConfirmRemove handleClick={handleRemoveFromCart} product={product} >
                    <Button disabled={isLoading} variant="destructive" className="w-full">
                        Remove
                    </Button>
                </ConfirmRemove>
            </div>
        </div>
    )
}