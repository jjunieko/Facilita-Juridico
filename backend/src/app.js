const pool = require('../db')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rotaRouter = require('./routes/rota');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


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
  const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;

  if (!nome || nome.trim() === '') {
    return res.status(400).json({ error: 'O campo nome é obrigatório.' });
  }

  try {
    const result = await pool.query('INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, email, telefone, coordenada_x, coordenada_y]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor');
  }
});


app.use('/rota', rotaRouter); 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
