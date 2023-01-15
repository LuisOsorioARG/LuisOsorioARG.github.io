import { collection, getDocs } from "firebase/firestore/lite";
import { FireBaseBD } from "../fireBase/config";

export const loadNotes = async( uid = '') => {

    if ( !uid ) throw new Error('El UID del usuario no existe'); 

    try {
        //const collectionRef = collection( FireBaseBD, `${ uid }/journal/notes` ); 
        const collectionRef = collection( FireBaseBD, `${ uid }/pasteleria/presupuestos` ); 
        
        const docs = await getDocs( collectionRef); 
        return docs; 
    } catch (error) {
        const errorMessage = error.message;
        console.log("Error en loadNotes:", errorMessage); 
        return []; 
    }

}