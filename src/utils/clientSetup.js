// Import our global CSS file which contains Tailwind directives
import '../styles/globals.css';

export const clientSetup = () => {
  // This function will be called by Wasp during client initialization
  // We can add any client-side setup logic here if needed in the future
  console.log('Client setup initialized with Tailwind CSS');
};
