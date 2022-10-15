import { createSelector } from 'reselect';
import { selectAuthIsLoggedIn } from './auth.selectors';
import { selectAuthFirebaseIsLoggedIn } from './authFirebase.selector';

export const selectIsLoggedIn = createSelector(
  selectAuthIsLoggedIn,
  selectAuthFirebaseIsLoggedIn,
  (s, f) => s || f,
);
