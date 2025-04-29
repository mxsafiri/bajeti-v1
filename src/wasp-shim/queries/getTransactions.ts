// A simple shim for the Wasp getTransactions query
const getTransactions = async () => {
  // This is just a placeholder for the build process
  // In a real app, this would fetch data from your API
  return [
    {
      id: 1,
      amount: 5000,
      description: 'Salary',
      date: new Date().toISOString(),
      type: 'income',
      categoryId: 3,
      category: {
        id: 3,
        name: 'Salary',
        type: 'income'
      }
    },
    {
      id: 2,
      amount: 2000,
      description: 'Groceries',
      date: new Date().toISOString(),
      type: 'expense',
      categoryId: 1,
      category: {
        id: 1,
        name: 'Food',
        type: 'expense'
      }
    }
  ];
};

export default getTransactions;
