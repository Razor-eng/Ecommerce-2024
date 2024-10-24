import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore"

export const getCollection = async ({ id }) => {
    const data = await getDoc(doc(db, `collections/${id}`));

    if (data.exists()) {
        return data.data();
    } else {
        null;
    }
}

export const getCollections = async () => {
    const list = await getDocs(query(collection(db, 'collections')));

    return list.docs.map((snap) => snap.data());
}