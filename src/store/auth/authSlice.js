import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',

  initialState: {
    status: 'checking',  //'not-authenticaed authenticated checking
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    loading: null,
  },

  reducers: {
    login: (state,{ payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null; 
    },
    logout: (state,{ payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage; 
    },
    checkingCredentials_Store: (state) => {
      state.status = 'checking';
    },
    startLoading_Store: (state) => {
      state.status = 'checking';
      state.loading = true;
    },
    finishLoading_Store: (state) => {
      state.loading = false;
    },
  },
})

export const { login, logout, checkingCredentials_Store, startLoading_Store, finishLoading_Store } = authSlice.actions; 