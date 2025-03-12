import {
  QueryKey,
  UseQueryResult,
  useQuery as useQueryHook,
} from "@tanstack/react-query";
import { useMemo } from "react";

interface QueryConfiguration<TData> {
  queryKey: QueryKey;
  queryFunction: () => Promise<TData>;
  enabled?: boolean;
}

interface ExtendedQueryResult<TData>
  extends Omit<UseQueryResult<TData, Error>, "error"> {
  isEmpty: boolean;
  error: Error | null;
}

export function useQuery<TData>({
  queryKey,
  queryFunction,
  enabled = true,
}: QueryConfiguration<TData>): ExtendedQueryResult<TData> {
  const queryResult = useQueryHook({
    queryKey,
    queryFn: queryFunction,
    enabled,
  });

  const isEmpty = useMemo(
    () =>
      !queryResult.isLoading &&
      !queryResult.isError &&
      (queryResult.data === null ||
        queryResult.data === undefined ||
        (Array.isArray(queryResult.data) && queryResult.data.length === 0)),
    [queryResult.isLoading, queryResult.isError, queryResult.data]
  );

  return useMemo(
    () => ({
      ...queryResult,
      isEmpty,
    }),
    [queryResult, isEmpty]
  );
}
