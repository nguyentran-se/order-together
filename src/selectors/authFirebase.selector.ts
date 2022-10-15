import { AppState } from 'store';

export const selectAuthFirebaseIsLoggedIn = (state: AppState) => state.authFirebase.isLoggedIn;
export const selectAuthFirebaseUid = (state: AppState) => state.authFirebase.userProfile.uid;
