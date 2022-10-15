import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { UserFirebase, UserSlack } from '@types';
import { User } from 'firebase/auth';
import { firebaseAPI } from 'pages/_app';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userApi } from 'services/firebase/apis';
import { loginSucceed } from 'slices/auth';
import { setLocalStorage } from 'utils';
import { authFirebaseFailed, authFirebaseName, authFirebaseRequest, authFirebaseSucceed } from '.';
import axiosFirebase from 'services/firebase/axiosFirebase';
/* #region 'async action' */
export const authFirebase = createAction<UserSlack>(`${authFirebaseName}/authentication`);
export const getUserSlackInfor = createAction<string>(`${authFirebaseName}/getUserSlackInfor`);
/* #endregion 'async action' */

/* #region 'firebase authentication' */
function* handleAuthFirebase(action: PayloadAction<UserSlack>): Generator<any, any, any> {
  console.log('Handle auth firebase...');
  yield put(authFirebaseRequest());
  const userSlack = action.payload;
  const { email, userId } = userSlack;
  if (!email || !userId) throw new Error('Missing user information');

  try {
    const user: User = yield call(firebaseAPI.createUserAccount, email, userId);
    console.log('createUserAccount - Firebase user: ', user);
    yield call(handleSaveAuth, user, userSlack);
  } catch (error: any) {
    yield put(authFirebaseFailed(error.message));
    switch (error.code) {
      case 'auth/email-already-in-use':
        yield call(handleEmailAlreadyInUse, email, userId, userSlack);
        break;
    }
  }
}
function* handleEmailAlreadyInUse(
  email: string,
  password: string,
  userSlack: UserSlack,
): Generator<any, any, any> {
  try {
    const user: User = yield call(firebaseAPI.signIn, email, password);
    yield call(handleSaveAuth, user, userSlack);
  } catch (error: any) {
    yield put(authFirebaseFailed(error.message));
  }
}

function* handleSaveAuth(user: User, userSlack: UserSlack) {
  const transformedUser = transformUserFirebase(user);
  console.log(user);
  yield put(authFirebaseSucceed(transformedUser));
  yield call(userApi.updateUserSlackInfor, transformedUser.uid as string, userSlack);
  // const url = `user.json`;
  // axiosFirebase.put(url, { [transformedUser.uid as string]: userSlack });

  const { accessToken, refreshToken } = user as any;
  setLocalStorage('fbtoken', { accessToken, refreshToken });
}

function transformUserFirebase(user: User): UserFirebase {
  const { displayName, email, phoneNumber, photoURL, uid, tenantId } = user;
  return { displayName, email, phoneNumber, photoURL, uid, tenantId };
}

/* #endregion 'firebase authentication' */

function* handleGetUserSlackInfor(action: PayloadAction<string>): any {
  const userSlack = yield call(userApi.getUserSlackInfor, action.payload);
  yield put(loginSucceed(userSlack));
}
export default function authFirebaseSaga() {
  return [
    takeLatest(authFirebase, handleAuthFirebase),
    takeLatest(getUserSlackInfor, handleGetUserSlackInfor),
    //
  ];
}
