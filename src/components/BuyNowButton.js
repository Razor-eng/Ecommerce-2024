'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import { useProduct } from "@/lib/firestore/products/read";
import { cn } from "@/lib/utils";

const BuyNowButton = ({ productId, variant, size, isProductPage }) => {
    const { data: product } = useProduct({ productId: productId });

    const isAvailable = product?.stock > 0;

    return (
        <>
            {
                isAvailable ?
                    <Link href={`/checkout/${productId}`} >
                        <Button
                            size={size}
                            variant={variant}
                            disabled={!isAvailable}
                        >
                            Buy Now
                        </Button>
                    </Link>
                    :
                    <Link href={`/product/${productId}`} >
                        <Button
                            size={size}
                            variant={"secondary"}
                            disabled={isAvailable}
                            className={cn(
                                "font-semibold sm:font-normal",
                                isProductPage && "hidden"
                            )}
                        >
                            View Now
                        </Button>
                    </Link>
            }
        </>
    )
}

export default BuyNowButton