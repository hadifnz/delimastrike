import React from 'react';
import '../styles/App.css';

/**
 * Komponen CategoryFilter untuk menapis jadual perlawanan mengikut kategori
 * 
 * @param {Array} categories - Senarai kategori sukan yang tersedia
 * @param {string} selectedCategory - Kategori yang dipilih semasa
 * @param {function} onCategoryChange - Fungsi untuk mengendalikan perubahan kategori
 */
const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <h3>Tapis mengikut kategori:</h3>
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          Semua
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;