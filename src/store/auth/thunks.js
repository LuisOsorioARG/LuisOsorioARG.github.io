import { sigInWithGoogle, registerUserWithEmailPassword, sigInWithEmailPassword, logoutFirebase } from '../../fireBase/provider'; 

import { checkingCredentials_Store, logout, login, startLoading_Store, finishLoading_Store } from './authSlice'; 

import { clearNotesLogout } from '../journal/journalSlice';


export const checkingAuthentication = ( email, password ) => {

    return async( dispatch ) => {
        dispatch ( checkingCredentials_Store() ); 
    }
}

export const startGoogleSignIn = ( email, password ) => {

    return async( dispatch ) => {

        //actualizo el estado en el store...
        //uso dispatch porque el checkingCredentinal_Store es una action
        dispatch ( checkingCredentials_Store() );

        const result = await sigInWithGoogle(); 

        //segun sea lo que resulta del loging en google hago logout/login
        if (!result.ok )
            return dispatch ( logout( result.errorMessage ) ); 

        //por ultimo actualizamos     
        dispatch ( login( result )); 
 
   }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {

        dispatch ( checkingCredentials_Store() ); 

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
        
        if (!ok) return dispatch( logout({errorMessage})); 

        dispatch ( login( { uid, displayName, email, photoURL} )); 

    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {

    return async( dispatch ) => {

        dispatch ( checkingCredentials_Store() ); 


        const { ok, errorMessage, photoURL, uid } = await sigInWithEmailPassword({ email, password });

        if (!ok) return dispatch( logout({errorMessage})); 

        dispatch ( login( { uid, email, photoURL} )); 

        dispatch ( finishLoading_Store() ); 

    }

}

export const startLogout = () => {

    return async( dispatch ) => {

        dispatch ( checkingCredentials_Store() ); 

        const {  ok, errorMessage, photoURL, uid } = await logoutFirebase();

        if (!ok) return dispatch( logout({errorMessage})); 
        dispatch ( logout({errorMessage:'ningun-error'}) ); 
    
        dispatch ( finishLoading_Store() ); 

        //por ultimo limpiamos el store
        dispatch ( clearNotesLogout() )

    }

}