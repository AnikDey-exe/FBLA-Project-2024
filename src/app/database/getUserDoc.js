import firebase_app from "../../../config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getUserDocument(email) {
    let result = null;
    let error = null;

    const q = query(collection(db, "Users"), where("email", "==", email));

    try {
        result = await getDocs(q);
    } catch (e) {
        error = e;
    }

    return { result, error };
}