import { AppState } from 'store';
/** SLACK **/
export const selectAuthStatus = (state: AppState) => state.auth.status;
export const selectAuthIsLoggedIn = (state: AppState) => state.auth.isLoggedIn;
export const selectAuthUserProfile = (state: AppState) => state.auth.userProfile;

/** FIREBASE **/
export const selectAuthFirebaseIsLoggedIn = (state: AppState) => state.authFirebase.isLoggedIn;
export const selectAuthFirebaseUid = (state: AppState) => state.authFirebase.userProfile.uid;
export const selectAuthFirebaseUserProfile = (state: AppState) => state.authFirebase.userProfile;

/** LOUNGE **/
export const selectLounge = (state: AppState) => state.lounge.data;

/** ORDERS **/
export const selectOrders = (state: AppState) => state.orders.data;
