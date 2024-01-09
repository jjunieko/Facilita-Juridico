import React, { useState } from 'react';
import './ClienteFilter.css';

const ClienteFilter = ({ onFilter }) => {
  const [filtroNome, setFiltroNome] = useState('');

  const handleFilter = () => {
    onFilter(filtroNome);
  };

  return (
    <div className='content'>
      <input
        className='input-field'
        type="text"
        placeholder="Filtrar por nome"
        value={filtroNome}
        onChange={(e) => setFiltroNome(e.target.value)}
      />
      <button className='submit-button-filter' onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default ClienteFilter;
