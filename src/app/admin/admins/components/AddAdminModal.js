"use client";

import DottedSeparator from '@/components/DottedSeparator';
import ImageUpload from '@/components/ImageUpload';
import { Modal } from '@/components/Modal'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createNewAdmin } from '@/lib/firestore/admins/write';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const AddAdminModal = () => {
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
            await createNewAdmin({ data: data, image: image });
            toast.success("Added a new admin");
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
            title={"Create Admin"}
            description={"Enter the following below to create a admin."}
            trigger={
                <Button
                    className="size-9 sm:size-auto"
                    variant="teritary"
                >
                    <p className="hidden sm:block">Add Admin</p>
                    <Plus className="sm:hidden block" />
                </Button>
            }
            children={
                <div className="flex flex-col gap-5">
                    <div className="grid gap-1 px-2 lg:px-0">
                        <ImageUpload title={"Admin Image"} setImage={setImage} image={image} isPending={isPending} />
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
            button='Create Admin'
            isPending={isPending}
        />
    )
}