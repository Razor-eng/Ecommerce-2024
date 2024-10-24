"use client";

import DottedSeparator from '@/components/DottedSeparator';
import ImageUpload from '@/components/ImageUpload';
import { Modal } from '@/components/Modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateAdmin } from '@/lib/firestore/admins/write';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const EditAdminModal = ({ children, initialData }) => {
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
            await updateAdmin({ data: data, image: image });
            toast.success("Admin updated");
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Modal
            title={"Update Admin"}
            description={"Enter the following below to update the admin."}
            trigger={
                children
            }
            children={
                <div className="flex flex-col gap-5">
                    <div className="grid gap-1 px-2 lg:px-0">
                        <ImageUpload title={"Admin Image"} setImage={setImage} image={image} initialImage={initialData?.imageURL} isPending={isPending} />
                    </div>
                    <DottedSeparator />
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Admin Name</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Enter admin name"
                            value={data?.name ?? ""}
                            onChange={e => {
                                handleData("name", e.target.value);
                            }}
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Admin Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter admin email"
                            value={data?.email ?? ""}
                            onChange={e => {
                                handleData("email", e.target.value);
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
