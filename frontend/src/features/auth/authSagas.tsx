import { delay, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, takeLatest } from 'redux-saga/effects';
import { SignupPayload, LoginPayload, authActions } from './authSlice';
import { ILoginResponse } from '../../services/userApi';
import { createUserApi, loginApi } from '../../services/userApi';

import { userInfoApi } from '../../services/userApi';

function* createUser(action: PayloadAction<SignupPayload>) {
  const { login } = authActions;
  try {
    const response: string = yield call(createUserApi, action.payload);
    //string이 타입
    const {username,password} = action.payload
    yield put(authActions.signupSuccess(response));
    yield put(login({username,password}))
  } catch (error) {
    console.log(`유저생성실패`, error);
  }
}
function* watchSignupFlow() {
  yield takeLatest(authActions.signup.type, createUser);
}

function* login(action: PayloadAction<LoginPayload>) {
  try {
    console.log(action.payload);
    const response: ILoginResponse = yield call(loginApi, action.payload);

    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('accessToken', response.accessToken);

    yield put(authActions.loginSuccess(response));
  } catch (error) {
    console.log(`로그인실패`, error);
  }
}
function* watchLoginFlow() {
  yield takeLatest(authActions.login.type, login);
}

function* test() {
  try {
    // console.log(action.payload);
    const response: string = yield call(userInfoApi);
    console.log('테스트성공', response);
    //string이 타입
  } catch (error) {}
}
function* watchtestFlow() {
  yield takeLatest(authActions.test.type, test);
}

export const authSagas = [
  fork(watchSignupFlow),
  fork(watchLoginFlow),
  fork(watchtestFlow),
];
