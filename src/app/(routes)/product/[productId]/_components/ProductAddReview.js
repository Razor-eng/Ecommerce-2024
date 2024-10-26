"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { addReview } from "@/lib/firestore/review/write";
import { Rating } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductAddReview({ productId }) {
    const { user } = useAuth();

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(2.5);
    const [isLoading, setIsLoading] = useState(false);
    const { data: product } = useProduct({ productId: productId });

    if (!user || !product) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!review) {
                throw new Error("Please add a review");
            }
            await addReview({
                name: user?.displayName,
                message: review,
                rating: rating,
                photoURL: user?.photoURL,
                productId: productId,
                uid: user?.uid,
            });
            toast.success("Review added");
            setReview("");
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="border p-3 md:p-5 max-h-80 rounded-md flex flex-col gap-2">
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
                    className="h-full w-full overflow-scroll"
                    rows="6"
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
