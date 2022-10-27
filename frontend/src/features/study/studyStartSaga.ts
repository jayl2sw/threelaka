import { postStudyStartApi } from './../../services/startApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { StudyStart } from './../../models';
import { startActions } from './studyStart-slice';

function* onPostStartAsync(action: PayloadAction<string>) {
  try {
    const response: StudyStart[] = yield call(
      postStudyStartApi,
      action.payload
    );
    yield put(startActions.postStudyStartSuccess(response));
  } catch (error) {
    console.log(`Failed to fetch TedSript`, error);
    // yield put(startActions.postStudyStartFailed(error.message));
  }
}

export function* watchpostStudyStartAsync() {
  yield takeLatest(startActions.postStudyStart.type, onPostStartAsync);
}

export const readSagas = [fork(watchpostStudyStartAsync)];
