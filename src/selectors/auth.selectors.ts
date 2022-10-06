import { AppState } from "store";

export const selectIsLoggedIn = (state: AppState) => state.auth.isLoggedIn;
export const selectAuthStatus = (state: AppState) => state.auth.status;
export const selectAuthIsLoggedIn = (state: AppState) => state.auth.isLoggedIn;
export const selectAuthAvatarUrl = (state: AppState) => state.auth.userProfile.picture;
