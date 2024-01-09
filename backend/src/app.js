const pool = require('../db')
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Listar clientes
app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor');
  }
});

// Filtrar clientes por nome
app.get('/clientes/filtrar', async (req, res) => {
  const { nome } = req.query;

  try {
    const result = await pool.query('SELECT * FROM clientes WHERE nome ILIKE $1', [`%${nome}%`]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor');
  }
});

// Cadastrar novo cliente
app.post('/clientes', async (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || nome.trim() === '') {
    return res.status(400).json({ error: 'O campo nome é obrigatório.' });
  }

  try {
    const result = await pool.query('INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *', [nome, email, telefone]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
