'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useReviews } from "@/lib/firestore/review/read";
import { Rating } from "@mui/material";

const ProductReviews = ({ user, productId }) => {
    const { data: reviews } = useReviews({ productId: productId })
    return (
        <div className="border p-2 md:p-5 min-h-60 rounded-md flex flex-col gap-2">
            <div className="flex flex-col px-2 h-full">
                <h1 className="text-lg">Reviews</h1>
                <div className="flex-1 h-full border rounded-lg p-3">
                    <div className="">
                        {reviews?.map((review, id) => (
                            <div className="flex gap-3" key={id}>
                                <Avatar className="size-12">
                                    <AvatarImage src={review?.imageURL} />
                                    <AvatarFallback className="bg-red-100 text-lg">
                                        {review?.name?.charAt(0)?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col">
                                        <h1 className="font-medium">{review?.name}</h1>
                                        <Rating
                                            defaultValue={review?.rating}
                                            precision={0.5}
                                            size="small"
                                            readOnly
                                        />
                                    </div>
                                    <p className="text-zinc-600 text-sm">
                                        {review?.review}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className="border rounded-lg flex-1">
            <Textarea
                value={review}
                onChange={e => setReview(e.target.value)}
                placeholder="Leave a review here."
                className="h-full w-full"
                rows="8"
                disabled={isLoading}
                required
            />
        </div>
        <div className="flex mt-2">
            <Button
                disabled={isLoading}
                type="submit"
                className="w-full"
                size="lg"
            >
                Submit
            </Button>
        </div> */}
        </div>
    )
}

export default ProductReviews