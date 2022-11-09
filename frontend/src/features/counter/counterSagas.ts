import {
  all,
  call,
  delay,
  put,
  takeEvery,
  fork,
  takeLatest,
} from 'redux-saga/effects';
import { countActions } from './counter-slice';

export function* incrementAsync() {
  yield delay(1000);
  yield put(countActions.addCount(1));
}

export function* watchIncrementAsync() {
  yield takeLatest(countActions.fetchAdd.type, incrementAsync);
  // countActions.ferchAdd.type = 'fetchAdd'
}

export const counterSagas = [fork(watchIncrementAsync)];
