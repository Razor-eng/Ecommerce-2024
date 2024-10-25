'use client';

import { PackagePlus, PackageX, Plus, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { updateCart } from "@/lib/firestore/user/write";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useProduct } from "@/lib/firestore/products/read";

export default function AddToCartButton({ productId, size, variant = "teritary" }) {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { data: product } = useProduct({ productId: productId });

    const isAdded = data?.cart?.find((item) => item?.id === productId);
    const isAvailable = product?.stock > 0;

    const handleCart = async () => {
        setIsLoading(true);
        try {
            if (!user?.uid) {
                router.push(`${pathname}/sign-in`);
                throw new Error("Login to add the product to favorites");
            }
            if (isAdded) {
                const newList = data?.cart?.filter((item) => item?.id !== productId);
                await updateCart({ list: newList, uid: user?.uid })
                toast.success("Product removed from cart");
            } else {
                await updateCart({
                    list: [...(data?.cart ?? []), { id: productId, quantity: 1 }],
                    uid: user?.uid
                })
                toast.success("Product added to cart");
            }
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {
                isAvailable ? (
                    <>
                        {isAdded ?
                            <Link href={"/cart"}>
                                <Button
                                    variant={"outline"}
                                    size={size}
                                    disabled={isLoading}
                                >
                                    <ShoppingCart /> <span className='hidden md:block'>View Cart</span>
                                </Button>
                            </Link>
                            :
                            <Button
                                variant={variant}
                                size={size}
                                onClick={handleCart}
                                disabled={isLoading}
                            >
                                <PackagePlus className='hidden md:block' /> <span className='hidden md:block'>Add To Cart</span>
                                <Plus className="md:hidden" />
                            </Button>
                        }
                    </>
                ) : (
                    <Button
                        variant={"destructive"}
                        size={size}
                        onClick={handleCart}
                        className="text-sm"
                        disabled
                    >
                        <PackageX /> <span className='hidden md:block'>Out Of Stock</span>
                    </Button>
                )
            }
        </>
    )
}
