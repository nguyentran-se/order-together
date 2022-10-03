import { AppState } from "store";

export const selectIsLoggedIn = (state: AppState) => state.auth.isLoggedIn;
export const selectAuthStatus = (state: AppState) => state.auth.status;
