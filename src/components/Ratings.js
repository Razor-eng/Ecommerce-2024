import { getProductReviewsCounts } from '@/lib/firestore/count/read'
import { Rating } from '@mui/material'

export default async function Ratings({ productId, showReviews = false, size }) {
    const counts = await getProductReviewsCounts({ productId: productId });

    return (
        <div className="flex gap-2 items-center">
            <Rating
                defaultValue={counts?.averageRating}
                precision={0.5}
                size={size}
                readOnly
            />
            {showReviews &&
                <p className="text-zinc-400">({counts?.totalReviews})</p>
            }
        </div>
    )
}
