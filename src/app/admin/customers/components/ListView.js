'use client';

import DottedSeparator from '@/components/DottedSeparator'
import Loader from '@/components/Loader';
import { useUsers } from '@/lib/firestore/user/read';
import { CustomersTable } from './CustomersTable';

export default function ListView() {
    const { data: customers, error, isLoading } = useUsers();

    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="bg-white dark:bg-zinc-900 h-full p-2 sm:p-5 rounded-xl flex flex-col">
            <div className="px-2 mt-2 md:mt-0">
                <h1 className="text-xl font-semibold">Customers</h1>
            </div>
            <div className="my-4">
                <DottedSeparator />
            </div>
            <div className="flex-1 border rounded-md">
                <CustomersTable data={customers} />
            </div>
        </div>
    )
}
