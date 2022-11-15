import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoData, RecentVideoData } from '../../models/video';
import { RecentVideos } from '../../models/dashboard';
import {
  GuildNotice,
  VideoInfo,
  GuildMemberList,
  TopThreeGuild,
  GuildDetailInfo,
  MyguildInfo,
  MyguildLearnTime,
} from '../../models/guild';

type GuildState = {
  loading: boolean;
  guildNotice: GuildNotice;
  gulidMemberList: GuildMemberList;
  progressTaskList: VideoInfo[];
  upcomingTaskList: VideoInfo[];
  topThreeGuildList: TopThreeGuild[];
  guildSortedList: GuildDetailInfo[];
  myGuildInfo: MyguildInfo;
  myguildLearnTime: MyguildLearnTime[];
};

let initialState: GuildState = {
  loading: false,
  guildNotice: {
    guildId: 0,
    guildName: '',
    notice: '',
  },
  gulidMemberList: {
    guildId: 0,
    guildName: '',
    members: [],
  },
  progressTaskList: [],
  upcomingTaskList: [],
  topThreeGuildList: [],
  guildSortedList: [],
  myGuildInfo: {
    guildId: 0,
    masterId: 0,
    masterNickname: '',
    guildName: '',
    description: '',
    notice: '',
    assignments: [],
  },
  myguildLearnTime: [],
};

const guildSlice = createSlice({
  name: 'guild',
  initialState,
  reducers: {
    // 길드 공지 받아오기 요청
    getGuildNotice(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    // 길드 공지 받아오기 성공
    getGuildNoticeSuccess(state, action: PayloadAction<GuildNotice>) {
      console.log('길드 공지 받아오기 성공');
      state.loading = false;
      state.guildNotice = action.payload;
    },
    // 길드 공지 받아오기 실패
    getGuildNoticeFailed(state, action: PayloadAction<string>) {
      console.log('길드 공지 받아오기 실패');
      state.loading = false;
    },

    // 진행중인 과제 받아오기 요청
    getProgressTask(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    // 진행중인 과제 받아오기 성공
    getProgressTaskSuccess(state, action: PayloadAction<VideoInfo[]>) {
      console.log('진행중인 과제 받아오기 성공');
      state.loading = false;
      state.progressTaskList = action.payload;
    },

    // 진행중인 과제 받아오기 실패
    getProgressTaskFailed(state, action: PayloadAction<string>) {
      console.log('진행중인 과제 받아오기 실패');
      state.loading = false;
    },

    // 예정된 과제 받아오기 요청
    getUpcomingTask(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    // 예정된 과제 받아오기 성공
    getUpcomingTaskSuccess(state, action: PayloadAction<VideoInfo[]>) {
      console.log('진행중인 과제 받아오기 성공');
      state.loading = false;
      state.upcomingTaskList = action.payload;
    },

    // 예정된 과제 받아오기 실패
    getUpcomingTaskFailed(state, action: PayloadAction<string>) {
      console.log('진행중인 과제 받아오기 실패');
      state.loading = false;
    },

    // 길드 멤버 정보 받아오기 요청
    getGuildMember(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    // 길드 멤버 정보 받아오기 성공
    getGuildMemberSuccess(state, action: PayloadAction<GuildMemberList>) {
      console.log('길드 멤버 정보 받아오기 성공');
      state.loading = false;
      state.gulidMemberList = action.payload;
    },

    // 길드 멤버 정보 받아오기 실패
    getGuildMemberFailed(state, action: PayloadAction<string>) {
      console.log('길드 멤버 정보 받아오기 실패');
      state.loading = false;
    },

    // 길드 공지 삭제
    deleteGuildNoticeStart(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    // 길드 공지 성공
    deleteGuildNoticeSuccess(state) {
      state.loading = false;
    },
    // 길드 공지 실패
    deleteGuildNoticeFailed(state) {
      state.loading = false;
    },

    // 길드 공지 생성
    createGuildNoticeStart(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    // 길드 공지 생성 성공
    createGuildNoticeSuccess(state) {
      state.loading = false;
    },
    // 길드 공지 생성 실패
    createGuildNoticeFailed(state) {
      state.loading = false;
    },

    // 길드 공지 수정
    putGuildNoticeStart(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    // 길드 공지 수정 성공
    putGuildNoticeSuccess(state, action: PayloadAction<TopThreeGuild[]>) {
      state.loading = false;
      state.topThreeGuildList = action.payload;
    },
    // 길드 공지 수정 실패
    putGuildNoticeFailed(state) {
      state.loading = false;
    },

    // 길드 마스터 넘기기 시작
    postGuildHandOverStart(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    // 길드 마스터 넘기기 성공
    postGuildHandOverSuccess(state) {
      state.loading = false;
    },
    // 길드 마스터 넘기기 실패
    postGuildHandOverFailed(state) {
      state.loading = false;
    },

    // 길드원 추방 시작
    deleteMemberStart(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    // 길드원 추방 성공
    deleteMemberSuccess(state) {
      state.loading = false;
    },
    // 길드원 추방 실패
    deleteMemberFailed(state) {
      state.loading = false;
    },

    // 우수길드 가져오기 시작
    getTopThreeGuildStart(state) {
      state.loading = true;
    },
    // 우수길드 가져오기 성공
    getTopThreeGuildSuccess(state, action: PayloadAction<TopThreeGuild[]>) {
      state.loading = false;
      state.topThreeGuildList = action.payload;
    },
    // 우수길드 가져오기 실패
    getTopThreeGuildFailed(state) {
      state.loading = false;
    },

    // 정렬된 길드 가져오기
    getSortedGuildStart(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    // 정렬된 길드 성공
    getSortedGuildSuccess(state, action: PayloadAction<GuildDetailInfo[]>) {
      state.loading = false;
      state.guildSortedList = action.payload;
    },
    // 정렬된 길드 실패
    getSortedGuildFailed(state) {
      state.loading = false;
    },

    // 길드 정보 검색(멤버제외)
    getSearchGuildStart(state) {
      state.loading = true;
    },
    // 길드 정보 검색(멤버제외) 성공
    getSearchGuildSuccess(state, action: PayloadAction<MyguildInfo>) {
      state.loading = false;
      state.myGuildInfo = action.payload;
    },
    // 길드 정보 검색(멤버제외) 실패
    getSearchGuildFailed(state) {
      state.loading = false;
    },

    // 길드량 학습량순 조회 시작
    getGuildLearnTimeStart(state) {
      state.loading = true;
    },
    // 길드량 학습량순 조회 성공
    getGuildLearnTimeSuccess(state, action: PayloadAction<MyguildLearnTime[]>) {
      state.loading = false;
      state.myguildLearnTime = action.payload;
    },
    // 길드량 학습량순 조회 실패
    getGuildLearnTimeFailed(state) {
      state.loading = false;
    },
  },
});
// actions 만들어줘서 saga에서 import 해서 씀
export const guildActions = guildSlice.actions;

// root reducer에 추가해줘야 함
const guildReducer = guildSlice.reducer;
export default guildReducer;
