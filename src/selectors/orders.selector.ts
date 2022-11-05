import { AppState } from 'store';

export const selectOrders = (state: AppState) => state.orders;
export const selectNumberOfOrders = (state: AppState) => {
  const total = Object.values(state.orders.data).reduce((totalTotal: any, table: any) => {
    const totalPerTable = Object.values(table).reduce((totalOrder: any, order: any) => {
      return totalOrder + order.amount || 0;
    }, 0);
    return totalTotal + totalPerTable;
  }, 0);
  return total;
};
