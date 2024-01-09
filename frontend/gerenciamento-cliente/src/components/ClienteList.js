import React from 'react';
import './ClienteList.css';

const ClienteList = ({ clientes }) => (
  <ul className='ul-center'>
    {clientes.map((cliente) => (
      <li key={cliente.id} className='li-center'>
        <span>{cliente.nome}</span> -
        <span>{cliente.email}</span> -
        <span>{cliente.telefone}</span> 
      </li>
    ))}
  </ul>
);

export default ClienteList;