import POSUser from '@utils/types/pos-user';

export interface LoginResponse {
  data: {
    data: {
      accessToken: string;
      refreshToken: string;
      user: Pick<POSUser, 'id' | 'email' | 'firstName' | 'lastName'>;
    };
  };
}
