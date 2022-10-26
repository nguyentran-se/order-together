import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status, UserSlack } from '@types';
import jwtDecode from 'jwt-decode';
import { getLocalStorage } from 'utils';

const getLSUserProfile = () => {
  const stoken = getLocalStorage('stoken');
  let decodedData = {};
  if (stoken) {
    decodedData = jwtDecode(stoken);
  }
  return decodedData;
};
interface AuthState {
  isLoggedIn: boolean;
  status: Status;
  userProfile: UserSlack;
  error: any;
}
const initialState: AuthState = {
  isLoggedIn: false,
  status: Status.IDLE,
  userProfile: getLSUserProfile(),
  error: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginRequest: (state) => {
      state.status = Status.PENDING;
    },
    loginSucceed: (state, action: PayloadAction<UserSlack>) => {
      state.status = Status.RESOLVED;
      state.isLoggedIn = true;
      state.userProfile = action.payload;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSucceed, loginFailed } = authSlice.actions;
export default authSlice.reducer;
