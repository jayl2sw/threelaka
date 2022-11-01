import { combineReducers } from '@reduxjs/toolkit';
import countReducer from './counter/counter-slice';
import readReducer from './Read/read-slice';
import authReducer from './auth/authSlice';
import videoReducer from './video/video-slice';
import studyReducer from './study/study-slice';
import writingReducer from './writing/writing-slice';

const rootReducer = combineReducers({
  counter: countReducer,
  read: readReducer,
  auth: authReducer,
  video: videoReducer,
  study: studyReducer,
  wrtie: writingReducer,
});

export default rootReducer;
