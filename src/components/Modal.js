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
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

export function Modal({ title, description, isPending, onSubmitFunction, children, trigger, button = "Save Changes", isProductModal = false }) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMedia("(min-width: 768px)", true)

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
                <DialogContent className={cn(
                    "sm:max-w-md",
                    isProductModal && "sm:max-w-5xl"
                )}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm onSubmit={onSubmitFunction} button={button} children={children} isPending={isPending} />
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
                <ProfileForm onSubmit={onSubmitFunction} button={button} children={children} isPending={isPending} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ onSubmit, children, button, isPending }) {
    return (
        <form onSubmit={onSubmit} className="grid items-start gap-4">
            <Separator />
            {children}
            <Button type="submit" size="lg" disabled={isPending}>{button}</Button>
        </form>
    )
}
