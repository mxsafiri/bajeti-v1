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
