import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Navigation } from '@toolpad/core/AppProvider';
import { AppProvider } from '@toolpad/core/nextjs';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import * as React from 'react';
import ReactQueryProvider from '@components/react-query-provider/react-query-provider';
import { auth } from '../middleware/auth';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
];

const BRANDING = {
  title: 'My Toolpad Core Next.js App',
};

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <AppProvider navigation={NAVIGATION} branding={BRANDING} session={session} authentication={AUTHENTICATION}>
                {props.children}
              </AppProvider>
            </AppRouterCacheProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
