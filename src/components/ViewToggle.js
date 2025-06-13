import React from 'react';
import '../styles/App.css';

/**
 * Komponen ViewToggle untuk menukar antara paparan semua perlawanan dan perlawanan akan datang sahaja
 * 
 * @param {string} currentView - Paparan semasa ('all' atau 'upcoming')
 * @param {function} onViewChange - Fungsi untuk mengendalikan perubahan paparan
 */
const ViewToggle = ({ currentView, onViewChange }) => {
  return (
    <div className="view-toggle">
      <h3>Paparan:</h3>
      <div className="toggle-buttons">
        <button 
          className={`toggle-btn ${currentView === 'all' ? 'active' : ''}`}
          onClick={() => onViewChange('all')}
        >
          Semua Perlawanan
        </button>
        <button 
          className={`toggle-btn ${currentView === 'live' ? 'active' : ''}`}
          onClick={() => onViewChange('live')}
        >
          Sedang Berlangsung
        </button>
        <button 
          className={`toggle-btn ${currentView === 'upcoming' ? 'active' : ''}`}
          onClick={() => onViewChange('upcoming')}
        >
          Akan Datang
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;