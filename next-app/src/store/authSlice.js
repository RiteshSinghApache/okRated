// /src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    token: token || null,
    user: null,
    isAuthenticated: !!token,
  },
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      // Store token
      // if (typeof window !== 'undefined') {
      //   localStorage.setItem('token', action.payload.token);
      // }
      //Cookies.set('token', action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      //Cookies.remove('token');
    },
    loadUserFromStorage(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.isAuthenticated = true;
      }
      // if (typeof window !== 'undefined') {
      //   const token = localStorage.getItem('token');
      //   const user = JSON.parse(localStorage.getItem('user'));
      //   if (token && user) {
      //     state.token = token;
      //     state.user = user;
      //     state.isAuthenticated = true;
      //   }
      // }
    }
  },
});

export const { loginSuccess, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
