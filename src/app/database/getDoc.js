import firebase_app from "../../../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

// gets the document from a collection (parameter) using an id (parameter)
export default async function getDocument(collection, id) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        result = (await getDoc(docRef)).data();
    } catch (e) {
        error = e;
    }

    return { result, error };
}