import firebase_app from "../../../config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getApplications(email) {
    let applicationsResult = null;
    let applicationsError = null;

    const q = query(collection(db, "Applications"),where("applicantEmail", "==", email));

    try {
        applicationsResult = await getDocs(q);
    } catch (e) {
        applicationsError = e;
    }

    return { applicationsResult, applicationsError };
}