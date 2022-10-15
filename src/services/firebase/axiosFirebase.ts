import axios from 'axios';
import qs from 'query-string';
import camelcaseKeys from 'camelcase-keys';
import { getLocalStorage } from 'utils';
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'https://order-together-65dd2-default-rtdb.firebaseio.com/',
  paramsSerializer: (params: any) => qs.stringify(params),
});
instance.interceptors.request.use((config) => {
  let fbtoken = getLocalStorage('fbtoken');
  if (fbtoken) {
    const { accessToken } = fbtoken;
    if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
    config.params = {
      ...config.params,
      auth: accessToken,
    };
  }
  return config;
});

instance.interceptors.response.use((response) => {
  if (response?.data) return camelcaseKeys(response.data);

  return camelcaseKeys(response);
});

export default instance;
