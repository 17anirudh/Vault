"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider, keepPreviousData } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      placeholderData: keepPreviousData,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

type RootProviderProps = { children: ReactNode };

export default function RootProvider({ children }: RootProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors closeButton />
    </QueryClientProvider>
  );
}