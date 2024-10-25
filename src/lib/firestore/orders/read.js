"use client";

import { db } from "@/lib/firebase";
import { collection, doc, limit, onSnapshot, orderBy, query, startAfter, where } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useOrders({ uid }) {
    const { data, error } = useSWRSubscription(
        ["orders", uid],
        ([path, uid], { next }) => {
            const ref = query(
                collection(db, path),
                where("uid", "==", uid),
                // orderBy("orderedAt", "desc"),
            );
            const unsub = onSnapshot(
                ref,
                (snapshot) =>
                    next(
                        null,
                        snapshot.docs.length === 0
                            ? null
                            : snapshot.docs.map((snap) => snap.data())
                    ),
                (err) => next(err)
            );
            return () => unsub();
        });

    return { data, error, isLoading: data === undefined };
}

export function useOrder({ id }) {
    const { data, error } = useSWRSubscription(
        ["orders", id],
        ([path, id], { next }) => {
            const ref = doc(db, `orders/${id}`);
            const unsub = onSnapshot(
                ref,
                (snapshot) =>
                    next(
                        null,
                        snapshot.data()
                    ),
                (err) => next(err)
            );
            return () => unsub();
        });

    return { data, error, isLoading: data === undefined };
}

export function useAllOrders({ pageLimit, lastSnapDoc }) {
    const { data, error } = useSWRSubscription(
        ["orders", pageLimit, lastSnapDoc],
        ([path, pageLimit, lastSnapDoc], { next }) => {
            const ref = collection(db, path);
            let q = query(ref, limit(pageLimit ?? 8), orderBy("orderedAt", "desc"));
            if (lastSnapDoc) {
                q = query(q, startAfter(lastSnapDoc))
            }
            const unsub = onSnapshot(
                q,
                (snapshot) =>
                    next(
                        null,
                        {
                            list: snapshot.docs.length === 0
                                ? null
                                : snapshot.docs.map((snap) => snap.data()),
                            lastSnapDoc: snapshot.docs.length === 0
                                ? null
                                : snapshot.docs[snapshot.docs.length - 1]
                        }
                    ),
                (err) => next(err)
            );
            return () => unsub();
        });

    return { data: data?.list, error, isLoading: data === undefined, lastSnapDoc: data?.lastSnapDoc };
}