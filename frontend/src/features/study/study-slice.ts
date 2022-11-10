import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { string } from 'yup';
import {
  StudyStage,
  WordMeaning,
  StageInfo,
  WordBook,
  SpeechScores,
  SatisfactionSurvey,
} from '../../models';

type StudyState = {
  loading: boolean;
  studyState: StudyStage;
  wordMeaning: WordMeaning;
  wordBookList: WordBook[];
  speechScores: SpeechScores[];
  totalScore: number;
  speechTestError: String;
  resetToggle: boolean;
  searchDictError: string;
};

let initialState: StudyState = {
  speechTestError: '',
  speechScores: [],
  totalScore: 0,
  loading: false,
  searchDictError: '',
  studyState: {
    learningRecordId: 0,
    stage: '',
    userId: 0,
    videoId: '',
  },
  wordMeaning: {
    wordId: '',
    wordList: [],
  },
  wordBookList: [],
  resetToggle: false,
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
      state.loading = false;
      state.studyState = action.payload;
      state.resetToggle = false;
    },
    // 새로운 공부 시작 :: 요청 실패
    postStartStudyFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    // 학습 state RESET
    resetStudystate(state) {
      state.studyState = {
        learningRecordId: 0,
        stage: '',
        userId: 0,
        videoId: '',
      };
      state.resetToggle = true;
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
      state.searchDictError = '';
    },
    // 사전 검색 성공
    SearchDictSuccess(state, action: PayloadAction<WordMeaning>) {
      state.loading = false;
      state.wordMeaning = action.payload;
    },
    // 사전 검색 실패
    SearchDictFailed(state) {
      state.loading = false;
      state.searchDictError = '찾으시는 단어에 대한 정보가 없습니다.';
      // console.log(action);
    },

    // 학습상황 업데이트 시작
    UpdateStudyStageStart(state, action: PayloadAction<StageInfo>) {
      state.loading = true;
    },
    // 학습상황 업데이트 시작 성공
    UpdateStudyStageStartSuccess(state, action: PayloadAction<StudyStage>) {
      state.loading = false;
      if (action.payload.stage !== 'COMPLETE') {
        state.studyState = action.payload;
      }
    },
    // 학습상황 업데이트 시작 실패
    UpdateStudyStageStartFailed(state) {
      state.loading = false;
      // console.log(action);
    },
    // 단어장 불러오기 시작
    getWordBookStart(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    // 단어장 불러오기 성공
    getWordBookSuccess(state, action: PayloadAction<WordBook[]>) {
      state.loading = false;
      state.wordBookList = action.payload;
    },
    // 단어장 불러오기 실패
    getWordBookFailed(state) {
      state.loading = false;
      // console.log(action);
    },
    //발음 테스트
    speechTest(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    speechTestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;

      state.speechScores = action.payload.scores;
      state.totalScore = action.payload.total_score;
      state.speechTestError = action.payload.short_message;
    },
    speechTestFail(state) {
      state.loading = false;
    },
    //발음점수리셋
    resetSpeechScore(state) {
      state.speechScores = [];
      state.totalScore = 0;
      state.speechTestError = '';
    },
    // 공부 후 만족도 조사 시작
    postStudySatisfactionStart(
      state,
      action: PayloadAction<SatisfactionSurvey>
    ) {
      state.loading = true;
    },
    // 공부 후 만족도 조사 성공
    postStudySatisfactionSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    // 공부 후 만족도 조사 실패
    postStudySatisfactionFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const studyActions = studySlice.actions;

// Reducers
const studyReducer = studySlice.reducer;
export default studyReducer;
