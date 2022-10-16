import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status, UserFirebase } from '@types';
import { User } from 'firebase/auth';
import { getLocalStorage } from 'utils';
import jwtDecode from 'jwt-decode';
interface AuthFirebase {
  isLoggedIn: boolean;
  status: Status;
  userProfile: UserFirebase;
  error: any;
}
const initialState: AuthFirebase = {
  isLoggedIn: !!getLocalStorage('fbtoken'),
  status: Status.IDLE,
  userProfile: {
    uid:
      (getLocalStorage('fbtoken')?.accessToken &&
        (jwtDecode(getLocalStorage('fbtoken')?.accessToken) as any)?.user_id) ||
      null,
  },
  error: null,
};
const authFirebaseSlice = createSlice({
  name: 'authFirebase',
  initialState: initialState,
  reducers: {
    authFirebaseRequest: (state) => {
      state.status = Status.PENDING;
    },
    authFirebaseSucceed: (state, action: PayloadAction<UserFirebase>) => {
      state.status = Status.RESOLVED;
      state.isLoggedIn = true;
      state.userProfile = action.payload;
      state.error = null;
    },
    authFirebaseFailed: (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
  },
});

export const { authFirebaseRequest, authFirebaseSucceed, authFirebaseFailed } =
  authFirebaseSlice.actions;
export const authFirebaseName = authFirebaseSlice.name;
export default authFirebaseSlice.reducer;
