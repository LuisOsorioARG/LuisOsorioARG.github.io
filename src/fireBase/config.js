// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// importamos la autenticación de nuestro registro en el fireBase
import { getAuth } from 'firebase/auth'; 

// importamos la base de datos
import { getFirestore } from 'firebase/firestore/lite'; 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  /* estas son del proyecto journal 
  apiKey: "AIzaSyDlWzOrKuwpY1FXI9tKGV9IwcVtXIDfQYo",
  authDomain: "journal-e61d6.firebaseapp.com",
  projectId: "journal-e61d6",
  storageBucket: "journal-e61d6.appspot.com",
  messagingSenderId: "247773957796",
  appId: "1:247773957796:web:2590a8d3c7e3ebc98d6031"
*/

/* estas son del proyecto de pasteleria */
    apiKey: "AIzaSyBZn1iVFVPCqxcQq5TS7MkTJGgwo81RNWU",
    authDomain: "pasteleria-5e65a.firebaseapp.com",
    projectId: "pasteleria-5e65a",
    storageBucket: "pasteleria-5e65a.appspot.com",
    messagingSenderId: "24068046604",
    appId: "1:24068046604:web:8afb6652177a00c5e5d329"
};


// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FireBaseApp ); 

export const FireBaseBD = getFirestore( FireBaseApp ); 

