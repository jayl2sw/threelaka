import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoData, RecentVideoData } from '../../models/video';
import { RecentVideos } from '../../models/dashboard';

type DashboardState = {
  loading: boolean;
  // 비디오 1개
  videoData: VideoData;
  // 최근 공부한 영상 1개
  recentVideoData: RecentVideoData;
  // 현재 공부중인 영상 비디오 4개
  recentVideoList: RecentVideos[];
};

let initialState: DashboardState = {
  loading: false,
  videoData: {
    watched: null,
    video: {
      videoId: '',
      title: '',
      description: '',
      script: '',
    },
  },
  recentVideoData: {
    learningRecord: {
      date: 'string',
      learningRecordId: 0,
      stage: '',
      userId: 0,
      videoId: '',
    },
    video: {
      title: '',
      videoId: '',
      description: '',
      korScript: false,
    },
  },
  recentVideoList: [],
};

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // 비디오 1개 정보 받아오기 요청
    getVideoData(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    // 비디오 1개 정보 받아오기 성공
    getVideoDataSuccess(state, action: PayloadAction<VideoData>) {
      state.loading = false;
      state.videoData = action.payload;
    },
    // 비디오 1개 정보 받아오기 실패
    getVideoDataFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    // 최근 공부한 영상 1개 정보 받아오기 요칭
    getRecentVideoData(state) {
      state.loading = true;
    },
    // 최근 공부한 영상 1개 정보 받아오기 성공
    getRecentVideoDataSuccess(state, action: PayloadAction<RecentVideoData>) {
      // console.log('정보 받아오기 성공! video-slice에서 주석처리해주세요');
      // console.log(action.payload);
      state.loading = false;
      state.recentVideoData = action.payload;
    },
    // 최근 공부한 영상 1개 정보 받아오기 실패
    getRecentVideoDataFailed(state, action: PayloadAction<any>) {
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
  },
});

// Actions
export const dashboardActions = dashboardSlice.actions;

// Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
