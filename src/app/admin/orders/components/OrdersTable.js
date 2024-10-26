"use client";

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useUser } from '@/lib/firestore/user/read'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { ViewOrderModal } from './ViewOrderModal'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateOrderStatus } from '@/lib/firestore/orders/write'
import Loader from '@/components/Loader'

export const OrdersTable = ({ data, page }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleOrderStatus = async (orderId, status) => {
        setIsUpdating(true);
        try {
            await updateOrderStatus({ id: orderId, status: status }).then(() => {
                toast.success("Status updated");
            })
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">SNo.</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead className="text-center">Total Products</TableHead>
                    <TableHead className="text-center">Payment Mode</TableHead>
                    <TableHead className="px-3 text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((order, id) => {
                    const orderedUser = order?.metadata;
                    const paymentMode = order?.paymentMode;
                    const status = order?.status;
                    const user = useUser({ uid: orderedUser?.uid });

                    return (
                        <TableRow key={id}>
                            <TableCell className="font-medium">{id + 1 + page}</TableCell>
                            <TableCell>
                                {user ?
                                    <Avatar className="size-9">
                                        <AvatarImage src={user?.data?.photoURL} alt="User Image" />
                                        <AvatarFallback className="text-xl font-semibold bg-zinc-200">
                                            {user?.data?.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    :
                                    <div className="h-10 w-10 bg-zinc-200 rounded-full p-2">
                                        <Loader />
                                    </div>
                                }
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                {user?.data?.name}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                ₹ {order?.totalAmount}
                            </TableCell>
                            <TableCell className="text-center">
                                {order?.totalProducts}
                            </TableCell>
                            <TableCell className="text-center">
                                <div className={cn(
                                    "text-center rounded-sm py-1 text-sm capitalize",
                                    paymentMode === "prepaid" && "bg-blue-100 text-blue-500",
                                    paymentMode === "cod" && "bg-purple-100 text-purple-500"
                                )}>
                                    {order?.paymentMode}
                                </div>
                            </TableCell>
                            <TableCell className="flex w-full items-center justify-center">
                                <Select onValueChange={(e) => handleOrderStatus(order?.id, e)} disabled={isUpdating} value={status}>
                                    <SelectTrigger className={cn(
                                        "flex w-fit h-fit items-center justify-center gap-1 text-center rounded-sm px-5 py-1 text-sm col-span-3 capitalize min-w-32",
                                        status === "pending" && "bg-yellow-100 text-yellow-600",
                                        status === "cancelled" && "bg-red-100 text-red-600",
                                        status === "delivered" && "bg-emerald-100 text-emerald-600",
                                    )}
                                    >
                                        <SelectValue placeholder={status} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectSeparator />
                                            {["cancelled", "pending", "delivered"].map((item, id) => (
                                                <SelectItem
                                                    key={id}
                                                    value={item}
                                                    className={cn(
                                                        "capitalize cursor-pointer text-center",
                                                        item === "pending" && "text-yellow-600",
                                                        item === "cancelled" && "text-red-600",
                                                        item === "delivered" && "text-emerald-600"
                                                    )}
                                                >
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell className="text-right">
                                <ViewOrderModal orderId={order?.id} id={id} children={
                                    <Button variant="outline" size="sm" disabled={isUpdating}>
                                        <Eye />
                                    </Button>
                                } />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}