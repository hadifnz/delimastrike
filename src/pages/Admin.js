import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// Admin components
import Dashboard from '../components/admin/Dashboard';
import MatchList from '../components/admin/MatchList';
import MatchForm from '../components/admin/MatchForm';
import CategoryList from '../components/admin/CategoryList';
import CategoryForm from '../components/admin/CategoryForm';

function Admin() {
  const location = useLocation();
  
  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h3 className="sidebar-title">Panel Admin</h3>
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <Link 
              to="/admin" 
              className={`sidebar-menu-link ${isActive('/admin') && !isActive('/admin/matches') && !isActive('/admin/categories') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link 
              to="/admin/matches" 
              className={`sidebar-menu-link ${isActive('/admin/matches') ? 'active' : ''}`}
            >
              Jadual Perlawanan
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link 
              to="/admin/categories" 
              className={`sidebar-menu-link ${isActive('/admin/categories') ? 'active' : ''}`}
            >
              Kategori Sukan
            </Link>
          </li>
        </ul>
      </aside>
      
      <main className="admin-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/matches" element={<MatchList />} />
          <Route path="/matches/add" element={<MatchForm />} />
          <Route path="/matches/edit/:id" element={<MatchForm />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/add" element={<CategoryForm />} />
          <Route path="/categories/edit/:id" element={<CategoryForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default Admin;