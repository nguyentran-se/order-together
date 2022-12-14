import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { UnwrapPromise } from '@types';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { selectAuthFirebaseUid, selectAuthUserProfile } from 'selectors';
import { orderApi } from 'services/firebase/apis';
import { loungeOrderApi } from 'services/firebase/apis/loungeOrder';
import { isEmpty } from 'utils';
import {
  deleteALlOrders,
  getOrdersByUidFailed,
  getOrdersByUidRequest,
  getOrdersByUidSucceed,
  orderSliceName,
} from '.';
/* #region 'async action' */
export const createOrders = createAction<any>(`${orderSliceName}/createOrders`);
export const getOrdersByUid = createAction(`${orderSliceName}/getOrdersByUid`);

/* #endregion 'async action' */

function* handleCreateOrders(action: PayloadAction<any>): Generator<any, any, any> {
  const uid = yield select(selectAuthFirebaseUid);
  const buyerInfo = yield select(selectAuthUserProfile);
  const loungeOrders = action.payload.loungeOrders;
  const loungeIds = Object.keys(loungeOrders);
  const orderIdsResponse = yield all(
    loungeIds.map((t) => {
      const orderDetails = loungeOrders[t];
      const submittedOrderData = {
        confirmed: {
          ...orderDetails,
        },
        buyer: {
          ...buyerInfo,
          uid,
        },
        createdTimestamp: new Date().getTime(),
        paidStatus: false,
      };
      return call(orderApi.createOrders, submittedOrderData);
    }),
  );
  yield call(handleCreateLoungeOrder, orderIdsResponse, loungeIds);
  yield put(deleteALlOrders());
  action.payload.callback();
}

function* handleCreateLoungeOrder(orderIdsResponse: { name: string }[], loungeIds: string[]) {
  if (!isEmpty(orderIdsResponse)) {
    const orderIds = orderIdsResponse.map((r) => r.name);
    yield all(
      loungeIds.map((lid, index) => {
        const oid = orderIds[index];
        return call(loungeOrderApi.createLoungeOrder, lid, oid);
      }),
    );
  }
}

function* handleGetOrdersByUid(): any {
  try {
    yield put(getOrdersByUidRequest());
    const uid = yield select(selectAuthFirebaseUid);
    const orders: UnwrapPromise<ReturnType<typeof orderApi.getOrdersByUserId>> = yield call(
      orderApi.getOrdersByUserId,
      uid,
    );
    yield put(getOrdersByUidSucceed(orders));
  } catch (error) {
    yield put(getOrdersByUidFailed(error));
  }
}

export default function OrderSaga() {
  return [
    takeLatest(createOrders, handleCreateOrders),
    takeLatest(getOrdersByUid, handleGetOrdersByUid),
  ];
}
