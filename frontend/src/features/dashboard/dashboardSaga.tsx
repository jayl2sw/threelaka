import { PayloadAction } from '@reduxjs/toolkit';

import { VideoData, RecommendVideos, RecentVideoData } from '../../models';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import {
  getRecentVideosApi,
  getCompletedVideosApi,
  getDailyStudyTimeApi,
} from '../../services/dashboardApi';
import { dashboardActions } from './dashboard-slice';
import { RecentVideos, CompletedVideos } from '../../models/dashboard';

// 현재공부중인 영상 불러오기 SAGA
function* onGetRecentVideosAsync(action: PayloadAction<RecentVideos[]>) {
  try {
    const response: RecentVideos[] = yield call(
      getRecentVideosApi,
      action.payload
    );
    yield put(dashboardActions.getRecentVideosSuccess(response));
  } catch (error: any) {
    yield put(dashboardActions.getRecentVideosFailed(error.data));
  }
}
// 공부완료영상 불러오기 SAGA
function* onGetCompletedVideosAsync(action: PayloadAction<CompletedVideos[]>) {
  try {
    const response: RecentVideos[] = yield call(
      getCompletedVideosApi,
      action.payload
    );
    yield put(dashboardActions.getCompletedVideosSuccess(response));
  } catch (error: any) {
    yield put(dashboardActions.getCompletedVideosFailed(error.data));
  }
}

//데일리공부시간 불러오기 SAGA
function* onDailyStudyTimeAsync(action: PayloadAction<[]>) {
  try {
    const response: [] = yield call(getDailyStudyTimeApi, action.payload);
    yield put(dashboardActions.getDailyStudyTimeSuccess(response));
  } catch (error: any) {
    yield put(dashboardActions.getDailyStudyTimeFailed(error.data));
  }
}

// 현재공부중인영상
export function* watchGetRecentVideoAsync() {
  yield takeLatest(
    dashboardActions.getRecentVideos.type,
    onGetRecentVideosAsync
  );
}

// 공부완료영상
export function* watchGetCompletedVideoAsync() {
  yield takeLatest(
    dashboardActions.getCompletedVideos.type,
    onGetCompletedVideosAsync
  );
}

export function* watchGetDailyStudyTimeAsync() {
  yield takeLatest(
    dashboardActions.getDailyStudyTime.type,
    onDailyStudyTimeAsync
  );
}

export const dashboardSagas = [
  fork(watchGetRecentVideoAsync),
  fork(watchGetCompletedVideoAsync),
  fork(watchGetDailyStudyTimeAsync),
];
