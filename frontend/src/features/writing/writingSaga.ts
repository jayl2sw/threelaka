import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { writingActions } from './writing-slice';
import { CheckedWord, WordCheckPayload, SpellCheckRes } from '../../models';
import { postCheckWordApi, spellCheckApi } from '../../services/writeApi';

// 해당 learning record의 단어장 가져오기 SAGA
function* onPostCheckWordAsync(action: PayloadAction<WordCheckPayload>) {
  try {
    const response: CheckedWord[] = yield call(
      postCheckWordApi,
      action.payload
    );
    yield put(writingActions.postCheckWordSuccess(response));
  } catch (error: any) {
    console.log(`Failed to fetch checkdword`, error);
    yield put(writingActions.postCheckWordFailed(error.data));
  }
}

// 스펠링 체크 SAGA
function* onWatchSpellCheckAsync(action: PayloadAction<string>) {
  try {
    const response: SpellCheckRes = yield call(spellCheckApi, action.payload);
    yield put(writingActions.spellCheckStartSuccess(response));
  } catch (error: any) {
    console.log(`Failed to fetch spellcheck`, error);
    yield put(writingActions.spellCheckStartFailed(error.data));
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

export const writeSagas = [
  fork(watchPostCheckWordAsync),
  fork(watchSpellCheckAsync),
];
