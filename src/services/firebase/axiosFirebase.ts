import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { firebaseCore } from 'pages/_app';
import qs from 'query-string';
import { getLocalStorage } from 'utils';

const getFirebaseToken = async (): Promise<string | null> => {
  const currentUser = firebaseCore.auth.currentUser;
  if (currentUser) return currentUser.getIdToken();

  const tokenStorage = getLocalStorage('fbtoken')?.accessToken;
  if (!tokenStorage) return null;
  return new Promise((resolve, reject) => {
    const unregisterAuthObserver = firebaseCore.auth.onAuthStateChanged((user) => {
      if (!user) {
        reject(null);
        return;
      }
      user.getIdToken().then((token) => {
        resolve(token);
        unregisterAuthObserver();
      });
    });
  });
};
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'https://order-together-65dd2-default-rtdb.firebaseio.com/',
  paramsSerializer: (params: any) => qs.stringify(params),
});
instance.interceptors.request.use(async (config) => {
  let accessToken = await getFirebaseToken();
  if (accessToken) {
    if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
    config.params = {
      ...config.params,
      auth: accessToken,
    };
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response?.data) return response.data;
    return camelcaseKeys(response);
  },
  (error: AxiosError) => {},
);
export default instance;
