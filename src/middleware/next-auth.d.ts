import POSUser from '@utils/types/pos-user';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'];
  }

  interface User extends Pick<POSUser, 'id' | 'email'> {
    accessToken: string;
    refreshToken: string;
  }
}
