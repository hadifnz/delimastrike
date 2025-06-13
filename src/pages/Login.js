import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setError('Gagal log masuk. Sila semak e-mel dan kata laluan anda.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container login-container">
      <h2 className="login-title">Log Masuk Admin</h2>
      
      <div className="login-form">
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">E-mel</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Kata Laluan</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Memasuki...' : 'Log Masuk'}
          </button>
        </form>
        
        <div className="text-center mt-3">
          <p>Hanya untuk kegunaan admin sahaja.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;