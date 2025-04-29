import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useQuery } from '@wasp/queries';
import getTransactions from '@wasp/queries/getTransactions';
import getCategories from '@wasp/queries/getCategories';
import { createTransaction, deleteTransaction } from '@wasp/actions';

type Transaction = {
  id: number;
  amount: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
  userId: number;
  category: {
    id: number;
    name: string;
    type: string;
  };
};

type Category = {
  id: number;
  name: string;
  type: string;
};

export function TransactionsPage() {
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: transactions, isLoading: isLoadingTransactions, error: transactionsError } = 
    useQuery(getTransactions);
  
  const { data: categories, isLoading: isLoadingCategories } = 
    useQuery(getCategories);

  const handleCreateTransaction = async () => {
    if (!amount || !description || !categoryId) return;
    
    try {
      await createTransaction({
        amount: parseFloat(amount),
        description,
        type: transactionType,
        categoryId,
        date: new Date().toISOString(),
        userId: 0 // This will be overridden by the server with the actual authenticated user ID
      });
      
      // Reset form
      setAmount('');
      setDescription('');
      setCategoryId(null);
      setIsAddingTransaction(false);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    try {
      await deleteTransaction({ id });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const filteredTransactions = transactions ? (transactions as any[]).filter((transaction) => {
    // Apply type filter
    if (filter !== 'all' && transaction.type !== filter) return false;
    
    // Apply search filter
    if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  }) : [];

  const relevantCategories = categories ? (categories as any[]).filter((category) => 
    category.type === transactionType
  ) : [];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground">
              Manage your income and expenses
            </p>
          </div>
          <Button onClick={() => setIsAddingTransaction(true)}>
            Add Transaction
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="flex-1 sm:flex-none"
            >
              All
            </Button>
            <Button
              variant={filter === 'income' ? 'default' : 'outline'}
              onClick={() => setFilter('income')}
              className="flex-1 sm:flex-none"
            >
              Income
            </Button>
            <Button
              variant={filter === 'expense' ? 'default' : 'outline'}
              onClick={() => setFilter('expense')}
              className="flex-1 sm:flex-none"
            >
              Expenses
            </Button>
          </div>
        </div>

        {/* Add Transaction Form */}
        {isAddingTransaction && (
          <Card>
            <CardHeader>
              <CardTitle>Add Transaction</CardTitle>
              <CardDescription>
                Record a new income or expense
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant={transactionType === 'expense' ? 'default' : 'outline'}
                    onClick={() => setTransactionType('expense')}
                    className="flex-1"
                  >
                    Expense
                  </Button>
                  <Button
                    variant={transactionType === 'income' ? 'default' : 'outline'}
                    onClick={() => setTransactionType('income')}
                    className="flex-1"
                  >
                    Income
                  </Button>
                </div>

                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Amount (TZS)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Description
                  </label>
                  <Input
                    id="description"
                    placeholder="What was this for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Category
                  </label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={categoryId || ''}
                    onChange={(e) => setCategoryId(parseInt(e.target.value))}
                  >
                    <option value="">Select a category</option>
                    {isLoadingCategories ? (
                      <option disabled>Loading categories...</option>
                    ) : (
                      relevantCategories?.map((category: Category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingTransaction(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTransaction}>
                    Save Transaction
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Transactions</CardTitle>
            <CardDescription>
              {filteredTransactions?.length
                ? `Showing ${filteredTransactions.length} ${filter !== 'all' ? filter : ''} transaction${filteredTransactions.length !== 1 ? 's' : ''}`
                : 'No transactions found'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingTransactions ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-muted"></div>
                      <div>
                        <div className="h-4 bg-muted rounded w-32"></div>
                        <div className="h-3 bg-muted rounded w-24 mt-2"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-4 bg-muted rounded w-20"></div>
                      <div className="h-3 bg-muted rounded w-16 mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : transactionsError ? (
              <div className="text-center py-6 text-destructive">
                Error loading transactions: {transactionsError.message}
              </div>
            ) : filteredTransactions?.length ? (
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'income' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M2 12h20M12 9l-3 3M12 9l3 3" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M2 12h20M9 15l3 3M15 15l-3 3" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'} TZS {transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No transactions found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {filter !== 'all'
                    ? `Try changing your filter or add a new ${filter} transaction`
                    : 'Start tracking your income and expenses by adding a transaction'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
