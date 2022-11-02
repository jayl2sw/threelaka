import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { writingActions } from './writing-slice';
import { CheckedWord, WordCheckPayload } from '../../models';
import { postCheckWordApi } from '../../services/writeApi';

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

// 단어장 불러오기 watch
export function* watchPostCheckWordAsync() {
  yield takeLatest(
    writingActions.postCheckWordStart.type,
    onPostCheckWordAsync
  );
}

export const writeSagas = [fork(watchPostCheckWordAsync)];
