export interface PaginatedData<T> {
  data: Array<T>;
  pager: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: Array<number>;
  };
}

export enum OrderDirection {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface OrderPaginatedRequest {
  page: number;
  pageSize: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}
