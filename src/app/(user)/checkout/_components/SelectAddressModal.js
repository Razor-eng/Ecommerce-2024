"use client";

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
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { cn } from "@/lib/utils";
import { EditAddressModal } from "./EditAddressModal";

export function SelectAddressModal({ description = "Select an address to continue", title = "Select Address", selectedAddress, setSelectedAddress, button = "Select Address", trigger }) {
    const [open, setOpen] = useState(false)
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });
    const [value, setValue] = useState(null);
    const isDesktop = useMedia("(min-width: 768px)", true)

    const isPending = !value || value?.length === 0;

    const onSelectAddress = () => {
        try {
            if (!value || value?.length === 0) {
                throw new Error("Select an address");
            }
            setSelectedAddress(value);
            toast.success("Address selected");
        } catch (error) {
            toast.error(error?.message)
        }
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                        <Separator className="mb-4" />
                        <div className="grid grid-cols-2 gap-4 my-4">
                            {data?.location?.map((item, id) => {
                                const isSelected = JSON.stringify(value) === JSON.stringify(item);
                                return (
                                    <div
                                        key={id}
                                        className={cn(
                                            "flex flex-col border-2 rounded-lg p-2 transition",
                                            isSelected && "border-blue-500"
                                        )}
                                    >
                                        <div
                                            className="flex flex-col cursor-pointer"
                                            onClick={() => setValue(item)}
                                        >
                                            <h1 className="font-semibold">{item?.name}</h1>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-zinc-400">{item?.email}</span>
                                                <p className="text-xs font-semibold">{item?.number}</p>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-zinc-800 line-clamp-1">{item?.address}, {item?.landmark}</p>
                                                <p className="text-sm text-zinc-800">{item?.city}</p>
                                                <p className="text-sm text-zinc-800">{item?.state}, {item?.pincode}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 justify-between mt-4">
                                            <EditAddressModal initialData={item} />
                                            <Button size="sm" variant="destructive">
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <Button type="button" className="w-full" onClick={onSelectAddress} size="lg" disabled={isPending}>{button}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {trigger}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-2">
                    <Separator className="mb-4" />
                    <div className="grid grid-cols-1 gap-3 my-4">
                        {data?.location?.map((item, id) => {
                            const isSelected = JSON.stringify(value) === JSON.stringify(item);
                            return (
                                <div
                                    key={id}
                                    className={cn(
                                        "flex flex-col border-2 rounded-lg p-2 transition",
                                        isSelected && "border-blue-500"
                                    )}
                                >
                                    <div
                                        className="flex flex-col cursor-pointer"
                                        onClick={() => setValue(item)}
                                    >
                                        <h1 className="font-semibold">{item?.name}</h1>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-zinc-400">{item?.email}</span>
                                            <p className="text-xs font-semibold">{item?.number}</p>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-zinc-800 line-clamp-1">{item?.address}, {item?.landmark}</p>
                                            <p className="text-sm text-zinc-800">{item?.city}</p>
                                            <p className="text-sm text-zinc-800">{item?.state}, {item?.pincode}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 justify-between mt-4">
                                        <EditAddressModal initialData={item} />
                                        <Button size="sm" variant="destructive">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <Button type="button" className="w-full" onClick={onSelectAddress} size="lg" disabled={isPending}>{button}</Button>
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
