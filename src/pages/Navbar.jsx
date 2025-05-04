// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isDarkMode, toggleDarkMode, handleLogout }) => {
  return (
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
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>

            {/* 🌙 Dark Mode Toggle Button After Logout */}
            <li className="nav-item">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={toggleDarkMode}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
  );
};

export default Navbar;
