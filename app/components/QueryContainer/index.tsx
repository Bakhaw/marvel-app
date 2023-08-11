"use client";

import { QueryClient, QueryClientProvider } from "react-query";

interface QueryContainerProps {
  children: React.ReactNode;
}

const QueryContainer: React.FC<QueryContainerProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryContainer;
