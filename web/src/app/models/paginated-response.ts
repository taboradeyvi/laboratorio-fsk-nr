export interface PaginatedResponse<T> {
  currentPage: number;
  totalPages: number;
  titalItems: number;
  data: T[];
}
