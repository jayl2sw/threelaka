import React from 'react';

import { ILoginResponse } from '../../services/userApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'secret';
  age: number;
  nickname: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  loading?: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false, //로딩중
  currentUser: undefined, //유저정보 따로 요청보낼거임
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup(state, action: PayloadAction<SignupPayload>) {
      state.loading = true;
    },
    signupSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    signupFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action.payload);
    },
    login(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<ILoginResponse>) {
      state.isLoggedIn = true;
      state.loading = false;
      console.log(action.payload);
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    test(state) {},
  },
});

export const authActions = authSlice.actions;

// Reducers
const authReducer = authSlice.reducer;
export default authReducer;
