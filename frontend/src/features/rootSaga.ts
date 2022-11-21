import { all } from 'redux-saga/effects';
// 사가 관리
import { counterSagas } from './counter/counterSagas';
import { readSagas } from './Read/readSaga';
import { authSagas } from './auth/authSagas';
import { videoSagas } from './video/videoSaga';
import { studySagas } from './study/studySaga';
import { writeSagas } from './writing/writingSaga';
// import { dashboardSagas } from './dashboard/dashboardSaga';
import { dashboardSagas } from './dashboard/dashboardSaga';
import { guildSagas } from './guild/guildSaga';

// rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    ...counterSagas,
    ...readSagas,
    ...authSagas,
    ...videoSagas,
    ...studySagas,
    ...writeSagas,
    ...dashboardSagas,
    ...guildSagas,
  ]);
}
