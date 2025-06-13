import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategory, addCategory, updateCategory } from '../../services/matchService';

function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!isEditMode) return;
      
      try {
        const categoryData = await getCategory(id);
        
        if (categoryData) {
          setFormData({
            name: categoryData.name || '',
            description: categoryData.description || ''
          });
        } else {
          setError('Kategori tidak dijumpai.');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Ralat semasa memuat data. Sila cuba lagi.');
        setLoading(false);
      }
    };

    fetchCategory();
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
      
      if (isEditMode) {
        await updateCategory(id, formData);
      } else {
        await addCategory(formData);
      }
      
      navigate('/admin/categories');
    } catch (err) {
      console.error('Error saving category:', err);
      setError('Ralat semasa menyimpan kategori. Sila cuba lagi.');
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Memuat...</div>;
  }

  return (
    <div>
      <h2 className="admin-title">
        {isEditMode ? 'Edit Kategori' : 'Tambah Kategori Baru'}
      </h2>
      
      <div className="card">
        {error && <div className="alert alert-danger mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nama Kategori</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/admin/categories')}
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

export default CategoryForm;