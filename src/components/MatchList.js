import React from 'react';
import Match from './Match';
import '../styles/App.css';

/**
 * Komponen MatchList untuk memaparkan senarai perlawanan
 * 
 * @param {Array} matches - Senarai perlawanan untuk dipaparkan
 * @param {boolean} loading - Status loading data
 * @param {string} error - Mesej ralat jika ada
 */
const MatchList = ({ matches, loading, error }) => {
  if (loading) {
    return (
      <div className="match-list-container loading">
        <div className="loading-spinner"></div>
        <p>Memuat jadual perlawanan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="match-list-container error">
        <div className="error-message">
          <h3>Ralat</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="match-list-container empty">
        <div className="empty-message">
          <h3>Tiada Perlawanan</h3>
          <p>Tiada perlawanan yang dijadualkan buat masa ini.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="match-list-container">
      <div className="match-list">
        {matches.map((match) => (
          <Match key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchList;