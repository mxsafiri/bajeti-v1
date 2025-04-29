import { HttpError } from '@wasp/core/HttpError';
import { CreateTransaction, DeleteTransaction } from '@wasp/actions/types';

type CreateTransactionInput = {
  amount: number;
  description: string;
  type: 'income' | 'expense';
  categoryId: number;
};

type DeleteTransactionInput = {
  id: number;
};

export const createTransaction: CreateTransaction<CreateTransactionInput, any> = async (
  { amount, description, type, categoryId },
  context
) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to create a transaction');
  }

  if (amount <= 0) {
    throw new HttpError(400, 'Amount must be greater than 0');
  }

  if (!description) {
    throw new HttpError(400, 'Description is required');
  }

  if (!categoryId) {
    throw new HttpError(400, 'Category is required');
  }

  try {
    // Verify that the category exists and is of the correct type
    const category = await context.entities.Category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      throw new HttpError(404, 'Category not found');
    }

    if (category.type !== type) {
      throw new HttpError(400, `Category type must be ${type}`);
    }

    // Create the transaction
    const transaction = await context.entities.Transaction.create({
      data: {
        amount,
        description,
        type,
        date: new Date(),
        user: { connect: { id: context.user.id } },
        category: { connect: { id: categoryId } }
      }
    });

    return transaction;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    console.error('Error creating transaction:', error);
    throw new HttpError(500, 'Failed to create transaction');
  }
};

export const deleteTransaction: DeleteTransaction<DeleteTransactionInput, any> = async (
  { id },
  context
) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to delete a transaction');
  }

  try {
    // Check if the transaction exists and belongs to the user
    const transaction = await context.entities.Transaction.findUnique({
      where: { id }
    });

    if (!transaction) {
      throw new HttpError(404, 'Transaction not found');
    }

    if (transaction.userId !== context.user.id) {
      throw new HttpError(403, 'You do not have permission to delete this transaction');
    }

    // Delete the transaction
    await context.entities.Transaction.delete({
      where: { id }
    });

    return { success: true };
  } catch (error) {
    if (error instanceof HttpError) throw error;
    console.error('Error deleting transaction:', error);
    throw new HttpError(500, 'Failed to delete transaction');
  }
};
