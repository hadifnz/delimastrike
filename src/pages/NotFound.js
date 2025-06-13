import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container text-center" style={{ padding: '5rem 0' }}>
      <h1 style={{ fontSize: '4rem', color: '#8B0000' }}>404</h1>
      <h2>Halaman Tidak Dijumpai</h2>
      <p className="mt-3">Maaf, halaman yang anda cari tidak wujud.</p>
      <Link to="/" className="btn btn-primary mt-4">
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}

export default NotFound;