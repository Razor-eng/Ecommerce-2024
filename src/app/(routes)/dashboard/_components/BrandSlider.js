"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

export default function BrandSlider({ brands }) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    }

    if (brands.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-5 overflow-hidden p-2 lg:p-10">
            <div className="flex justify-center w-full">
                <h1 className="text-2xl font-semibold">Brand Sponsors</h1>
            </div>
            {
                (brands.length > 4) ? (
                    <Slider {...settings}>
                        {brands?.map((brand, id) => (
                            <Link key={id} href={`/brand/${brand?.id}`} className="w-fit">
                                <div className="md:size-48 size-36 w-fit rounded-lg p-2 md:p-5 border overflow-hidden bg-blue-50 group">
                                    <Image
                                        alt="image"
                                        src={brand?.imageURL}
                                        blurDataURL={brand?.imageURL}
                                        height={1000}
                                        width={1000}
                                        priority={true}
                                        className="h-full w-fit object-contain group-hover:scale-110 transition"
                                    />
                                </div>
                            </Link>
                        ))}
                    </Slider>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {brands?.map((brand, id) => (
                            <Link key={id} href={`/brand/${brand?.id}`} className="w-fit">
                                <div className="md:size-48 size-36 w-fit rounded-lg p-2 md:p-5 border overflow-hidden bg-blue-50 group">
                                    <Image
                                        alt="image"
                                        src={brand?.imageURL}
                                        blurDataURL={brand?.imageURL}
                                        height={1000}
                                        width={1000}
                                        priority={true}
                                        className="h-full w-fit object-contain group-hover:scale-110 transition"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            }
        </div>
    );
}