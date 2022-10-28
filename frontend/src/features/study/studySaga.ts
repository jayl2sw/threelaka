import { postStartStudyApi, putStopStudyApi } from '../../services/studyApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { StudyStage } from '../../models';
import { studyActions } from './study-slice';

function* onPostStartStudyAsync(action: PayloadAction<string>) {
  try {
    const response: StudyStage = yield call(postStartStudyApi, action.payload);
    yield put(studyActions.postStartStudySuccess(response));
  } catch (error: any) {
    console.log(`Failed to fetch StartStudy`, error);
    yield put(studyActions.postStartStudyFailed(error.message));
  }
}

function* onPutStopStudyAsync(action: PayloadAction<number>) {
  try {
    const response: string = yield call(putStopStudyApi, action.payload);
    yield put(studyActions.putStopStudyStartSuccess());
  } catch (error: any) {
    console.log(`Failed to fetch StartStudy`, error);
    yield put(studyActions.putStopStudyStartFailed());
  }
}

export function* watchPostStartStudyAsync() {
  yield takeLatest(studyActions.postStartStudy.type, onPostStartStudyAsync);
}

export function* watchPutStopStudyAsync() {
  yield takeLatest(studyActions.putStopStudyStart.type, onPutStopStudyAsync);
}

export const studySagas = [fork(watchPostStartStudyAsync), fork(watchPutStopStudyAsync)];
