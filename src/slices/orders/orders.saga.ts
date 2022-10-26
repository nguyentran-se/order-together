import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';
import { addOrderItem } from '.';
/* #region 'async action' */
export const addOrder = createAction<any>(`orders/addOrder`);
/* #endregion 'async action' */

/* #region 'firebase authentication' */
function* handleAddOrder(action: PayloadAction<any>): Generator<any, any, any> {
  // console.log('Handle add order');
  // console.log(action.payload);
  yield put(addOrderItem(action.payload));
  // const userSlack = action.payload;
  // const { email, userId } = userSlack;
  // console.log(email, ' ', userId);
  // if (!email || !userId) throw new Error('Missing user information');
  // try {
  //   const user: User = yield call(firebaSseCore.createUserAccount, email, userId);
  //   console.log('createUserAccount - Firebase user: ', user);
  //   yield call(handleSaveAuth, user, userSlack);
  // } catch (error: any) {
  //   yield put(authFirebaseFailed(error.message));
  //   console.log(error);
  //   switch (error.code) {
  //     case 'auth/email-already-in-use':
  //       yield call(handleEmailAlreadyInUse, email, userId, userSlack);
  //       break;
  //     case 400:
  //       if (error.message === 'EMAIL_EXISTS')
  //         yield call(handleEmailAlreadyInUse, email, userId, userSlack);
  //       break;
  //   }
  // }
  //TODO: createOrder - POST -> response: oid
  //TOD: createLoungeOrder - PUT -> data lid_oid.json: {lid. oid}
}

export default function OrderSaga() {
  return [takeLatest(addOrder, handleAddOrder)];
}
