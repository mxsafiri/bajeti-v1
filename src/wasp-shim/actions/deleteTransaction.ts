// A simple shim for the Wasp deleteTransaction action
const deleteTransaction = async ({ id }: { id: number }) => {
  // This is just a placeholder for the build process
  // In a real app, this would make an API call to delete a transaction
  console.log('Deleting transaction with id:', id);
  return { success: true };
};

export default deleteTransaction;
