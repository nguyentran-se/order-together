import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '@types';

interface LoungeState {
  status: Status;
  error: any;
}
const initialState: LoungeState = {
  status: Status.IDLE,
  error: null,
};
const loungeSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    getLoungeRequest: (state) => {
      state.status = Status.PENDING;
    },
    getLoungeSucceed: (state, action: PayloadAction<any>) => {
      state.status = Status.RESOLVED;
      state.error = null;
    },
    getLoungeFailed: (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.error = action.payload;
    },
  },
});

export const { getLoungeRequest, getLoungeSucceed, getLoungeFailed } = loungeSlice.actions;
export default loungeSlice.reducer;
