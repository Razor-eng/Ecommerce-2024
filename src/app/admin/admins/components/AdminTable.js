import Confirm from '@/components/Confirm'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Trash2 } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import Loader from '@/components/Loader'
import { deleteAdmin } from '@/lib/firestore/admins/write'
import { EditAdminModal } from './EditAdminModal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const AdminTable = ({ data }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await deleteAdmin({ id: id }).then(() => {
                toast.success("Admin removed");
            })
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">SNo.</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((admin, id) => (
                    <TableRow key={id}>
                        <TableCell className="font-medium">{id + 1}</TableCell>
                        <TableCell>
                            {admin ?
                                <Avatar className="size-11">
                                    <AvatarImage src={admin?.imageURL} alt="avatar" />
                                    <AvatarFallback className="text-lg md:text-xl bg-sky-200 font-semibold">
                                        {admin?.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                :
                                <div className="h-10 w-10 bg-zinc-200 rounded-full p-2">
                                    <Loader />
                                </div>
                            }
                        </TableCell>
                        <TableCell className="flex flex-col">
                            {admin?.name}
                            <p className="text-zinc-500 text-xs">{admin?.email}</p>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 items-center justify-end">
                                <EditAdminModal
                                    children={
                                        <Button variant="outline" size="sm" disabled={isDeleting}>
                                            <Edit2 />
                                        </Button>
                                    }
                                    initialData={admin}
                                />
                                <Confirm handleClick={handleDelete} id={admin?.id}>
                                    <Button variant="destructive" size="sm" disabled={isDeleting}>
                                        <Trash2 />
                                    </Button>
                                </Confirm>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}