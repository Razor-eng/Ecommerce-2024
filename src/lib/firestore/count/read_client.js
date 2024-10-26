"use client";

import { db } from "@/lib/firebase"
import { collection, count, getAggregateFromServer, getCountFromServer, sum } from "firebase/firestore"
import useSWR from "swr";

export const getProductsCounts = async () => {
    const ref = collection(db, `products`);
    const data = await getCountFromServer(ref);
    return data.data().count;
}

export function useProductsCount() {
    const { data, error, isLoading } = useSWR(`products_count`, (key) => getProductsCounts());

    return { data, error, isLoading };
}


export const getUsersCounts = async () => {
    const ref = collection(db, "users");
    const data = await getCountFromServer(ref);
    return data.data().count;
}

export function useUsersCount() {
    const { data, error, isLoading } = useSWR(`users_count`, (key) => getUsersCounts());

    return { data, error, isLoading };
}

export const getRevenue = async () => {
    const ref = collection(db, `orders`);
    const data = await getAggregateFromServer(ref, {
        revenue: sum("totalAmount"),
        totalOrders: count()
    });
    return data.data();
}

export function useRevenue() {
    const { data, error, isLoading } = useSWR(`total_revenue`, (key) => getRevenue());

    return { data, error, isLoading };
}