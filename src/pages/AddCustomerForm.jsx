// src/pages/AddCustomerForm.js
import React, { useState } from 'react';

function AddCustomerForm() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save customer data
    console.log('New customer added', { name, balance });
  };

  return (
    <div className="container p-4">
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="balance" className="form-label">Initial Balance</label>
          <input
            type="number"
            className="form-control"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomerForm;
