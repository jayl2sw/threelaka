import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoData, RecommendVideos } from '../../models';

type VideoState = {
  loading: boolean;
  // 비디오 1개
  videoData: VideoData;
  // 추천 비디오 4개
  recommendVideoList: RecommendVideos[];
};

let initialState: VideoState = {
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
  recommendVideoList: [],
};

// Slice
const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    // 비디오 1개 정보 받아오기 요청
    getVideoData(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    // 비디오 1개 정보 받아오기 성공
    getVideoDataSuccess(state, action: PayloadAction<VideoData>) {
      console.log(action.payload);
      state.loading = false;
      state.videoData = action.payload;
    },
    // 비디오 1개 정보 받아오기 실패
    getVideoDataFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action);
    },

    // 추천 비디오 4개 정보 받아오기 요청
    getRecommendVideos(state) {
      state.loading = true;
    },
    // 추천 비디오 4개 정보 받아오기 성공
    getRecommendVideosSuccess(state, action: PayloadAction<RecommendVideos[]>) {
      // console.log(action.payload);
      state.loading = false;
      state.recommendVideoList = action.payload;
    },
    // 추천 비디오 4개 정보 받아오기 실패
    getRecommendVideosFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action);
    },
  },
});

// Actions
export const videoActions = videoSlice.actions;

// Reducers
const videoReducer = videoSlice.reducer;
export default videoReducer;
