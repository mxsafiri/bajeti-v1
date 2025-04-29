import { HttpError } from '@wasp/core/HttpError';
import { GetTransactions } from '@wasp/queries/types';

export const getTransactions: GetTransactions<void, any> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to access transactions');
  }

  const userId = context.user.id;
  
  try {
    const transactions = await context.entities.Transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: 'desc' }
    });
    
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new HttpError(500, 'Failed to fetch transactions');
  }
};
