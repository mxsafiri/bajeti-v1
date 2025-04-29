import { useState, useEffect } from 'react';

// A simple shim for the Wasp useAuth hook
export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUser(null); // No user by default
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    data: user,
    isLoading,
    error,
  };
};

export default useAuth;
