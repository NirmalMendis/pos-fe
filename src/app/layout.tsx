import DashboardIcon from '@mui/icons-material/Dashboard';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Navigation } from '@toolpad/core';
import { AppProvider } from '@toolpad/core/nextjs';
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';
import ReactQueryProvider from '@components/react-query-provider/react-query-provider';
import { AUTHENTICATION, BRANDING } from '@utils/constants/generic-constants';
import { customTheme } from '@utils/helpers/theme';
import { auth } from '../middleware/auth';
import GenericProvider from '@components/generic-provider/generic-provider';

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
    segment: 'items',
    title: 'Items',
    icon: <LabelImportantIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
];

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <SessionProvider session={session}>
          <GenericProvider>
            <ReactQueryProvider>
              <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <AppProvider navigation={NAVIGATION} branding={BRANDING} session={session} authentication={AUTHENTICATION} theme={customTheme}>
                  {props.children}
                </AppProvider>
              </AppRouterCacheProvider>
            </ReactQueryProvider>
          </GenericProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
