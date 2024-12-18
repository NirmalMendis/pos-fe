import { signIn, signOut } from 'next-auth/react';

export const HTTP_STATUS_CODES = {
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

export const BRANDING = {
  title: 'Point of Sale',
};

export const AUTHENTICATION = {
  signIn,
  signOut,
};

export const DATAGRID_CONSTANTS = {
  MUI_DATAGRID_DEFAULT_ROW_HEIGHT: 35,
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_START_PAGE: 0,
};
