import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoungeData, Status } from '@types';
type DashboardState = {
  data: any[];
  status: Status;
  error: any;
};
const initialState: DashboardState = {
  data: [],
  status: Status.IDLE,
  error: null,
};
const dashboardSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    getHostLoungeRequest: (state) => {
      state.status = Status.PENDING;
    },
    getHostLoungeSucceed: (state, action: PayloadAction<LoungeData[]>) => {
      state.status = Status.RESOLVED;
      state.error = null;
      state.data = action.payload;
    },
    getHostLoungeFailed: (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.error = action.payload;
    },
  },
});

export const { getHostLoungeRequest, getHostLoungeSucceed, getHostLoungeFailed } =
  dashboardSlice.actions;
export const dashboardSliceName = dashboardSlice.name;
export default dashboardSlice.reducer;
