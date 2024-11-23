import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ITEM_API } from '@utils/constants/api-endpoints';
import { ADD_ITEM } from '@utils/constants/query-leys';
import { apiService } from '../api-service';
import { PostAddItemRequest, PostAddItemResponse } from './items.types';

const usePostAddItem = (): UseMutationResult<PostAddItemResponse, Error, { payload: PostAddItemRequest }> => {
  return useMutation({
    mutationKey: [ADD_ITEM],
    mutationFn: ({ payload }) =>
      apiService.postRequest<PostAddItemResponse>({
        path: ITEM_API.ADD_ITEM,
        body: payload,
      }),
  });
};

export default usePostAddItem;
