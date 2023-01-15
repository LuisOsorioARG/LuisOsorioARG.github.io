import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, 
        GoogleAuthProvider,     
        signInWithPopup, 
        updateProfile,
        signInWithEmailAndPassword  } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider(); 

export const sigInWithGoogle = async() => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider ); 
        const { displayName, email, photoURL, uid } = result.user;
        return { ok: true,
                 errorMessage: '',
                 displayName, email, photoURL, uid
                }

    } catch (error) {

        const errorMessage = error.message;
        return { ok: false,
                 errorMessage, }
    }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user; 
        
        //en este paso actualizamos el displayName que no pudimos actualizar en el paso anterior
        //por eso lo actualizamos ahora.
        await updateProfile( FirebaseAuth.currentUser, { displayName }); 
        return { ok: true,
                 errorMessage: '',
                 displayName, email, photoURL, uid
                }
    } catch (error) {

        const errorMessage = error.message;
        return { ok: false,
                 errorMessage, }
    }
}


export const sigInWithEmailPassword = async({ email, password, displayName }) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName } = resp.user; 
        return { ok: true,
                 errorMessage: '',
                 displayName, email, photoURL, uid
                }
    } catch (error) {
        const errorMessage = error.message;
        return { ok: false,
                 errorMessage, }
    }
}

export const logoutFirebase = async () => {
    try {
       const resp = await FirebaseAuth.signOut(); 
        return { ok: true,
                 errorMessage: ''
                }
    } catch (error) {
        const errorMessage = error.message;
        return { ok: false,
                 errorMessage, }
    }


}
