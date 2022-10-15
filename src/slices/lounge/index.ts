import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrapedLounge, Status } from '@types';

interface LoungeState {
  status: Status;
  error: any;
  data: ScrapedLounge[];
}
const initialState: LoungeState = {
  data: [],
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
    getLoungeSucceed: (state, action: PayloadAction<ScrapedLounge[]>) => {
      state.status = Status.RESOLVED;
      state.error = null;
      state.data = action.payload;
    },
    getLoungeFailed: (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.error = action.payload;
    },
  },
});

export const { getLoungeRequest, getLoungeSucceed, getLoungeFailed } = loungeSlice.actions;
export const loungeSliceName = loungeSlice.name;
export default loungeSlice.reducer;
