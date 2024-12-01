import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { DeleteItemRequest } from './items.types';
import { DELETE_ITEM } from '@utils/constants/query-leys';
import { apiService } from '@api/api-service';
import { ITEM_API } from '@utils/constants/api-endpoints';

const useDeleteItem = (): UseMutationResult<void, Error, { id: DeleteItemRequest }> => {
  return useMutation({
    mutationKey: [DELETE_ITEM],
    mutationFn: ({ id }) =>
      apiService.deleteRequest({
        path: ITEM_API.DELETE_ITEM(id),
      }),
  });
};

export default useDeleteItem;
