import { supabase, initializeDatabase } from './supabase';

/**
 * Initializes the database schema and seeds initial data
 * This function should be called when the application starts
 */
export async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Initialize database schema if needed
    await initializeDatabase();
    
    // Seed default categories
    await seedDefaultCategories();
    
    console.log('Database setup complete');
    return { success: true };
  } catch (error) {
    console.error('Error setting up database:', error);
    return { success: false, error };
  }
}

/**
 * Utility function to run database migrations
 * This can be called manually when needed to update the schema
 */
export async function runMigrations() {
  try {
    console.log('Running database migrations...');
    
    // Call the stored procedures to create tables
    await supabase.rpc('create_categories_table');
    await supabase.rpc('create_users_table');
    await supabase.rpc('create_transactions_table');
    await supabase.rpc('create_budgets_table');
    await supabase.rpc('create_budget_categories_table');
    
    console.log('Database migrations complete');
    return { success: true };
  } catch (error) {
    console.error('Error running migrations:', error);
    return { success: false, error };
  }
}

/**
 * Seeds default categories for income and expenses
 * These will be available to all users
 */
export async function seedDefaultCategories() {
  try {
    console.log('Seeding default categories...');
    
    // Check if default categories already exist
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('name')
      .eq('isSystem', true);
    
    if (existingCategories && existingCategories.length > 0) {
      console.log('Default categories already exist, skipping seed');
      return { success: true };
    }
    
    // Default expense categories
    const expenseCategories = [
      { name: 'Food & Dining', type: 'expense', isSystem: true },
      { name: 'Transportation', type: 'expense', isSystem: true },
      { name: 'Housing', type: 'expense', isSystem: true },
      { name: 'Utilities', type: 'expense', isSystem: true },
      { name: 'Healthcare', type: 'expense', isSystem: true },
      { name: 'Education', type: 'expense', isSystem: true },
      { name: 'Entertainment', type: 'expense', isSystem: true },
      { name: 'Shopping', type: 'expense', isSystem: true },
      { name: 'Personal Care', type: 'expense', isSystem: true },
      { name: 'Travel', type: 'expense', isSystem: true },
      { name: 'Gifts & Donations', type: 'expense', isSystem: true },
      { name: 'Business', type: 'expense', isSystem: true },
      { name: 'Other Expenses', type: 'expense', isSystem: true }
    ];
    
    // Default income categories
    const incomeCategories = [
      { name: 'Salary', type: 'income', isSystem: true },
      { name: 'Business Income', type: 'income', isSystem: true },
      { name: 'Investments', type: 'income', isSystem: true },
      { name: 'Rental Income', type: 'income', isSystem: true },
      { name: 'Gifts', type: 'income', isSystem: true },
      { name: 'Other Income', type: 'income', isSystem: true }
    ];
    
    // Insert all default categories
    const { error } = await supabase
      .from('categories')
      .insert([...expenseCategories, ...incomeCategories]);
    
    if (error) {
      throw error;
    }
    
    console.log('Default categories seeded successfully');
    return { success: true };
  } catch (error) {
    console.error('Error seeding default categories:', error);
    return { success: false, error };
  }
}
