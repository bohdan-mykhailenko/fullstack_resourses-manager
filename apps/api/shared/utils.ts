import { PaginationParams } from "./interfaces";

interface PaginationResult {
  page: number;
  limit: number;
  offset: number;
}

export const getPagination = ({
  page = 1,
  limit = 10,
}: PaginationParams): PaginationResult => ({
  page,
  limit,
  offset: (page - 1) * limit,
});
