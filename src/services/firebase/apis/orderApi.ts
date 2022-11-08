import { Collections, OrderResponse } from '@types';
import { firebaseCore } from 'pages/_app';
import axiosFirebase from '../axiosFirebase';

export const orderApi = {
  createOrders: (data: any) => {
    const url = `${Collections.ORDER}.json`;
    return axiosFirebase.post(url, JSON.stringify(data));
  },
  getOrdersByUserId: async (uid: string) => {
    const orders: OrderResponse[] = [];
    await firebaseCore.orderRef
      .orderByChild('buyer/uid')
      .equalTo(uid)
      .once('value', (snapshot) => {
        snapshot.forEach((child) => {
          if (child.key) {
            const o: OrderResponse = {
              oid: child.key,
              ...child.val(),
            };
            orders.push(o);
          }
        });
      });
    console.log(orders);

    return orders;
  },
};
