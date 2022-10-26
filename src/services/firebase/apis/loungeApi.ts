import { ScrapedLounge } from '@types';
import axios from 'axios';
import axiosFirebase from '../axiosFirebase';
export const loungeApi = {
  createLounge: (data: ScrapedLounge) => {
    const url = `lounge.json`;
    return axiosFirebase.post(url, data);
  },
  // createLounge: (data: ScrapedLounge) => {
  //   const url = `lounge/${data.activeMerchantID}.json`;
  //   return axiosFirebase.put(url, data);
  // },
  getLounges: () => {
    const url = `lounge.json`;
    return axiosFirebase.get(url);
  },
  getLoungeById: (id: string) => {
    const url = `lounge/${id}.json`;
    return axiosFirebase.get(url);
  },
  updateUserLounge: (uid: string, data: { [index: string]: boolean }) => {
    const url = `user/${uid}/lounge.json`;
    return axiosFirebase.put(url, data);
  },
  getScrapedLounge: (url: string) => {
    const data = { url };
    return axios.post('/api/menu', data);
  },
};
