import { Collections } from '@types';
import axiosFirebase from '../axiosFirebase';
export const loungeOrderApi = {
  createLoungeOrder: (lid: string, oid: string) => {
    const url = `${Collections.LOUNGE_ORDER}/${lid}_${oid}.json`;
    const data = { lid, oid };
    return axiosFirebase.put(url, data);
  },
};
