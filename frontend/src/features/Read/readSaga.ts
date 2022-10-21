import { getTedScriptApi } from '../../services/readApi';
import { TedScript } from '../../models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { readActions } from './read-slice';

function* onGetScriptsAsync({payload: string}) {
  try {
    const response: TedScript[] = yield call(getTedScriptApi(payload));
    yield put(readActions.getScriptsSuccess(response));
  } catch (error) {
    console.log(`Failed to fetch city list`, error);
    yield put(readActions.getScriptsFailed(error.message));
  }
}

export default function* citySaga() {
  yield takeLatest(readActions.getScripts.type, onGetScriptsAsync);
}