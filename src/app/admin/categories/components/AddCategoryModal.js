"use client";

import DottedSeparator from '@/components/DottedSeparator';
import ImageUpload from '@/components/ImageUpload';
import { Modal } from '@/components/Modal'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createNewCategory } from '@/lib/firestore/categories/write';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddCategoryModal = () => {
    const [data, setData] = useState(null);
    const [image, setImage] = useState(null);
    const [isPending, setIsPending] = useState(false);

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
            await createNewCategory({ data: data, image: image });
            toast.success("Added a new category");
            setData(null);
            setImage(null);
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Modal
            title={"Create Category"}
            description={"Enter the following below to create a category."}
            trigger={
                <Button
                    className="size-9 sm:size-auto"
                    variant="teritary"
                >
                    <p className="hidden sm:block">Add Category</p>
                    <Plus className="sm:hidden block" />
                </Button>
            }
            children={
                <div className="flex flex-col gap-5">
                    <div className="grid gap-1 px-2 lg:px-0">
                        <ImageUpload title={"Category Image"} setImage={setImage} image={image} isPending={isPending} />
                    </div>
                    <DottedSeparator />
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Category Name</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Enter category name"
                            value={data?.name ?? ""}
                            onChange={e => {
                                handleData("name", e.target.value);
                                handleData("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
                            }}
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Category Slug</Label>
                        <Input
                            type="text"
                            id="slug"
                            placeholder="Category slug"
                            value={data?.name.toLowerCase().replace(/\s+/g, "-") ?? ""}
                            disabled
                        />
                    </div>
                </div>
            }
            onSubmitFunction={onSubmit}
            button='Create Category'
            isPending={isPending}
        />
    )
}

export default AddCategoryModal