import { PayloadAction } from '@reduxjs/toolkit';

import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { GuildNotice, VideoInfo, GuildMemberList } from '../../models/guild';
import {
  getGuildNoticeApi,
  getProgressTaskApi,
  getUpcomingTaskApi,
  getGuildMemberApi,
} from '../../services/guildApi';
import { guildActions } from './guild-slice';

// 길드 공지 받아오기 SAGA
function* onGetGuildNoticeAsync(action: PayloadAction<string>) {
  // 길드 공지 받아오기 성공하면
  try {
    // model에 적어준 dto 값으로 작성
    const response: GuildNotice = yield call(getGuildNoticeApi, action.payload);

    yield put(guildActions.getGuildNoticeSuccess(response));
    // console.log('성공했나');
  } catch (error) {
    console.error();
  }
}

// 길드 진행중인 과제 받아오기 SAGA
function* onGetProgressTaskAsync(action: PayloadAction<string>) {
  // 길드 과제 받아오기 성공하면
  try {
    // model에 적어준 dto 값으로 작성
    const progressResponse: VideoInfo[] = yield call(
      getProgressTaskApi,
      action.payload
    );
    yield put(guildActions.getProgressTaskSuccess(progressResponse));
    const upcomingResponse: VideoInfo[] = yield call(
      getUpcomingTaskApi,
      action.payload
    );
    yield put(guildActions.getUpcomingTaskSuccess(upcomingResponse));
  } catch (error) {
    console.error();
  }
}

function* onGetGuildMemberListAsunc(action: PayloadAction<string>) {
  // 멤버 정보 받아오기 성공하면
  try {
    const response: GuildMemberList = yield call(
      getGuildMemberApi,
      action.payload
    );
    yield put(guildActions.getGuildMemberSuccess(response));
  } catch (error) {
    console.error();
  }
}

// 길드 공지 받아오기 watch
export function* watchGetGuildNoticeAsync() {
  yield takeLatest(guildActions.getGuildNotice.type, onGetGuildNoticeAsync);
}
// 길드 진행중인 과제 받아오기 watch
export function* watchGetProgressTaskAsync() {
  yield takeLatest(guildActions.getProgressTask.type, onGetProgressTaskAsync);
  yield takeLatest(guildActions.getUpcomingTask.type, onGetProgressTaskAsync);
}

// 길드 멤버 받아오기 watch
export function* watchGetGuildMemberListAsunc() {
  yield takeLatest(guildActions.getGuildMember.type, onGetGuildMemberListAsunc);
}
export const guildSagas = [
  fork(watchGetGuildNoticeAsync),
  fork(watchGetProgressTaskAsync),
  fork(watchGetGuildMemberListAsunc),
];
