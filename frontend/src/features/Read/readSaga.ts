import {
  getTedScriptApi,
  postAddWordToWordBookApi,
} from '../../services/readApi';
import { getWordBookApi } from '../../services/studyApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { TedScript, WordInfo, WordBook } from '../../models';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { readActions } from './read-slice';
import { studyActions } from '../study/study-slice';
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
    // 1. 단어장에 추가
    const response: string = yield call(
      postAddWordToWordBookApi,
      action.payload
    );
    yield put(readActions.postAddWordToWordBookSuccess(response));
    // 2. 단어장 목록 가져오기
    const wordBookRes: WordBook[] = yield call(
      getWordBookApi,
      action.payload.lrId
    );
    yield put(studyActions.getWordBookSuccess(wordBookRes));
  } catch (error) {
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
