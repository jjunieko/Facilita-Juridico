import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClienteList from '../components/ClienteList';
import ClienteFilter from '../components/ClienteFilter';
import ClienteForm from '../components/ClienteForm';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import './style.css';

const ClienteController = () => {
  const urlBase = "http://localhost:3000/"
  const [clientes, setClientes] = useState([]);
  const [rota, setRota] = useState([]);
  const [directions, setDirections] = useState(null);
  const [modalAberta, setModalAberta] = useState(false);
  const [distanciaTotal, setDistanciaTotal] = useState(false);

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

  const calcularRota = async () => {
    try {
      const response = await axios.post('http://localhost:3000/rota', { clientes });
      setRota(response.data.rotaOtimizada);

      rota.sort((a, b) => {
        const distanciaA = calcularDistancia(-19.9025359, -44.046451, a.coordenada_x, a.coordenada_y);
        const distanciaB = calcularDistancia(-19.9025359, -44.046451, b.coordenada_x, b.coordenada_y);
        return distanciaA - distanciaB;
      });

      // Converter a distância para quilômetros
      const distanciaFormatada = (response.data.distanciaTotal / 100).toFixed(4);

      setDistanciaTotal(`${distanciaFormatada} km`);

      // Abrir a modal após calcular a rota
      setModalAberta(true);
    } catch (error) {
      console.error('Erro ao calcular rota:', error);
    }
  };

  // Função para converter graus em radianos
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Função para calcular a distância em quilômetros
  function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancia = R * c;

    return distancia;
  }

  rota.sort((a, b) => {
    const distanciaA = calcularDistancia(-19.9025359, -44.046451, a.coordenada_x, a.coordenada_y);
    const distanciaB = calcularDistancia(-19.9025359, -44.046451, b.coordenada_x, b.coordenada_y);
    return distanciaA - distanciaB;
  });

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
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

      <button onClick={calcularRota} className='button'>Calcular Rota Otimizada</button>

      {/* Modal para mostrar a ordem de visitação dos clientes */}
      {modalAberta && (
        <div className="modal">
          <h2>Ordem de Visitação</h2>
          <ul>

            {rota.map((cliente, index) => (
              <li key={cliente.id}>{`${index + 1}.
               ${cliente.nome} - 
                Distância até a empresa: ${calcularDistancia(-19.9025359, -44.046451, cliente.coordenada_x, cliente.coordenada_y).toFixed(2)} km`}
              </li>
            ))}
          </ul>
          <p>Distância Total todas empresas em KMs: {distanciaTotal}</p>
          <button onClick={() => setModalAberta(false)}>Fechar</button>
        </div>
      )}


      {/* Mapa */}
      <LoadScript googleMapsApiKey="AIzaSyApIaX_lQPURhdkUCqcj41e9No68KiLcWE">
        <GoogleMap
          id="google-map"
          mapContainerStyle={mapContainerStyle}
          zoom={3}
          center={{ lat: -9.6711986, lng: -99.7670981 }}
        >
          {clientes.map((cliente) => (
            <Marker
              key={cliente.id}
              position={{
                lat: typeof cliente.coordenada_x === 'number' ? cliente.coordenada_x : 0,
                lng: typeof cliente.coordenada_y === 'number' ? cliente.coordenada_y : 0,
              }}
              title={cliente.nome}
            />
          ))}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{ suppressMarkers: true }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ClienteController;
