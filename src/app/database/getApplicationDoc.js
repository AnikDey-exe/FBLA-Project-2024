import firebase_app from "../../../config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getApplicationDocument(positionId, email) {
    let application = null;
    let applicationError = null;

    const q = query(collection(db, "Applications"), where("positionId", "==", positionId), where("applicantEmail", "==", email));

    try {
        application = await getDocs(q);
    } catch (e) {
        applicationError = e;
    }

    return { application, applicationError };
}