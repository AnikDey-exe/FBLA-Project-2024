import firebase_app from "../../../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

// updates the profile picture with a new profile picture (parameter) of the account under an email (parameter)
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
