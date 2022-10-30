import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '@types';
interface OrderDetail {
  [index: string]: any;
}
interface Order {
  data: {
    [index: string]: OrderDetail;
  };
  status: Status;
  error: any;
}
const initialState: any = {
  data: {},
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
    deleteOrder: (state, action: PayloadAction<any>) => {
      const { tableId, orderId } = action.payload;
      const { [orderId]: _, ...rest } = state.data[tableId];
      state.data[tableId] = rest;
    },
  },
});

export const orderSliceName = 'orders';
export const { addOrder, editOrderAmount, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
