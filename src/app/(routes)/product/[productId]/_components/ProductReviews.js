'use client';

import Confirm from "@/components/Confirm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useReviews } from "@/lib/firestore/review/read";
import { deleteReview } from "@/lib/firestore/review/write";
import { Rating } from "@mui/material";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ProductReviews = ({ productId }) => {
    const { user } = useAuth();
    const { data: reviews } = useReviews({ productId: productId })

    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await deleteReview({ productId: productId, uid: user?.uid });
            toast.success("Review deleted");
        } catch (error) {
            toast.error(error?.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="border p-3 md:p-5 rounded-md flex flex-col gap-2 flex-1 overflow-hidden">
            <div className="flex flex-col gap-1 px-2 h-full">
                <h1 className="text-lg font-semibold">Reviews</h1>
                <div className="flex-1 h-full border rounded-lg p-2 max-h-48 md:max-h-60 overflow-y-scroll">
                    <div className="flex flex-col gap-2">
                        {reviews?.map((review, id) => (
                            <div className="flex justify-between border-b py-2" key={id}>
                                <div className="flex gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage src={review?.photoURL} />
                                        <AvatarFallback className="bg-red-100 text-lg">
                                            {review?.name?.charAt(0)?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex flex-col">
                                            <h1 className="font-medium">{review?.name}</h1>
                                            <Rating size="small" defaultValue={review?.rating} precision={0.5} readOnly />
                                        </div>
                                        <p className="text-zinc-600 text-sm">
                                            {review?.review}
                                        </p>
                                    </div>
                                </div>
                                {user?.uid === review?.uid &&
                                    <Confirm
                                        handleClick={handleDelete}
                                    >
                                        <button className="p-2 border h-fit w-fit rounded-md hover:bg-zinc-50 transition" disabled={isLoading}>
                                            <Trash2 size={12} color="red" />
                                        </button>
                                    </Confirm>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductReviews