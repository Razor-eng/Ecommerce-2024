"use client";

import { cn } from '@/lib/utils';
import { useState } from 'react'

export default function ProductImage({ imageList }) {
    const [selectedImage, setSelectedImage] = useState(imageList[0]);

    if (imageList?.length === 0) return null;

    return (
        <div className='flex flex-col gap-8 w-full'>
            <div className="flex justify-center w-full">
                <img src={selectedImage} alt="image" className='md:h-[400px] h-[300px] object-cover shadow-md rounded-md' />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
                {imageList?.map((image, id) => {
                    const isActive = image === selectedImage;
                    return (
                        <div
                            key={id}
                            className={cn(
                                "w-[90px] rounded-md border p-1.5 cursor-pointer",
                                isActive && "border-blue-500 border-2 cursor-default"
                            )}
                            onClick={() => setSelectedImage(image)}
                        >
                            <img src={image} alt="" className="object-cover" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
