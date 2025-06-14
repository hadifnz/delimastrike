import React from 'react';
import '../styles/App.css';

/**
 * Komponen Match untuk memaparkan maklumat perlawanan individu
 * 
 * @param {Object} match - Objek perlawanan yang mengandungi maklumat perlawanan
 * @param {string} match.id - ID perlawanan
 * @param {string} match.team1Name - Nama pasukan pertama
 * @param {string} match.team2Name - Nama pasukan kedua
 * @param {number} match.team1Score - Skor pasukan pertama
 * @param {number} match.team2Score - Skor pasukan kedua
 * @param {string} match.date - Tarikh perlawanan
 * @param {string} match.time - Masa perlawanan
 * @param {string} match.venue - Tempat perlawanan
 * @param {string} match.category - Kategori sukan
 * @param {string} match.status - Status perlawanan (upcoming, live, completed)
 */
const Match = ({ match }) => {
  // Format tarikh untuk paparan
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ms-MY', options);
  };

  // Tentukan kelas CSS berdasarkan status perlawanan
  const getStatusClass = () => {
    switch (match.status) {
      case 'live':
        return 'match-status-live';
      case 'completed':
        return 'match-status-completed';
      default:
        return 'match-status-upcoming';
    }
  };

  // Tentukan teks status untuk paparan
  const getStatusText = () => {
    switch (match.status) {
      case 'live':
        return 'SEDANG BERLANGSUNG';
      case 'completed':
        return 'TAMAT';
      default:
        return 'AKAN DATANG';
    }
  };

  return (
    <div className="match-card">
      <div className={`match-status ${getStatusClass()}`}>
        {getStatusText()}
      </div>
      
      <div className="match-category">{match.category}</div>
      
      <div className="match-details">
  <div className="match-date">{formatDate(match.date)}</div>
  <div className="match-time">{match.time || 'Masa belum ditetapkan'}</div>
  <div className="match-venue">{match.venue}</div>
</div>
      
      <div className="match-teams">
    
<div className="team team1">
  <div className="team-name">
    <strong>{match.team1Name || 'TBD'}</strong>
  </div>
  {(match.status === 'live' || match.status === 'completed') && (
    <div className="team-score">{match.team1Score || 0}</div>
  )}
</div>

<div className="match-vs">VS</div>

<div className="team team2">
  <div className="team-name">
    <strong>{match.team2Name || 'TBD'}</strong>
  </div>
  {(match.status === 'live' || match.status === 'completed') && (
    <div className="team-score">{match.team2Score || 0}</div>
  )}
</div>
</div>
    </div>
  );
};

export default Match;