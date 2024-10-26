import Link from 'next/link'
import AddFavoriteButton from './AddFavoriteButton'
import AddToCartButton from './AddToCartButton'
import BuyNowButton from './BuyNowButton'
import Ratings from './Ratings';
import Image from 'next/image';

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
                    <Image
                        src={product?.featureImageURL}
                        alt="image"
                        className="rounded-md w-full h-52 object-cover"
                        width={1000}
                        height={1000}
                        priority={true}
                        blurDataURL={product?.featureImageURL}
                    />
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition">
                        <AddFavoriteButton productId={product?.id} />
                    </div>
                </div>
                <Link prefetch={false} href={`/product/${product?.id}`}>
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
                                <Ratings productId={product?.id} size={"small"} />
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500 line-clamp-2">
                            {product?.description}
                        </p>
                    </div>
                </Link>
            </div>
            <div className="flex items-center justify-between">
                <BuyNowButton productId={product?.id} variant={"teritary"} />
                <AddToCartButton productId={product?.id} variant='outline' />
            </div>
        </div>
    )
}