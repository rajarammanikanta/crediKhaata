// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import AddCustomerForm from './pages/AddCustomerForm';
import AddLoanForm from './pages/AddLoanForm';
import RecordRepaymentForm from './pages/RecordRepaymentForm';
import ProtectedRoute from './components/ProtectedRoute';
// src/index.js or src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';




function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/:id"
            element={
              <ProtectedRoute>
                <CustomerDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-customer"
            element={
              <ProtectedRoute>
                <AddCustomerForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-loan"
            element={
              <ProtectedRoute>
                <AddLoanForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/record-repayment"
            element={
              <ProtectedRoute>
                <RecordRepaymentForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
