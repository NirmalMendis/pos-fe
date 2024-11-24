import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { apiService } from '@api/api-service';
import { ITEM_API } from '@utils/constants/api-endpoints';
import { ITEMS } from '@utils/constants/query-leys';
import { GetItemsRequest, GetItemsResponse } from './items.types';

const useGetItems = <T = GetItemsResponse>({ page, pageSize, orderBy, orderDirection }: GetItemsRequest, enabled?: boolean): UseQueryResult<T, Error> => {
  return useQuery({
    queryKey: [ITEMS, page, pageSize, ...(orderBy && orderDirection ? [orderBy, orderDirection] : [])],
    queryFn: ({ signal }) =>
      apiService.getRequest<T>({
        path: ITEM_API.GET_ITEMS,
        queryParams: {
          page,
          pageSize,
          orderBy,
          orderDirection,
        },
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetItems;
