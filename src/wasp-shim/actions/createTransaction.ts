// A simple shim for the Wasp createTransaction action
const createTransaction = async (transactionData: any) => {
  // This is just a placeholder for the build process
  // In a real app, this would make an API call to create a transaction
  console.log('Creating transaction with data:', transactionData);
  return {
    id: Math.floor(Math.random() * 1000),
    ...transactionData,
    date: new Date().toISOString()
  };
};

export default createTransaction;
