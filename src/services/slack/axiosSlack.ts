import axios from 'axios';
import qs from 'querystring';
import camelcaseKeys from 'camelcase-keys';
import { getLocalStorage } from 'utils';
const instance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  baseURL: 'https://slack.com/api',
  paramsSerializer: (params) => qs.stringify(params),
});
instance.interceptors.request.use((config) => {
  let token = getLocalStorage('stoken');
  if (config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use((response) => {
  if (response?.data) return camelcaseKeys(response.data);

  return camelcaseKeys(response);
});

export default instance;
