import { AuthProvider, SupportedAuthProvider } from '@toolpad/core';
import NextAuth, { User } from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import { apiService } from '@api/api-service';
import { LoginResponse } from '@api/auth/auth.types';
import { AUTH_API } from '@utils/constants/api-endpoints';

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: 'Email Address', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    name: 'credentials',
    async authorize({ email, password }) {
      const response = await apiService.postRequest<LoginResponse>({
        path: AUTH_API.LOGIN,
        body: { email, password },
        includeAccessToken: false,
      });
      if (!response.accessToken) {
        return null;
      }

      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.email,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };

      return userData;
    },
  }),
];

export const providerMap: AuthProvider[] = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return {
      id: providerData.id as SupportedAuthProvider,
      name: providerData.name,
    };
  }
  return { id: provider.id as SupportedAuthProvider, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith('/public');
      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false; // Redirect unauthenticated users to login page
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
    async jwt({ user, token, trigger, session }) {
      if (user || (trigger === 'update' && session?.accessToken && session?.refreshToken)) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
  },
});
