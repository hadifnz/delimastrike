import React, { useState, useEffect } from 'react';
import { 
  getMatches, 
  getCategories, 
  getMatchesByCategory, 
  getUpcomingMatches,
  getLiveMatches,
  getCompletedMatches
} from '../services/matchService';
import MatchList from '../components/MatchList';
import CategoryFilter from '../components/CategoryFilter';
import ViewToggle from '../components/ViewToggle';
import '../styles/App.css';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('all'); // 'all', 'upcoming', 'live', 'completed'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        let matchesData;

        if (viewMode === 'live') {
          if (selectedCategory === 'all') {
            matchesData = await getLiveMatches();
          } else {
            const allMatches = await getMatchesByCategory(selectedCategory);
            matchesData = allMatches.filter(match => match.status === 'live');
          }
        } else if (viewMode === 'upcoming') {
          if (selectedCategory === 'all') {
            matchesData = await getUpcomingMatches();
            // Filter untuk status 'upcoming' sahaja
            matchesData = matchesData.filter(match => match.status === 'upcoming');
          } else {
            const allMatches = await getMatchesByCategory(selectedCategory);
            // Filter untuk status 'upcoming' sahaja
            matchesData = allMatches.filter(match => 
              match.status === 'upcoming' && 
              new Date(match.date) >= new Date()
            );
          }
        } else if (viewMode === 'completed') {
          if (selectedCategory === 'all') {
            matchesData = await getCompletedMatches();
          } else {
            const allMatches = await getMatchesByCategory(selectedCategory);
            matchesData = allMatches.filter(match => match.status === 'completed');
          }
        } else {
          // default 'all' view mode
          if (selectedCategory === 'all') {
            matchesData = await getMatches();
          } else {
            matchesData = await getMatchesByCategory(selectedCategory);
          }
        }

        setMatches(matchesData);
      } catch (err) {
        setError('Ralat mendapatkan data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, viewMode]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Jadual Perlawanan SUKOL</h1>
        <p>Jadual dan keputusan perlawanan terkini</p>
      </div>

      <div className="filters-section">
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <ViewToggle 
          currentView={viewMode} 
          onViewChange={handleViewModeChange} 
        />
      </div>

      <div className="matches-section">
        <h2>Perlawanan</h2>
        <MatchList 
          matches={matches} 
          loading={loading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default Home;
