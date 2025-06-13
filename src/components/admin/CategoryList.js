import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../services/matchService';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Ralat semasa memuat data. Sila cuba lagi.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Adakah anda pasti mahu memadamkan kategori ini? Semua perlawanan dalam kategori ini juga akan terjejas.')) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(category => category.id !== id));
      } catch (err) {
        console.error('Error deleting category:', err);
        setError('Ralat semasa memadamkan kategori. Sila cuba lagi.');
      }
    }
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
        <h2 className="admin-title">Kategori Sukan</h2>
        <Link to="/admin/categories/add" className="btn btn-primary">Tambah Kategori</Link>
      </div>
      
      <div className="card mb-4">
        <h3>Senarai Kategori</h3>
        
        {categories.length === 0 ? (
          <p>Tiada kategori sukan. Sila tambah kategori baru.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nama Kategori</th>
                  <th>Deskripsi</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.description || '-'}</td>
                    <td>
                      <div className="table-actions">
                        <Link 
                          to={`/admin/categories/edit/${category.id}`} 
                          className="btn action-btn action-btn-edit"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(category.id)} 
                          className="btn action-btn action-btn-delete"
                        >
                          Padam
                        </button>
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

export default CategoryList;