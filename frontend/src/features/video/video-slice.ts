import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoData } from '../../models';

type VideoState = {
  loading: boolean;
  videoData: VideoData;
};

let initialState: VideoState = {
  loading: false,
  videoData: {
    videoId: '',
    title: '',
    description: '',
    script: '',
  },
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    getVideoData(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    getVideoDataSuccess(state, action: PayloadAction<VideoData>) {
      console.log(action.payload);
      state.loading = false;
      state.videoData = action.payload;
    },
    getVideoDataFailed(state, action: PayloadAction<string>) {
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
