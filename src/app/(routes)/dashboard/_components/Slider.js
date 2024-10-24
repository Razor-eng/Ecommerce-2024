"use client";

import AddFavoriteButton from "@/components/AddFavoriteButton";
import AddToCartButton from "@/components/AddToCartButton";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

export default function FeaturedProductSlider({ featuredProducts }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="overflow-hidden">
            <Slider {...settings}>
                {featuredProducts?.map((product, id) => (
                    <div key={id}>
                        <div className="flex flex-col-reverse md:flex-row gap-4 bg-[#f8f8f8] p-5 md:px-24 md:py-20 w-full">
                            <div className="flex-1 flex flex-col gap-4 md:gap-10">
                                <h2 className="text-zinc-500 text-sm md:text-base">NEW FASHION</h2>
                                <div className="flex flex-col gap-3 md:gap-4">
                                    <Link href={`/product/${product?.id}`}>
                                        <h1 className="md:text-4xl text-xl font-semibold">{product?.name}</h1>
                                    </Link>
                                    <h1 className="md:text-sm text-xs text-zinc-600 max-w-96 line-clamp-2">{product?.description}</h1>
                                    <div className="flex justify-between md:justify-normal gap-4 mt-6">
                                        <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                                            <Button>
                                                BUY NOW
                                            </Button>
                                        </Link>
                                        <div className="flex gap-2 md:gap-4">
                                            <AddToCartButton productId={product?.id} />
                                            <AddFavoriteButton productId={product?.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/product/${product?.id}`}>
                                <img
                                    className="h-[15rem] w-full md:h-[23rem] rounded-md"
                                    src={product?.featureImageURL}
                                    alt="image"
                                />
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}