import authReducer from "slices/auth";
import ordersReducer from "slices/orders";
const rootReducer = {
  auth: authReducer,
  orders: ordersReducer,
};
export default rootReducer;
