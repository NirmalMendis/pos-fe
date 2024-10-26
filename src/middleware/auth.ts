import { AuthProvider, SupportedAuthProvider } from "@toolpad/core";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email Address", type: "email" },
      password: { label: "Password", type: "password" },
    },
    name: "credentials",
    async authorize(c) {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: c.email, password: c.password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        return null;
      }

      const userData = await response.json();

      if (!userData) return null;

      return {
        id: "test",
        name: "Test User222",
        email: String(c.email),
        role: "admin",
        accessToken: userData.accessToken,
      };
    },
  }),
];

export const providerMap: AuthProvider[] = providers.map((provider) => {
  if (typeof provider === "function") {
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
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith("/public");
      console.log("session", session);
      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false; // Redirect unauthenticated users to login page
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt(params) {
      if (params.user) {
        params.token.role = params.user.role;
        params.token.accessToken = params.user.accessToken;
      }
      return params.token;
    },
  },
});
