import React from 'react';

import { ISignupRespons } from '../../services/userApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'secret';
  age: number;
  nickname: string;
}

export interface AuthState {
  loading?: boolean;
}

const initialState: AuthState = {
  loading: false, //로딩중
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup(state, action: PayloadAction<SignupPayload>) {
      state.loading = true;
    },
    signupSuccess(state, action: PayloadAction<ISignupRespons>) {
      state.loading = false;
    },
    signupFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action.payload);
    },
  },
});

export const authActions = authSlice.actions;

// Reducers
const authReducer = authSlice.reducer;
export default authReducer;
