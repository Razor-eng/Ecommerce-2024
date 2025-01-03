import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CheckoutFail() {
    return (
        <div className='h-full flex flex-col justify-center items-center flex-1'>
            <div className="flex justify-center items-center">
                <Image
                    src="/fail-purchase.png"
                    alt="fail"
                    className='w-48'
                    blurDataURL="/fail-purchase.png"
                    height={1000}
                    width={1000}
                    priority={true}
                />
            </div>
            <h1 className="text-2xl font-semibold text-red-400">Your Payment Was Not Successful</h1>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full md:w-96 px-10 md:px-0">
                <Link href={"/dashboard"}>
                    <Button size="lg" variant="outline" className="w-full">
                        Home
                    </Button>
                </Link>
                <Link href={"/cart"}>
                    <Button size="lg" variant="teritary" className="w-full">
                        Cart
                    </Button>
                </Link>
            </div>
        </div>
    )
}
