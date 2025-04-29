import { useState } from 'react';

// A simple shim for the Wasp useAction hook
export const useAction = (actionFn: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (args: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate action execution
      console.log(`Executing action with args:`, args);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return {
    execute,
    isLoading,
    error,
  };
};

// Export mock action functions
export const createTransaction = async () => ({ success: true });
export const deleteTransaction = async () => ({ success: true });
export const createCategory = async () => ({ success: true });
export const deleteCategory = async () => ({ success: true });
export const createBudget = async () => ({ success: true });
export const deleteBudget = async () => ({ success: true });
