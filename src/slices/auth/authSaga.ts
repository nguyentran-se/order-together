import { createAction, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { call, put, takeLatest } from "redux-saga/effects";
import { createExchangeTokenPostRequest } from "services/slack";
import { loginFailed, loginRequest, loginSucceed } from ".";

// actions
export const login = createAction<Record<string, string>>("auth/login");
export const loginWithSlack = createAction<string>("auth/loginWithSlack");

// handle Actions
function* handleLoginWithSlack(action: PayloadAction<string>): any {
  const code = action.payload;
  yield put(loginRequest());
  try {
    const res = yield call(createExchangeTokenPostRequest, code);
    console.log(res);
    if (res) {
      const decodedData = jwt_decode(res.data.id_token);
      yield put(loginSucceed(decodedData));
    }
  } catch (error) {
    yield put(loginFailed(error));
  }
}

export default function authSaga() {
  return [
    takeLatest(loginWithSlack, handleLoginWithSlack),
    //
  ];
}
