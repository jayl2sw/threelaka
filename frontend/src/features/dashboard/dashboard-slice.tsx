import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoData, RecentVideoData } from '../../models/video';
import {
  RecentVideos,
  CompletedVideos,
  MonthStudyTime,
  StudyHistory,
  TotalStudyTime,
} from '../../models/dashboard';

type DashboardState = {
  loading: boolean;

  // 현재공부중인영상
  recentVideoList: RecentVideos[];
  // 공부완료영상
  completedVideoList: CompletedVideos[];
  dailyStudyTime: Array<Object>;
  monthStudyTime: Array<Object>;
  seqDays: number;

  // 학습히스토리
  studyHistory: StudyHistory;

  //총학습시간
  totalStudyTime: TotalStudyTime;
};

let initialState: DashboardState = {
  loading: false,

  recentVideoList: [],
  completedVideoList: [],
  dailyStudyTime: [],
  monthStudyTime: [],
  seqDays: 0,
  studyHistory: {
    essays: 0,
    videos: 0,
    words: 0,
  },
  totalStudyTime: {
    time: 0,
  },
};

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // 현재 공부중인 영상 정보 받아오기 요청
    getCompletedVideos(state) {
      state.loading = true;
    },
    // 현재 공부중인 영상 정보 받아오기 성공
    getCompletedVideosSuccess(state, action: PayloadAction<CompletedVideos[]>) {
      // console.log(action.payload);
      state.loading = false;
      state.completedVideoList = action.payload;
    },
    // 현재 공부중인 영상 정보 받아오기 요청 실패
    getCompletedVideosFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    // 현재 공부중인 영상 정보 받아오기 요청
    getRecentVideos(state) {
      state.loading = true;
    },
    // 현재 공부중인 영상 정보 받아오기 성공
    getRecentVideosSuccess(state, action: PayloadAction<RecentVideos[]>) {
      // console.log(action.payload);
      state.loading = false;
      state.recentVideoList = action.payload;
    },
    // 현재 공부중인 영상 정보 받아오기 요청 실패
    getRecentVideosFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    // 데일리 공부 시간 받아오기
    getDailyStudyTime(state) {
      state.loading = true;
    },
    // 데일리 공부 시간 받아오기 성공
    getDailyStudyTimeSuccess(state, action: PayloadAction<number[]>) {
      state.loading = false;
      state.dailyStudyTime = action.payload;
    },

    getDailyStudyTimeFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    // 한달 공부 시간 받아오기
    getMonthStudyTime(state) {
      state.loading = true;
    },
    // 한달 공부 시간 받아오기 성공
    getMonthStudyTimeSuccess(state, action: PayloadAction<MonthStudyTime>) {
      state.loading = false;

      state.monthStudyTime = action.payload.time;
      state.seqDays = action.payload.seqDays;
    },

    getMonthStudyTimeFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    // 학습히스토리 받아오기
    getStudyHistory(state) {
      state.loading = true;
    },
    // 학습히스토리 받아오기 성공
    getStudyHistorySuccess(state, action: PayloadAction<StudyHistory>) {
      state.loading = false;
      state.studyHistory = action.payload;
    },

    getStudyHistoryFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    //프로필수정
    updateProfile(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    //프로필 수정 성공
    updateProfileSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    updateProfileFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    // 총학습시간 받아오기
    getTotalStudyTime(state) {
      state.loading = true;
    },
    // 총학습시간 받아오기 성공
    getTotalStudyTimeSuccess(state, action: PayloadAction<TotalStudyTime>) {
      state.loading = false;
      state.totalStudyTime = action.payload;
    },

    getTotalStudyTimeFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
  },
});

// Actions
export const dashboardActions = dashboardSlice.actions;

// Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
