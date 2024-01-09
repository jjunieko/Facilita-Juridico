import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClienteList from '../components/ClienteList';
import ClienteFilter from '../components/ClienteFilter';
import ClienteForm from '../components/ClienteForm';

const ClienteController = () => {
  const [clientes, setClientes] = useState([]);
  const urlBase = "http://localhost:3000/"

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const response = await axios.get(`${urlBase}clientes`);
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };

    carregarClientes();
  }, []);

  const filtrarClientes = async (filtroNome) => {
    try {
      const response = await axios.get(`${urlBase}clientes/filtrar?nome=${filtroNome}`);
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao filtrar clientes:', error);
    }
  };

  const cadastrarCliente = async (novoCliente) => {
    try {
      await axios.post(`${urlBase}clientes`, novoCliente);
      // Recarregar a lista de clientes após o cadastro
      const response = await axios.get(`${urlBase}clientes`);
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Clientes</h1>

      {/* Filtro de clientes por nome */}
      <ClienteFilter onFilter={filtrarClientes} />

      {/* Lista de clientes */}
      <ClienteList clientes={clientes} />

      {/* Formulário de novo cliente */}
      <ClienteForm onSubmit={cadastrarCliente} />
    </div>
  );
};

export default ClienteController;
