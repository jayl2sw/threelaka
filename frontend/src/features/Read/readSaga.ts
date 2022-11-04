import {
  getTedScriptApi,
  postAddWordToWordBookApi,
} from '../../services/readApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { TedScript, WordInfo } from '../../models';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { readActions } from './read-slice';
// 스크립트 가져오기 SAGA
function* onGetScriptsAsync(action: PayloadAction<string>) {
  try {
    const response: TedScript[] = yield call(getTedScriptApi, action.payload);
    yield put(readActions.getScriptsSuccess(response));
  } catch (error) {
    console.log(`Failed to fetch TedScript`, error);
    // yield put(readActions.getScriptsFailed(error.message));
  }
}

// 단어장에 단어 추가 SAGA
function* onPostAddWordToWordBookAsync(action: PayloadAction<WordInfo>) {
  try {
    const response: string = yield call(
      postAddWordToWordBookApi,
      action.payload
    );
    yield put(readActions.postAddWordToWordBookSuccess(response));
  } catch (error) {
    console.log(`Failed to fetch TedScript`, error);
    if (error instanceof Error) {
      yield put(readActions.postAddWordToWordBookFailed('Failed'));
    }
  }
}

// 스크립트 가져오기 watch
export function* watchGetScriptsAsync() {
  yield takeLatest(readActions.getScripts.type, onGetScriptsAsync);
}

// 단어장에 단어 추가 watch
export function* watchAddWordToWordBookAsync() {
  yield takeLatest(
    readActions.postAddWordToWordBookStart.type,
    onPostAddWordToWordBookAsync
  );
}

export const readSagas = [
  fork(watchGetScriptsAsync),
  fork(watchAddWordToWordBookAsync),
];
