'use client';

import { useCategories } from '@/lib/firestore/categories/read';
import AddCategoryModal from './AddCategoryModal'
import DottedSeparator from '@/components/DottedSeparator'
import Loader from '@/components/Loader';
import CategoryTable from './CategoryTable';

export default function ListView() {
    const { data: categories, error, isLoading } = useCategories();

    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="bg-white h-full p-2 sm:p-5 rounded-xl flex flex-col">
            <div className="flex items-center justify-between px-2 mt-2 md:mt-0">
                <h1 className="text-xl font-semibold">Categories</h1>
                <AddCategoryModal />
            </div>
            <div className="my-4">
                <DottedSeparator />
            </div>
            <div className="flex-1 border rounded-md">
                <CategoryTable data={categories} />
            </div>
        </div>
    )
}
