import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMatches, getCategories } from '../../services/matchService';
import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {
  const [stats, setStats] = useState({
    totalMatches: 0,
    upcomingMatches: 0,
    liveMatches: 0,
    completedMatches: 0,
    totalCategories: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesData, categoriesData] = await Promise.all([
          getMatches(),
          getCategories()
        ]);

        const now = new Date();
        const upcoming = matchesData.filter(match => 
          match.status === 'upcoming' || 
          (match.date > now && !match.status)
        );
        const live = matchesData.filter(match => match.status === 'live');
        const completed = matchesData.filter(match => match.status === 'completed');

        setStats({
          totalMatches: matchesData.length,
          upcomingMatches: upcoming.length,
          liveMatches: live.length,
          completedMatches: completed.length,
          totalCategories: categoriesData.length
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Ralat semasa memuat data. Sila cuba lagi.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Memuat...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="admin-title">Dashboard Admin</h2>
      
      <div className="card mb-4">
        <h3>Selamat Datang, {currentUser?.email}</h3>
        <p>Anda boleh menguruskan jadual perlawanan dan kategori sukan di sini.</p>
      </div>
      
      <div className="row" style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -15px' }}>
        <div className="col" style={{ flex: '1 0 21%', padding: '0 15px', minWidth: '250px' }}>
          <div className="card" style={{ backgroundColor: '#8B0000', color: 'white' }}>
            <h3>Jumlah Perlawanan</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalMatches}</p>
            <Link to="/admin/matches" style={{ color: 'white', textDecoration: 'underline' }}>Lihat Semua</Link>
          </div>
        </div>
        
        <div className="col" style={{ flex: '1 0 21%', padding: '0 15px', minWidth: '250px' }}>
          <div className="card" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
            <h3>Perlawanan Akan Datang</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.upcomingMatches}</p>
          </div>
        </div>
        
        <div className="col" style={{ flex: '1 0 21%', padding: '0 15px', minWidth: '250px' }}>
          <div className="card" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
            <h3>Perlawanan Langsung</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.liveMatches}</p>
          </div>
        </div>
        
        <div className="col" style={{ flex: '1 0 21%', padding: '0 15px', minWidth: '250px' }}>
          <div className="card" style={{ backgroundColor: '#d1ecf1', color: '#0c5460' }}>
            <h3>Kategori Sukan</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalCategories}</p>
            <Link to="/admin/categories" style={{ color: '#0c5460', textDecoration: 'underline' }}>Urus Kategori</Link>
          </div>
        </div>
      </div>
      
      <div className="mt-4" style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/admin/matches/add" className="btn btn-primary">Tambah Perlawanan Baru</Link>
        <Link to="/admin/categories/add" className="btn btn-secondary">Tambah Kategori Baru</Link>
      </div>
    </div>
  );
}

export default Dashboard;