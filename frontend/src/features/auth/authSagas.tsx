import { delay, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, takeLatest } from 'redux-saga/effects';
import {
  SignupPayload,
  LoginPayload,
  authActions,
  ModifyPayload,
  ModifyPwdPayload,
} from './authSlice';
import { ILoginResponse } from '../../services/userApi';
import {
  createUserApi,
  loginApi,
  userInfoApi,
  logoutApi,
  modifyUserApi,
  modifyPwdApi,
} from '../../services/userApi';
import { User } from '../../models/user';
import { dashboardActions } from '../dashboard/dashboard-slice';

function* createUser(action: PayloadAction<SignupPayload>) {
  const { fetchUser, login, isNewbie } = authActions;
  try {
    const response: string = yield call(createUserApi, action.payload);
    //string이 타입
    const { username, password } = action.payload;
    yield put(authActions.signupSuccess(response));
    yield put(login({ username, password }));
    yield put(fetchUser());

    yield put(isNewbie());
    // console.log(username,password)
    //바로로그인 기능 일단 off
  } catch (error) {}
}
function* watchSignupFlow() {
  yield takeLatest(authActions.signup.type, createUser);
}

function* login(action: PayloadAction<LoginPayload>) {
  try {
    console.log(action.payload);
    const response: ILoginResponse = yield call(loginApi, action.payload);

    sessionStorage.setItem('refreshToken', response.refreshToken);
    sessionStorage.setItem('accessToken', response.accessToken);

    yield put(authActions.loginSuccess(response));
    yield put(authActions.fetchUser());
    yield put(dashboardActions.getTagList());
  } catch (error: any) {
    yield put(authActions.loginFailed(error.response.data.status));
  }
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

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  } catch (error) {}
}
function* watchLogoutFlow() {
  yield takeLatest(authActions.logout.type, logout);
}

function* modifyUser(action: PayloadAction<ModifyPayload>) {
  const { fetchUser } = authActions;
  try {
    const response: string = yield call(modifyUserApi, action.payload);
    //string이 타입

    yield put(authActions.modifyUserInfoSuccess(response));

    yield put(fetchUser());
  } catch (error: any) {
    yield put(authActions.modifyUserInfoFailed(error.data));
  }
}

function* watchModifyUserFlow() {
  yield takeLatest(authActions.modifyUserInfo.type, modifyUser);
}
function* modifyPwd(action: PayloadAction<ModifyPwdPayload>) {
  const { fetchUser } = authActions;
  console.log('어디서막힘?');
  try {
    const response: string = yield call(modifyPwdApi, action.payload);
    //string이 타입

    yield put(authActions.modifyPwdSuccess(response));

    yield put(fetchUser());
  } catch (error: any) {
    console.warn('에러', error.response.data.status);
    yield put(authActions.modifyPwdFailed(error.response.data.status));
  }
}

function* watchModifyPwdFlow() {
  yield takeLatest(authActions.modifyPwd.type, modifyPwd);
}

export const authSagas = [
  fork(watchSignupFlow),
  fork(watchLoginFlow),
  fork(watchLogoutFlow),
  fork(watchfetchUserFlow),
  fork(watchModifyUserFlow),
  fork(watchModifyPwdFlow),
];
