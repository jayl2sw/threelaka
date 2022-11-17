import { PayloadAction } from '@reduxjs/toolkit';

import { call, put, takeLatest, fork, select } from 'redux-saga/effects';
import {
  GuildNotice,
  VideoInfo,
  GuildMemberList,
  TopThreeGuild,
  GuildDetailInfo,
  MyguildInfo,
  MyguildLearnTime,
  GuildRequest,
  MyRequest,
} from '../../models/guild';
import {
  getGuildNoticeApi,
  getGuildTaskApi,
  getGuildMemberApi,
  deleteGuildNoticeApi,
  createGuildNoticeApi,
  putGuildNoticeApi,
  postGuildHandOverApi,
  DeleteMemberApi,
  GetTopThreeGuildApi,
  GetSortedGuildApi,
  GetSearchGuildApi,
  GetGuildLearnTimeApi,
  GetGuildRequestsApi,
  AccpetGuildRequestApi,
  RejectGuildRequestApi,
  GetMyRequestApi,
  PostGuildRequestApi,
  QuitGuildApi,
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
    const progressResponse: VideoInfo[] = yield call(getGuildTaskApi, '1');
    yield put(guildActions.getProgressTaskSuccess(progressResponse));
    const upcomingResponse: VideoInfo[] = yield call(getGuildTaskApi, '0');
    yield put(guildActions.getUpcomingTaskSuccess(upcomingResponse));
    const completedResponse: VideoInfo[] = yield call(getGuildTaskApi, '2');
    yield put(guildActions.getCompletedTaskSuccess(completedResponse));
  } catch (error) {
    console.error();
  }
}

function* onGetGuildMemberListAsync(action: PayloadAction<string>) {
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

function* onDeleteGuildNoticeStartAsync(action: PayloadAction<string>) {
  try {
    yield call(deleteGuildNoticeApi);
    yield put(guildActions.getGuildNotice(action.payload));
  } catch (error) {
    console.error();
  }
}

function* onCreateGuildNoticeStartAsync(action: PayloadAction<string>) {
  try {
    console.warn('되나');
    const guildId: string = yield select(
      (state) => state.auth.currentUser.guildId
    );
    yield call(createGuildNoticeApi, action.payload);
    yield put(guildActions.getGuildNotice(guildId));
  } catch (error) {
    console.error();
  }
}

function* onPutGuildNoticeStartAsync(action: PayloadAction<string>) {
  try {
    console.warn('되나');
    const guildId: string = yield select(
      (state) => state.auth.currentUser.guildId
    );
    yield call(putGuildNoticeApi, action.payload);
    yield put(guildActions.getGuildNotice(guildId));
  } catch (error) {
    console.error();
  }
}

function* onPostGuildHandOverAsync(action: PayloadAction<string>) {
  try {
    yield call(postGuildHandOverApi, action.payload);
  } catch (error) {
    console.error();
  }
}

function* onDeleteMemberAsync(action: PayloadAction<number>) {
  try {
    yield call(DeleteMemberApi, action.payload);
    const guildId: string = yield select(
      (state) => state.auth.currentUser.guildId
    );
    yield put(guildActions.getGuildMember(guildId));
  } catch (error) {
    console.error();
  }
}
// 우수 길드 가져오기
function* onGetTopThreeGuildAsync() {
  try {
    const reponse: TopThreeGuild[] = yield call(GetTopThreeGuildApi);
    yield put(guildActions.getTopThreeGuildSuccess(reponse));
  } catch (error) {
    console.error();
  }
}

// 정렬된 길드 가져오기
function* onGetSortedGuildAsync(action: PayloadAction<string>) {
  try {
    const reponse: GuildDetailInfo[] = yield call(
      GetSortedGuildApi,
      action.payload
    );
    yield put(guildActions.getSortedGuildSuccess(reponse));
  } catch (error) {
    console.error();
  }
}

// 길드 정보 검색
function* onGetSearchGuildAsync() {
  try {
    console.warn('들어왔어요');
    const guildId: string = yield select(
      (state) => state.auth.currentUser.guildId
    );
    if (guildId !== null) {
      const reponse: MyguildInfo = yield call(GetSearchGuildApi, guildId);
      yield put(guildActions.getSearchGuildSuccess(reponse));
    }
  } catch (error) {
    console.error();
  }
}

// 길드 학습량 조회
function* onGetGuildLearnTimeAsync() {
  try {
    const guildId: string = yield select(
      (state) => state.auth.currentUser.guildId
    );
    if (guildId !== null) {
      const reponse: MyguildLearnTime[] = yield call(
        GetGuildLearnTimeApi,
        guildId
      );
      yield put(guildActions.getGuildLearnTimeSuccess(reponse));
    }
  } catch (error) {
    console.error();
  }
}

// 내가 마스터인 길드 가입 요청 조회
function* onGetGuildRequestsAsync() {
  try {
    const reponse: GuildRequest[] = yield call(GetGuildRequestsApi);
    yield put(guildActions.getGuildRequestSuccess(reponse));
  } catch (error) {
    console.error();
  }
}

// 길드 가입 승인하기
function* onAccpetGuildRequestAsync(action: PayloadAction<number>) {
  try {
    yield call(AccpetGuildRequestApi, action.payload);
    yield put(guildActions.putAcceptGuildRequestSuccess());
    yield put(guildActions.getGuildRequestStart());
  } catch (error) {
    console.error();
  }
}

// 길드 가입 거절
function* onRejectGuildRequestAsync(action: PayloadAction<number>) {
  try {
    yield call(RejectGuildRequestApi, action.payload);
    yield put(guildActions.deleteRejectGuildRequestSuccess());
    yield put(guildActions.getGuildRequestStart());
  } catch (error) {
    console.error();
  }
}

// 나의 길드 요청 목록 조회
function* onGetMyRequestAsync() {
  try {
    const response: MyRequest[] = yield call(GetMyRequestApi);
    yield put(guildActions.getMyRequestSuccess(response));
  } catch (error) {
    console.error();
  }
}

// 길드 가입 요청 하기
function* onPostGuildRequestAsync(action: PayloadAction<number>) {
  try {
    yield call(PostGuildRequestApi, action.payload);
    yield put(guildActions.postGuildRequestSuccess());
  } catch (error) {
    console.error();
  }
}

// 길드 가입 거절
function* onQuitGuildAsync(action: PayloadAction<number>) {
  try {
    yield call(QuitGuildApi, action.payload);
    yield put(guildActions.quitGuildSuccess());
    yield put(guildActions.getGuildRequestStart());
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
}
// 길드 멤버 받아오기 watch
export function* watchGetGuildMemberListAsync() {
  yield takeLatest(guildActions.getGuildMember.type, onGetGuildMemberListAsync);
}
// 길드 공지 삭제 watch
export function* watchDeleteGuildNoticeAsync() {
  yield takeLatest(
    guildActions.deleteGuildNoticeStart.type,
    onDeleteGuildNoticeStartAsync
  );
}

// 길드 공지 생성 watch
export function* watchCreateGuildNoticeAsync() {
  yield takeLatest(
    guildActions.createGuildNoticeStart.type,
    onCreateGuildNoticeStartAsync
  );
}

// 길드 공지 수정 watch
export function* watchPutGuildNoticeAsync() {
  yield takeLatest(
    guildActions.putGuildNoticeStart.type,
    onPutGuildNoticeStartAsync
  );
}

// 길드 마스터 넘기기 watch
export function* watchPostGuildHandOverAsync() {
  yield takeLatest(
    guildActions.postGuildHandOverStart.type,
    onPostGuildHandOverAsync
  );
}

// 길드원 추방 watch
export function* watchDeleteMemberAsync() {
  yield takeLatest(guildActions.deleteMemberStart.type, onDeleteMemberAsync);
}

// 우수 길드 가져오기 watch
export function* watchGetTopThreeGuildAsync() {
  yield takeLatest(
    guildActions.getTopThreeGuildStart.type,
    onGetTopThreeGuildAsync
  );
}

// 정렬된 길드 가져오기 watch
export function* watchGetSortedGuildAsync() {
  yield takeLatest(
    guildActions.getSortedGuildStart.type,
    onGetSortedGuildAsync
  );
}

// 길드 정보 검색
export function* watchGetSearchGuildAsync() {
  yield takeLatest(
    guildActions.getSearchGuildStart.type,
    onGetSearchGuildAsync
  );
}

// 길드 학습량 watch
export function* watchgetGuildLearnTimeAsync() {
  yield takeLatest(
    guildActions.getGuildLearnTimeStart.type,
    onGetGuildLearnTimeAsync
  );
}

// 내가 마스터인 길드 가입 요청 조회 watch
export function* watchGetGuildRequestsAsync() {
  yield takeLatest(
    guildActions.getGuildRequestStart.type,
    onGetGuildRequestsAsync
  );
}

// 길드 가입 승인하기 watch
export function* watchAccpetGuildRequestAsync() {
  yield takeLatest(
    guildActions.putAcceptGuildRequestStart.type,
    onAccpetGuildRequestAsync
  );
}

// 길드 가입 거절 watch
export function* watchRejectGuildRequestApiAsync() {
  yield takeLatest(
    guildActions.deleteRejectGuildRequestStart.type,
    onRejectGuildRequestAsync
  );
}

// 나의 길드 요청 목록 조회
export function* watchGetMyRequestAsync() {
  yield takeLatest(guildActions.getMyRequestStart.type, onGetMyRequestAsync);
}

// 길드 가입 요청 하기
export function* watchPostGuildRequestAsync() {
  yield takeLatest(
    guildActions.postGuildRequestStart.type,
    onPostGuildRequestAsync
  );
}

// 내가 가입한 길드 탈퇴
export function* watchgQuitGuildApiAsync() {
  yield takeLatest(guildActions.quitGuildStart.type, onQuitGuildAsync);
}

export const guildSagas = [
  fork(watchGetGuildNoticeAsync),
  fork(watchGetProgressTaskAsync),
  fork(watchGetGuildMemberListAsync),
  fork(watchDeleteGuildNoticeAsync),
  fork(watchCreateGuildNoticeAsync),
  fork(watchPutGuildNoticeAsync),
  fork(watchPostGuildHandOverAsync),
  fork(watchDeleteMemberAsync),
  fork(watchGetTopThreeGuildAsync),
  fork(watchGetSortedGuildAsync),
  fork(watchGetSearchGuildAsync),
  fork(watchgetGuildLearnTimeAsync),
  fork(watchGetGuildRequestsAsync),
  fork(watchAccpetGuildRequestAsync),
  fork(watchRejectGuildRequestApiAsync),
  fork(watchGetMyRequestAsync),
  fork(watchPostGuildRequestAsync),
  fork(watchgQuitGuildApiAsync),
];
