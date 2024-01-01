import firebase_app from "../../../config";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(firebase_app);

export default async function uploadFile(collection, id, file) {
    const storageRef = ref(storage, `${collection}/${id}`);

    let result = null;
    let error = null;

    try {
        await uploadBytes(storageRef, file).then((snapshot) => {
            result = snapshot;
        })
    } catch (e) {
        error = e;
    }

    return { result, error }
}