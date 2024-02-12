import { API_URL } from '@/config';
import { storageKeys } from '@/constants/keys';
import storage from '@/utils/storage';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = storage.getItem(storageKeys.AUTH_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use(authRequestInterceptor, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data as AxiosResponse;
  },
  (error) => {
    return Promise.reject(error);
  },
);
