import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const ContextQuery = ({children}: any) => {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: 2}},
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ContextQuery;
