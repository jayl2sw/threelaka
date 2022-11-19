import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TedScript, WordInfo, deleteAWord } from '../../models';

type ReadPageState = {
  loading: boolean;
  TedScriptList: TedScript[];
  isAddSuccess: null | true | false;
  isDeleteSuccess: null | true | false;
};

let initialState: ReadPageState = {
  loading: false,
  TedScriptList: [],
  isAddSuccess: null,
  isDeleteSuccess: null,
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
      state.isAddSuccess = null;
    },
    // 단어장에 단어 추가 성공getWordBookSuccess
    postAddWordToWordBookSuccess(state) {
      state.loading = false;
      state.isAddSuccess = true;
    },
    // 단어장에 단어 추가 실패
    postAddWordToWordBookFailed(state) {
      state.loading = false;
      state.isAddSuccess = false;
    },
    // 단어장에 alert 리셋
    resetIsAddSuccess(state) {
      state.isAddSuccess = null;
    },

    // 단어장에 단어 추가
    deleteWordToWordBookStart(state, action: PayloadAction<deleteAWord>) {
      state.loading = true;
      state.isDeleteSuccess = null;
    },
    // 단어장에 단어 추가 성공getWordBookSuccess
    deleteWordToWordBookSuccess(state) {
      state.loading = false;
      state.isDeleteSuccess = true;
    },
    // 단어장에 단어 추가 실패
    deleteWordToWordBookFailed(state) {
      state.loading = false;
      state.isDeleteSuccess = false;
    },
    // 단어장에 alert 리셋
    resetIsDeleteSuccess(state) {
      state.isDeleteSuccess = null;
    },
  },
});

// Actions
export const readActions = readSlice.actions;

// Reducers
const readReducer = readSlice.reducer;
export default readReducer;
