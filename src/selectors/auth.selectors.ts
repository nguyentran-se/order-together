import { createSelector } from 'reselect';
import { selectAuthFirebaseIsLoggedIn, selectAuthIsLoggedIn } from './common.selector';

export const selectIsLoggedIn = createSelector(
  selectAuthIsLoggedIn,
  selectAuthFirebaseIsLoggedIn,
  (s, f) => s || f,
);
