import mysql from 'mysql2/promise';

const c = await mysql.createConnection({
  host: process.env.DB_HOST || 'srv665.hstgr.io',
  user: process.env.DB_USER || 'u373069423_npm_admin',
  password: process.env.DB_PASSWORD || 'Dhanbad@14',
  database: process.env.DB_NAME || 'u373069423_npm_db'
});

const [res] = await c.query("DELETE FROM `leads` WHERE `email` = 'zero-supabase-test@npm.com'");
console.log(`Cleaned up ${res.affectedRows} simulated test lead(s)`);
await c.end();
