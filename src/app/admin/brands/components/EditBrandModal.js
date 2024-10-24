"use client";

import DottedSeparator from '@/components/DottedSeparator';
import ImageUpload from '@/components/ImageUpload';
import { Modal } from '@/components/Modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateBrand } from '@/lib/firestore/brands/write';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const EditBrandModal = ({ children, initialData }) => {
    const [data, setData] = useState({
        ...initialData
    });
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
            await updateBrand({ data: data, image: image });
            toast.success("Brand updated");
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Modal
            title={"Update Brand"}
            description={"Enter the following below to update the brand."}
            trigger={
                children
            }
            children={
                <div className="flex flex-col gap-5">
                    <div className="grid gap-1 px-2 lg:px-0">
                        <ImageUpload title={"Brand Image"} setImage={setImage} image={image} initialImage={initialData?.imageURL} isPending={isPending} />
                    </div>
                    <DottedSeparator />
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Brand Name</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Enter brand name"
                            value={data?.name ?? ""}
                            onChange={e => {
                                handleData("name", e.target.value);
                            }}
                            disabled={isPending}
                            required
                        />
                    </div>
                </div>
            }
            onSubmitFunction={onSubmit}
            isPending={isPending}
        />
    )
}
