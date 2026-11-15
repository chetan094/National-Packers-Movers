import mysql from 'mysql2/promise';

let pool = null;

export function getPool() {
  if (!pool) {
    const isProduction = process.env.NODE_ENV === 'production';
    
    // On Hostinger servers, connect via 127.0.0.1; on local development, connect via remote Hostinger host
    const host = process.env.DB_HOST || (isProduction ? '127.0.0.1' : 'srv665.hstgr.io');
    const user = process.env.DB_USER || 'u373069423_npm_admin';
    const password = process.env.DB_PASSWORD || 'Dhanbad@14';
    const database = process.env.DB_NAME || 'u373069423_npm_db';
    const port = parseInt(process.env.DB_PORT || '3306', 10);

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 5,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

export async function query(sql, params = []) {
  try {
    const p = getPool();
    const [results] = await p.execute(sql, params);
    return results;
  } catch (error) {
    console.error('[DATABASE ERROR] MySQL Query failed:', error.message, 'SQL:', sql);
    throw error;
  }
}

export function isDbConfigured() {
  return !!(process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME);
}
