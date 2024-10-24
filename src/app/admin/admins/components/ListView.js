'use client';

import DottedSeparator from '@/components/DottedSeparator'
import Loader from '@/components/Loader';
import { useAdmins } from '@/lib/firestore/admins/read';
import { AddAdminModal } from './AddAdminModal';
import { AdminTable } from './AdminTable';

export default function ListView() {
    const { data: admins, error, isLoading } = useAdmins();

    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="bg-white h-full p-2 sm:p-5 rounded-xl flex flex-col">
            <div className="flex items-center justify-between px-2 mt-2 md:mt-0">
                <h1 className="text-xl font-semibold">Admins</h1>
                <AddAdminModal />
            </div>
            <div className="my-4">
                <DottedSeparator />
            </div>
            <div className="flex-1 border rounded-md">
                <AdminTable data={admins} />
            </div>
        </div>
    )
}
