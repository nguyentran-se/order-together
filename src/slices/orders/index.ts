import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDetail, OrderResponse, Status } from '@types';

interface OrderState {
  data: {
    [index: string]: OrderDetail;
  };
  confirmedData: OrderResponse[];
  status: Status;
  error: any;
}
const initialState: any = {
  data: {},
  confirmedData: [],
  status: Status.IDLE,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<any>) => {
      const { tableId, orderId, orderDetail } = action.payload;
      state.data[tableId] = {
        ...state.data[tableId],
        [orderId]: {
          ...orderDetail,
          amount: state.data?.[tableId]?.[orderId] ? ++state.data[tableId][orderId].amount : 1,
        },
      };
    },
    editOrderAmount: (state, action: PayloadAction<any>) => {
      const { tableId, orderId, numberOfIncrease } = action.payload;
      const isDecreased = numberOfIncrease < 0;
      const isAmountZero = state.data[tableId]?.[orderId]?.amount === 0;

      if (isDecreased && isAmountZero) return;
      state.data[tableId] = {
        ...state.data[tableId],
        [orderId]: {
          ...state.data[tableId][orderId],
          amount: state.data[tableId][orderId].amount + numberOfIncrease,
        },
      };
    },
    deleteALlOrders: (state) => {
      state.data = {};
    },
    deleteOrder: (state, action: PayloadAction<any>) => {
      const { tableId, orderId } = action.payload;
      const { [orderId]: _, ...rest } = state.data[tableId];
      state.data[tableId] = rest;
    },
    getOrdersByUidRequest: (state) => {
      state.status = Status.PENDING;
      state.error = null;
    },
    getOrdersByUidSucceed: (state, action: PayloadAction<OrderResponse[]>) => {
      state.confirmedData = action.payload;
      state.status = Status.RESOLVED;
      state.error = null;
    },
    getOrdersByUidFailed: (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.error = action.payload;
    },
  },
});

export const {
  addOrder,
  getOrdersByUidRequest,
  getOrdersByUidSucceed,
  getOrdersByUidFailed,
  editOrderAmount,
  deleteOrder,
  deleteALlOrders,
} = ordersSlice.actions;
export const orderSliceName = ordersSlice.name;

export default ordersSlice.reducer;
