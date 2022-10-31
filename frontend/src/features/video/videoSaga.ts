import { videoActions } from './video-slice';
import { getVideoDataApi } from '../../services/videoApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { VideoData } from '../../models';
import { call, put, takeLatest, fork } from 'redux-saga/effects';

function* onGetVideoDataAsync(action: PayloadAction<string>) {
  try {
    const response: VideoData = yield call(getVideoDataApi, action.payload);
    // console.log(response);
    yield put(videoActions.getVideoDataSuccess(response));
  } catch (error) {
    console.log(`Failed to fetch TedSript`, error);
    // yield put(videoActions.getVideoDataFailed(error.message));
  }
}

export function* watchGetVideoDataAsync() {
  yield takeLatest(videoActions.getVideoData.type, onGetVideoDataAsync);
}

export const videoSagas = [fork(watchGetVideoDataAsync)];
