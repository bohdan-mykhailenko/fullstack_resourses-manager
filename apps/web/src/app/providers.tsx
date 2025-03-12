import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider as ChakraProvider, Toaster, toaster } from "@/components/ui";
import { MINUTE } from "@/constants/date";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * MINUTE,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError: (error: Error) => {
      toaster.create({
        title: "Error while fetching data",
        description: error.message,
        type: "error",
      });
    },
  }),
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Toaster />

        {children}
      </ChakraProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
