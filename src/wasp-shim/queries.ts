import { useState, useEffect } from 'react';

// A simple shim for the Wasp useQuery hook
export const useQuery = (queryFn: any, args: any) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      try {
        // Return mock data based on the query name
        setData([]);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [queryFn, JSON.stringify(args)]);

  return {
    data,
    isLoading,
    error,
  };
};

// Export mock query functions
export const getDashboardData = () => [];
export const getTransactions = () => [];
export const getCategories = () => [];
export const getBudgets = () => [];
