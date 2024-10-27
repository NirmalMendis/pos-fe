import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'];
  }

  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
  }
}
