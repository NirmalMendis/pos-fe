import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { axiosInstance, excludedEndpoints, onRefreshed, subscribeTokenRefresh } from '@api/api-service';
import { AUTH_API } from '@utils/constants/api-endpoints';
import { HTTP_STATUS_CODES } from '@utils/constants/generic-constants';
import ENV_CONFIGS from './get-env-config';

let isRefreshing = false;
let hasAttachedResponseInterceptor = false;
let hasAttachedRequestInterceptor = false;

const useSetupAxios = () => {
  const { data: session, update } = useSession();

  const setupRequestInterceptor = useCallback(() => {
    axiosInstance.interceptors.request.use((config) => {
      const jwt = session?.user.accessToken;

      if (config.includeAccessToken && config.headers) config.headers['Authorization'] = `Bearer ${jwt}`;
      return config;
    });
  }, [session?.user.accessToken]);

  const setupResponseInterceptor = useCallback(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        if (response.data.data) return response.data.data;
        else if (response.headers['content-type'] === 'application/pdf') {
          return response.data;
        }
      },
      async function (error) {
        const originalRequest = error.config;
        if (error.response.status === HTTP_STATUS_CODES.UNAUTHORIZED && !excludedEndpoints.some((endpoint) => originalRequest.url?.startsWith(endpoint))) {
          try {
            const retryOrigReq = new Promise((resolve, reject) => {
              subscribeTokenRefresh((token) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                axios(originalRequest)
                  .then((response) => {
                    if (response.data.data) resolve(response.data.data);
                    else if (response.headers['content-type'] === 'application/pdf') {
                      return resolve(response.data);
                    }
                  })
                  .catch((error) => reject(error));
              });
            });
            if (!isRefreshing) {
              isRefreshing = true;
              try {
                const refreshResponse = await axios({
                  url: AUTH_API.REFRESH,
                  baseURL: ENV_CONFIGS.API_BASE_URL,
                  withCredentials: true,
                });
                update({
                  accessToken: refreshResponse.data.data.accessToken,
                });
                onRefreshed(refreshResponse.data.data.accessToken);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (error) {
                update(null);
              }
              isRefreshing = false;
            }
            return retryOrigReq;
          } catch (error) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );
  }, [update]);

  useEffect(() => {
    if (!hasAttachedRequestInterceptor) {
      setupRequestInterceptor();
      hasAttachedRequestInterceptor = true;
    }
  }, [setupRequestInterceptor]);

  useEffect(() => {
    if (!hasAttachedResponseInterceptor) {
      setupResponseInterceptor();
      hasAttachedResponseInterceptor = true;
    }
  }, [setupResponseInterceptor]);
};

export default useSetupAxios;
