import { createAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectAuthFirebaseUid } from 'selectors';
import { loungeOrderApi } from 'services/firebase/apis/loungeOrder';
import {
  dashboardSliceName,
  getHostLoungeFailed,
  getHostLoungeRequest,
  getHostLoungeSucceed,
} from '.';

export const getHostLounge = createAction(`${dashboardSliceName}/getHostLounge`);

function* handleGetHostLounge(): any {
  const uid = yield select(selectAuthFirebaseUid);
  yield put(getHostLoungeRequest());
  try {
    const hostOrders = yield call(loungeOrderApi.getLoungeOrder, uid);
    yield put(getHostLoungeSucceed(hostOrders));
  } catch (error) {
    yield put(getHostLoungeFailed(error));
  }
}

export default function dashboardSaga() {
  return [takeLatest(getHostLounge, handleGetHostLounge)];
}
