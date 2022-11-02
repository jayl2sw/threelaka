import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckedWord, WordCheckPayload, SpellCheckRes } from '../../models';

type WritingState = {
  loading: boolean;
  checkedWordList: CheckedWord[];
  spellCheckLst: SpellCheckRes;
};

let initialState: WritingState = {
  loading: false,
  checkedWordList: [],
  spellCheckLst: {
    _type: '',
    flaggedtokens: [],
  },
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
      console.log(action.payload);
      state.loading = false;
      state.checkedWordList = action.payload;
    },
    // 에세이에 해당 단어 사용했는지 체크 :: 실패
    postCheckWordFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action);
    },

    // 스펠링 체크 시작
    spellCheckStart(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    // 스펠링 체크 시작 :: 성공
    spellCheckStartSuccess(state, action: PayloadAction<SpellCheckRes>) {
      console.log(action.payload);
      state.loading = false;
      state.spellCheckLst = action.payload;
    },
    // 스펠링 체크 시작 :: 실패
    spellCheckStartFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action);
    },
  },
});

// Actions
export const writingActions = writingSlice.actions;

// Reducers
const writingReducer = writingSlice.reducer;
export default writingReducer;
