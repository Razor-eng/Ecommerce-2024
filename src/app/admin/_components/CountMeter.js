'use client';

import Loader from "@/components/Loader";
import { useProductsCount, useRevenue, useUsersCount } from "@/lib/firestore/count/read_client";
import Image from "next/image";

export default function CountMeter() {
    const { data: products, isLoading: productsLoading } = useProductsCount();
    const { data: customers, isLoading: usersLoading } = useUsersCount();
    const { data: orders, isLoading: ordersLoading } = useRevenue();

    if (productsLoading || usersLoading || ordersLoading) {
        return (
            <Loader />
        )
    }

    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-5">
            <Card imgURL={"/products.png"} title={"Products"} value={products} />
            <Card imgURL={"/orders.png"} title={"Orders"} value={orders?.totalOrders} />
            <Card imgURL={"/revenue.png"} title={"Revenue"} value={`₹${orders?.revenue}`} />
            <Card imgURL={"/customers.png"} title={"Customers"} value={customers} />
        </section>
    )
}

function Card({ imgURL, title, value }) {
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-white shadow border rounded-xl">
            <div className="flex flex-col justify-between">
                <h1 className="text-lg font-semibold">{title}</h1>
                <h1 className="text-xl md:text-2xl text-zinc-500">{value}</h1>
            </div>
            <Image
                src={imgURL}
                blurDataURL={imgURL}
                height={1000}
                width={1000}
                priority={true}
                alt={title} className="h-12 md:h-20 w-fit" />
        </div>
    )
}
