import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoData, RecentVideoData } from '../../models/video';
import {
  RecentVideos,
  CompletedVideos,
  MonthStudyTime,
  StudyHistory,
  TotalStudyTime,
  UserWordInfo,
  isMemorizedWord,
} from '../../models/dashboard';

type DashboardState = {
  loading: boolean;

  // 현재공부중인영상
  recentVideoList: RecentVideos[];
  // 공부완료영상
  completedVideoList: CompletedVideos[];
  thisWeekdailyStudyTime: Array<Object>;
  lastWeekdailyStudyTime: Array<Object>;
  monthStudyTime: Array<Object>;
  tagList: Array<string>;
  seqDays: number;

  // 학습히스토리
  studyHistory: StudyHistory;

  //총학습시간
  totalStudyTime: TotalStudyTime;

  //
  userWordInfo: UserWordInfo[];

  //
  pickRandomWord: UserWordInfo;
  // 태그 수정 성공 토스트
  isNewTag: boolean;
};

let initialState: DashboardState = {
  loading: false,

  recentVideoList: [],
  completedVideoList: [],
  thisWeekdailyStudyTime: [],
  lastWeekdailyStudyTime: [],
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
  tagList: [],
  userWordInfo: [],
  pickRandomWord: {
    wordbookId: 0,
    word: '',
    example: '',
    exampleKor: '',
  },
  isNewTag: false,
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
      state.lastWeekdailyStudyTime = action.payload.slice(1, 8);
      state.thisWeekdailyStudyTime = action.payload.slice(8, 16);
      console.log('얍얍', action.payload.slice(8, 16));
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
    //태그 등록 및 수정
    updateTag(state, action: PayloadAction<number[]>) {
      state.loading = true;
    },

    updateTagSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isNewTag = true;
    },

    updateTagFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    // 사용자 tag 받아오기
    getTagList(state) {
      state.loading = true;
    },

    getTagListSuccess(state, action: PayloadAction<string[]>) {
      state.loading = false;
      state.tagList = action.payload;
    },

    getTagListFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    //유저단어정보받아오기
    getUserWordInfo(state) {
      state.loading = true;
    },

    getUserWordInfoSuccess(state, action: PayloadAction<UserWordInfo[]>) {
      state.loading = false;
      state.userWordInfo = action.payload;
      // action.payload.map((item, idx) => {
      //   if (item.exampleKor !== null) {
      //     state.userWordInfo.push(item);
      //   }
      // });
      const randomElement =
        action.payload[Math.floor(Math.random() * action.payload.length)];
      state.pickRandomWord = randomElement;
    },

    getUserWordInfoFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    //단어외움처리

    putIsMemorizedWord(state, action: PayloadAction<isMemorizedWord>) {
      state.loading = true;
    },

    putIsMemorizedWordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    putIsMemorizedWordFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    resetIsNewTag(state) {
      state.isNewTag = false;
    },
  },
});

// Actions
export const dashboardActions = dashboardSlice.actions;

// Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
