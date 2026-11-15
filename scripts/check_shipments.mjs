import mysql from 'mysql2/promise';

const DB_CONFIG = {
  host: process.env.DB_HOST || 'srv665.hstgr.io',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'u373069423_npm_admin',
  password: process.env.DB_PASSWORD || 'Dhanbad@14',
  database: process.env.DB_NAME || 'u373069423_npm_db',
  connectTimeout: 30000,
  ssl: false
};

async function check() {
  const conn = await mysql.createConnection(DB_CONFIG);
  const [rows] = await conn.query('SELECT * FROM shipments');
  console.log('Shipments in MySQL:', rows);
  await conn.end();
}

check();
