import { HttpError } from '@wasp/core/HttpError';
import { CreateBudget, DeleteBudget } from '@wasp/actions/types';

type CreateBudgetInput = {
  month: number;
  year: number;
  categories: {
    id: number;
    amount: number;
  }[];
};

type DeleteBudgetInput = {
  id: number;
};

export const createBudget: CreateBudget<CreateBudgetInput, any> = async (
  { month, year, categories }: CreateBudgetInput,
  context: any
) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to create a budget');
  }

  if (month < 1 || month > 12) {
    throw new HttpError(400, 'Month must be between 1 and 12');
  }

  if (categories.length === 0) {
    throw new HttpError(400, 'At least one category budget is required');
  }

  try {
    // Check if a budget already exists for this month and year
    const existingBudget = await context.entities.Budget.findFirst({
      where: {
        userId: context.user.id,
        month,
        year
      }
    });

    if (existingBudget) {
      throw new HttpError(400, `A budget for ${month}/${year} already exists`);
    }

    // Verify that all categories exist and are expense categories
    const categoryIds = categories.map((c: { id: number }) => c.id);
    const validCategories = await context.entities.Category.findMany({
      where: {
        id: { in: categoryIds },
        type: 'expense'
      }
    });

    if (validCategories.length !== categoryIds.length) {
      throw new HttpError(400, 'One or more categories are invalid or not expense categories');
    }

    // Create the budget with budget categories
    const budget = await context.entities.Budget.create({
      data: {
        month,
        year,
        user: { connect: { id: context.user.id } },
        categories: {
          create: categories.map((c: { id: number, amount: number }) => ({
            amount: c.amount,
            category: { connect: { id: c.id } }
          }))
        }
      },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });

    return budget;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    console.error('Error creating budget:', error);
    throw new HttpError(500, 'Failed to create budget');
  }
};

export const deleteBudget: DeleteBudget<DeleteBudgetInput, any> = async (
  { id }: DeleteBudgetInput,
  context: any
) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to delete a budget');
  }

  try {
    // Check if the budget exists and belongs to the user
    const budget = await context.entities.Budget.findUnique({
      where: { id }
    });

    if (!budget) {
      throw new HttpError(404, 'Budget not found');
    }

    if (budget.userId !== context.user.id) {
      throw new HttpError(403, 'You do not have permission to delete this budget');
    }

    // Delete the budget (cascade delete will handle budget categories)
    await context.entities.Budget.delete({
      where: { id }
    });

    return { success: true };
  } catch (error) {
    if (error instanceof HttpError) throw error;
    console.error('Error deleting budget:', error);
    throw new HttpError(500, 'Failed to delete budget');
  }
};
