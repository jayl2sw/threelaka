import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, fork, delay } from 'redux-saga/effects';
import { writingActions } from './writing-slice';
import {
  CheckedWord,
  WordCheckPayload,
  SpellCheckRes,
  SaveEssayPayload,
} from '../../models';
import {
  postCheckWordApi,
  spellCheckApi,
  postSaveEssayApi,
  getEssayApi,
} from '../../services/writeApi';

// 해당 learning record의 단어장 가져오기 SAGA
function* onPostCheckWordAsync(action: PayloadAction<WordCheckPayload>) {
  try {
    const response: CheckedWord[] = yield call(
      postCheckWordApi,
      action.payload
    );
    yield put(writingActions.postCheckWordSuccess(response));
  } catch (error: any) {
    yield put(writingActions.postCheckWordFailed(error.data));
  }
}

// 스펠링 체크 SAGA
function* onWatchSpellCheckAsync(action: PayloadAction<string>) {
  try {
    const response: SpellCheckRes = yield call(spellCheckApi, action.payload);
    yield put(writingActions.spellCheckStartSuccess(response));
  } catch (error: any) {
    yield put(writingActions.spellCheckStartFailed(error.data));
  }
}

// 에세이 저장 SAGA
function* onPostSaveEssayAsync(action: PayloadAction<SaveEssayPayload>) {
  try {
    const response: string = yield call(postSaveEssayApi, action.payload);
    yield put(writingActions.postSaveEssaySuccess(response));
    yield delay(1000);
    yield put(writingActions.resetIsSaveSuccess());
  } catch (error: any) {
    yield put(writingActions.postSaveEssayFailed(error.data));
  }
}

// 에세이 불러오기 SAGA
function* onGetEssayAsync(action: PayloadAction<number>) {
  try {
    const response: string = yield call(getEssayApi, action.payload);
    yield put(writingActions.getEssaySuccess(response));
  } catch (error: any) {
    yield put(writingActions.getEssayFailed(error.data));
  }
}

// 단어장 불러오기 watch
export function* watchPostCheckWordAsync() {
  yield takeLatest(
    writingActions.postCheckWordStart.type,
    onPostCheckWordAsync
  );
}

// 스펠링 체크 watch
export function* watchSpellCheckAsync() {
  yield takeLatest(writingActions.spellCheckStart.type, onWatchSpellCheckAsync);
}

// 에세이 저장 watch
export function* watchPostSaveEssayAsync() {
  yield takeLatest(
    writingActions.postSaveEssayStart.type,
    onPostSaveEssayAsync
  );
}

// 에세이 불러오기 watch
export function* watchGetEssayAsync() {
  yield takeLatest(writingActions.getEssayStart.type, onGetEssayAsync);
}

export const writeSagas = [
  fork(watchPostCheckWordAsync),
  fork(watchSpellCheckAsync),
  fork(watchPostSaveEssayAsync),
  fork(watchGetEssayAsync),
];
