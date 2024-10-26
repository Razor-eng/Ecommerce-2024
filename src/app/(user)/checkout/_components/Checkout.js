import DottedSeparator from '@/components/DottedSeparator';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MapPin, TabletSmartphone, Trash2, Wallet2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react';
import { SelectAddressModal } from './SelectAddressModal';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { updateCart } from '@/lib/firestore/user/write';
import { ConfirmRemove } from '@/components/ConfirmRemove';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/lib/firestore/user/read';
import { createCheckoutAndGetURL, createCheckoutCODAndGetId } from '@/lib/firestore/checkout/write';
import { useRouter } from 'next/navigation';

export default function Checkout({ products }) {
    const [paymentMode, setPaymentMode] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });
    const [currentProduct, setCurrentProduct] = useState(null);
    const router = useRouter();

    const totalPrice = products?.reduce((prev, curr) => {
        return prev + curr?.quantity * curr?.product?.salePrice;
    }, 0);
    const totalQuantity = products?.reduce((prev, curr) => {
        return prev + curr?.quantity;
    }, 0);

    const handleRemoveFromCart = async () => {
        setIsLoading(true);
        try {
            if (!currentProduct) {
                throw new Error("Not a valid product");
            }
            const newList = data?.cart?.filter((item) => item?.id !== currentProduct?.id);
            await updateCart({ list: newList, uid: user?.uid })
            toast.success("Product removed from cart");
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handlePlaceOrder = async () => {
        setIsLoading(true);
        try {
            if (totalPrice <= 0) {
                throw new Error("Price cannot be 0");
            }

            if (!products || products?.length === 0) {
                throw new Error("No products found on cart");
            }

            if (paymentMode === "prepaid") {
                const url = await createCheckoutAndGetURL({
                    uid: user?.uid,
                    products: products,
                    address: selectedAddress,
                    totalAmount: totalPrice,
                    totalProducts: totalQuantity
                });

                toast.success("Order Placed Successfully");
                confetti();
                router.push(url);
            } else {
                const checkoutId = await createCheckoutCODAndGetId({
                    uid: user?.uid,
                    products: products,
                    address: selectedAddress,
                    totalAmount: totalPrice,
                    totalProducts: totalQuantity
                });

                toast.success("Order Placed Successfully");
                confetti();
                router.push(`/checkout-cod/${checkoutId}`);
            }

        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-full flex flex-col gap-3 justify-between">
            <div className="flex flex-1 justify-between flex-col gap-3">
                <div className="border rounded-md flex-1 h-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">SNo.</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead>Total Price</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products?.map((item, id) => (
                                <TableRow key={id}>
                                    <TableCell className="font-medium">{id + 1}</TableCell>
                                    <TableCell>
                                        {item?.product?.featureImageURL ?
                                            <Image
                                                src={item?.product?.featureImageURL}
                                                alt="Image"
                                                height={100}
                                                priority={true}
                                                width={100}
                                                className="object-cover rounded-md size-16"
                                            />
                                            :
                                            <div className="h-10 w-10 bg-zinc-200 rounded-full p-2">
                                                <Loader />
                                            </div>
                                        }
                                    </TableCell>
                                    <TableCell>{item?.product?.name}</TableCell>
                                    <TableCell className="whitespace-nowrap">₹ {item?.product?.salePrice}</TableCell>
                                    <TableCell className="text-center">{item?.quantity}</TableCell>
                                    <TableCell className="text-green-600 whitespace-nowrap">₹ {item?.quantity * item?.product?.salePrice}</TableCell>
                                    <TableCell className="text-right">
                                        <ConfirmRemove handleClick={handleRemoveFromCart} product={item?.product} >
                                            <Button variant="destructive" size="sm" disabled={isLoading} onClick={() => setCurrentProduct(item?.product)}>
                                                <Trash2 />
                                            </Button>
                                        </ConfirmRemove>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <DottedSeparator className={"my-2 md:hidden"} />
                <div className="flex gap-2 flex-col md:flex-row md:justify-between">
                    <div className="border rounded-md px-2 py-3 flex flex-col md:min-w-96">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm flex gap-1 items-center"><MapPin size={14} /> Address</h2>
                            <SelectAddressModal
                                setSelectedAddress={setSelectedAddress}
                                selectedAddress={selectedAddress}
                                trigger={
                                    <Button
                                        variant="teritary"
                                        size="sm"
                                    >
                                        {selectedAddress ? "Change Address" : "Select Address"}
                                    </Button>
                                }
                            />
                        </div>
                        <DottedSeparator className={"my-2"} />
                        <div className="flex flex-col p-2"                                    >
                            {selectedAddress ?
                                <div className="flex flex-col"                            >
                                    <h1 className="font-semibold">{selectedAddress?.name}</h1>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-zinc-400">{selectedAddress?.email}</span>
                                        <p className="text-xs font-semibold">{selectedAddress?.number}</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-zinc-800">{selectedAddress?.address}, {selectedAddress?.landmark}</p>
                                        <p className="text-sm text-zinc-800">{selectedAddress?.city}</p>
                                        <p className="text-sm text-zinc-800">{selectedAddress?.state}, {selectedAddress?.pincode}</p>
                                    </div>
                                </div>
                                :
                                <div className="flex flex-col items-center justify-center">
                                    <div className="size-24">
                                        <Image
                                            src='/no-location.png'
                                            blurDataURL='/no-location.png'
                                            height={1000}
                                            width={1000}
                                            priority={true}
                                            alt="location" className='object-cover w-full h-full rounded-md' />
                                    </div>
                                    <h2 className='text-zinc-600 text-sm'>Please select an address</h2>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                        <Table className="border rounded-md md:max-w-96">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Total Items</TableHead>
                                    <TableHead className="text-center">Total Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-center">{totalQuantity}</TableCell>
                                    <TableCell className="text-center text-green-600">₹ {totalPrice}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className="border rounded-md px-2 py-3 flex flex-col justify-between md:max-w-96">
                            <h2 className="text-center text-sm">Payment Mode</h2>
                            <div className="flex gap-4 px-4 justify-center items-center">
                                <Button variant="outline" disabled={paymentMode === "cod"} onClick={() => setPaymentMode("cod")}>
                                    <Wallet2 /> Cash On Delivery
                                </Button>
                                <Button variant="teritary" disabled={paymentMode === "prepaid"} onClick={() => setPaymentMode("prepaid")}>
                                    <TabletSmartphone /> Online Payment
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button size="lg" disabled={!paymentMode || !selectedAddress || isLoading} onClick={handlePlaceOrder}>
                Place Order
            </Button>
        </div>
    )
}












