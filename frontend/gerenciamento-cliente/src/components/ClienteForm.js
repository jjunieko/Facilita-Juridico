import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const ClienteForm = ({ onSubmit }) => {
    const [novoCliente, setNovoCliente] = useState({ nome: '', email: '', telefone: '' });

    const handleInputChange = (field, value) => {
        setNovoCliente({ ...novoCliente, [field]: value });
    };

    const handleSubmit = () => {
        onSubmit(novoCliente);
        setNovoCliente({ nome: '', email: '', telefone: '' });
    };

    return (
        <div>
            <h2>Cadastrar Novo Cliente</h2>
            <input
                type="text"
                placeholder="Nome"
                value={novoCliente.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                value={novoCliente.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <InputMask
                mask="999-999-99999"
                maskChar=""
                type="text"
                placeholder="Telefone"
                value={novoCliente.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
            />
            <button onClick={handleSubmit}>Cadastrar</button>
        </div>
    );
};

export default ClienteForm;
