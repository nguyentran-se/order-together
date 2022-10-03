import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@types";

interface AuthState {
  isLoggedIn: boolean;
  status: Status;
}
const initialState: AuthState = {
  isLoggedIn: false,
  status: Status.IDLE,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginRequest: (state) => {
      state.status = Status.PENDING;
    },
    loginSucceed: (state) => {
      state.isLoggedIn = true;
      state.status = Status.RESOLVED;
    },
    loginFailed: (state) => {
      state.status = Status.REJECTED;
      state.isLoggedIn = false;
    },
  },
});

export const { loginRequest, loginSucceed, loginFailed } = authSlice.actions;
export default authSlice.reducer;
