import React from 'react';
import { useAuth } from '@wasp/auth/useAuth';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useQuery } from '@wasp/queries';
import getDashboardData from '@wasp/queries/getDashboardData';

export function DashboardPage() {
  const { data: user } = useAuth();
  const { data: dashboardData, isLoading, error } = useQuery(getDashboardData);
  
  // Use type assertion to avoid TypeScript errors
  const typedDashboardData = dashboardData as any;
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.username}! Here's an overview of your finances.
          </p>
        </div>
        
        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-6 bg-muted rounded w-32 mt-1"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {error && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle>Error Loading Dashboard</CardTitle>
              <CardDescription>
                There was a problem loading your dashboard data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-destructive">
                {error.message || 'Please try again later.'}
              </p>
            </CardContent>
          </Card>
        )}
        
        {typedDashboardData && (
          <>
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Income
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {typedDashboardData?.totalIncome 
                      ? `TZS ${typedDashboardData.totalIncome.toLocaleString()}` 
                      : 'TZS 0'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    +{typedDashboardData?.incomeChange || 0}% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Expenses
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {typedDashboardData?.totalExpenses 
                      ? `TZS ${typedDashboardData.totalExpenses.toLocaleString()}` 
                      : 'TZS 0'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {typedDashboardData?.expenseChange && typedDashboardData.expenseChange > 0 ? '+' : ''}
                    {typedDashboardData?.expenseChange || 0}% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Balance
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {typedDashboardData?.balance 
                      ? `TZS ${typedDashboardData.balance.toLocaleString()}` 
                      : 'TZS 0'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {typedDashboardData?.balanceChange && typedDashboardData.balanceChange > 0 ? '+' : ''}
                    {typedDashboardData?.balanceChange || 0}% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Budget Status
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {typedDashboardData?.budgetUsage 
                      ? `${typedDashboardData.budgetUsage}%` 
                      : 'No budget'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {typedDashboardData?.daysLeft 
                      ? `${typedDashboardData.daysLeft} days left in this month` 
                      : 'Set up a budget to track usage'}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Transactions */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your most recent financial activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {typedDashboardData?.recentTransactions?.length ? (
                  <div className="space-y-4">
                    {typedDashboardData.recentTransactions.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
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
                            <p className="text-sm text-muted-foreground">{transaction.category}</p>
                          </div>
                        </div>
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
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No transactions yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start tracking your income and expenses to see them here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </MainLayout>
  );
}
