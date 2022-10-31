import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { string } from 'yup';
import { StudyStage, WordMeaning, StageInfo } from '../../models';

type StudyState = {
  loading: boolean;
  studyState: StudyStage;
  wordMeaning: WordMeaning;  
};



let initialState: StudyState = {
  loading: false,
  studyState: {
    learningRecordId: 0,
    stage: '',
    userId: 0,
  },
  wordMeaning: {
    wordId: '',
    wordDefinition: '',
    wordExample: '',
    lexicalCategory: '',
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

    // 공부 중 종료(나가기, 뒤로가기 등)
    putStopStudyStart(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    // 공부 중 종료 시작(나가기, 뒤로가기 등)
    putStopStudyStartSuccess(state) {
      state.loading = false;
    },
    // 공부 중 종료 실패(나가기, 뒤로가기 등)
    putStopStudyStartFailed(state) {
      state.loading = false;
      // console.log(action);
    },

    // 사전 검색 시작
    SearchDictStart(state, action: PayloadAction<string>) {
      state.loading = true;
      
    },
    // 사전 검색 성공
    SearchDictSuccess(state, action: PayloadAction<WordMeaning>) {
      state.loading = false;
      state.wordMeaning = action.payload;
    },
    // 사전 검색 실패
    SearchDictFailed(state) {
      state.loading = false;
      // console.log(action);
    },

    // 학습상황 업데이트 시작
    UpdateStudyStageStart(state, action: PayloadAction<StageInfo>) {
      state.loading = true;
      
    },
    // 학습상황 업데이트 시작 성공
    UpdateStudyStageStartSuccess(state, action: PayloadAction<StudyStage>) {
      state.loading = false;
      state.studyState = action.payload;      
    },
    // 학습상황 업데이트 시작 실패
    UpdateStudyStageStartFailed(state) {
      state.loading = false;
      // console.log(action);
    },
  },
});

// Actions
export const studyActions = studySlice.actions;

// Reducers
const studyReducer = studySlice.reducer;
export default studyReducer;
