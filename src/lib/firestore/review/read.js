"use client";

import { db } from "@/lib/firebase";
import { collection, collectionGroup, onSnapshot, orderBy, query, where } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useAllReviews() {
    const { data, error } = useSWRSubscription(
        ["reviews"],
        ([path], { next }) => {
            const ref = collectionGroup(db, path);
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


export function useReviews({ productId }) {
    const { data, error } = useSWRSubscription(
        [`products/${productId}/reviews`, productId],
        ([path], { next }) => {
            const ref = query(collection(db, path), orderBy("timestamp", "desc"));
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