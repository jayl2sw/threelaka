import { PayloadAction } from '@reduxjs/toolkit';

import { VideoData, RecommendVideos, RecentVideoData } from '../../models';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { getRecentVideosApi } from '../../services/dashboardApi';
import { dashboardActions } from './dashboard-slice';
import { RecentVideos } from '../../models/dashboard';
// // 비디오 1개 정보 받아오기 SAGA
// function* onGetVideoDataAsync(action: PayloadAction<string>) {
//   try {
//     const response: VideoData = yield call(getVideoDataApi, action.payload);
//     // console.log(response);
//     yield put(videoActions.getVideoDataSuccess(response));
//   } catch (error) {
//     // yield put(videoActions.getVideoDataFailed(error.message));
//   }
// }

// // 최근 공부한 영상 1개 정보 받아오기 SAGA
// function* onGetRecentVideoAsync(action: PayloadAction<string>) {
//   try {
//     const response: RecentVideoData = yield call(
//       getRecentVideoDataApi,
//       action.payload
//     );
//     yield put(videoActions.getRecentVideoDataSuccess(response));
//   } catch (error) {
//     console.log(`Fail to fetch RecentVideoData`, error);
//   }
// }

// 현재공부중인 영상 불러오기 SAGA
function* onGetRecentVideosAsync(action: PayloadAction<any>) {
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

// // 비디오 1개 정보 받아오기 watch
// export function* watchGetVideoDataAsync() {
//   yield takeLatest(videoActions.getVideoData.type, onGetVideoDataAsync);
// }

// // 최근 공부한 영상 1개 정보 받아오기 watch
// export function* watchGetRecentVideoDataAsync() {
//   yield takeLatest(videoActions.getRecentVideoData.type, onGetRecentVideoAsync);
// }

// 추천 비디오 4개 정보 watch
export function* watchGetRecommendVideoAsync() {
  yield takeLatest(
    dashboardActions.getRecentVideos.type,
    onGetRecentVideosAsync
  );
}
export const dashboardSagas = [fork(watchGetRecommendVideoAsync)];
