// src/pages/DashboardPage.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddLoanForm from "./AddLoanForm";
import jsPDF from "jspdf";

const initialCustomers = [
  {
    id: 1,
    name: "Ravi",
    balance: 1500,
    dueDate: "2025-05-10",
    status: "Overdue",
  },
  {
    id: 2,
    name: "Sita",
    balance: 0,
    dueDate: "2025-06-01",
    status: "Up-to-date",
  },
  {
    id: 3,
    name: "Kumar",
    balance: 500,
    dueDate: "2025-05-20",
    status: "Up-to-date",
  },
  {
    id: 4,
    name: "Priya",
    balance: 2000,
    dueDate: "2025-04-25",
    status: "Overdue",
  },
  {
    id: 5,
    name: "Amit",
    balance: 750,
    dueDate: "2025-05-30",
    status: "Up-to-date",
  },
  {
    id: 6,
    name: "Geeta",
    balance: 1200,
    dueDate: "2025-04-28",
    status: "Overdue",
  },
];

function DashboardPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("isDarkMode");
    if (savedDarkMode === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
    navigate("/");
  };

  const addLoan = (newLoan) => {
    setCustomers((prev) => [...prev, { id: prev.length + 1, ...newLoan }]);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("isDarkMode", newMode);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Customer Dashboard", 14, 20);
    doc.setFontSize(12);

    customers.forEach((customer, index) => {
      doc.text(
        `Name: ${customer.name}, Balance: ₹${customer.balance}, Due Date: ${customer.dueDate}, Status: ${customer.status}`,
        14,
        30 + index * 10
      );
    });

    doc.save("dashboard.pdf");
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg ${
          isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        } shadow fixed-top`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            CrediKhaata
          </a>

          {/* 🍔 Hamburger Icon */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={handleLogout}>
                  Logout
                </a>
              </li>

              {/* 🌙 Dark Mode Toggle Button After Logout */}
              <li className="nav-item">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={toggleDarkMode}
                  title={
                    isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                  }
                >
                  <i
                    className={`bi ${
                      isDarkMode ? "bi-sun-fill" : "bi-moon-fill"
                    }`}
                  ></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div
        className={`container-fluid py-5 mt-5 ${
          isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
        } min-vh-100`}
      >
        <h2 className="text-center text-primary fw-bold mb-4">
          Customer Dashboard
        </h2>

        {/* Customer Cards */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
          {customers.map((customer) => (
            <div className="col" key={customer.id}>
              <Link
                to={`/customer/${customer.id}`}
                className={`card text-white p-3 h-100 ${
                  customer.status === "Overdue" ? "bg-danger" : "bg-success"
                } border-0 shadow-lg text-decoration-none rounded-3`}
                style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-center fs-4">
                    {customer.name}
                  </h5>
                  <p className="card-text">Balance: ₹{customer.balance}</p>
                  <p className="card-text">Next Due: {customer.dueDate}</p>
                  <p className="card-text">
                    <strong>Status: </strong>
                    {customer.status}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Add Loan Form */}
        <div className="mt-5">
          <h4 className="text-center text-primary fw-semibold mb-4">
            Add a New Loan
          </h4>
          <AddLoanForm addLoan={addLoan} />
        </div>

        {/* Export PDF Button */}
        <div className="text-center mt-4">
          <button
            onClick={exportToPDF}
            className="btn btn-primary px-4 py-2 fw-semibold"
          >
            Export to PDF
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
