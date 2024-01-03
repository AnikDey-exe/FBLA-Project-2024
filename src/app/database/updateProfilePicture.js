import firebase_app from "../../../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function updateProfilePicture(email, newProfilePicture) {
    let error = null;

    try {
        await updateDoc(doc(db, "Users", email), {
            profilePicture: newProfilePicture
        });
    } catch (e) {
        error = e;
    }

    return error;
}
