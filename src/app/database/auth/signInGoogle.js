import firebase_app from "../../../../config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import getUserDocument from "../getUserDoc";
import addData from "../addData";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebase_app);

/*

will check if user has an account

if user has an account that is not google
it should return an error and tell the user to sign in normally

if user doesnt have account
it should automatically create google account
it will create document in user's collection indicating account was created through google

if the login process is successful 
currentUserEmail will be the email from the authprovider result

*/

export default async function signInWithGoogle() {
    let resultant = null;
    let errors = null;

    try {
        // Step 1: User tries to sign in using Google.
        let res = await signInWithPopup(auth, provider);
        resultant = res.user;
        
        const { result, error } = await getUserDocument(res.user.email);
        if (error) throw new Error("Something went wrong");

        let count = 0;
        result.forEach((doc)=>{
            count++;
        })

        if(count == 0) {
            const { result2, error2 } = await addData("Users", res.user.email, {
                email: res.user.email,
                name: res.user.displayName,
                profilePicture: 'https://firebasestorage.googleapis.com/v0/b/fblaproject-e450d.appspot.com/o/profilePictures%2Fprofile.png?alt=media&token=5d79b779-57b9-4854-bb2b-b0ec8f4f8952'
            })
            if(error2) throw new Error("Something went wrong")
        }
    } catch (e) {
        errors = e;
    }
    
    return {resultant, errors};
}