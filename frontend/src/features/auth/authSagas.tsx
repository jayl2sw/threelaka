import { delay, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, takeLatest } from 'redux-saga/effects';
import { SignupPayload, LoginPayload, authActions } from './authSlice';
import { ILoginResponse } from '../../services/userApi';
import {
  createUserApi,
  loginApi,
  userInfoApi,
  logoutApi,
} from '../../services/userApi';
import { User } from '../../models/user';

function* createUser(action: PayloadAction<SignupPayload>) {
  const { fetchUser } = authActions;
  try {
    const response: string = yield call(createUserApi, action.payload);
    //string이 타입
    // const {username,password} = action.payload
    yield put(authActions.signupSuccess(response));
    yield put(fetchUser());
    // console.log(username,password)
    //바로로그인 기능 일단 off
    // yield put(login({username,password}))
  } catch (error) {}
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
    yield put(authActions.fetchUser());
  } catch (error) {}
}
function* watchLoginFlow() {
  yield takeLatest(authActions.login.type, login);
}

function* fetchUser() {
  console.log('어디서멈춤');
  try {
    // console.log(action.payload);

    const response: User = yield call(userInfoApi);

    yield put(authActions.fetchUserSuccess(response));
  } catch (error) {}
}
function* watchfetchUserFlow() {
  yield takeLatest(authActions.fetchUser.type, fetchUser);
}

function* logout() {
  try {
    const response: string = yield call(logoutApi);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (error) {}
}
function* watchLogoutFlow() {
  yield takeLatest(authActions.logout.type, logout);
}

export const authSagas = [
  fork(watchSignupFlow),
  fork(watchLoginFlow),
  fork(watchLogoutFlow),
  fork(watchfetchUserFlow),
];
