import React from 'react';

const ClienteList = ({ clientes }) => (
  <ul>
    {clientes.map((cliente) => (
      <li key={cliente.id}>
        {cliente.nome} - {cliente.email} - {cliente.telefone}
      </li>
    ))}
  </ul>
);

export default ClienteList;