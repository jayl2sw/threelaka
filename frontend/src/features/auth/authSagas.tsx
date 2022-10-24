import { delay, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, takeLatest } from 'redux-saga/effects';
import { SignupPayload, authActions } from './authSlice';

import { createUserApi, ISignupRespons } from '../../services/userApi';

function* createUser(action: PayloadAction<SignupPayload>) {
  try {
    const response: ISignupRespons = yield call(createUserApi, action.payload);

    yield put(authActions.signupSuccess(response));
  } catch (error) {
    console.log(`유저생성실패`, error);
  }
}

function* watchSignupFlow() {
  yield takeLatest(authActions.signup.type, createUser);
}

export const authSagas = [fork(watchSignupFlow)];
