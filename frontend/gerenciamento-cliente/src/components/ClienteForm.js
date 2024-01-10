import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './ClienteForm.css';

const ClienteForm = ({ onSubmit }) => {
    const [novoCliente, setNovoCliente] = useState({
        nome: '',
        email: '',
        telefone: '',
        coordenada_x: '',
        coordenada_y: '',
    });

    const handleInputChange = (field, value) => {
        setNovoCliente({ ...novoCliente, [field]: value });
    };

    const handleSubmit = () => {
        onSubmit(novoCliente);
        setNovoCliente({
            nome: '',
            email: '',
            telefone: '',
            coordenada_x: '',
            coordenada_y: '',
        });
    };

    return (
        <div className='container'>
            <h2>Cadastrar Novo Cliente</h2>
            <input
                type="text"
                className="input-field"
                placeholder="Nome"
                value={novoCliente.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
            />
            <input
                type="text"
                className="input-field"
                placeholder="Email"
                value={novoCliente.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <InputMask
                mask="(999)99999-9999"
                className="input-field"
                maskChar=""
                type="text"
                placeholder="Telefone"
                value={novoCliente.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
            />
            <input
                className="input-field"
                type="text"
                placeholder="Coordenada X"
                value={novoCliente.coordenada_x}
                onChange={(e) => handleInputChange('coordenada_x', e.target.value)}
            />
            <input
                className="input-field"
                type="text"
                placeholder="Coordenada Y"
                value={novoCliente.coordenada_y}
                onChange={(e) => handleInputChange('coordenada_y', e.target.value)}
            />
            <button onClick={handleSubmit} className='submit-button'>Cadastrar</button>
        </div>
    );
};

export default ClienteForm;
