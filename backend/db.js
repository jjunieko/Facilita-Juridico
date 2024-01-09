
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER_KEY || 'postgres',
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432, // Porta padrão do PostgreSQL
});

module.exports = pool;
