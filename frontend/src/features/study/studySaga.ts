import {
  postStartStudyApi,
  putStopStudyApi,
  updateStudyStageApi,
  getWordBookApi,
  speechaceApi,
  postStudySatisfactionApi,
  getTodayStudyRecordApi,
} from '../../services/studyApi';
import { getFindWordApi } from '../../services/readApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import {
  StudyStage,
  WordMeaning,
  StageInfo,
  WordBook,
  SpeechTest,
  SatisfactionSurvey,
  TodayStudyRecord,
} from '../../models';
import { studyActions } from './study-slice';
// 공부 시작 SAGA
function* onPostStartStudyAsync(action: PayloadAction<string>) {
  try {
    const response: StudyStage = yield call(postStartStudyApi, action.payload);
    yield put(studyActions.postStartStudySuccess(response));
  } catch (error: any) {
    yield put(studyActions.postStartStudyFailed(error.message));
  }
}
// 공부 시간 update SAGA
function* onPutStopStudyAsync(action: PayloadAction<number>) {
  try {
    const response: string = yield call(putStopStudyApi, action.payload);
    yield put(studyActions.putStopStudyStartSuccess());
  } catch (error: any) {
    console.log(`Failed to fetch StartStudy`, error);
    yield put(studyActions.putStopStudyStartFailed());
  }
}
// 사전 검색 SAGA
function* onGetSearchDictAsync(action: PayloadAction<string>) {
  try {
    const response: WordMeaning = yield call(getFindWordApi, action.payload);
    yield put(studyActions.SearchDictSuccess(response));
  } catch (error: any) {
    yield put(studyActions.SearchDictFailed());
  }
}

// 학습상황 업데이트 SAGA
function* onUpdateStudyStageAsync(action: PayloadAction<StageInfo>) {
  try {
    const response: StudyStage = yield call(
      updateStudyStageApi,
      action.payload
    );
    // **이 사이에 state를 업데이트 시켜야 할 것 같음**
    yield put(studyActions.UpdateStudyStageStartSuccess(response));
  } catch (error: any) {
    yield put(studyActions.UpdateStudyStageStartFailed());
  }
}

// 해당 learning record의 단어장 가져오기 SAGA
function* onGetWordBookAsync(action: PayloadAction<number>) {
  try {
    const response: WordBook[] = yield call(getWordBookApi, action.payload);
    yield put(studyActions.getWordBookSuccess(response));
  } catch (error: any) {
    yield put(studyActions.getWordBookFailed());
  }
}

//발음검사
function* onPostSpeechTestInfo(action: PayloadAction<any>) {
  try {
    const response: SpeechTest = yield call(speechaceApi, action.payload);

    yield put(studyActions.speechTestSuccess(response));
  } catch (error) {}
}

// 공부 후 만족도 검사 SAGA
function* onPostStudySatisfactionAsync(
  action: PayloadAction<SatisfactionSurvey>
) {
  try {
    const response: string = yield call(
      postStudySatisfactionApi,
      action.payload
    );
    yield put(studyActions.postStudySatisfactionSuccess(response));
  } catch (error: any) {
    yield put(studyActions.postStudySatisfactionFailed());
  }
}

// 오늘의 학습 기록 가져오기
function* onGetTodayStudyRecordAsync(action: PayloadAction<number>) {
  try {
    const response: TodayStudyRecord = yield call(
      getTodayStudyRecordApi,
      action.payload
    );
    yield put(studyActions.getTodayStudyRecordSuccess(response));
  } catch (error: any) {
    yield put(studyActions.getTodayStudyRecordFailed());
  }
}

// 공부 시작 watch
export function* watchPostStartStudyAsync() {
  yield takeLatest(studyActions.postStartStudy.type, onPostStartStudyAsync);
}
// 공부 시간 업데이트 watch
export function* watchPutStopStudyAsync() {
  yield takeLatest(studyActions.putStopStudyStart.type, onPutStopStudyAsync);
}
// 사전 검색 watch
export function* watchgetSearchDictAsync() {
  yield takeLatest(studyActions.SearchDictStart.type, onGetSearchDictAsync);
}
// 학습상황 업데이트 watch
export function* watchUpdateStudyStageAsync() {
  yield takeLatest(
    studyActions.UpdateStudyStageStart.type,
    onUpdateStudyStageAsync
  );
}
// 단어장 불러오기 watch
export function* watchGetWordBookAsync() {
  yield takeLatest(studyActions.getWordBookStart.type, onGetWordBookAsync);
}
// 오늘의 학습기록 가져오기
export function* watchGetTodayStudyRecordAsync() {
  yield takeLatest(
    studyActions.getTodayStudyRecord.type,
    onGetTodayStudyRecordAsync
  );
}

// 학습후 만족도 검사 watch
export function* watchPostStudySatisfactionAsync() {
  yield takeLatest(
    studyActions.postStudySatisfactionStart.type,
    onPostStudySatisfactionAsync
  );
}

export function* watchonPostSpeechTestInfo() {
  yield takeLatest(studyActions.speechTest.type, onPostSpeechTestInfo);
}

export const studySagas = [
  fork(watchPostStartStudyAsync),
  fork(watchPutStopStudyAsync),
  fork(watchgetSearchDictAsync),
  fork(watchUpdateStudyStageAsync),
  fork(watchGetWordBookAsync),
  fork(watchonPostSpeechTestInfo),
  fork(watchPostStudySatisfactionAsync),
  fork(watchGetTodayStudyRecordAsync),
];
