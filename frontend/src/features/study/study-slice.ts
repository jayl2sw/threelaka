import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudyStage } from '../../models';

type StudyState = {
  loading: boolean;
  studyState: StudyStage;
};

let initialState: StudyState = {
  loading: false,
  studyState: {
    learningRecordId: 0,
    stage: '',
    userId: 0,
  },
};

const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    // 새로운 공부를 시작할 때
    postStartStudy(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    // 새로운 공부 시작 :: 요청 성공
    postStartStudySuccess(state, action: PayloadAction<StudyStage>) {
      console.log(action.payload);
      state.loading = false;
      state.studyState = action.payload;
    },
    // 새로운 공부 시작 :: 요청 실패
    postStartStudyFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action);
    },
  },
});

// Actions
export const studyActions = studySlice.actions;

// Reducers
const studyReducer = studySlice.reducer;
export default studyReducer;
