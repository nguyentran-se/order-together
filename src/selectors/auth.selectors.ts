import { AppState } from 'store';

export const selectAuthStatus = (state: AppState) => state.auth.status;
export const selectAuthIsLoggedIn = (state: AppState) => state.auth.isLoggedIn;
export const selectAuthUserProfile = (state: AppState) => state.auth.userProfile;
