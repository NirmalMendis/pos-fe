export const AUTH_ENDPOINT = 'auth';
export const USER_ENPOINT = 'user';
export const METADATA_ENDPOINT = 'metadata';

export const AUTH_API = {
  LOGIN: `${AUTH_ENDPOINT}/login`,
  LOGOUT: `${AUTH_ENDPOINT}/logout`,
  REFRESH: `${AUTH_ENDPOINT}/refresh`,
  SET_NEW_PASSWORD: `${AUTH_ENDPOINT}/set-new-password`,
  FORGOT_PASSWORD: `${AUTH_ENDPOINT}/forgot-password`,
};

export const USER_API = {
  GET_ALL_USERS: `${USER_ENPOINT}`,
  POST_CREATE_USER: `${USER_ENPOINT}`,
  GET_USER: (id: number) => `${USER_ENPOINT}/${id}`,
  PATCH_USER_ACTIVE_BRANCH: `${USER_ENPOINT}/active-branch`,
  GET_USER_PERMISSIONS: `${USER_ENPOINT}/permissions`,
};
