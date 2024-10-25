"use client";

import Loader from '@/components/Loader';
import OrderCard from '@/components/OrderCard';
import { useAuth } from '@/context/AuthContext'
import { useOrders } from '@/lib/firestore/orders/read';

const UserOrdersPage = () => {
    const { user } = useAuth();
    const { data: orders, isLoading } = useOrders({ uid: user?.uid });

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <main className="p-2 md:p-5 flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between px-2 mt-2 md:mt-0">
                <h1 className="text-2xl md:text-3xl text-center font-semibold">My Orders</h1>
            </div>
            {(!orders || orders?.length === 0) && (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex justify-center">
                        <img src="/empty-cart.png" alt="image" className='h-44' />
                    </div>
                    <h1 className='text-zinc-600 text-xl font-semibold'>You have no orders yet</h1>
                </div>
            )}
            <div className="grid md:grid-cols-2 md:gap-8 grid-cols-1 gap-4">
                {orders?.map((order, id) => (
                    <OrderCard id={id} key={id} orderId={order?.id} />
                ))}
            </div>
        </main>
    )
}

export default UserOrdersPage;