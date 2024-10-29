'use client';

import DottedSeparator from '@/components/DottedSeparator'
import Loader from '@/components/Loader';
import { AddProductModal } from './AddProductModal';
import { ProductTable } from './ProductTable';
import { useProducts } from '@/lib/firestore/products/read';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const pageLimit = 8;

export default function ListView() {
    const [lastSnapDocList, setLastSnapDocList] = useState([]);
    const { data: products, lastSnapDoc, error, isLoading } = useProducts({ pageLimit: pageLimit, lastSnapDoc: lastSnapDocList?.length === 0 ? null : lastSnapDocList[lastSnapDocList?.length - 1] });

    const handleNext = () => {
        let newStack = [...lastSnapDocList];
        newStack.push(lastSnapDoc);
        setLastSnapDocList(newStack);
    }
    const handlePrev = () => {
        let newStack = [...lastSnapDocList];
        newStack.pop();
        setLastSnapDocList(newStack);
    }

    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="bg-white dark:bg-zinc-900 h-full p-2 sm:p-5 rounded-xl flex flex-col">
            <div className="flex items-center justify-between px-2 mt-2 md:mt-0">
                <h1 className="text-xl font-semibold">Products</h1>
                <AddProductModal />
            </div>
            <div className="my-4">
                <DottedSeparator />
            </div>
            <div className="flex-1 border rounded-md">
                <ProductTable data={products} page={lastSnapDocList.length * pageLimit} />
            </div>
            <div className="flex mt-3 w-full justify-between">
                <Button disabled={isLoading || lastSnapDocList.length === 0} size="lg" onClick={handlePrev} variant="outline">
                    <ArrowLeft />
                    Prev
                </Button>
                <Button
                    disabled
                    variant="secondary"
                    className="w-14"
                >
                    {lastSnapDocList.length + 1}
                </Button>
                <Button disabled={isLoading || products?.length < pageLimit} size="lg" onClick={handleNext} variant="outline">
                    Next
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}