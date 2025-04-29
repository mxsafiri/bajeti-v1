// A simple shim for the Wasp createBudget action
const createBudget = async (budgetData: any) => {
  // This is just a placeholder for the build process
  // In a real app, this would make an API call to create a budget
  console.log('Creating budget with data:', budgetData);
  return {
    id: Math.floor(Math.random() * 1000),
    ...budgetData,
    created_at: new Date().toISOString()
  };
};

export default createBudget;
