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
import OrderCard from "@/components/OrderCard";
import OrderAddress from "@/components/OrderAddress";
import DottedSeparator from "@/components/DottedSeparator";

export function ViewOrderModal({ orderId, id, title, description, children }) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMedia("(min-width: 768px)", true)

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-3 pb-4">
                        <div className="col-span-2">
                            <OrderCard id={id} orderId={orderId} />
                        </div>
                        <div className="col-span-1 bg-blue-50 p-2 md:p-5 flex flex-col rounded-md">
                            <h1 className="text-base font-semibold">Address</h1>
                            <DottedSeparator className={"my-2"} />
                            <OrderAddress orderId={orderId} />
                        </div>
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
                <div className="flex flex-col pb-2">
                    <OrderCard id={id} orderId={orderId} />
                    <div className="bg-blue-50 p-2 md:p-5 flex flex-col rounded-md">
                        <h1 className="text-base font-semibold">Address</h1>
                        <DottedSeparator className={"my-2"} />
                        <OrderAddress orderId={orderId} />
                    </div>
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