"use client";

import { db } from "@/lib/firebase";
import { collection, doc, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useProducts({ pageLimit, lastSnapDoc }) {
    const { data, error } = useSWRSubscription(
        ["products", pageLimit, lastSnapDoc],
        ([path, pageLimit, lastSnapDoc], { next }) => {
            const ref = collection(db, path);
            let q = query(ref, limit(pageLimit ?? 8))
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

export function useProduct({ productId }) {
    const { data, error } = useSWRSubscription(
        ["products", productId],
        ([path, productId], { next }) => {
            const ref = doc(db, `${path}/${productId}`);
            const unsub = onSnapshot(
                ref,
                (snapshot) =>
                    next(
                        null,
                        snapshot.exists() ? snapshot.data() : null
                    ),
                (err) => next(err, null)
            );
            return () => unsub();
        });

    return { data: data, error, isLoading: data === undefined };
}

// export function useProductsByIds({ idsList }) {
//     const { data, error } = useSWRSubscription(
//         ["products", idsList],
//         ([path, idsList], { next }) => {
//             const ref = collection(db, path);
//             let q = query(ref, where("id", "in", idsList));

//             const unsub = onSnapshot(
//                 q,
//                 (snapshot) =>
//                     next(
//                         null,
//                         snapshot.docs.length === 0
//                             ? []
//                             : snapshot.docs.map((snap) => snap.data()),
//                     ),
//                 (err) => next(err)
//             );
//             return () => unsub();
//         });

//     return { data: data, error, isLoading: data === undefined };
// }

export function useAllProducts() {
    const { data, error } = useSWRSubscription(
        ["products"],
        ([path], { next }) => {
            const ref = collection(db, path);

            const unsub = onSnapshot(
                ref,
                (snapshot) =>
                    next(
                        null,
                        snapshot.docs.length === 0
                            ? []
                            : snapshot.docs.map((snap) => snap.data()),
                    ),
                (err) => next(err)
            );
            return () => unsub();
        });

    return { data: data, error, isLoading: data === undefined };
}