import { useOrder } from "@/lib/firestore/orders/read";
import { cn } from "@/lib/utils";
import DottedSeparator from "@/components/DottedSeparator";
import Image from "next/image";

export default function OrderCard({ id, orderId }) {
    const { data: order } = useOrder({ id: orderId })
    const status = order?.status ?? "pending";
    const paymentMode = order?.paymentMode ?? "cod";

    return (
        <div className="flex-1 h-full flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 border rounded-lg p-3 md:p-4">
            <div className="grid items-center grid-cols-9 gap-2 max-w-full md:max-w-96">
                {id >= 0 ?
                    <h2 className="font-semibold text-sm bg-zinc-200 dark:bg-zinc-800 rounded-sm flex items-center justify-center p-1 px-3">
                        {id + 1}
                    </h2>
                    : null
                }
                <div className={cn(
                    "text-center rounded-sm px-3 py-1 text-sm col-span-3 capitalize",
                    paymentMode === "prepaid" && "bg-blue-100 text-blue-500",
                    paymentMode === "cod" && "bg-purple-100 text-purple-500"
                )}>
                    {paymentMode}
                </div>
                <div className={cn(
                    "text-center rounded-sm px-3 py-1 text-sm col-span-3 capitalize",
                    status === "pending" && "bg-yellow-100 text-yellow-600",
                    status === "cancelled" && "bg-red-100 text-red-600",
                    status === "delivered" && "bg-emerald-100 text-emerald-600",
                )}
                >
                    {status}
                </div>
                <h2 className="text-teal-600 bg-teal-100 text-sm col-span-2 flex items-center justify-center p-1 px-2 rounded-sm">
                    ₹ {order?.totalAmount}
                </h2>
            </div>
            <DottedSeparator className={"mb-2"} />
            <div className="flex flex-col gap-3">
                {order?.line_items?.map((product, id) => (
                    <div className="flex gap-2 items-center" key={id}>
                        <Image
                            src={product?.product_data?.images[0]}
                            blurDataURL={product?.product_data?.images[0]}
                            height={1000}
                            width={1000}
                            priority={true}
                            alt="product Image" className='h-16 w-16 rounded-md' />
                        <div className="flex flex-col gap-1">
                            <h1 className="whitespace-nowrap text-sm md:text-base">{product?.product_data?.name}</h1>
                            <p className="text-sm text-zinc-500 flex items-center">
                                ₹ {product?.product_data?.salePrice} x {product?.quantity}
                            </p>
                            <p className="text-xs font-semibold text-green-500 flex items-center">
                                ₹ {product?.totalAmount}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
