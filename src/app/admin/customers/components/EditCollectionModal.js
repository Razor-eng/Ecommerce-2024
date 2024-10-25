"use client";

import DottedSeparator from '@/components/DottedSeparator';
import ImageUpload from '@/components/ImageUpload';
import { Modal } from '@/components/Modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { updateCollection } from '@/lib/firestore/collections/write';
import { useProduct, useProducts } from '@/lib/firestore/products/read';
import { X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const EditCollectionModal = ({ children, initialData }) => {
    const [data, setData] = useState({
        ...initialData
    });
    const [image, setImage] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { data: products } = useProducts({ pageLimit: 2000 });

    const handleProducts = (productId) => {
        setData((prev) => {
            let list = [...(prev?.products ?? [])];
            list = list.filter((id) => productId !== id);
            return {
                ...prev,
                products: list
            }
        })
    }

    const handleData = (key, value) => {
        setData((values) => {
            return {
                ...(values ?? {}),
                [key]: value
            }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            await updateCollection({ data: data, image: image });
            toast.success("Collection updated");
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Modal
            title={"Update Collection"}
            description={"Enter the following below to update the collection."}
            trigger={
                children
            }
            children={
                <div className="flex flex-col gap-5">
                    <div className="grid gap-1 px-2 lg:px-0">
                        <ImageUpload title={"Collection Image"} setImage={setImage} image={image} initialImage={initialData?.imageURL} isPending={isPending} />
                    </div>
                    <DottedSeparator />
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Collection Name</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Enter collection name"
                            value={data?.name ?? ""}
                            onChange={e => {
                                handleData("name", e.target.value);
                            }}
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Collection Subtitle</Label>
                        <Input
                            type="text"
                            id="subTitle"
                            placeholder="Enter collection Sub-title"
                            value={data?.subTitle ?? ""}
                            onChange={e => {
                                handleData("subTitle", e.target.value);
                            }}
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Product</Label>
                        <Select
                            type="text"
                            id="products"
                            placeholder="Select products"
                            onValueChange={id => {
                                setData((prev) => {
                                    let list = [...(prev?.products ?? [])];
                                    list.push(id);
                                    return {
                                        ...prev,
                                        products: list
                                    }
                                });
                            }}
                            disabled={isPending}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select products" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Products</SelectLabel>
                                    <Separator />
                                    {products?.map((product, id) => (
                                        <SelectItem key={id} disabled={data?.products?.includes(product?.id)} value={product?.id}>{product?.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-1 px-2 lg:px-0">
                        {data?.products?.map((product, id) => (
                            <ProductCard key={id} productId={product} handleProducts={handleProducts} />
                        ))}
                    </div>
                </div>
            }
            onSubmitFunction={onSubmit}
            isPending={isPending}
        />
    )
}

function ProductCard({ productId, handleProducts }) {
    const { data: product } = useProduct({ productId: productId })
    return (
        <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-1 rounded-lg">
            <p className="whitespace-nowrap max-w-72 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                {product?.name}
            </p>
            <button
                className="text-white hover:text-rose-500 transition"
                onClick={() => handleProducts(productId)}
            >
                <X className="size-4" />
            </button>
        </div>
    )
}