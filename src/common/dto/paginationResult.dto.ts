export class PaginationResultDto<T> {
  data: T[];
  count: number;
  totalPages: number;
  totalItems: number;
  page: number;
  size: number;
}
