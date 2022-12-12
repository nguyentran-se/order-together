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
    const __DEV__ = process.env.NODE_ENV === 'development';
    const API = __DEV__ ? '/api/menu' : 'https://ot-s.vercel.app/api/scraping';
    // const data = { url };
    const params = { url };
    return axios.get(API, { params });
  },
};
