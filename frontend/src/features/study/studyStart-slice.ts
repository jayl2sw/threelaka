import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudyStart } from '../../models';

type StartState = {
  loading: boolean;
  studyStart: StudyStart;
};

let initialState: StartState = {
  loading: false,
  studyStart: {
    videoId: '',
  },
};

const startSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    postStudyStart(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    postStudyStartSuccess(state, action: PayloadAction<StudyStart>) {
      console.log(action.payload);
      state.loading = false;
      state.studyStart = action.payload;
    },
    postStudyStartFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action);
    },
  },
});

// Actions
export const startActions = startSlice.actions;

// Reducers
const startReducer = startSlice.reducer;
export default startReducer;
