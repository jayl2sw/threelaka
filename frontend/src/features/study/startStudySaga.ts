import { postStartStudyApi } from '../../services/startApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { StartStudy } from '../../models';
import { startStudyActions } from './startStudy-slice';

function* onPostStartStudyAsync(action: PayloadAction<string>) {
  try {
    const response: StartStudy = yield call(postStartStudyApi, action.payload);
    yield put(startStudyActions.postStartStudySuccess(response));
  } catch (error: any) {
    console.log(`Failed to fetch StartStudy`, error);
    yield put(startStudyActions.postStartStudyFailed(error.message));
  }
}

export function* watchPostStartStudyAsync() {
  yield takeLatest(
    startStudyActions.postStartStudy.type,
    onPostStartStudyAsync
  );
}

export const StartStudySagas = [fork(watchPostStartStudyAsync)];
