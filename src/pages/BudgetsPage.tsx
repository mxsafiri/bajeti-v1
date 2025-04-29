import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useQuery } from '@wasp/queries';
import getBudgets from '@wasp/queries/getBudgets';
import getCategories from '@wasp/queries/getCategories';
import createBudget from '@wasp/actions/createBudget';
import deleteBudget from '@wasp/actions/deleteBudget';
import { useAuth } from '@wasp/auth/useAuth';

// Using the type from Wasp's generated types
type Budget = {
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
    }
  }[];
};

type Category = {
  id: number;
  name: string;
  type: string;
};

export function BudgetsPage() {
  const { data: user, isLoading: isLoadingAuth } = useAuth();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  const currentYear = currentDate.getFullYear();
  
  const [isCreatingBudget, setIsCreatingBudget] = useState(false);
  const [budgetMonth, setBudgetMonth] = useState(currentMonth);
  const [budgetYear, setBudgetYear] = useState(currentYear);
  const [categoryAmounts, setCategoryAmounts] = useState<Record<number, string>>({});

  // Only pass query args if user is logged in
  const budgetsArgs = user ? { userId: user.id } : undefined;
  const categoriesArgs = user ? { userId: user.id } : undefined;

  const { data: budgets, isLoading: isLoadingBudgets, error: budgetsError, refetch: refetchBudgets } = 
    useQuery(getBudgets, budgetsArgs, { enabled: !!user });
  
  const { data: categories, isLoading: isLoadingCategories } = 
    useQuery(getCategories, categoriesArgs, { enabled: !!user });

  const expenseCategories = categories?.filter((category: Category) => 
    category.type === 'expense'
  ) || [];

  const handleCreateBudget = async () => {
    if (!user) {
      alert('You must be logged in to create a budget');
      return;
    }
    
    // Convert category amounts to numbers and filter out empty values
    const budgetCategories = Object.entries(categoryAmounts)
      .filter(([_, amount]) => amount !== '')
      .map(([categoryId, amount]) => ({
        categoryId: parseInt(categoryId),
        amount: parseFloat(amount)
      }));

    if (budgetCategories.length === 0) {
      alert('Please set at least one category budget amount');
      return;
    }

    try {
      await createBudget({
        month: budgetMonth,
        year: budgetYear,
        categories: budgetCategories,
        userId: user.id
      });
      
      // Reset form
      setCategoryAmounts({});
      setIsCreatingBudget(false);
      
      // Refresh budgets list
      refetchBudgets();
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  const handleDeleteBudget = async (id: number) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      try {
        await deleteBudget({ id });
        // Refresh budgets list
        refetchBudgets();
      } catch (error) {
        console.error('Error deleting budget:', error);
      }
    }
  };

  const formatMonth = (month: number) => {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  if (isLoadingAuth || isLoadingBudgets || isLoadingCategories) {
    return (
      <MainLayout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Budgets</h1>
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Budgets</h1>
          <p>Please log in to view and manage your budgets.</p>
        </div>
      </MainLayout>
    );
  }

  if (budgetsError) {
    return (
      <MainLayout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Budgets</h1>
          <p className="text-red-500">Error loading budgets: {budgetsError.message}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Budgets</h1>
          {!isCreatingBudget && (
            <Button onClick={() => setIsCreatingBudget(true)}>Create New Budget</Button>
          )}
        </div>

        {isCreatingBudget && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Budget</CardTitle>
              <CardDescription>Set your budget for each expense category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Month</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={budgetMonth}
                    onChange={(e) => setBudgetMonth(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month}>
                        {formatMonth(month)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={budgetYear}
                    onChange={(e) => setBudgetYear(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Expense Categories</h3>
                {expenseCategories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <span className="w-1/2">{category.name}</span>
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={categoryAmounts[category.id] || ''}
                      onChange={(e) => setCategoryAmounts({
                        ...categoryAmounts,
                        [category.id]: e.target.value
                      })}
                      className="w-1/2"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreatingBudget(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateBudget}>
                  Save Budget
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {!budgets || budgets.length === 0 ? (
            <p>No budgets found. Create your first budget to get started!</p>
          ) : (
            budgets.map((budget: Budget) => (
              <Card key={budget.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {formatMonth(budget.month)} {budget.year} Budget
                    </CardTitle>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteBudget(budget.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    {budget.categories.map((budgetCategory) => (
                      <div key={budgetCategory.id} className="flex justify-between py-2 border-b">
                        <span>{budgetCategory.category.name}</span>
                        <span className="font-medium">
                          TZS {budgetCategory.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 font-bold">
                      <span>Total</span>
                      <span>
                        TZS {budget.categories.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
