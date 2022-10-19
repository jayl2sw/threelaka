import { all } from "redux-saga/effects";
// 사가 관리
import { counterSagas } from "./counter/counterSagas";

// rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all(
    [...counterSagas]
  );
}
