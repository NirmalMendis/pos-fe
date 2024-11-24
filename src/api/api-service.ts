/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { ResponseType } from 'axios';
import queryString from 'query-string';
import { AUTH_API } from '@utils/constants/api-endpoints';
import ENV_CONFIGS from '@utils/helpers/get-env-config';

export interface GetConfig {
  path: string;
  queryParams?: object;
  includeAccessToken?: boolean;
  signal?: AbortSignal;
  method?: 'get' | 'post' | 'patch' | 'delete';
  body?: object;
  responseType?: ResponseType;
}

export interface PostPatchDeleteConfig {
  path: string;
  body?: any;
  queryParams?: object;
  includeAccessToken?: boolean;
  signal?: AbortSignal;
  responseType?: ResponseType;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    includeAccessToken?: boolean;
  }
}

export const excludedEndpoints = [AUTH_API.LOGIN];
const refreshSubscribers: ((token: string) => void)[] = [];

export const axiosInstance = axios.create({
  baseURL: ENV_CONFIGS.API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const controller = new AbortController();

  if (config.includeAccessToken && !config.headers['Authorization']) {
    controller.abort();
  }

  return {
    ...config,
    signal: controller.signal,
  };
});

export const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

export const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
};

const generateURL = (path: string, queryParams?: object): string => {
  let params = '';
  if (queryParams) params = `?${queryString.stringify(queryParams)}`;
  return path + params;
};

const executeRequest = async <T>({ path, includeAccessToken, queryParams, signal, method, body, responseType }: GetConfig): Promise<T> => {
  return axiosInstance.request({
    method: method,
    url: generateURL(path, queryParams),
    data: body,
    signal,
    includeAccessToken,
    responseType: responseType,
  });
};

const getRequest = async <T>({ path, includeAccessToken = true, queryParams, signal, responseType }: GetConfig): Promise<T> => {
  return executeRequest({
    path,
    includeAccessToken,
    queryParams,
    signal,
    method: 'get',
    responseType,
  });
};

const postRequest = async <T>({ path, body, includeAccessToken = true, queryParams, signal, responseType }: PostPatchDeleteConfig): Promise<T> => {
  return executeRequest({
    path,
    includeAccessToken,
    queryParams,
    signal,
    method: 'post',
    body,
    responseType,
  });
};

const patchRequest = async <T>({ path, body, includeAccessToken = true, queryParams, signal }: PostPatchDeleteConfig): Promise<T> => {
  return executeRequest({
    path,
    includeAccessToken,
    queryParams,
    signal,
    method: 'patch',
    body,
  });
};

const deleteRequest = async <T>({ path, body, includeAccessToken = true, queryParams, signal }: PostPatchDeleteConfig): Promise<T> => {
  return executeRequest({
    path,
    includeAccessToken,
    queryParams,
    signal,
    method: 'delete',
    body,
  });
};

export const apiService = {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
};
