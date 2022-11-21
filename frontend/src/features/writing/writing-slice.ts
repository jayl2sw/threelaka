import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CheckedWord,
  WordCheckPayload,
  SpellCheckRes,
  SaveEssayPayload,
} from '../../models';

type WritingState = {
  loading: boolean;
  checkedWordList: CheckedWord[];
  spellCheckLst: SpellCheckRes;
  essay: string;
};

let initialState: WritingState = {
  loading: false,
  checkedWordList: [],
  spellCheckLst: {
    _type: '',
    flaggedTokens: [],
  },
  essay: '',
};

const writingSlice = createSlice({
  name: 'writing',
  initialState,
  reducers: {
    // 에세이에 해당 단어 사용했는지 체크
    postCheckWordStart(state, action: PayloadAction<WordCheckPayload>) {
      state.loading = true;
    },
    // 에세이에 해당 단어 사용했는지 체크 :: 성공
    postCheckWordSuccess(state, action: PayloadAction<CheckedWord[]>) {
      state.loading = false;
      state.checkedWordList = action.payload;
    },
    // 에세이에 해당 단어 사용했는지 체크 :: 실패
    postCheckWordFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    // 스펠링 체크 시작
    spellCheckStart(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    // 스펠링 체크 시작 :: 성공
    spellCheckStartSuccess(state, action: PayloadAction<SpellCheckRes>) {
      state.loading = false;
      state.spellCheckLst = action.payload;
    },
    // 스펠링 체크 시작 :: 실패
    spellCheckStartFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    // 에세이 저장 :: 시작
    postSaveEssayStart(state, action: PayloadAction<SaveEssayPayload>) {
      state.loading = true;
    },
    // 에세이 저장 :: 성공
    postSaveEssaySuccess(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    // 에세이 저장 :: 실패
    postSaveEssayFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    // 에세이 불러오기 :: 시작
    getEssayStart(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    // 에세이 불러오기 :: 성공
    getEssaySuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.essay = action.payload;
    },
    // 에세이 불러오기 :: 실패
    getEssayFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
  },
});

// Actions
export const writingActions = writingSlice.actions;

// Reducers
const writingReducer = writingSlice.reducer;
export default writingReducer;
