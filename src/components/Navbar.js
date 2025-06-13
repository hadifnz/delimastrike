import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.svg" alt="SUKOL Logo" />
          <span>SUKOL</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Jadual</Link>
          {currentUser ? (
            <>
              <Link to="/admin" className="navbar-link">Admin</Link>
              <button onClick={handleLogout} className="navbar-link" style={{ background: 'none', border: 'none' }}>
                Log Keluar
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-link">Log Masuk</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;