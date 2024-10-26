"use client";

import DottedSeparator from "@/components/DottedSeparator"
import CountMeter from "./_components/CountMeter"
import RevenueChart from "./_components/RevenueChart"
import OrdersChart from "./_components/OrdersChart"
import { useOrderCountByDays } from "@/lib/firestore/orders/read_count"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loader";

const AdminDashboardPage = () => {
    const [dates, setDates] = useState(null);

    useEffect(() => {
        let list = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            list.push(date);
        }
        setDates(list);
    }, []);

    const { data, isLoading } = useOrderCountByDays({ dates: dates });

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className="sm:p-5 h-full">
            <div className="bg-white h-full p-2 sm:p-5 rounded-xl flex flex-col">
                <div className="px-2 mt-2 md:mt-0">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                </div>
                <div className="my-4">
                    <DottedSeparator />
                </div>
                <div className="flex-1 border rounded-md p-1 md:p-4 flex flex-col gap-3 md:gap-6">
                    <CountMeter />
                    <Separator />
                    <div className="flex flex-col gap-2 md:gap-4 flex-1">
                        <h2 className="text-lg font-semibold">Overview</h2>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-5 w-full flex-1">
                            <RevenueChart items={data} />
                            <OrdersChart items={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardPage