"use client";

import { useAuth } from '@/context/AuthContext';
import ProductAddReview from './ProductAddReview'
import { Separator } from '@/components/ui/separator';
import ProductReviews from './ProductReviews';

const ProductReview = ({ productId }) => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col">
            <div className='grid grid-cols-2 gap-10'>
                <ProductAddReview user={user} productId={productId} />
                <ProductReviews user={user} productId={productId} />
            </div>
            <Separator className="md:my-6 my-3" />
        </div>
    )
}

export default ProductReview