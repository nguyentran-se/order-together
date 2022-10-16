import { all } from 'redux-saga/effects';
import authSaga from 'slices/auth/auth.saga';
import authFirebaseSaga from 'slices/authFirebase/authFirebase.saga';
import loungeSaga from 'slices/lounge/lounge.saga';

export default function* rootSaga() {
  console.log('rootSaga');

  yield all([
    //
    ...authSaga(),
    ...authFirebaseSaga(),
    ...loungeSaga(),
  ]);
}
