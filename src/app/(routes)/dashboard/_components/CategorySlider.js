"use client";

import Link from "next/link";
import React from "react";
import Slider from "react-slick";

export default function CategorySlider({ categories }) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
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

    if (categories.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-5 overflow-hidden p-2 lg:p-10">
            <div className="flex justify-center w-full">
                <h1 className="text-2xl font-semibold">Shop By Category</h1>
            </div>
            {
                (categories.length > 2) ? (
                    <Slider {...settings}>
                        {categories?.map((category, id) => (
                            <Link key={id} href={`/category/${category?.id}`}>
                                <div className="px-4">
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <div className="md:h-32 md:w-32 h-24 w-24 rounded-full p-2 md:p-5 border overflow-hidden bg-blue-50">
                                            <img src={category?.imageURL} alt="image" />
                                        </div>
                                        <h1 className="font-semibold">{category?.name}</h1>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                        {categories?.map((category, id) => (
                            <Link key={id} href={`/category/${category?.id}`}>
                                <div className="px-4">
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <div className="md:h-32 md:w-32 h-24 w-24 rounded-full p-2 md:p-5 border overflow-hidden bg-blue-50">
                                            <img src={category?.imageURL} alt="image" />
                                        </div>
                                        <h1 className="font-semibold">{category?.name}</h1>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            }
        </div>
    );
}