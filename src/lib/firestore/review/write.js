import { db } from "@/lib/firebase"
import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore"

export const addReview = async ({ uid, productId, name, photoURL, message, rating }) => {
    await setDoc(doc(db, `products/${productId}/reviews/${uid}`), {
        rating: rating,
        review: message,
        productId: productId,
        uid: uid,
        name: name,
        photoURL: photoURL,
        timestamp: Timestamp.now()
    })
}

export const deleteReview = async ({ uid, productId }) => {
    const ref = doc(db, `products/${productId}/reviews/${uid}`);
    await deleteDoc(ref);
}