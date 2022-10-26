import { delay, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, takeLatest } from 'redux-saga/effects';
import { SignupPayload,LoginPayload, authActions } from './authSlice';
import { ILoginResponse } from '../../services/userApi';
import { createUserApi,loginApi } from '../../services/userApi';

function* createUser(action: PayloadAction<SignupPayload>) {
  try {
    const response: string = yield call(createUserApi, action.payload);
    //string이 타입
    yield put(authActions.signupSuccess(response));
  } catch (error) {
    console.log(`유저생성실패`, error);
  }
}
function* watchSignupFlow() {
  yield takeLatest(authActions.signup.type, createUser);
}


function* login(action: PayloadAction<LoginPayload>) {
  try {
    console.log(action.payload)
    const response: ILoginResponse = yield call(loginApi, action.payload);
    console.log("반환",response)
    //string이 타입
  
    yield put(authActions.loginSuccess(response));
  } catch (error) {
    console.log(`로그인실패`, error);
  }
}
function* watchLoginFlow() {
  yield takeLatest(authActions.login.type, login);
}



export const authSagas = [fork(watchSignupFlow),fork(watchLoginFlow)];
