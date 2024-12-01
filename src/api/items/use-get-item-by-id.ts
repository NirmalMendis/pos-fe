import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { apiService } from '@api/api-service';
import { ITEM_API } from '@utils/constants/api-endpoints';
import { ITEM } from '@utils/constants/query-leys';
import { GetItemByIdRequest, GetItemByIdResponse } from './items.types';

const useGetItemById = ({ id }: GetItemByIdRequest, enabled?: boolean): UseQueryResult<GetItemByIdResponse, Error> => {
  return useQuery({
    queryKey: [ITEM, id],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetItemByIdResponse>({
        path: ITEM_API.GET_ITEM(id),
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetItemById;
