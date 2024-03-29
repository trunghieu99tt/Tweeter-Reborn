import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '@config/secret';
import { ResponseCode } from 'constants/http-status.constant';
import { ELocalStorageKey } from '@constants';
import { EventBusName, onPushEventBus } from 'services/event-bus';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const REQ_TIMEOUT = 30 * 1000; // 20 seconds

const client = axios.create({
  baseURL: API_URL || 'http://localhost:3000/api/',
  headers,
  timeout: REQ_TIMEOUT,
});

const requestInterceptor = (config: AxiosRequestConfig) => {
  const rawToken = localStorage.getItem(ELocalStorageKey.AccessToken);

  if (rawToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${JSON.parse(rawToken)}`;
  }

  return config;
};

client.interceptors.request.use(requestInterceptor, (error) => {
  return Promise.reject(error);
});

const errorResponseInterceptor = (error: any) => {
  const statusCode = error?.response?.status;

  if (statusCode === ResponseCode.TOKEN_REMOVED) {
    // logout
  }

  if (statusCode === ResponseCode.UNAUTHORIZED) {
    onPushEventBus({
      type: EventBusName.Logout,
    });

    // const refreshRes: any = await apiRefreshToken();
    // if (refreshRes) {
    //   originalRequest.headers[
    //     'Authorization'
    //   ] = `Bearer ${refreshRes?.accessToken}`;
    //   SocketUtils?.getInstance?.()?.restart?.();
    //   return instance(originalRequest);
    // }

    return Promise.reject({ ...error });
  }

  return Promise.reject({ ...error });
};

client.interceptors.response.use((response) => {
  return response;
}, errorResponseInterceptor);

export default client;
