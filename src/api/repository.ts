import axios, { InternalAxiosRequestConfig } from 'axios';
import storage from 'storage/admin';

import { ACCESS_TOKEN_KEY } from 'app/auth/constants';

const { REACT_APP_API_URL } = process.env;

const repository = axios.create({
  baseURL: REACT_APP_API_URL,
});

repository.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = storage.get(ACCESS_TOKEN_KEY);

    if (accessToken && config?.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
);

export default repository;
