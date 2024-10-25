import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProduct } from "@/lib/firestore/products/read";
import { addReview } from "@/lib/firestore/review/write";
import { Rating } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductAddReview({ user, productId }) {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(2.5);
    const [isLoading, setIsLoading] = useState(false);
    const { data: product } = useProduct({ productId: productId });

    if (!user || !product) {
        return null;
    }

    const totalReviews = product?.reviews || 0;
    const totalRatings = product?.rating || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!review) {
                throw new Error("Please add a review");
            }
            await addReview({ name: user?.displayName, message: review, rating: rating, photoURL: user?.photoURL, productId: productId, uid: user?.uid, totalReviews: totalReviews + 1, totalRatings: totalRatings + rating });
            toast.success("Review added");
            setReview("");
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="border p-2 md:p-5 min-h-60 rounded-md flex flex-col gap-2">
            <div className="flex flex-col px-2">
                <p className="text-blue-700 text-lg">Rate This Product</p>
                <Rating
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                    precision={0.5}
                    disabled={isLoading}
                />
            </div>
            <div className="border rounded-lg flex-1">
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
            </div>
        </form>
    )
}
