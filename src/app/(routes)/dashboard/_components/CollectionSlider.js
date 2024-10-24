"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

export default function CollectionSlider({ collections }) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    if (collections.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-5 overflow-hidden p-2 lg:p-10">
            <div className="flex justify-center w-full">
                <h1 className="text-2xl font-semibold">Collections</h1>
            </div>
            {
                (collections.length > 2) ? (
                    <Slider {...settings}>
                        {collections?.map((collection, id) => (
                            <div key={id} className="px-4">
                                <div className="flex gap-4 bg-gradient-to-tr to-[#d9e2f1] from-[#cce7f5] p-7 w-full rounded-xl">
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="flex flex-col">
                                            <h1 className="text-lg font-semibold">{collection?.name}</h1>
                                            <h1 className="text-sm text-zinc-600">{collection?.subTitle}</h1>
                                        </div>
                                        <Link href={`/collection/${collection?.id}`} className="flex">
                                            <Button
                                                variant="outline"
                                            >
                                                SHOP NOW
                                            </Button>
                                        </Link>
                                    </div>
                                    <div>
                                        <img
                                            className="h-[5rem] md:h-[9rem]"
                                            src={collection?.imageURL}
                                            alt="collection"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {collections?.map((collection, id) => (
                            <div key={id} className="px-2">
                                <div className="flex gap-4 bg-gradient-to-tr to-[#d9e2f1] from-[#cce7f5] p-7 w-full rounded-xl">
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="flex flex-col">
                                            <h1 className="text-lg font-semibold">{collection?.name}</h1>
                                            <h1 className="text-sm text-zinc-600">{collection?.subTitle}</h1>
                                        </div>
                                        <Link href={`/collection/${collection?.id}`} className="flex">
                                            <Button
                                                variant="outline"
                                            >
                                                SHOP NOW
                                            </Button>
                                        </Link>
                                    </div>
                                    <div>
                                        <img
                                            className="h-[5rem] md:h-[9rem]"
                                            src={collection?.imageURL}
                                            alt="collection"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}