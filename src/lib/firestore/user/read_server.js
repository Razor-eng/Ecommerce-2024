import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUser = async ({ id }) => {
    const data = await getDoc(doc(db, `users/${id}`));

    if (data.exists()) {
        return data.data();
    } else {
        null;
    }
}