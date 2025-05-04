// src/pages/AddLoanForm.js
import React, { useState } from 'react';

function AddLoanForm({ addLoan }) {
  const [customerName, setCustomerName] = useState('');
  const [loanItem, setLoanItem] = useState(''); // Loan item
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new loan object with both customer name and loan item
    const newLoan = { customerName, loanItem, loanAmount: amount, dueDate, status: 'Up-to-date' };
    addLoan(newLoan); // Add the new loan to the customer list
    setCustomerName(''); // Reset input fields
    setLoanItem('');
    setAmount('');
    setDueDate('');
  };

  return (
    <div className="container p-4 mt-5">
      {/* <h4 className="text-center text-primary">Add New Loan</h4> */}
      <form
        onSubmit={handleSubmit}
        className={`shadow-lg p-4 rounded ${document.body.classList.contains('dark-mode') ? 'bg-dark text-white' : 'bg-light text-dark'}`}
      >
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loanItem" className="form-label">Loan Item</label>
          <input
            type="text"
            className="form-control"
            id="loanItem"
            value={loanItem}
            onChange={(e) => setLoanItem(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Loan Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Loan</button>
      </form>
    </div>
  );
}

export default AddLoanForm;
