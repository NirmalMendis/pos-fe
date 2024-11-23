import { Item } from '@utils/types/item.type';

export type PostAddItemRequest = Pick<Item, 'name' | 'description' | 'barcode'>;

export type PostAddItemResponse = Item;
