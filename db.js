// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'seu-banco-de-dados',
  password: '123456',
  port: 5432, // Porta padrão do PostgreSQL
});

module.exports = pool;
