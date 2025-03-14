export interface IdParams {
  id: string;
}

export interface UserIdParams {
  userId: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedList<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
