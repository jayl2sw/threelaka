import { getTedScriptApi } from '../../services/readApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { TedScript } from '../../models';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { readActions } from './read-slice';

function* onGetScriptsAsync(action: PayloadAction<string>) {
  try {
    const response: TedScript[] = yield call(getTedScriptApi, action.payload);
    yield put(readActions.getScriptsSuccess(response));
  } catch (error) {
    console.log(`Failed to fetch TedSript`, error);
    // yield put(readActions.getScriptsFailed(error.message));
  }
}

export function* watchGetScriptsAsync() {
  yield takeLatest(readActions.getScripts.type, onGetScriptsAsync);
}

export const readSagas = [fork(watchGetScriptsAsync)];

