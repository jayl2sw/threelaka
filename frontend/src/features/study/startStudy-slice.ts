import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StartStudy } from '../../models';

type StartState = {
  loading: boolean;
  startStudy: StartStudy;
};

let initialState: StartState = {
  loading: false,
  startStudy: {
    videoId: '',
  },
};

const startStudySlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    postStartStudy(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    postStartStudySuccess(state, action: PayloadAction<StartStudy>) {
      console.log(action.payload);
      state.loading = false;
      state.startStudy = action.payload;
    },
    postStartStudyFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action);
    },
  },
});

// Actions
export const startStudyActions = startStudySlice.actions;

// Reducers
const startStudyReducer = startStudySlice.reducer;
export default startStudyReducer;
