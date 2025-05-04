import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
      </div>
      <div>
        {user && (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;