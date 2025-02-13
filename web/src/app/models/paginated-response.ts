export interface PaginatedResponse<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: T[];
}
