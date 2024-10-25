import Confirm from '@/components/Confirm'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import Loader from '@/components/Loader'
import { deleteCollection } from '@/lib/firestore/collections/write'
import { EditCollectionModal } from './EditCollectionModal'

export const CollectionTable = ({ data }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await deleteCollection({ id: id }).then(() => {
                toast.success("Deleted Collection");
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
                {data?.map((collection, id) => (
                    <TableRow key={id}>
                        <TableCell className="font-medium">{id + 1}</TableCell>
                        <TableCell>
                            {collection ?
                                <Image
                                    src={collection?.imageURL}
                                    alt="Image"
                                    height={100}
                                    width={100}
                                    className="object-cover h-10 w-10"
                                />
                                :
                                <div className="h-10 w-10 bg-zinc-200 rounded-full p-2">
                                    <Loader />
                                </div>
                            }
                        </TableCell>
                        <TableCell>{collection?.name}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 items-center justify-end">
                                <EditCollectionModal
                                    children={
                                        <Button variant="outline" size="sm" disabled={isDeleting}>
                                            <Edit2 />
                                        </Button>
                                    }
                                    initialData={collection}
                                />
                                <Confirm handleClick={handleDelete} id={collection?.id}>
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