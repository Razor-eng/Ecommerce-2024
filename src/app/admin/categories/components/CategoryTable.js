import Confirm from '@/components/Confirm'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { EditCategoryModal } from './EditCategoryModal'
import toast from 'react-hot-toast'
import { deleteCategory } from '@/lib/firestore/categories/write'
import { useState } from 'react'
import Loader from '@/components/Loader'

const CategoryTable = ({ data }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await deleteCategory({ id: id }).then(() => {
                toast.success("Deleted Category");
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
                {data?.map((category, id) => (
                    <TableRow key={id}>
                        <TableCell className="font-medium">{id + 1}</TableCell>
                        <TableCell>
                            {category ?
                                <Image
                                    src={category?.imageURL}
                                    alt="Image"
                                    priority={true}
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
                        <TableCell>{category?.name}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 items-center justify-end">
                                <EditCategoryModal
                                    children={
                                        <Button variant="outline" size="sm" disabled={isDeleting}>
                                            <Edit2 />
                                        </Button>
                                    }
                                    initialData={category}
                                />
                                <Confirm handleClick={handleDelete} id={category?.id}>
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

export default CategoryTable