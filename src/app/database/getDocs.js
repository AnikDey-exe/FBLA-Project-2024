import firebase_app from "../../../config";
import { getFirestore, doc, getDocs, collection } from "firebase/firestore";

const db = getFirestore(firebase_app);

// gets all the documents from a collection (parameter)
export default async function getDocuments(collectionName) {
    let result = null;
    let error = null;

    try {
        result = await getDocs(collection(db, collectionName));
    } catch (e) {
        error = e;
    }

    return { result, error };
}