"use client";

import ProductAddReview from './ProductAddReview'
import { Separator } from '@/components/ui/separator';
import ProductReviews from './ProductReviews';
import { useReviews } from '@/lib/firestore/review/read';
import { useProduct } from '@/lib/firestore/products/read';
import { useAuth } from '@/context/AuthContext';

const ProductReview = ({ productId }) => {
    const { user } = useAuth();

    const { data: reviews } = useReviews({ productId: productId })
    const { data: product } = useProduct({ productId: productId });

    if (!user || !product) {
        return null;
    }

    return (
        <div className="flex flex-col">
            <div className='md:grid flex flex-col-reverse md:grid-cols-2  gap-2 md:gap-10 overflow-hidden md:max-h-80'>
                <ProductAddReview productId={productId} />
                {reviews?.length > 0 &&
                    <ProductReviews productId={productId} />
                }
            </div>
            <Separator className="md:my-6 my-3" />
        </div>
    )
}

export default ProductReview