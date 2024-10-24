import { db, storage } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewProduct = async ({ data, imageList, image }) => {
    if (!image) {
        throw new Error("Image is Required");
    }
    if (!data?.name) {
        throw new Error("Name is Required");
    }

    const featureImageRef = ref(storage, `products/${data?.id}/${image?.name}`);
    await uploadBytes(featureImageRef, image);
    const featureImageURL = await getDownloadURL(featureImageRef);

    let imageURLList = [];
    for (let i = 0; i < imageList?.length; i++) {
        const image = imageList[i];
        const imageRef = ref(storage, `products/${data?.id}/${image?.name}`);
        await uploadBytes(imageRef, image);
        const imageURL = await getDownloadURL(imageRef);
        imageURLList.push(imageURL);
    }

    const newId = doc(collection(db, `ids`)).id;
    await setDoc(doc(db, `products/${newId}`), {
        ...data,
        id: newId,
        featureImageURL: featureImageURL,
        imageList: imageURLList,
        timestampCreate: Timestamp.now()
    });
}

export const updateProduct = async ({ data, image, imageList }) => {
    if (!data?.name) {
        throw new Error("Name is Required");
    }
    if (!data?.id) {
        throw new Error("Id is Required");
    }

    const id = data?.id;
    let featureImageURL = data?.featureImageURL ?? "";

    if (image) {
        const featureImageRef = ref(storage, `products/${data?.id}/${image?.name}`);
        await uploadBytes(featureImageRef, image);
        featureImageURL = await getDownloadURL(featureImageRef);
    }

    let imageURLList = imageList?.length === 0 ? data?.imageList : [];
    for (let i = 0; i < imageList?.length; i++) {
        const image = imageList[i];
        const imageRef = ref(storage, `products/${data?.id}/${image?.name}`);
        await uploadBytes(imageRef, image);
        const imageURL = await getDownloadURL(imageRef);
        imageURLList.push(imageURL);
    }

    await updateDoc(doc(db, `products/${data?.id}`), {
        ...data,
        featureImageURL: featureImageURL,
        imageList: imageURLList,
        timestampUpdate: Timestamp.now()
    });
}

export const deleteProduct = async ({ id }) => {
    if (!id) {
        throw new Error("Id is required");
    }

    await deleteDoc(doc(db, `products/${id}`));
}