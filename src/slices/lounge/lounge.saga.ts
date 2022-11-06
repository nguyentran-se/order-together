import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { ScrapedLounge } from '@types';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectAuthFirebaseUid } from 'selectors';
import { loungeApi, userLoungeApi } from 'services/firebase/apis';
import { getLoungeFailed, getLoungeSucceed, loungeSliceName } from '.';

export const createLounge = createAction<string>(`${loungeSliceName}/createLounge`);
export const getLounges = createAction(`${loungeSliceName}/getLounges`);

function* handleCreateLounge(action: PayloadAction<string>): any {
  const URL = action.payload;
  const response = yield call(loungeApi.getScrapedLounge, URL);
  const data: ScrapedLounge = response.data;
  const loungeId = data.activeMerchantID;
  const uid = yield select(selectAuthFirebaseUid);
  const submittedData = { ...data, uid };

  if (loungeId) {
    const res = yield call(loungeApi.createLounge, submittedData);
    const lid = res.name;
    yield call(userLoungeApi.createUserLounge, uid, lid);
    yield put(getLounges());
  } else {
    //TODO: catch this case when scraping failed
  }
}

function* handleGetLounges(): any {
  try {
    const data = yield call(userLoungeApi.getUserLounge);
    // const transformedData = transformObjectToArrayResponse<LoungeData>(data, 'lid');
    yield put(getLoungeSucceed(data));
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
