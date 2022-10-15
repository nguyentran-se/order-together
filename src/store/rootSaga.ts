import { all } from 'redux-saga/effects';
import authSaga from 'slices/auth/authSaga';
import authFirebaseSaga from 'slices/authFirebase/authFirebaseSaga';

export default function* rootSaga() {
  console.log('rootSaga');

  yield all([
    ...authSaga(),
    //
    ...authFirebaseSaga(),
  ]);
}
