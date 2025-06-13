import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMatch, addMatch, updateMatch, getCategories } from '../../services/matchService';

function MatchForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    categoryId: '',
    team1Name: '',
    team2Name: '',
    date: '',
    time: '',
    venue: '',
    status: 'upcoming',
    team1Score: 0,
    team2Score: 0
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        // If in edit mode, fetch match data
        if (isEditMode) {
          const matchData = await getMatch(id);
          
          if (matchData) {
            // Format date and time for form inputs
            const matchDate = matchData.date ? new Date(matchData.date) : new Date();
            const formattedDate = matchDate.toISOString().split('T')[0];
            const formattedTime = matchDate.toTimeString().split(' ')[0].substring(0, 5);
            
            setFormData({
              categoryId: matchData.categoryId || '',
              team1Name: matchData.team1Name || '',
              team2Name: matchData.team2Name || '',
              date: formattedDate,
              time: formattedTime,
              venue: matchData.venue || '',
              status: matchData.status || 'upcoming',
              team1Score: matchData.team1Score || 0,
              team2Score: matchData.team2Score || 0
            });
          } else {
            setError('Perlawanan tidak dijumpai.');
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Ralat semasa memuat data. Sila cuba lagi.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      // Combine date and time into a single Date object
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      const matchData = {
        categoryId: formData.categoryId,
        team1Name: formData.team1Name,
        team2Name: formData.team2Name,
        date: dateTime,
        venue: formData.venue,
        status: formData.status,
        team1Score: parseInt(formData.team1Score) || 0,
        team2Score: parseInt(formData.team2Score) || 0
      };
      
      if (isEditMode) {
        await updateMatch(id, matchData);
      } else {
        await addMatch(matchData);
      }
      
      navigate('/admin/matches');
    } catch (err) {
      console.error('Error saving match:', err);
      setError('Ralat semasa menyimpan perlawanan. Sila cuba lagi.');
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Memuat...</div>;
  }

  return (
    <div>
      <h2 className="admin-title">
        {isEditMode ? 'Edit Perlawanan' : 'Tambah Perlawanan Baru'}
      </h2>
      
      <div className="card">
        {error && <div className="alert alert-danger mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryId" className="form-label">Kategori Sukan</label>
            <select
              id="categoryId"
              name="categoryId"
              className="form-control"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="team1Name" className="form-label">Pasukan 1</label>
            <input
              type="text"
              id="team1Name"
              name="team1Name"
              className="form-control"
              value={formData.team1Name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="team2Name" className="form-label">Pasukan 2</label>
            <input
              type="text"
              id="team2Name"
              name="team2Name"
              className="form-control"
              value={formData.team2Name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date" className="form-label">Tarikh</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="time" className="form-label">Masa</label>
            <input
              type="time"
              id="time"
              name="time"
              className="form-control"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="venue" className="form-label">Tempat</label>
            <input
              type="text"
              id="venue"
              name="venue"
              className="form-control"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="upcoming">Akan Datang</option>
              <option value="live">Sedang Berlangsung</option>
              <option value="completed">Tamat</option>
            </select>
          </div>
          
          {formData.status !== 'upcoming' && (
            <div className="row" style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="team1Score" className="form-label">Skor Pasukan 1</label>
                <input
                  type="number"
                  id="team1Score"
                  name="team1Score"
                  className="form-control"
                  value={formData.team1Score}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="team2Score" className="form-label">Skor Pasukan 2</label>
                <input
                  type="number"
                  id="team2Score"
                  name="team2Score"
                  className="form-control"
                  value={formData.team2Score}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
          )}
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/admin/matches')}
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={saving}
            >
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MatchForm;