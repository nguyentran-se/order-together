import { all } from "redux-saga/effects";
import authSaga from "slices/auth/authSaga";

export default function* rootSaga() {
  console.log("rootSaga");

  yield all([
    ...authSaga(),
    //
  ]);
}
