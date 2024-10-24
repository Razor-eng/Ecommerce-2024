import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import { Rating } from '@mui/material'
import Link from 'next/link'
import AddFavoriteButton from './AddFavoriteButton'
import AddToCartButton from './AddToCartButton'

export const ProductsGridView = ({ products }) => {
    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col gap-4 p-2 md:p-5">
                <h2 className="text-2xl font-semibold text-center">Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
                    {products?.map((product, id) => (
                        <ProductCard product={product} key={id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export function ProductCard({ product }) {
    return (
        <div className="flex flex-col justify-between gap-3 border p-2 md:p-4 rounded-lg group">
            <div className="flex flex-col gap-3">
                <div className="relative">
                    <img src={product?.featureImageURL} alt="image" className="rounded-md w-full h-52 object-cover" />
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition">
                        <AddFavoriteButton productId={product?.id} />
                    </div>
                </div>
                <Link href={`/product/${product?.id}`}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <h1 className="font-bold line-clamp-2 text-sm">
                                {product?.name}
                            </h1>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-green-600 text-sm font-semibold">
                                    ₹ {product?.salePrice}{" "}
                                    <span className="line-through text-xs text-zinc-600">
                                        {product?.price}
                                    </span>
                                </h2>
                                <div className="flex gap-2 items-center">
                                    <Rating size='small' name='product-rating' defaultValue={2.5} precision={0.5} readOnly />
                                    <p className="text-xs font-semibold text-zinc-400">(10)</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500 line-clamp-2">
                            {product?.description}
                        </p>
                    </div>
                </Link>
            </div>
            <div className="flex items-center justify-between">
                <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                    <Button variant="teritary">
                        Buy Now
                    </Button>
                </Link>
                <AddToCartButton productId={product?.id} variant='outline' />
            </div>
        </div>
    )
}