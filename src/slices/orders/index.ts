import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '@types';

const initialState: any = {
  data: {},
  status: Status.IDLE,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrderItem: (state, action: PayloadAction<any>) => {
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

export const { addOrderItem } = ordersSlice.actions;
export default ordersSlice.reducer;
