import { signIn, signOut } from 'next-auth/react';

export const HTTP_STATUS_CODES = {
  UNAUTHORIZED: 401,
};

export const BRANDING = {
  title: 'Point of Sale',
};

export const AUTHENTICATION = {
  signIn,
  signOut,
};
