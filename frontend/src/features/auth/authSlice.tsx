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
  password: string;
  gender: 'male' | 'female' | 'secret';
  age: number;
  nickname: string;
}
export interface ModifyPayload {
  gender: 'male' | 'female' | 'secret';
  age: number;
  nickname: string;
}
export interface ModifyPwdPayload {
  newPW: string;
  nowPW: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  loading?: boolean;
  currentUser?: User;
  errorStatus: number;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false, //로딩중
  currentUser: undefined, //유저정보 따로 요청보낼거임
  errorStatus: 0,
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
    //회원정보수정
    modifyUserInfo(state, action: PayloadAction<ModifyPayload>) {
      state.loading = true;
    },
    modifyUserInfoSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    modifyUserInfoFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action.payload);
    },
    //비밀번호수정
    modifyPwd(state, action: PayloadAction<ModifyPwdPayload>) {
      state.loading = true;
    },
    modifyPwdSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    modifyPwdFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      // status가 400일때 현재 비밀번호와 일치하지 않는것
      state.errorStatus = action.payload;
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
    loginFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.errorStatus = action.payload;
    },
    fetchUser(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action: PayloadAction<User>) {
      console.log(action.payload);
      state.loading = false;
      state.currentUser = action.payload;
    },
    fetchUserFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
      // Object.assign(state, initialState)
    },
    resetError(state) {
      state.errorStatus = 0;
    },
  },
});

export const authActions = authSlice.actions;

// Reducers
const authReducer = authSlice.reducer;
export default authReducer;
