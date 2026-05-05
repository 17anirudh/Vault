"use client";

import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from 'react'
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        placeholderData: keepPreviousData,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    }
})
type ParentProp = { children: ReactNode }

export default function RootProvider({ children }: ParentProp) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster richColors closeButton />
    </QueryClientProvider>
  )
}