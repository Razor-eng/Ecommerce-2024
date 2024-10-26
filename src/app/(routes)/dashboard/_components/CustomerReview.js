import { Rating } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function CustomerReview() {
    const reviews = [
        { name: "Robert Pattinson", image: "https://resizing.flixster.com/AuqZrHQAgSUvBrcZkJjbFvMLJDk=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/487714_v9_bb.jpg", rating: 4, message: "I got a pair of boots from this store and I’m very satisfied. They are high-quality and worth the money. The store also offered free shipping at that price so that’s a plus!" },
        { name: "Emma Stone", image: "https://resizing.flixster.com/tZCGqFwYwVrT9p8JBBu6JXEOSRE=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/501536_v9_bb.jpg", rating: 3.5, message: "I recently purchased a product from this store, and I couldn’t be happier with my online shopping experience. Their website was user-friendly, making it easy to find the perfect item. The checkout process was smooth, and I received my order promptly. The product arrived in excellent condition, exactly as described on their website. I’m thrilled with the quality and will definitely shop from this again in the future. Highly recommended!" },
        { name: "Andrew Garfield", image: "https://m.media-amazon.com/images/M/MV5BMjE2MjI2OTk1OV5BMl5BanBnXkFtZTgwNTY1NzM4MDI@._V1_.jpg", rating: 4.5, message: "I recently discovered this store while searching for a specific product. Not only did they have the item I was looking for, but their selection was vast, and the prices were competitive. The website was easy to navigate, and the product descriptions were informative and accurate. I was pleasantly surprised by the fast shipping and the care they took in packaging my order." },
    ]
    return (
        <div className='flex justify-center'>
            <div className="flex flex-col gap-3 w-full">
                <h1 className="text-center text-2xl font-semibold">Customer Reviews</h1>
                <div className="w-full p-2 md:p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {reviews?.map((review, id) => (
                        <div className="flex flex-col gap-2 p-4 rounded-lg justify-center items-center border shadow-sm bg-gradient-to-r from-zinc-100 to-indigo-100" key={id}>
                            <Image
                                height={1000}
                                width={1000}
                                priority={true}
                                src={review.image}
                                blurDataURL={review.image}
                                alt="reviewer" className='h-32 w-32 rounded-full object-cover' />
                            <div className="flex flex-col items-center justify-center">
                                <h1 className='font-semibold'>{review?.name}</h1>
                                <Rating size='small' name='customer-rating' defaultValue={4} precision={0.5} readOnly />
                            </div>
                            <p className="text-sm text-zinc-500 line-clamp-2">{review.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
