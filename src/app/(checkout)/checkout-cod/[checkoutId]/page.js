'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutCODPage() {
    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <div className="flex justify-center items-center">
                <img src="/fail-purchase.png" alt="fail" className='w-48' />
            </div>
            <h1 className="text-base md:text-2xl font-semibold">Your Order Is <span className='text-green-400'>Successfully</span> Placed</h1>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full md:w-96 px-10 md:px-0">
                <Link href={"/dashboard"}>
                    <Button size="lg" variant="outline" className="w-full">
                        Home
                    </Button>
                </Link>
                <Link href={"/orders"}>
                    <Button size="lg" variant="teritary" className="w-full">
                        Orders
                    </Button>
                </Link>
            </div>
        </div>
    )
}
