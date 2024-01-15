import { showNotify } from '@/common/utils';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const isLocalEnv = import.meta.env.VITE_NODE_ENV === 'development.local';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: isLocalEnv ? '/' : apiUrl,
  headers: {
    Accept: 'application/json', // https://github.com/axios/axios/issues/4783
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseBody = (response: AxiosResponse<any>) => response.data;

export const requests = {
  get: (url: string, args = {}) => axiosInstance.get(url, args).then(responseBody),

  post: (url: string, body: object, args = {}) =>
    axiosInstance.post(url, body, args).then(responseBody),

  put: (url: string, body?: object, args = {}) =>
    axiosInstance.put(url, body, args).then(responseBody),

  patch: (url: string, body: object, args = {}) =>
    axiosInstance.patch(url, body, args).then(responseBody),

  delete: (url: string, args = {}) => axiosInstance.delete(url, args).then(responseBody),
};

/**
 * Add accessToken if exists in localStorage
 */
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

/**
 * Show notify with error message
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error) => {
    console.log('Request error', error);
    showNotify('negative', error.response);
    return Promise.reject(error.response?.data);
  },
);

export default requests;
