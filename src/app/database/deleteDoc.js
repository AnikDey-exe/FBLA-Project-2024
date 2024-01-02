import firebase_app from "../../../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function deleteDocument(collection, id) {
    let error = null;

    try {
        await deleteDoc(doc(db, collection, id));
    } catch (e) {
        error = e;
    }

    return error;
}
