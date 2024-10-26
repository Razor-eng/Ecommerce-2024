"use client";

import Description from '@/components/Description';
import DottedSeparator from '@/components/DottedSeparator';
import ImageUpload from '@/components/ImageUpload';
import { Modal } from '@/components/Modal'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useBrands } from '@/lib/firestore/brands/read';
import { useCategories } from '@/lib/firestore/categories/read';
import { updateProduct } from '@/lib/firestore/products/write';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

export const EditProductModal = ({ children, initialData }) => {
    const [brand, setBrand] = useState(null);
    const [category, setCategory] = useState(null);
    const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured);
    const { data: brands } = useBrands();
    const { data: categories } = useCategories();
    const inputRef = useRef(null);
    useEffect(() => {
        setBrand(brands?.filter((brand) => brand?.id === initialData?.brandId))
        setCategory(categories?.filter((category) => category?.id === initialData?.categoryId))
    }, [brands, categories])

    const [data, setData] = useState({
        ...initialData
    });
    const [image, setImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

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
            await updateProduct({ data: data, image: image, imageList: imageList });
            toast.success("Product updated");
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Modal
            title={"Update Product"}
            description={"Enter the following below to update the product."}
            trigger={
                children
            }
            children={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0">
                    <div className="flex flex-col gap-5">
                        <div className="grid gap-2 px-2 lg:px-0">
                            <Label>Product Name</Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Enter product name"
                                value={data?.name ?? ""}
                                onChange={e => {
                                    handleData("name", e.target.value);
                                }}
                                disabled={isPending}
                                required
                            />
                        </div>
                        <div className="grid gap-2 px-2 lg:px-0">
                            <Label>Product Description</Label>
                            <Input
                                type="text"
                                id="description"
                                placeholder="Enter product description"
                                value={data?.description ?? ""}
                                onChange={e => {
                                    handleData("description", e.target.value);
                                }}
                                disabled={isPending}
                                required
                            />
                        </div>
                        <div className="grid gap-2 px-2 lg:px-0">
                            <Label>Brand</Label>
                            <Select
                                type="text"
                                id="brand"
                                placeholder="Select brand"
                                onValueChange={id => {
                                    handleData("brandId", id);
                                }}
                                disabled={isPending}
                            >
                                <SelectTrigger>
                                    {brand ?
                                        <SelectValue placeholder={brand[0]?.name} />
                                        :
                                        <SelectValue placeholder={"Select a brand"} />
                                    }
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Brands</SelectLabel>
                                        <Separator />
                                        {brands?.map((brand, id) => (
                                            <SelectItem key={id} value={brand?.id}>{brand?.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2 px-2 lg:px-0">
                            <Label>Category</Label>
                            <Select
                                type="text"
                                id="category"
                                placeholder="Select category"
                                onValueChange={id => {
                                    handleData("categoryId", id);
                                }}
                                disabled={isPending}
                            >
                                <SelectTrigger>
                                    {category ?
                                        <SelectValue placeholder={category[0]?.name} />
                                        :
                                        <SelectValue placeholder={"Select a category"} />
                                    }
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <Separator />
                                        {categories?.map((category, id) => (
                                            <SelectItem key={id} value={category?.id}>{category?.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2 px-2 lg:px-0">
                            <Label>Stock</Label>
                            <Input
                                type="number"
                                id="stock"
                                placeholder="Enter stock"
                                value={data?.stock ?? ""}
                                onChange={e => {
                                    handleData("stock", e.target.valueAsNumber);
                                }}
                                disabled={isPending}
                                required
                            />
                        </div>
                        <div className="grid gap-2 px-2 lg:px-0">
                            <Label>Price</Label>
                            <Input
                                type="number"
                                id="price"
                                placeholder="Enter price"
                                value={data?.price ?? ""}
                                onChange={e => {
                                    handleData("price", e.target.valueAsNumber);
                                }}
                                disabled={isPending}
                                required
                            />
                        </div>
                        <div className="grid gap-2 px-2 lg:px-0">
                            <Label>Sale Price</Label>
                            <Input
                                type="number"
                                id="salePrice"
                                placeholder="Enter sale price"
                                value={data?.salePrice ?? ""}
                                onChange={e => {
                                    handleData("salePrice", e.target.valueAsNumber);
                                }}
                                disabled={isPending}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <DottedSeparator direction='vertical' className={"px-4 md:block hidden"} />
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <div className="flex flex-col gap-2 px-2 lg:px-0">
                                    <Label>Feature Image</Label>
                                    <ImageUpload title={"Feature Image"} setImage={setImage} image={image} isPending={isPending} initialImage={initialData?.featureImageURL} />
                                </div>
                                <DottedSeparator className="my-4" />
                                <div className="flex flex-col max-h-24 overflow-y-scroll gap-2 px-2 lg:px-0">
                                    <Label>Product Images</Label>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".jpg, .png, .jpeg, .svg"
                                        ref={inputRef}
                                        multiple
                                        onChange={e => {
                                            const newFiles = imageList || [];
                                            for (let i = 0; i < e.target.files.length; i++) {
                                                newFiles.push(e.target.files[i]);
                                            }
                                            setImageList(newFiles);
                                            router.refresh();
                                        }}
                                        disabled={isPending}
                                    />
                                    <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                                        <Avatar
                                            onClick={() => inputRef.current?.click()}
                                            className="size-[72px] rounded-md cursor-pointer"
                                        >
                                            <AvatarFallback className="rounded-md hover:opacity-90 transition">
                                                <ImagePlus className="size-[36px] text-neutral-400" />
                                            </AvatarFallback>
                                        </Avatar>
                                        {imageList?.length === 0 && initialData?.imageList.map((image, id) => (
                                            <div key={id} className="size-[72px] border p-2 relative rounded-md overflow-hidden">
                                                <Image
                                                    src={image}
                                                    blurDataURL={image}
                                                    height={1000}
                                                    width={1000}
                                                    priority={true}
                                                    alt="Image"
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                        {imageList?.length > 0 && imageList?.map((image, id) => (
                                            <div key={id} className="size-[72px] border p-2 relative rounded-md overflow-hidden">
                                                <Image
                                                    src={image ? URL.createObjectURL(image) : image}
                                                    blurDataURL={image ? URL.createObjectURL(image) : image}
                                                    height={1000}
                                                    width={1000}
                                                    priority={true}
                                                    alt="Image"
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <DottedSeparator className={"my-4"} />
                                <div className="flex flex-col gap-2 px-2 lg:px-0 my-2">
                                    <Label>Featured Product</Label>
                                    <div className="flex items-center">
                                        <input
                                            id="featuredProduct"
                                            type="checkbox"
                                            onChange={() => {
                                                setIsFeatured(!isFeatured);
                                                handleData("isFeatured", !isFeatured)
                                            }}
                                            checked={data?.isFeatured ?? false}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                        />
                                        <label className="ms-2 text-sm font-medium text-zinc-500">Check to feature this product</label>
                                    </div>
                                </div>
                                <DottedSeparator className={"mt-4"} />
                            </div>
                            <div className="flex-1 flex flex-col gap-2 px-2 lg:px-0">
                                <Label>Description</Label>
                                <Description data={data} handleData={handleData} />
                            </div>
                        </div>
                    </div>
                </div>
            }
            onSubmitFunction={onSubmit}
            isPending={isPending}
            isProductModal
        />
    )
}