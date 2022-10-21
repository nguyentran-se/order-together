import { createSlice } from '@reduxjs/toolkit';
import { Status } from '@types';

const initialState: any = {
  data: [],
  status: Status.IDLE,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
});

// export {} = ordersSlice.actions;

export default ordersSlice.reducer;
