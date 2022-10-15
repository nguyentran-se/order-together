import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { ScrapedLounge } from '@types';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { selectAuthFirebaseUid } from 'selectors';
import { loungeApi } from 'services/firebase/apis';
import { transformObjectToArrayResponse } from 'utils';
import { getLoungeFailed, getLoungeSucceed, loungeSliceName } from '.';

export const createLounge = createAction<string>(`${loungeSliceName}/createLounge`);
export const getLounges = createAction(`${loungeSliceName}/getLounges`);

function* handleCreateLounge(action: PayloadAction<string>): any {
  const URL = action.payload;
  const response = yield call(loungeApi.getScrapedLounge, URL);
  const data: ScrapedLounge = response.data.data;
  const loungeId = data.activeMerchantID;
  const uid = yield select(selectAuthFirebaseUid);
  yield all([
    call(loungeApi.updateUserLounge, uid, { [loungeId]: true }),
    call(loungeApi.createLounge, data),
  ]);
}

function* handleGetLounges(): any {
  try {
    const data = yield call(loungeApi.getLounges);
    const transformedData = transformObjectToArrayResponse<ScrapedLounge>(data, 'lid');
    yield put(getLoungeSucceed(transformedData));
  } catch (error: any) {
    yield put(getLoungeFailed(error.message));
  }
}

export default function loungeSaga() {
  return [
    takeLatest(createLounge, handleCreateLounge),
    takeLatest(getLounges, handleGetLounges),
    //
  ];
}
