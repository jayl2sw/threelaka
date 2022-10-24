import { delay, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, takeLatest } from 'redux-saga/effects';
import { SignupPayload, authActions } from './authSlice';
import { ISignupRespons } from '../../services/createUserApi';


import { createUserApi } from '../../services/createUserApi';
// function* handleLogin(payload: LoginPayload) {
//   try {
//     yield delay(1000); // yield call(api, '')
//     localStorage.setItem('access_token', 'fake_token');
//     yield put(
//       authActions.loginSuccess({
//         // Dispatch action
//         id: 1,
//         name: 'Zendy',
//       })
//     );

    // Redirect to Admin page
//     yield put(push('/admin/dashboard'));
//   } catch (error) {
//     yield put(authActions.loginFailed(error.message)); // Dispatch action
//   }
// }

// function* handleLogout() {
//   yield delay(500);
//   localStorage.removeItem('access_token');

//   // Redirect to Login page
//   yield put(push('/login'));


function* createUser(action: PayloadAction<SignupPayload>) {
  try {
    console.log("그래도 여기까지는올걸", action.payload)
    const response: ISignupRespons = yield call(createUserApi, action.payload)
    // console.log("이거에러안뜨고 되는거임?",response)
    
    yield put(authActions.signupSuccess(response));
    console.log("이거에러안뜨고 되는거임?",response)
  } catch (error) {
    console.log(`아마에러가 뜨겠지`, error);
    // yield put(readActions.getScriptsFailed(error.message));
  }
  // try {
  //   // console.log("회원가입 form", payload)
  //   // const action = PayloadAction<SignupPayload>
    
  //   // const { email, password} = payload;
  //   // // 아이디 중복 체크
  //   // const responseId = yield call(checkUserId, userId);
  //   // if (!responseId.data) {
  //   //   console.log('아이디가 중복이에여');
  //   //   yield put(createUserError({ error: '아이디가 중복입니다' }));
  //   //   return;
  //   // }
  //   // // 닉네임 중복 체크
  //   // const responseNickname = yield call(checkNickname, nickname);
  //   // if (!responseNickname.data) {
  //   //   console.log('닉네임이 중복이에여');
  //   //   yield put(createUserError({ error: '닉네임이 중복이에여' }));
  //   //   return;
  //   // }
  //   // 회원가입 요청
  //   const response = yield call(createUserApi, payload);
  //   if (response.status === 200) {
  //     // 200 created! -> 회원가입 성공하면 -> 로그인 시키기
  //     // yield put(loginUserStart({ userId, password }));
  //   }
  // } catch (error) {
  //   // yield put(createUserError(error.response.data));
  // }
}

function* watchSignupFlow() {
  yield takeLatest(authActions.signup.type, createUser);
}


export const authSagas = [fork(watchSignupFlow)];
