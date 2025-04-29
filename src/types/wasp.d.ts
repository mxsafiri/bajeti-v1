declare module '@wasp/auth/useAuth' {
  export interface AuthUser {
    id: number;
    username?: string;
    identities?: {
      username?: {
        username: string;
      };
      email?: {
        email: string;
        emailVerified: boolean;
      };
    };
  }

  export type User = AuthUser;

  export function useAuth(): {
    data: AuthUser | null;
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

declare module '@wasp/auth/login' {
  export default function login(credentials: {
    username: string;
    password: string;
  }): Promise<void>;
}

declare module '@wasp/auth/signup' {
  export default function signup(credentials: {
    username: string;
    password: string;
  }): Promise<void>;
}

declare module '@wasp/auth/logout' {
  export default function logout(): Promise<void>;
}

declare module '@wasp/queries' {
  export function useQuery<T, Args = any>(
    queryFn: (args: Args) => Promise<T>,
    args?: Args,
    options?: {
      enabled?: boolean;
      refetchOnWindowFocus?: boolean;
      refetchInterval?: number;
    }
  ): {
    data: T | undefined;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
  };
  
  // Re-export all query functions
  export { default as getDashboardData } from '@wasp/queries/getDashboardData';
  export { default as getTransactions } from '@wasp/queries/getTransactions';
  export { default as getCategories } from '@wasp/queries/getCategories';
  export { default as getBudgets } from '@wasp/queries/getBudgets';
}

declare module '@wasp/actions' {
  export function useAction<T, Args = any>(
    actionFn: (args: Args) => Promise<T>
  ): [(args: Args) => Promise<T>, { isLoading: boolean }];
  
  // Re-export all action functions
  export { default as createTransaction } from '@wasp/actions/createTransaction';
  export { default as deleteTransaction } from '@wasp/actions/deleteTransaction';
  export { default as createBudget } from '@wasp/actions/createBudget';
  export { default as deleteBudget } from '@wasp/actions/deleteBudget';
}

declare module '@wasp/queries/getDashboardData' {
  import { User } from '@wasp/auth/useAuth';
  
  export interface DashboardData {
    recentTransactions: any[];
    totalIncome: number;
    totalExpenses: number;
    netSavings: number;
    incomeByCategory: any[];
    expensesByCategory: any[];
  }
  
  export default function getDashboardData(args: { userId: User['id'] }): Promise<DashboardData>;
}

declare module '@wasp/queries/getTransactions' {
  import { User } from '@wasp/auth/useAuth';
  
  export interface Transaction {
    id: number;
    amount: number;
    description: string;
    date: string;
    type: string;
    category_id: number;
    user_id: number;
    created_at: string;
    category?: {
      id: number;
      name: string;
      type: string;
    };
  }
  
  export default function getTransactions(args: { 
    userId: User['id'];
    type?: string;
    categoryId?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<Transaction[]>;
}

declare module '@wasp/queries/getCategories' {
  import { User } from '@wasp/auth/useAuth';
  
  export interface Category {
    id: number;
    name: string;
    type: string;
    created_at: string;
  }
  
  export default function getCategories(args: { 
    userId: User['id'];
    type?: string;
  }): Promise<Category[]>;
}

declare module '@wasp/queries/getBudgets' {
  import { User } from '@wasp/auth/useAuth';
  
  export interface Budget {
    id: number;
    month: number;
    year: number;
    user_id: number;
    created_at: string;
    categories: {
      id: number;
      amount: number;
      budget_id: number;
      category_id: number;
      category: {
        id: number;
        name: string;
        type: string;
      };
    }[];
  }
  
  export default function getBudgets(args: { 
    userId: User['id'];
    month?: number;
    year?: number;
  }): Promise<Budget[]>;
}

declare module '@wasp/actions/createTransaction' {
  import { User } from '@wasp/auth/useAuth';
  
  export default function createTransaction(args: {
    amount: number;
    description: string;
    date: string;
    type: string;
    categoryId: number;
    userId: User['id'];
  }): Promise<{ id: number }>;
}

declare module '@wasp/actions/deleteTransaction' {
  export default function deleteTransaction(args: { id: number }): Promise<void>;
}

declare module '@wasp/actions/createBudget' {
  import { User } from '@wasp/auth/useAuth';
  
  export default function createBudget(args: {
    month: number;
    year: number;
    categories: { categoryId: number; amount: number }[];
    userId: User['id'];
  }): Promise<{ id: number }>;
}

declare module '@wasp/actions/deleteBudget' {
  export default function deleteBudget(args: { id: number }): Promise<void>;
}

declare module '@wasp/core/HttpError' {
  export class HttpError extends Error {
    constructor(statusCode: number, message: string);
    statusCode: number;
  }
}

declare module '@wasp/queries/types' {
  import { User } from '@wasp/auth/useAuth';
  
  export interface QueryContext {
    user: User | null;
  }
  
  export type GetDashboardData = any;
  export type GetTransactions = any;
  export type GetCategories = any;
  export type GetBudgets = any;
}

declare module '@wasp/actions/types' {
  import { User, AuthUser } from '@wasp/auth/useAuth';
  
  export interface ActionContext {
    user: User | null;
    entities: any;
  }

  export type CreateBudget<Input = any, Output = any> = (args: Input, context: { entities: any; user?: AuthUser | undefined }) => Promise<Output>;

  export type DeleteBudget<Input = any, Output = any> = (args: Input, context: { entities: any; user?: AuthUser | undefined }) => Promise<Output>;

  export type CreateTransaction<Input = any, Output = any> = (args: Input, context: { entities: any; user?: AuthUser | undefined }) => Promise<Output>;

  export type DeleteTransaction<Input = any, Output = any> = (args: Input, context: { entities: any; user?: AuthUser | undefined }) => Promise<Output>;
}

declare module '@wasp/entities' {
  export interface User {
    id: number;
    username: string;
  }
  
  export interface Transaction {
    id: number;
    amount: number;
    description: string;
    date: string;
    type: string;
    category_id: number;
    user_id: number;
    created_at: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    type: string;
    created_at: string;
  }
  
  export interface Budget {
    id: number;
    month: number;
    year: number;
    user_id: number;
    created_at: string;
  }
  
  export interface BudgetCategory {
    id: number;
    amount: number;
    budget_id: number;
    category_id: number;
    created_at: string;
  }
}
