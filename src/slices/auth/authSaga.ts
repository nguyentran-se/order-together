import { createAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { loginFailed, loginRequest, loginSucceed } from ".";

export const login = createAction<Record<string, string>>("auth/login");

function* fakeLogin(): any {
  yield put(loginRequest());
  yield delay(2000);
  console.log(" fake login");
  yield put(loginSucceed());
}

function* handleLogin(action: any) {
  console.log(action);
  try {
    yield fakeLogin();
  } catch (error) {
    yield put(loginFailed());
  }
}

export default function authSaga() {
  return [
    takeEvery(login, handleLogin),
    //
  ];
}
