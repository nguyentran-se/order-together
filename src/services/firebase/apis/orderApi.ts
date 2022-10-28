import { Collections } from '@types';
import axiosFirebase from '../axiosFirebase';

export const orderApi = {
  createOrders: (data: any) => {
    const url = `${Collections.ORDER}.json`;
    return axiosFirebase.post(url, JSON.stringify(data));
  },
};
