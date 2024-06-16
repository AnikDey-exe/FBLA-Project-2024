import firebase_app from "../../../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

// updates the application of the given id (parameter) with the new status (parameter)
export default async function updateApplication(id, newStatus) {
    let error = null;

    try {
        await updateDoc(doc(db, "Applications", id), {
            applicationStatus: newStatus
        });
    } catch (e) {
        error = e;
    }

    return error;
}
