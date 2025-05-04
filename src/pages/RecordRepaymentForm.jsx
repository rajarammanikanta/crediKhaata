// src/pages/RecordRepaymentForm.js
import React, { useState } from 'react';

function RecordRepaymentForm() {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Record repayment logic
    console.log('Repayment recorded:', { amount, date });
  };

  return (
    <div className="container p-4">
      <h2>Record Repayment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Repayment Amount</label>
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
          <label htmlFor="date" className="form-label">Repayment Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Record Repayment</button>
      </form>
    </div>
  );
}

export default RecordRepaymentForm;
