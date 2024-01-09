import React, { useState } from 'react';

const ClienteFilter = ({ onFilter }) => {
  const [filtroNome, setFiltroNome] = useState('');

  const handleFilter = () => {
    onFilter(filtroNome);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filtroNome}
        onChange={(e) => setFiltroNome(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default ClienteFilter;
