import { all } from 'redux-saga/effects';
// 사가 관리
import { counterSagas } from './counter/counterSagas';
import { readSagas } from './Read/readSaga';
import { authSagas } from './auth/authSagas';
import { videoSagas } from './video/videoSaga';
import { studySagas } from './study/studySaga';

// rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    ...counterSagas,
    ...readSagas,
    ...authSagas,
    ...videoSagas,
    ...studySagas,
  ]);
}
