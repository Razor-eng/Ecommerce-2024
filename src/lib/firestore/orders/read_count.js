import { db } from "@/lib/firebase";
import { collection, count, getAggregateFromServer, query, sum, where } from "firebase/firestore";
import useSWR from "swr";

export const getOrdersCount = async ({ date }) => {
    const ref = collection(db, `orders`);
    let q = query(ref);

    if (date) {
        const fromDate = new Date(date);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(date);
        toDate.setHours(24, 0, 0, 0);
        q = query(
            q,
            where("orderedAt", ">=", fromDate),
            where("orderedAt", "<=", toDate))
    }

    const data = await getAggregateFromServer(q, {
        revenue: sum("totalAmount"),
        totalOrders: count()
    });

    if (date) {
        return {
            date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
            data: data.data()
        }
    }

    return data.data();
}

const getTotalOrdersCount = async (dates) => {
    let PromisesList = [];
    for (let i = 0; i < dates?.length; i++) {
        const date = dates[i];
        PromisesList.push(getOrdersCount({ date: date }));
    }
    const list = await Promise.all(PromisesList);
    return list;
}

export function useOrderCountByDays({ dates }) {
    const { data, error, isLoading } = useSWR(
        ['orders_count', dates],
        ([key, dates]) => getTotalOrdersCount(dates?.sort((a, b) => a?.getTime() - b?.getTime())));

    if (error) {
        console.log(error)
    }

    return { data, error, isLoading };
}

getOrdersCount(5);