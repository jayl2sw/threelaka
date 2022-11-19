import { useAppSelector } from './../../utils/hooks';
import { PayloadAction } from '@reduxjs/toolkit';
import { videoActions } from './video-slice';
import {
  getVideoDataApi,
  getRecentVideoDataApi,
  getRecommendVideosApi,
  getKeywordSearchVideosApi,
} from '../../services/videoApi';
import { VideoData, RecommendVideos, RecentVideoData } from '../../models';
import { call, put, takeLatest, fork } from 'redux-saga/effects';

// 비디오 1개 정보 받아오기 SAGA
function* onGetVideoDataAsync(action: PayloadAction<string>) {
  try {
    const response: VideoData = yield call(getVideoDataApi, action.payload);
    // console.log(response);
    yield put(videoActions.getVideoDataSuccess(response));
  } catch (error: any) {
    yield put(videoActions.getVideoDataFailed(error.message));
  }
}

// 최근 공부한 영상 1개 정보 받아오기 SAGA
function* onGetRecentVideoAsync(action: PayloadAction<string>) {
  try {
    const response: RecentVideoData = yield call(
      getRecentVideoDataApi,
      action.payload
    );
    yield put(videoActions.getRecentVideoDataSuccess(response));
  } catch (error) {
    console.log(`Fail to fetch RecentVideoData`, error);
  }
}

// 추천 비디오 4개 정보 받아오기 SAGA
function* onGetRecommendVideosAsync(action: PayloadAction<any>) {
  try {
    const response: RecommendVideos[] = yield call(
      getRecommendVideosApi,
      action.payload
    );
    yield put(videoActions.getRecommendVideosSuccess(response));
  } catch (error: any) {
    yield put(videoActions.getRecommendVideosFailed(error.data));
  }
}

// 키워드 검색 비디오 SAGA
function* onGetKeywordSearchVideosAsync(action: PayloadAction<string>) {
  try {
    const response: RecommendVideos[] = yield call(
      getKeywordSearchVideosApi,
      action.payload
    );
    yield put(videoActions.getKeywordSearchVideosSuccess(response));
  } catch (error: any) {
    yield put(videoActions.getKeywordSearchVideosFailed());
  }
}

// 비디오 1개 정보 받아오기 watch
export function* watchGetVideoDataAsync() {
  yield takeLatest(videoActions.getVideoData.type, onGetVideoDataAsync);
}

// 최근 공부한 영상 1개 정보 받아오기 watch
export function* watchGetRecentVideoDataAsync() {
  yield takeLatest(videoActions.getRecentVideoData.type, onGetRecentVideoAsync);
}

// 추천 비디오 4개 정보 watch
export function* watchGetRecommendVideoAsync() {
  yield takeLatest(
    videoActions.getRecommendVideos.type,
    onGetRecommendVideosAsync
  );
}

// 키워드 검색 비디오 watch
export function* watchGetKeywordSearchVideosAsync() {
  yield takeLatest(
    videoActions.getKeywordSearchVideosStart.type,
    onGetKeywordSearchVideosAsync
  );
}

export const videoSagas = [
  fork(watchGetVideoDataAsync),
  fork(watchGetRecommendVideoAsync),
  fork(watchGetRecentVideoDataAsync),
  fork(watchGetKeywordSearchVideosAsync),
];
