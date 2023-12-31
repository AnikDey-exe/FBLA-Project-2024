import firebase_app from "../../../config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage(firebase_app);

// gets the file url from a collection (parameter) under an id (parameter) from the cloud storage
export default async function getFile(collection, id) {
    let fileUrl = null;
    let error = null;

    try {
        await getDownloadURL(ref(storage, `${collection}/${id}`))
            .then((url) => {
                fileUrl = url;
            })
    } catch (e) {
        error = e;
    }

    return [fileUrl, error]
}