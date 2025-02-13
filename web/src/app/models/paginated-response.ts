export interface PaginatedResponse<T> {
  currentPage: number;
  totalPages: number;
  totalPatients: number;
  data: T[];
}
