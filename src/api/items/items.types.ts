import { OrderPaginatedRequest, PaginatedData } from '@utils/types/generic.types';
import { Item } from '@utils/types/item.type';

export type PostAddItemRequest = Pick<Item, 'name' | 'description' | 'barcode'>;

export type PostAddItemResponse = Item;

export type GetItemsResponse = PaginatedData<Item>;

export type GetItemsRequest = Partial<OrderPaginatedRequest>;
