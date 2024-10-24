import { db } from "@/lib/firebase"
import { doc, setDoc, Timestamp } from "firebase/firestore"

export const updateFavorites = async ({ list, uid }) => {
    await setDoc(
        doc(db, `users/${uid}`),
        {
            favorites: list,
        },
        {
            merge: true
        }
    );
}

export const updateCart = async ({ list, uid }) => {
    await setDoc(
        doc(db, `users/${uid}`),
        {
            cart: list,
        },
        {
            merge: true
        }
    );
}

export const createNewAddress = async ({ list, data, uid }) => {
    if (!data?.name) {
        throw new Error("Name is Required");
    }
    if (!data?.email) {
        throw new Error("Email is Required");
    }
    if (!data?.number) {
        throw new Error("Number is Required");
    }
    if (!data?.address) {
        throw new Error("Address is Required");
    }
    if (!data?.pincode) {
        throw new Error("Pincode is Required");
    }
    if (!data?.city) {
        throw new Error("City is Required");
    }
    if (!data?.state) {
        throw new Error("State is Required");
    }

    await setDoc(doc(db, `users/${uid}`),
        {
            location: list,
        },
        {
            merge: true
        });
}
