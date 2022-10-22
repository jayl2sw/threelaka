import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TedScript } from '../../models';

type ReadPageState = {
  loading: boolean;
  TedScriptList: TedScript[];
}

let initialState: ReadPageState = {
  loading: false,
  TedScriptList: [],
}

const readSlice = createSlice({
  name: 'read',
  initialState,
  reducers: {
    getScripts(state, action:PayloadAction<string>) {
      state.loading = true;
    },
    getScriptsSuccess(state, action:PayloadAction<TedScript[]>) {
      state.loading = false;
      state.TedScriptList = action.payload;
    },
    getScriptsFailed(state, action:PayloadAction<string>) {
      state.loading = false;
      console.log(action)
    }
  }
})

// Actions
export const readActions = readSlice.actions;

// Reducers
const readReducer = readSlice.reducer;
export default readReducer;