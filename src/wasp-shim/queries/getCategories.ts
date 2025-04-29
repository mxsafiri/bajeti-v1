// A simple shim for the Wasp getCategories query
const getCategories = async () => {
  // This is just a placeholder for the build process
  // In a real app, this would fetch data from your API
  return [
    {
      id: 1,
      name: 'Food',
      type: 'expense'
    },
    {
      id: 2,
      name: 'Transportation',
      type: 'expense'
    },
    {
      id: 3,
      name: 'Salary',
      type: 'income'
    }
  ];
};

export default getCategories;
