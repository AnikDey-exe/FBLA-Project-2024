import firebase_app from "../../../config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

// get all the applications
export default async function getAllApplications() {
    let applicationsResult = null;
    let applicationsError = null;

    const q = query(collection(db, "Applications"));

    try {
        applicationsResult = await getDocs(q);
    } catch (e) {
        applicationsError = e;
    }

    return { applicationsResult, applicationsError };
}