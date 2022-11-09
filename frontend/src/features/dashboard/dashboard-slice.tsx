import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoData, RecentVideoData } from '../../models/video';
import { RecentVideos, CompletedVideos } from '../../models/dashboard';

type DashboardState = {
  loading: boolean;

  // 현재공부중인영상
  recentVideoList: RecentVideos[];
  // 공부완료영상
  completedVideoList: CompletedVideos[];
};

let initialState: DashboardState = {
  loading: false,

  recentVideoList: [],
  completedVideoList: [],
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
  },
});

// Actions
export const dashboardActions = dashboardSlice.actions;

// Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
