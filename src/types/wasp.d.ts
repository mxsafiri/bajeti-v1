declare module '@wasp/auth/useAuth' {
  export interface User {
    id: number;
    username: string;
  }

  export function useAuth(): {
    data: User | null;
    isLoading: boolean;
    error: Error | null;
  };
}

declare module '@wasp/router' {
  export function Link(props: {
    to: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }): JSX.Element;
}
