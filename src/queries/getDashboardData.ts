import { HttpError } from '@wasp/core/HttpError';
import { Transaction, Category } from '@wasp/entities';
import { GetDashboardData } from '@wasp/queries/types';

export const getDashboardData: GetDashboardData<void, any> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to access dashboard data');
  }

  const userId = context.user.id;
  
  try {
    // Get current date info for calculations
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    
    // Calculate start of current and previous months
    const currentMonthStart = new Date(currentYear, currentMonth - 1, 1);
    const lastMonthStart = new Date(lastMonthYear, lastMonth - 1, 1);
    
    // Get all transactions for the current user
    const allTransactions = await context.entities.Transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: 'desc' }
    });
    
    // Filter transactions for current and previous months
    const currentMonthTransactions = allTransactions.filter(t => 
      new Date(t.date) >= currentMonthStart
    );
    
    const lastMonthTransactions = allTransactions.filter(t => 
      new Date(t.date) >= lastMonthStart && new Date(t.date) < currentMonthStart
    );
    
    // Calculate totals for current month
    const currentMonthIncome = currentMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const currentMonthExpenses = currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate totals for previous month
    const lastMonthIncome = lastMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const lastMonthExpenses = lastMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate percentage changes
    const incomeChange = lastMonthIncome === 0 
      ? 100 
      : Math.round((currentMonthIncome - lastMonthIncome) / lastMonthIncome * 100);
    
    const expenseChange = lastMonthExpenses === 0 
      ? 0 
      : Math.round((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses * 100);
    
    const currentBalance = currentMonthIncome - currentMonthExpenses;
    const lastMonthBalance = lastMonthIncome - lastMonthExpenses;
    
    const balanceChange = lastMonthBalance === 0 
      ? (currentBalance > 0 ? 100 : 0)
      : Math.round((currentBalance - lastMonthBalance) / Math.abs(lastMonthBalance) * 100);
    
    // Get budget data
    const currentBudget = await context.entities.Budget.findFirst({
      where: {
        userId,
        month: currentMonth,
        year: currentYear
      },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });
    
    // Calculate budget usage if budget exists
    let budgetUsage = null;
    let daysLeft = null;
    
    if (currentBudget) {
      const totalBudget = currentBudget.categories.reduce((sum, bc) => sum + bc.amount, 0);
      budgetUsage = totalBudget > 0 
        ? Math.round((currentMonthExpenses / totalBudget) * 100) 
        : 0;
      
      // Calculate days left in the month
      const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
      daysLeft = lastDayOfMonth - today.getDate();
    }
    
    // Get recent transactions (last 5)
    const recentTransactions = allTransactions
      .slice(0, 5)
      .map(t => ({
        id: t.id,
        amount: t.amount,
        description: t.description,
        date: t.date,
        type: t.type,
        category: t.category.name
      }));
    
    return {
      totalIncome: currentMonthIncome,
      totalExpenses: currentMonthExpenses,
      balance: currentBalance,
      incomeChange,
      expenseChange,
      balanceChange,
      budgetUsage,
      daysLeft,
      recentTransactions
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new HttpError(500, 'Failed to fetch dashboard data');
  }
};
