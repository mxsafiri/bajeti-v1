// A simple shim for the Wasp getDashboardData query
const getDashboardData = async () => {
  // This is just a placeholder for the build process
  // In a real app, this would fetch data from your API
  return {
    totalIncome: 10000,
    totalExpenses: 7000,
    balance: 3000,
    recentTransactions: [
      {
        id: 1,
        amount: 5000,
        description: 'Salary',
        date: new Date().toISOString(),
        type: 'income',
        category: {
          id: 3,
          name: 'Salary',
          type: 'income'
        }
      },
      {
        id: 2,
        amount: 2000,
        description: 'Groceries',
        date: new Date().toISOString(),
        type: 'expense',
        category: {
          id: 1,
          name: 'Food',
          type: 'expense'
        }
      }
    ],
    budgetSummary: {
      totalBudgeted: 7000,
      totalSpent: 5000,
      remaining: 2000
    }
  };
};

export default getDashboardData;
