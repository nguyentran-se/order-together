import { createAction, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthRequest, createExchangeTokenPostRequest } from "config";
import { SagaIterator } from "redux-saga";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { loginFailed, loginRequest, loginSucceed, obtainToken, } from ".";
import jwt_decode from 'jwt-decode';

// actions
export const login = createAction<Record<string, string>>("auth/login");
export const loginWithSlack = createAction<any>("auth/loginWithSlack");

// handle Actions
function* fakeLogin(): any {
  yield put(loginRequest());
  yield delay(2000);
  console.log(" fake login");
  yield put(loginSucceed());
}

function* handleLoginWithSlack(action: PayloadAction<string>) : any {
  const code = action.payload;
  yield put(loginRequest());
  const res = yield call(createExchangeTokenPostRequest, code);
  if (res) {
    const decodedData = jwt_decode(res.data.id_token);
    yield put(obtainToken(decodedData));
    
  }
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
    takeEvery(loginWithSlack, handleLoginWithSlack),
    //
  ];
}
