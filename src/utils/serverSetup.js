import { setupDatabase } from './dbSetup';

export const serverSetup = async () => {
  console.log('Server starting up...');
  
  // Initialize the database
  try {
    await setupDatabase();
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
  
  console.log('Server setup complete');
};
