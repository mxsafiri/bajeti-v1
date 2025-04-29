import { HttpError } from '@wasp/core/HttpError';
import { GetCategories } from '@wasp/queries/types';

export const getCategories: GetCategories<void, any> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to access categories');
  }

  try {
    // Get system default categories
    const systemCategories = await context.entities.Category.findMany({
      where: { isSystem: true }
    });
    
    // Get user-created categories
    const userCategories = await context.entities.Category.findMany({
      where: { 
        userId: context.user.id,
        isSystem: false
      }
    });
    
    // Combine and return all categories
    return [...systemCategories, ...userCategories];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new HttpError(500, 'Failed to fetch categories');
  }
};
