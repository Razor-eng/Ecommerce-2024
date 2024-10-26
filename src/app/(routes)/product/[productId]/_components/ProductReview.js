import ProductAddReview from './ProductAddReview'
import { Separator } from '@/components/ui/separator';
import ProductReviews from './ProductReviews';

const ProductReview = ({ productId }) => {
    return (
        <div className="flex flex-col">
            <div className='md:grid flex flex-col-reverse md:grid-cols-2  gap-2 md:gap-10 overflow-hidden md:max-h-80'>
                <ProductAddReview productId={productId} />
                <ProductReviews productId={productId} />
            </div>
            <Separator className="md:my-6 my-3" />
        </div>
    )
}

export default ProductReview