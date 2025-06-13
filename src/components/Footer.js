import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">
          <img src="/logo.svg" alt="SUKOL Logo" />
          <span>SUKOL</span>
        </div>
        <div className="footer-links">
          <Link to="/" className="footer-link">Jadual</Link>
          <Link to="/login" className="footer-link">Admin</Link>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; {currentYear} SUKOL - Sistem Jadual Perlawanan. Hak Cipta Terpelihara.
      </div>
    </footer>
  );
}

export default Footer;