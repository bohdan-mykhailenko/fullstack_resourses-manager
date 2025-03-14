import { SQLDatabase } from "encore.dev/storage/sqldb";

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

export const processDbList = async <T>(
  query: ReturnType<typeof SQLDatabase.prototype.query>,
  transform?: (item: any) => T
): Promise<T[]> => {
  const results: T[] = [];

  for await (const item of query) {
    results.push(transform ? transform(item) : (item as T));
  }

  return results;
};
