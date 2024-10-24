"use client";

import { Modal } from '@/components/Modal'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext';
import { updateAdmin } from '@/lib/firestore/admins/write';
import { useUser } from '@/lib/firestore/user/read';
import { createNewAddress } from '@/lib/firestore/user/write';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const EditAddressModal = ({ initialData }) => {
    const [data, setData] = useState({
        ...initialData
    });
    const [isPending, setIsPending] = useState(false);
    const { user } = useAuth();
    const { data: userData } = useUser({ uid: user?.uid });

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
            if (!initialData) {
                throw new Error("Select an address to edit");
            }

            let list = userData?.location ?? [];
            let index = list.indexOf(initialData);
            list[index] = data;

            await createNewAddress({
                list: list,
                data: data,
                uid: user?.uid
            })
            toast.success("Address updated");
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Modal
            title={"Update Address"}
            description={"Enter the following below to update the address."}
            trigger={
                <Button size="sm" variant="teritary">
                    Edit
                </Button>
            }
            children={
                <div className="flex flex-col gap-5">
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Enter full name"
                            value={data?.name ?? ""}
                            onChange={e => {
                                handleData("name", e.target.value);
                            }}
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Mobile Number</Label>
                        <Input
                            type="number"
                            id="number"
                            placeholder="Enter mobile number"
                            value={data?.number ?? ""}
                            onChange={e => {
                                handleData("number", e.target.valueAsNumber);
                            }}
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Email Address</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            value={data?.email ?? ""}
                            onChange={e => {
                                handleData("email", e.target.value);
                            }}
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Address</Label>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                id="address"
                                placeholder="Enter address"
                                value={data?.address ?? ""}
                                onChange={e => {
                                    handleData("address", e.target.value);
                                }}
                                disabled={isPending}
                                required
                            />
                            <Input
                                type="text"
                                id="landmark"
                                placeholder="Enter landmark"
                                value={data?.landmark ?? ""}
                                onChange={e => {
                                    handleData("landmark", e.target.value);
                                }}
                                disabled={isPending}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2 px-2 lg:px-0">
                        <Label>Pincode</Label>
                        <Input
                            type="number"
                            id="pincode"
                            placeholder="Enter pincode"
                            value={data?.pincode ?? ""}
                            onChange={e => {
                                handleData("pincode", e.target.valueAsNumber);
                            }}
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2 px-2 lg:px-0">
                        <div className="flex flex-col gap-2">
                            <Label>City</Label>
                            <Input
                                type="text"
                                id="city"
                                placeholder="Enter city name"
                                value={data?.city ?? ""}
                                onChange={e => {
                                    handleData("city", e.target.value);
                                }}
                                disabled={isPending}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>State</Label>
                            <Input
                                type="text"
                                id="state"
                                placeholder="Enter state name"
                                value={data?.state ?? ""}
                                onChange={e => {
                                    handleData("state", e.target.value);
                                }}
                                disabled={isPending}
                                required
                            />
                        </div>
                    </div>
                </div>
            }
            onSubmitFunction={onSubmit}
            isPending={isPending}
        />
    )
}