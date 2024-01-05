import firebase_app from "../../../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

// updates the account of the email (parameter) with a new name (parameter)
export default async function updateProfile(email, newName) {
    let error = null;

    try {
        await updateDoc(doc(db, "Users", email), {
            name: newName
        });
    } catch (e) {
        error = e;
    }

    return error;
}
