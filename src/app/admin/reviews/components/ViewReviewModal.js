import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useMedia } from "react-use"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Confirm from "@/components/Confirm";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteReview } from "@/lib/firestore/review/write";
import DottedSeparator from "@/components/DottedSeparator";
import { Rating } from "@mui/material"

export function ViewReviewModal({ review, title, description, children }) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMedia("(min-width: 768px)", true)
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await deleteReview({ productId: review?.productId, uid: review?.uid });
            toast.success("Review deleted");
        } catch (error) {
            toast.error(error?.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <DottedSeparator />
                    <div className="flex justify-between min-h-24">
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
                        <Confirm
                            handleClick={handleDelete}
                        >
                            <button className="p-2 border h-fit w-fit rounded-md hover:bg-zinc-50 transition" disabled={isLoading}>
                                <Trash2 size={12} color="red" />
                            </button>
                        </Confirm>
                    </div>
                </DialogContent>
            </Dialog >
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <DottedSeparator />
                <div className="flex justify-between">
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
                    <Confirm
                        handleClick={handleDelete}
                    >
                        <button className="p-2 border h-fit w-fit rounded-md hover:bg-zinc-50 transition" disabled={isLoading}>
                            <Trash2 size={12} color="red" />
                        </button>
                    </Confirm>
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}