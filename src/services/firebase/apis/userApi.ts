import { UserSlack } from '@types';
import axiosFirebase from '../axiosFirebase';
export const userApi = {
  updateUserSlackInfor: (userId: string, data: UserSlack) => {
    const url = `user/${userId}.json`;
    return axiosFirebase.put(url, data);
  },
  getUserSlackInfor: (userId: string) => {
    const url = `user/${userId}.json`;
    return axiosFirebase.get(url);
  },
};
