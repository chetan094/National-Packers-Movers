import mysql from 'mysql2/promise';

let pool = null;

export function getPool() {
  if (!pool) {
    // Connect via Hostinger MySQL host
    const host = process.env.DB_HOST || 'srv665.hstgr.io';
    const user = process.env.DB_USER || 'u373069423_npm_admin';
    const password = process.env.DB_PASSWORD || 'Dhanbad@14';
    const database = process.env.DB_NAME || 'u373069423_npm_db';
    const port = parseInt(process.env.DB_PORT || '3306', 10);

    // Lean connection pooling to strictly respect Hostinger's max_user_connections (75).
    // In multi-process static page generation (next build), 1 connection per worker prevents connection spikes.
    const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
    const connectionLimit = isBuildPhase ? 1 : 3;

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit,
      maxIdle: 2,
      idleTimeout: 10000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

export async function query(sql, params = []) {
  const p = getPool();
  try {
    const [results] = await p.execute(sql, params);
    return results;
  } catch (error) {
    // If we ever hit connection limit under extreme burst, back off briefly and retry once
    if (error.code === 'ER_USER_LIMIT_REACHED' || (error.message && error.message.includes('max_user_connections'))) {
      console.warn('[DATABASE RETRY] Connection limit hit, backing off 400ms before retry...');
      await new Promise(resolve => setTimeout(resolve, 400));
      try {
        const [retryResults] = await p.execute(sql, params);
        return retryResults;
      } catch (retryErr) {
        console.error('[DATABASE ERROR] MySQL Retry failed:', retryErr.message, 'SQL:', sql);
        throw retryErr;
      }
    }
    console.error('[DATABASE ERROR] MySQL Query failed:', error.message, 'SQL:', sql);
    throw error;
  }
}

export function isDbConfigured() {
  return !!(process.env.DB_USER || 'u373069423_npm_admin');
}
