import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMatches, getCategories, deleteMatch, updateMatchScore, updateMatch } from '../../services/matchService';

function MatchList() {
  const [matches, setMatches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [editingScoreId, setEditingScoreId] = useState(null);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [matchesData, categoriesData] = await Promise.all([
        getMatches(),
        getCategories()
      ]);

      // Enhance matches with category names
      const enhancedMatches = matchesData.map(match => {
        const category = categoriesData.find(cat => cat.id === match.categoryId);
        return {
          ...match,
          categoryName: category ? category.name : 'Tidak Diketahui'
        };
      });

      setMatches(enhancedMatches);
      setCategories(categoriesData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError('Ralat semasa memuat data. Sila cuba lagi.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Adakah anda pasti mahu memadamkan perlawanan ini?')) {
      try {
        await deleteMatch(id);
        setMatches(matches.filter(match => match.id !== id));
      } catch (err) {
        console.error('Error deleting match:', err);
        setError('Ralat semasa memadamkan perlawanan. Sila cuba lagi.');
      }
    }
  };

  const startEditingScore = (match) => {
    setEditingScoreId(match.id);
    setTeam1Score(match.team1Score || 0);
    setTeam2Score(match.team2Score || 0);
  };

  const cancelEditingScore = () => {
    setEditingScoreId(null);
  };

  const saveScore = async (id) => {
    try {
      await updateMatchScore(id, team1Score, team2Score);
      
      // Update local state
      setMatches(matches.map(match => {
        if (match.id === id) {
          return {
            ...match,
            team1Score,
            team2Score,
            status: 'live' // Set status to live when score is updated
          };
        }
        return match;
      }));
      
      setEditingScoreId(null);
    } catch (err) {
      console.error('Error updating score:', err);
      setError('Ralat semasa mengemaskini skor. Sila cuba lagi.');
    }
  };

  const completeMatch = async (id) => {
    try {
      // First get the current match to preserve scores
      const match = matches.find(m => m.id === id);
      
      // Update the match status to completed
      await updateMatch(id, { 
        ...match,
        status: 'completed' 
      });
      
      // Update local state
      setMatches(matches.map(match => {
        if (match.id === id) {
          return {
            ...match,
            status: 'completed'
          };
        }
        return match;
      }));
    } catch (err) {
      console.error('Error completing match:', err);
      setError('Ralat semasa menandakan perlawanan sebagai tamat. Sila cuba lagi.');
    }
  };

  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true;
    return match.categoryId === filter;
  });

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ms-MY', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div>Memuat...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="admin-title">Jadual Perlawanan</h2>
        <Link to="/admin/matches/add" className="btn btn-primary">Tambah Perlawanan</Link>
      </div>
      
      <div className="card mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Senarai Perlawanan</h3>
          <select 
            className="filter-select" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Semua Kategori</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {filteredMatches.length === 0 ? (
          <p>Tiada perlawanan dijadualkan.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Pasukan</th>
                  <th>Tarikh & Masa</th>
                  <th>Status</th>
                  <th>Skor</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatches.map(match => (
                  <tr key={match.id}>
                    <td>{match.categoryName}</td>
                    <td>{match.team1Name} vs {match.team2Name}</td>
                    <td>{formatDate(match.date)}</td>
                    <td>
                      {match.status === 'live' && <span className="badge bg-success">Langsung</span>}
                      {match.status === 'completed' && <span className="badge bg-info">Tamat</span>}
                      {(match.status === 'upcoming' || !match.status) && <span className="badge bg-secondary">Akan Datang</span>}
                    </td>
                    <td>
                      {editingScoreId === match.id ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input 
                            type="number" 
                            value={team1Score} 
                            onChange={(e) => setTeam1Score(parseInt(e.target.value) || 0)} 
                            min="0"
                            style={{ width: '50px' }}
                          />
                          <span>-</span>
                          <input 
                            type="number" 
                            value={team2Score} 
                            onChange={(e) => setTeam2Score(parseInt(e.target.value) || 0)} 
                            min="0"
                            style={{ width: '50px' }}
                          />
                          <button 
                            onClick={() => saveScore(match.id)} 
                            className="btn btn-sm btn-success"
                          >
                            Simpan
                          </button>
                          <button 
                            onClick={cancelEditingScore} 
                            className="btn btn-sm btn-secondary"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <div>
                          {match.status !== 'upcoming' ? 
                            `${match.team1Score || 0} - ${match.team2Score || 0}` : 
                            '-'}
                          {match.status !== 'completed' && (
                            <button 
                              onClick={() => startEditingScore(match)} 
                              className="btn btn-sm btn-outline-primary ml-2"
                              style={{ marginLeft: '0.5rem' }}
                            >
                              Edit Skor
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link 
                          to={`/admin/matches/edit/${match.id}`} 
                          className="btn action-btn action-btn-edit"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(match.id)} 
                          className="btn action-btn action-btn-delete"
                        >
                          Padam
                        </button>
                        {match.status === 'live' && (
                          <button 
                            onClick={() => completeMatch(match.id)} 
                            className="btn btn-sm btn-info"
                          >
                            Tamat
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchList;