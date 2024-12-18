'use client';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { GENERIC_ERROR } from '@utils/constants/string-constants';
import { showMutationError, showQueryError } from '@utils/helpers/error-handler';
import useSetupAxios from '@utils/helpers/use-setup-axios';
import { ReactQueryProviderProps } from './react-query-provider.types';
import { HTTP_STATUS_CODES } from '@utils/constants/generic-constants';

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
  useSetupAxios();
  const { enqueueSnackbar } = useSnackbar();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
          },
        },
        mutationCache: new MutationCache({
          onError: (error, _, __, mutation) => {
            if (error instanceof AxiosError && mutation.options.mutationKey && showMutationError(mutation.options.mutationKey)) {
              if (error.response?.data.message && error.response?.data.statusCode !== HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                enqueueSnackbar(error.response?.data.message, {
                  variant: 'error',
                });
              else
                enqueueSnackbar(GENERIC_ERROR, {
                  variant: 'error',
                });
            }
          },
        }),
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (error instanceof AxiosError && query.options.queryKey && showQueryError(query.options.queryKey)) {
              if (error.response?.data.message && error.response?.data.statusCode !== HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                enqueueSnackbar(error.response?.data.message, {
                  variant: 'error',
                });
              else
                enqueueSnackbar(GENERIC_ERROR, {
                  variant: 'error',
                });
            }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
