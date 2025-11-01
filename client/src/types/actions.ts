export interface SuccessResponse<T> {
  data: T;
  message: string;
}

export interface PaginatedSuccessReponse<T>
  extends Omit<SuccessResponse<T>, "data"> {
  data: {
    data: T;
    meta: PaginationMeta;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface ErrorResponse {
  error: string | string[];
  message: string;
}

export type Response<T> = T extends unknown[]
  ? PaginatedSuccessReponse<T> | ErrorResponse
  : SuccessResponse<T> | ErrorResponse;
