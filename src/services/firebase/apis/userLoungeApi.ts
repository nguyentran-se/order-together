import { Collections } from '@types';
import axiosFirebase from '../axiosFirebase';

export const userLoungeApi = {
  createUserLounge: (uid: string, lid: string) => {
    const url = `${Collections.USER_LOUNGE}/${uid}_${lid}.json`;
    const data = { uid, lid };
    return axiosFirebase.put(url, data);
  },
};
