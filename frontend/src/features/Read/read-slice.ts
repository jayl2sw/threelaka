import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TedScript, WordInfo } from '../../models';

type ReadPageState = {
  loading: boolean;
  TedScriptList: TedScript[];
  isAddSuccess: string;
};

let initialState: ReadPageState = {
  loading: false,
  TedScriptList: [],
  isAddSuccess: '',
};

const readSlice = createSlice({
  name: 'read',
  initialState,
  reducers: {
    // 자막 가져오기 start
    getScripts(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    // 자막 가져오기 성공
    getScriptsSuccess(state, action: PayloadAction<TedScript[]>) {
      state.loading = false;
      state.TedScriptList = action.payload;
    },
    // 자막 가져오기 실패
    getScriptsFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    // 단어장에 단어 추가
    postAddWordToWordBookStart(state, action: PayloadAction<WordInfo>) {
      state.loading = true;
      state.isAddSuccess = '';
    },
    // 단어장에 단어 추가 성공
    postAddWordToWordBookSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAddSuccess = action.payload;
    },
    // 단어장에 단어 추가 실패
    postAddWordToWordBookFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAddSuccess = action.payload;
    },
  },
});

// Actions
export const readActions = readSlice.actions;

// Reducers
const readReducer = readSlice.reducer;
export default readReducer;
