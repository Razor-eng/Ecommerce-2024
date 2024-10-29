'use client';

import DottedSeparator from '@/components/DottedSeparator'
import Loader from '@/components/Loader';
import { useBrands } from '@/lib/firestore/brands/read';
import AddBrandModal from './AddBrandModal';
import BrandTable from './BrandTable';

export default function ListView() {
    const { data: brands, error, isLoading } = useBrands();

    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="bg-white dark:bg-zinc-900 h-full p-2 sm:p-5 rounded-xl flex flex-col">
            <div className="flex items-center justify-between px-2 mt-2 md:mt-0">
                <h1 className="text-xl font-semibold">Brands</h1>
                <AddBrandModal />
            </div>
            <div className="my-4">
                <DottedSeparator />
            </div>
            <div className="flex-1 border rounded-md">
                <BrandTable data={brands} />
            </div>
        </div>
    )
}
