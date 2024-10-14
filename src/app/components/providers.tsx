'use client';

import React, { useMemo } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({ children }: React.PropsWithChildren) {
  const client = useMemo(() => new QueryClient(), []); // create QueryClient

  return (
    // pass QueryClient to QueryClientProvider
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
