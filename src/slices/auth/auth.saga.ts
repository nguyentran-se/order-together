import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { Callback, UserSlack } from '@types';
import camelcaseKeys from 'camelcase-keys';
import jwtDecode from 'jwt-decode';
import { slackCore } from '../../pages/_app';

import { call, put, takeLatest } from 'redux-saga/effects';
import { authFirebase } from 'slices/authFirebase/authFirebase.saga';
import { setLocalStorage } from 'utils';
import { loginFailed, loginRequest, loginSucceed } from '.';

// actions
export const login = createAction<Record<string, string>>('auth/login');
export const loginWithSlack = createAction<{ code: string; succeedCallback: Callback }>(
  'auth/loginWithSlack',
);

// handle Actions
function* handleLoginWithSlack(
  action: PayloadAction<{ code: string; succeedCallback: Callback }>,
): any {
  const code = action.payload.code;
  const succeedCallback = action.payload.succeedCallback;
  yield put(loginRequest());
  try {
    const res = yield call(slackCore.createExchangeTokenPostRequest, code);
    if (res) {
      const data = camelcaseKeys(res.data);
      setLocalStorage('stoken', data.idToken);
      const decodedData: any = jwtDecode(data.idToken);
      const transformedData = camelcaseKeys(transformUserSlackData(decodedData));
      yield put(loginSucceed(transformedData));
      yield call(succeedCallback);
      yield put(authFirebase(transformedData));
    }
  } catch (error: any) {
    yield put(loginFailed(error.message));
  }
}

function transformUserSlackData(data: any): UserSlack {
  const {
    'https://slack.com/team_id': teamId,
    'https://slack.com/user_id': userId,
    'https://slack.com/team_name': teamName,
    'https://slack.com/team_domain': teamDomain,
    'https://slack.com/team_image_230': teamImage,
    'https://slack.com/team_image_default': teamImageDefault,
    ...rest
  } = data;
  return { ...rest, userId, teamId, teamDomain, teamImage, teamImageDefault };
}

export default function authSaga() {
  return [
    takeLatest(loginWithSlack, handleLoginWithSlack),
    //
  ];
}
