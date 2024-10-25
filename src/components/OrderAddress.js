import { useOrder } from "@/lib/firestore/orders/read"
import Loader from "./Loader";

const OrderAddress = ({ orderId }) => {
    const { data: order, isLoading } = useOrder({ id: orderId })

    if (isLoading) {
        return (
            <Loader />
        )
    }

    const address = JSON.parse(order?.metadata?.address);

    return (
        <div className="flex flex-col mt-2"                            >
            <h1 className="font-semibold">{address?.name}</h1>
            <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">{address?.email}</span>
                <p className="text-sm md:text-xs font-semibold">{address?.number}</p>
            </div>
            <div className="mt-2">
                <p className="text-sm text-zinc-800">{address?.address}, {address?.landmark}</p>
                <p className="text-sm text-zinc-800">{address?.city}</p>
                <p className="text-sm text-zinc-800">{address?.state}, {address?.pincode}</p>
            </div>
        </div>
    )
}

export default OrderAddress