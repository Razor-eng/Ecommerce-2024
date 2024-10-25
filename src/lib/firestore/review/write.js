import { db } from "@/lib/firebase"
import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore"

export const addReview = async ({ uid, productId, name, photoURL, message, rating, totalReviews, totalRatings }) => {
    const ref = doc(db, `products/${productId}/reviews/${uid}`);
    await setDoc(ref, {
        rating: rating,
        review: message,
        productId: productId,
        uid: uid,
        name: name,
        photoURL: photoURL,
        timestamp: Timestamp.now()
    })
    const newRating = totalRatings / totalReviews;
    await setDoc(doc(db, `products/${productId}`), {
        totalRatings: totalRatings,
        reviews: totalReviews,
        rating: newRating
    }, {
        merge: true
    });
}
export const deleteReview = async ({ productId, uid }) => {
    const ref = doc(db, `products/${productId}/reviews/${uid}`);
    await deleteDoc(ref);
}