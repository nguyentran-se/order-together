import authReducer from 'slices/auth';
import authFirebase from 'slices/authFirebase';
import ordersReducer from 'slices/orders';
const rootReducer = {
  auth: authReducer,
  orders: ordersReducer,
  authFirebase: authFirebase,
};
export default rootReducer;
