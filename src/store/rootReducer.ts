import authReducer from 'slices/auth';
import authFirebase from 'slices/authFirebase';
import dashboardReducer from 'slices/dashboard';
import loungeReducer from 'slices/lounge';
import ordersReducer from 'slices/orders';
const rootReducer = {
  auth: authReducer,
  orders: ordersReducer,
  authFirebase: authFirebase,
  lounge: loungeReducer,
  dashboard: dashboardReducer,
};
export default rootReducer;
