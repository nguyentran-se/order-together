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
const initialState: OrderState = {
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

export const { addOrder, getOrdersByUidRequest, getOrdersByUidSucceed, getOrdersByUidFailed } =
  ordersSlice.actions;
export const orderSliceName = ordersSlice.name;
export default ordersSlice.reducer;
