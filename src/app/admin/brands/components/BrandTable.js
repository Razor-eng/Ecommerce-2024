import Confirm from '@/components/Confirm'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import Loader from '@/components/Loader'
import { deleteBrand } from '@/lib/firestore/brands/write'
import { EditBrandModal } from './EditBrandModal'

const BrandTable = ({ data }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await deleteBrand({ id: id }).then(() => {
                toast.success("Brand removed");
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
                {data?.map((brand, id) => (
                    <TableRow key={id}>
                        <TableCell className="font-medium">{id + 1}</TableCell>
                        <TableCell>
                            {brand ?
                                <Image
                                    src={brand?.imageURL}
                                    alt="Image"
                                    height={100}
                                    width={100}
                                    className="object-cover h-8 w-14"
                                />
                                :
                                <div className="h-10 w-10 bg-zinc-200 rounded-full p-2">
                                    <Loader />
                                </div>
                            }
                        </TableCell>
                        <TableCell>{brand?.name}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 items-center justify-end">
                                <EditBrandModal
                                    children={
                                        <Button variant="outline" size="sm" disabled={isDeleting}>
                                            <Edit2 />
                                        </Button>
                                    }
                                    initialData={brand}
                                />
                                <Confirm handleClick={handleDelete} id={brand?.id}>
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

export default BrandTable