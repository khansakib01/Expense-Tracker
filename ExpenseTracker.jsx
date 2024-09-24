import React, { useState } from 'react';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]); // Start with an empty array
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [warning, setWarning] = useState('');

  // Add Transaction
  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.date) {
      setWarning('Please fill in description, amount, and date.');
      return;
    }

    // Check for duplicate description
    const duplicate = transactions.find(
      (transaction) => transaction.description.toLowerCase() === newTransaction.description.toLowerCase()
    );

    if (duplicate) {
      setWarning('Transaction with this description already exists.');
      return;
    }

    if (!isEditing) {
      setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    } else {
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === currentTransaction.id
          ? { ...transaction, description: newTransaction.description, amount: newTransaction.amount, date: newTransaction.date }
          : transaction
      );
      setTransactions(updatedTransactions);
      setIsEditing(false);
    }

    setNewTransaction({ description: '', amount: '', date: '' });
    setWarning('');
  };

  // Delete Transaction
  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  // Edit Transaction
  const handleEdit = (transaction) => {
    setIsEditing(true);
    setCurrentTransaction(transaction);
    setNewTransaction({ description: transaction.description, amount: transaction.amount, date: transaction.date });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-600">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Transactions</h2>

        {/* Transactions Table */}
        <div className="flex flex-col">
          <div className="grid grid-cols-4 gap-4 mb-4 font-semibold">
            <div>Description</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Action</div>
          </div>

          {transactions.map((transaction) => (
            <div className="grid grid-cols-4 gap-4 mb-2" key={transaction.id}>
              <div>{transaction.description}</div>
              <div>{transaction.amount}</div>
              <div>{transaction.date}</div>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() => handleEdit(transaction)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(transaction.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Warning message */}
        {warning && <p className="text-red-500 text-center mb-4">{warning}</p>}

        {/* Add Transaction Form */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-center">Add Your Transactions</h3>
          <input
            className="border px-4 py-2 mb-2 w-full rounded"
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
          <input
            className="border px-4 py-2 mb-2 w-full rounded"
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseInt(e.target.value) })}
          />
          <input
            className="border px-4 py-2 mb-2 w-full rounded"
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
          <button
            className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700"
            onClick={handleAddTransaction}
          >
            {isEditing ? 'Update Transaction' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
