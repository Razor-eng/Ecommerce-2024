import AddFavoriteButton from '@/components/AddFavoriteButton'
import AddToCartButton from '@/components/AddToCartButton'
import BuyNowButton from '@/components/BuyNowButton'
import Ratings from '@/components/Ratings'
import { getBrand } from '@/lib/firestore/brands/read_server'
import { getCategory } from '@/lib/firestore/categories/read_server'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductDetails({ product }) {
    return (
        <div className='w-full px-2 md:px-0 flex flex-col gap-3 max-h-[500px] md:max-h-[660px] md:overflow-y-hidden'>
            <div className="flex gap-3">
                <Category categoryId={product?.categoryId} />
                <Brand brandId={product?.brandId} />
            </div>
            <h1 className="font-semibold text-xl md:text-4xl">{product?.name}</h1>
            <Ratings size='lg' productId={product?.id} showReviews />
            <h3 className="text-green-600 font-semibold text-lg">₹ {product?.salePrice} <span className="line-through text-zinc-500 text-sm">{product?.price}</span></h3>
            <div className="flex flex-wrap items-center justify-between md:justify-normal gap-5">
                <BuyNowButton productId={product?.id} size={"lg"} isProductPage />
                <div className="flex items-center gap-2 md:gap-5">
                    <AddToCartButton productId={product?.id} variant="teritary" size="lg" />
                    <AddFavoriteButton productId={product?.id} size="lg" />
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-3 flex-1 overflow-y-scroll [&::-webkit-scrollbar]:w-0">
                <h2 className="md:text-xl text-lg font-semibold underline underline-offset-4">Product Description:</h2>
                <div dangerouslySetInnerHTML={{ __html: product?.longDescription ?? "" }} />
            </div>
        </div>
    )
}

async function Category({ categoryId }) {
    const category = await getCategory({ id: categoryId })
    return (
        <Link prefetch={false} href={`/category/${categoryId}`}>
            <div className="flex items-center gap-1 border px-3 py-2 rounded-lg bg-gray-50">
                <Image
                    src={category?.imageURL}
                    blurDataURL={category?.imageURL}
                    height={1000}
                    width={1000}
                    priority={true}
                    alt="category"
                    className="h-4 rounded-full object-contain w-fit"
                />
                <h4 className="text-xs font-semibold">{category?.name}</h4>
            </div>
        </Link>
    )
}

async function Brand({ brandId }) {
    const brand = await getBrand({ id: brandId })
    return (
        <Link prefetch={false} href={`/brand/${brandId}`}>
            <div className="flex items-center gap-1 border px-3 py-2 rounded-lg bg-gray-50">
                <Image
                    height={1000}
                    width={1000}
                    priority={true}
                    src={brand?.imageURL}
                    blurDataURL={brand?.imageURL}
                    alt="category"
                    className="h-4 rounded-full w-fit"
                />
                <h4 className="text-xs font-semibold">{brand?.name}</h4>
            </div>
        </Link>
    )
}