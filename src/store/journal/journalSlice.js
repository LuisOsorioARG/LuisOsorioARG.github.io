import { createSlice } from '@reduxjs/toolkit'


export const journalSlice = createSlice({
  name: 'journal',

  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    },

  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true; 
    },

    deleteNoteById: (state,action) => {

      //la borro con un filtro
      const newVector = state.notes.filter( note => {
        if ( note.id !== action.payload)  return true; 
      })
      state.notes = newVector;

      //la saco de la nota activa
      state.active = null; 

    },

    addNewEmptyNote: (state, action) => {
      state.notes.push( action.payload);
      state.isSaving = false; 
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = ''; 
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true; 
      state.messageSaved = ''; 
    },
    setFinishSaving: (state) => {
      state.isSaving = false; 
    },

    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = ''; 
      state.notes = [];
      state.active = null;  
    },

    updateNote: (state, action) => {
      savingNewNote.isSaving = false;
      state.notes = state.notes.map( note => {
        if ( note.id === action.payload.id ) 
          return action.payload; 
        return note;
     });

     state.messageSaved = `${ state.active.title }, se ha actualizado correctamente`;
    },

    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
      state.isSaving = false; 
    },

  },
})

export const { addNewEmptyNote, 
              setActiveNote, 
              setNotes, 
              setSaving, 
              updateNote, 
              savingNewNote, 
              setFinishSaving,
              setPhotosToActiveNote,
              clearNotesLogout,
              deleteNoteById  } = journalSlice.actions; 