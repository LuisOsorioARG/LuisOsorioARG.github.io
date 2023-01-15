import { async } from "@firebase/util";
import { DockSharp } from "@mui/icons-material";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseAuth, FireBaseBD } from '../../fireBase/config'; 
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";

import { addNewEmptyNote, 
    setActiveNote, 
    savingNewNote, 
    setNotes, 
    setSaving, 
    updateNote, 
    setFinishSaving,
    setPhotosToActiveNote,
    deleteNoteById } from './journalSlice';


export const startNewNote = ( ) => {

    return async( dispatch, getState ) => {

        console.log("STARTNEWNOTE - PASO 1:"); 

        const { uid } = getState().auth;

        console.log("STARTNEWNOTE - PASO 2:"); 

        //activamos la nota...
        dispatch ( savingNewNote());

        console.log("STARTNEWNOTE - PASO 2:"); 

        //generamos la estructura que vamos a grabar
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //obtenemos una referencia...
        //const newDoc = doc( collection( FireBaseBD, `${ uid }/journal/notes` )); 
        const newDoc = doc( collection( FireBaseBD, `${ uid }/pasteleria/presupuestos` )); 

        //con la referencia que obtuvimos en el paso anterior
        //ahora vamos a generar un doc sumando el objeto

        await setDoc( newDoc, newNote); 

        dispatch ( addNewEmptyNote(newNote) );

        dispatch ( setActiveNote(newNote) ); 

 
   }
}

export const startLoadingNotes = ( ) => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !uid ) throw new Error('El UID del usuario no existe.'); 
        const docs  = await loadNotes( uid ); 

        const notes = []; 
        //la funcion data() es la que nos trae el dato de la base
        //regresamos un nuevo vector con el ID mio mas
        //toda la info que nos traiga
        docs.forEach( doc => {
            notes.push( { id: doc.id, ...doc.data() } ); 
        })
        
        //por ultimo subimos las notas al store
        dispatch ( setNotes(notes) ); 

        return notes; 
 
   }
}


export const startSaveNote = ( ) => {

    return async( dispatch, getState ) => {

        //antes de trabajar nos ponemos la variable en setsaving
        dispatch ( setSaving() ); 

        //obtenemos los datos el id del usuairo y el id de la nota
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        //creamos el objeto que vamos a llevar a la base
        const noteToFireStore = { ...note }; 
        
        //eliminamos el id del objeto noteToFireStore...
        delete noteToFireStore.id; 

        //obtenemos la referencia de la nota que quiero actualizar
        //const docRef = doc( FireBaseBD, `${ uid }/journal/notes/${ note.id }` );
        const docRef = doc( FireBaseBD, `${ uid }/pasteleria/presupuestos/${ note.id }` );
        
        
        //con esa referencia, con el dato preparado le digo que mergee con el comando merge: true
        await setDoc( docRef, noteToFireStore, { merge: true}); 

        //ultimo paso actualizo la nota en el store
        dispatch ( updateNote(note) ); 



    }
}

export const startUpLoadingFiles = ( files = [] ) => {

    return async( dispatch  ) => {

        dispatch ( setSaving() ); 

        const fileUploadPromises = [];

        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ));
        }

        const photosUrls = await Promise.all( fileUploadPromises ); 

        //aqui deberiamos actualizar la nota activa con photosUrls

        dispatch ( setPhotosToActiveNote( photosUrls )); 

        dispatch ( setFinishSaving() ); 


    }
}

export const startDeletingNote = () => {

    return async( dispatch, getState  ) => {

        const { uid } = getState().auth;
        const { active:note, id} = getState().journal;
        const { id:id_note } = note; 

        console.log({uid,id_note, note}); 

        //obtenemos la referencia de la nota que quiero borrar
        //const docRef = doc( FireBaseBD, `${ uid }/journal/notes/${ note.id }` );
        const docRef = doc( FireBaseBD, `${ uid }/jpasteleria/presupuestos/${ note.id }` );

        await deleteDoc( docRef ); 

        //eliminamos desde el vector de notas
        dispatch( deleteNoteById(note.id)); 


    }
}