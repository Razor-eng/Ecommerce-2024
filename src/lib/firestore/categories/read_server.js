import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore"

export const getCategory = async ({ id }) => {
    const data = await getDoc(doc(db, `categories/${id}`));

    if (data.exists()) {
        return data.data();
    } else {
        null;
    }
}

export const getCategories = async () => {
    const list = await getDocs(query(collection(db, 'categories')));

    return list.docs.map((snap) => snap.data());
}