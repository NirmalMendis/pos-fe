import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@api/api-service';
import { ITEM_API } from '@utils/constants/api-endpoints';
import { ITEMS, PATCH_ITEM } from '@utils/constants/query-leys';
import { PatchItemRequest, PatchItemResponse } from './items.types';

const usePatchItemMutation = (): UseMutationResult<PatchItemResponse, Error, { payload: PatchItemRequest }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [PATCH_ITEM],
    mutationFn: ({ payload }) => {
      const { id, ...rest } = payload;
      return apiService.patchRequest<PatchItemResponse>({
        path: ITEM_API.PATCH_ITEM(id),
        body: rest,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ITEMS],
      });
    },
  });
};

export default usePatchItemMutation;
