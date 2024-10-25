import Confirm from '@/components/Confirm'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import Loader from '@/components/Loader'
import { EditProductModal } from './EditProductModal'
import { deleteProduct } from '@/lib/firestore/products/write'

export const ProductTable = ({ data, page }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await deleteProduct({ id: id }).then(() => {
                toast.success("Product removed");
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
                    <TableHead>Price</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-center">Orders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((product, id) => (
                    <TableRow key={id}>
                        <TableCell className="font-medium">{id + 1 + page}</TableCell>
                        <TableCell>
                            {product ?
                                <Image
                                    src={product.featureImageURL}
                                    alt="Image"
                                    height={100}
                                    width={100}
                                    className="object-fill size-10"
                                />
                                :
                                <div className="h-10 w-10 bg-zinc-200 rounded-full p-2">
                                    <Loader />
                                </div>
                            }
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                            <div className="flex items-center justify-between">
                                {product?.name} {product?.isFeatured && <span className="text-amber-500 bg-amber-100 rounded-md px-2 py-1 text-xs font-semibold">Featured</span>}
                            </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                            {(product?.salePrice < product?.price) ? (
                                <div>
                                    <span className="text-xs font-semibold text-zinc-500 line-through">
                                        ₹ {product?.price}
                                    </span>
                                    {" "}₹ {product?.salePrice}
                                </div>
                            ) : (
                                <div>
                                    ₹ {product.salePrice}
                                </div>
                            )}
                        </TableCell>
                        <TableCell className="text-center">{product?.stock}</TableCell>
                        <TableCell className="text-center">{product?.orders ?? 0}</TableCell>
                        <TableCell>
                            {
                                (product?.stock - (product?.orders ?? 0)) > 0
                                    ? <div className="md:text-xs font-semibold text-sm px-2 py-1 text-green-500 bg-green-100 rounded-md w-fit">Available</div>
                                    : <div className="md:text-xs font-semibold text-sm px-2 py-1 text-red-500 bg-red-100 rounded-md w-fit">Out of stock</div>
                            }
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 items-center justify-end">
                                <EditProductModal
                                    children={
                                        <Button variant="outline" size="sm" disabled={isDeleting}>
                                            <Edit2 />
                                        </Button>
                                    }
                                    initialData={product}
                                />
                                <Confirm handleClick={handleDelete} id={product?.id}>
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