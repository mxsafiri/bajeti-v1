import { HttpError } from '@wasp/core/HttpError';
import { GetBudgets } from '@wasp/queries/types';

export const getBudgets: GetBudgets<void, any> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to access budgets');
  }

  const userId = context.user.id;
  
  try {
    const budgets = await context.entities.Budget.findMany({
      where: { userId },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' }
      ]
    });
    
    return budgets;
  } catch (error) {
    console.error('Error fetching budgets:', error);
    throw new HttpError(500, 'Failed to fetch budgets');
  }
};
