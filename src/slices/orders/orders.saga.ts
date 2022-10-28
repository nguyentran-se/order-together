import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { all, call, select, takeLatest } from 'redux-saga/effects';
import { selectAuthFirebaseUid, selectAuthUserProfile } from 'selectors';
import { orderApi } from 'services/firebase/apis';
import { loungeOrderApi } from 'services/firebase/apis/loungeOrder';
import { isEmpty } from 'utils';
import { orderSliceName } from '.';
/* #region 'async action' */
export const createOrders = createAction<any>(`${orderSliceName}/createOrders`);
/* #endregion 'async action' */

function* handleCreateOrders(action: PayloadAction<any>): Generator<any, any, any> {
  const uid = yield select(selectAuthFirebaseUid);
  const buyerInfo = yield select(selectAuthUserProfile);
  const loungeOrders = action.payload;
  const loungeIds = Object.keys(loungeOrders);
  const orderIdsResponse = yield all(
    loungeIds.map((t) => {
      const orderDetails = loungeOrders[t];
      const submittedOrderData = {
        ...orderDetails,
        buyer: {
          ...buyerInfo,
          uid,
        },
      };
      return call(orderApi.createOrders, submittedOrderData);
    }),
  );
  yield call(handleCreateLoungeOrder, orderIdsResponse, loungeIds);
}

function* handleCreateLoungeOrder(orderIdsResponse: { name: string }[], loungeIds: string[]) {
  if (!isEmpty(orderIdsResponse)) {
    const orderIds = orderIdsResponse.map((r: any) => r.name);
    yield all(
      loungeIds.map((lid, index) => {
        const oid = orderIds[index];
        return call(loungeOrderApi.createLoungeOrder, lid, oid);
      }),
    );
  }
}

export default function OrderSaga() {
  return [takeLatest(createOrders, handleCreateOrders)];
}
