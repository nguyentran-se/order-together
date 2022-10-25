import { createSelector } from 'reselect';
import { AppState } from 'store';
import { selectAuthIsLoggedIn } from './auth.selectors';
import { selectAuthFirebaseIsLoggedIn } from './authFirebase.selector';

export const selectIsLoggedIn = createSelector(
  selectAuthIsLoggedIn,
  selectAuthFirebaseIsLoggedIn,
  (s, f) => s || f,
);

export const selectLounge = (state: AppState) => state.lounge.data;
