import {
  UseMutationResult,
  useQueryClient,
  useMutation as useQueryMutation,
} from "@tanstack/react-query";

import { toaster } from "@/components/ui";

interface MutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onErrorMessage?: (message: string) => void;
  successMessage?: string;
  errorToast?: boolean;
  queryKey?: string[];
  invalidateQueries?: string[];
}

export function useMutation<TData, TVariables = void>({
  mutationFn,
  onSuccess,
  onErrorMessage,
  successMessage,
  errorToast = true,
  invalidateQueries,
}: MutationOptions<TData, TVariables>): UseMutationResult<
  TData,
  Error,
  TVariables
> {
  const queryClient = useQueryClient();

  return useQueryMutation({
    mutationFn,
    onSuccess: (data) => {
      if (successMessage) {
        toaster.create({
          title: successMessage,
          type: "success",
        });
      }

      onSuccess?.(data);

      if (invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: invalidateQueries });
      }
    },
    onError: (error: Error) => {
      if (errorToast) {
        toaster.create({
          title: "Error",
          description: error.message,
          type: "error",
        });
      }

      onErrorMessage?.(error.message);
    },
  });
}
