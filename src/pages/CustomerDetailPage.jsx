import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa"; // FontAwesome Icons

function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data
  const [transactions, setTransactions] = useState([
    {
      item: "Rice",
      amount: 500,
      due: "2025-05-01",
      repayments: [{ date: "2025-04-28", amount: 200 }],
    },
    { item: "Oil", amount: 700, due: "2025-05-15", repayments: [] },
    {
      item: "Sugar",
      amount: 400,
      due: "2025-06-10",
      repayments: [{ date: "2025-05-01", amount: 100 }],
    },
    { item: "Wheat", amount: 650, due: "2025-05-25", repayments: [] },
  ]);

  // State for repayments (local for each transaction)
  const [repaymentData, setRepaymentData] = useState(
    transactions.map(() => ({ date: "", amount: "" }))
  );

  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("isDarkMode");
    if (savedDarkMode === "true") {
      setIsDarkMode(true);
      document.body.classList.add("bg-dark", "text-light");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add("bg-dark", "text-light");
      localStorage.setItem("isDarkMode", "true");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
      localStorage.setItem("isDarkMode", "false");
    }
  };

  const handleRepaymentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRepaymentData = [...repaymentData];
    updatedRepaymentData[index] = {
      ...updatedRepaymentData[index],
      [name]: value,
    };
    setRepaymentData(updatedRepaymentData);
  };

  const handleAddRepayment = (e, index) => {
    e.preventDefault();

    const repaymentAmount = parseInt(repaymentData[index].amount);
    const loanAmount = transactions[index].amount;
    const currentRepayments = transactions[index].repayments;

    // Calculate the remaining balance
    const totalRepayment = currentRepayments.reduce(
      (sum, r) => sum + r.amount,
      0
    );
    const remainingBalance = loanAmount - totalRepayment;

    // Check if the repayment amount is valid
    if (repaymentAmount > remainingBalance) {
      alert("Repayment amount cannot exceed the remaining balance.");
      return;
    }

    // Update the transactions state with the new repayment
    const updatedTransactions = [...transactions];
    updatedTransactions[index].repayments.push({
      date: repaymentData[index].date,
      amount: repaymentAmount,
    });

    setTransactions(updatedTransactions); // This is where the state is updated

    // Reset repayment data for this transaction
    const updatedRepaymentData = [...repaymentData];
    updatedRepaymentData[index] = { date: "", amount: "" };
    setRepaymentData(updatedRepaymentData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container-fluid py-5 pt-5">
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg ${
          isDarkMode ? "bg-dark" : "bg-light"
        } w-100 fixed-top`}
      >
        <a className="navbar-brand text-light" href="#">
          CrediKhaata
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {" "}
            {/* This pushes the items to the right */}
            <li className="nav-item">
              <button className="btn btn-outline-primary" onClick={handleBack}>
                Back
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
            <li className="nav-item">
              {/* Dark Mode Icon */}
              <button
                className="btn btn-outline-secondary"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <FaSun className="text-light" /> : <FaMoon />}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <h2 className="text-center text-primary mb-5 mt-5">
        Customer #{id} - Loan Details
      </h2>

      <div className="row">
        {transactions.map((loan, i) => (
          <div key={i} className="col-md-6 mb-4">
            <div
              className="card border-1 shadow-sm rounded"
              style={{ borderColor: "#ccc" }}
            >
              <div className="card-body">
                <h5 className="card-title text-center text-dark">
                  {loan.item}
                </h5>
                <p className="card-text">
                  <strong>Loan Amount:</strong> ₹{loan.amount}
                </p>
                <p className="card-text">
                  <strong>Due Date:</strong> {loan.due}
                </p>

                <h6 className="mt-3 text-muted">Repayment History:</h6>
                <ul className="list-unstyled ms-3">
                  {loan.repayments.length === 0 ? (
                    <li>No repayments made yet.</li>
                  ) : (
                    loan.repayments.map((rep, j) => (
                      <li key={j}>
                        ₹{rep.amount} on {rep.date}
                      </li>
                    ))
                  )}
                </ul>

                <p className="card-text">
                  <strong>Remaining Balance: </strong>
                  <span className="text-warning">
                    ₹
                    {loan.amount -
                      loan.repayments.reduce((sum, r) => sum + r.amount, 0)}
                  </span>
                </p>

                {/* Form to Add Repayment */}
                <div className="mt-4">
                  <h5 className="text-muted">Add Repayment</h5>
                  <form
                    onSubmit={(e) => handleAddRepayment(e, i)}
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor={`date-${i}`} className="form-label">
                        Repayment Date
                      </label>
                      <input
                        type="date"
                        id={`date-${i}`}
                        name="date"
                        value={repaymentData[i].date}
                        onChange={(e) => handleRepaymentChange(e, i)}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`amount-${i}`} className="form-label">
                        Repayment Amount
                      </label>
                      <input
                        type="number"
                        id={`amount-${i}`}
                        name="amount"
                        value={repaymentData[i].amount}
                        onChange={(e) => handleRepaymentChange(e, i)}
                        className="form-control"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      style={{ borderRadius: "5px" }}
                    >
                      Add Repayment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDetailPage;
