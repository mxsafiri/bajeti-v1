// A simple shim for the Wasp getBudgets query
const getBudgets = async () => {
  // This is just a placeholder for the build process
  // In a real app, this would fetch data from your API
  return [
    {
      id: 1,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      user_id: 1,
      created_at: new Date().toISOString(),
      categories: [
        {
          id: 1,
          name: 'Food',
          type: 'expense',
          amount: 5000,
          budget_id: 1
        },
        {
          id: 2,
          name: 'Transportation',
          type: 'expense',
          amount: 2000,
          budget_id: 1
        }
      ]
    }
  ];
};

export default getBudgets;
