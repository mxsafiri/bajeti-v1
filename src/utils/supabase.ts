import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to initialize the database schema if needed
export async function initializeDatabase() {
  try {
    // Check if our tables exist, if not create them
    const { error: checkError } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    // If we get an error about the table not existing, create our schema
    if (checkError && checkError.message.includes('does not exist')) {
      console.log('Initializing database schema...');
      await createSchema();
      await seedInitialData();
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Function to create our database schema
async function createSchema() {
  // Create categories table
  const { error: categoriesError } = await supabase.rpc('create_categories_table');
  if (categoriesError) console.error('Error creating categories table:', categoriesError);

  // Create transactions table
  const { error: transactionsError } = await supabase.rpc('create_transactions_table');
  if (transactionsError) console.error('Error creating transactions table:', transactionsError);

  // Create budgets table
  const { error: budgetsError } = await supabase.rpc('create_budgets_table');
  if (budgetsError) console.error('Error creating budgets table:', budgetsError);

  // Create budget_categories table
  const { error: budgetCategoriesError } = await supabase.rpc('create_budget_categories_table');
  if (budgetCategoriesError) console.error('Error creating budget_categories table:', budgetCategoriesError);
}

// Function to seed initial data (default categories)
async function seedInitialData() {
  // Seed default expense categories
  const expenseCategories = [
    { name: 'Food & Dining', type: 'expense' },
    { name: 'Transportation', type: 'expense' },
    { name: 'Housing', type: 'expense' },
    { name: 'Utilities', type: 'expense' },
    { name: 'Entertainment', type: 'expense' },
    { name: 'Healthcare', type: 'expense' },
    { name: 'Education', type: 'expense' },
    { name: 'Shopping', type: 'expense' },
    { name: 'Personal Care', type: 'expense' },
    { name: 'Other Expenses', type: 'expense' }
  ];

  // Seed default income categories
  const incomeCategories = [
    { name: 'Salary', type: 'income' },
    { name: 'Business', type: 'income' },
    { name: 'Investments', type: 'income' },
    { name: 'Gifts', type: 'income' },
    { name: 'Other Income', type: 'income' }
  ];

  // Insert expense categories
  const { error: expenseError } = await supabase
    .from('categories')
    .insert(expenseCategories);
  
  if (expenseError) console.error('Error seeding expense categories:', expenseError);

  // Insert income categories
  const { error: incomeError } = await supabase
    .from('categories')
    .insert(incomeCategories);
  
  if (incomeError) console.error('Error seeding income categories:', incomeError);
}
