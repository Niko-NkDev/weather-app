// src/components/SearchBar.jsx
import { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === '') return;
    onSearch(city);
    setCity('');
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
    <form onSubmit={handleSubmit} className="d-flex mb-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Escribe una ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Buscar
      </button>
    </form>
    </div>
  );
};

