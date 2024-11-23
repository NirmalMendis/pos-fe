import POSUser from '@utils/types/pos-user';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: Pick<POSUser, 'id' | 'email' | 'firstName' | 'lastName'>;
}
