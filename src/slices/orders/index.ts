import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDetail, Status } from '@types';
interface OrderState {
  data: {
    [index: string]: OrderDetail;
  };
  status: Status;
  error: any;
}
const initialState: OrderState = {
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
  },
});

export const { addOrder } = ordersSlice.actions;
export const orderSliceName = ordersSlice.name;
export default ordersSlice.reducer;
