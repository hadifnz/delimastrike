import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Styles
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin/*" 
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;