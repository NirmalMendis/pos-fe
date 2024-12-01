'use client';

import { FC } from 'react';
import { GenericProviderProps } from './generic-provider.types';
import { SnackbarProvider } from 'notistack';
import { DialogsProvider } from '@toolpad/core';

const GenericProvider: FC<GenericProviderProps> = ({ children }) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <DialogsProvider>{children}</DialogsProvider>
    </SnackbarProvider>
  );
};

export default GenericProvider;
