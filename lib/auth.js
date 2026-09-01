import crypto from 'crypto';
import { cookies } from 'next/headers';

// Cryptographically secure session secret from env, or in-memory dynamic secret (no hardcoded passwords)
const DYNAMIC_SECRET = globalThis.__NPM_SESSION_SECRET || (globalThis.__NPM_SESSION_SECRET = crypto.randomBytes(32).toString('hex'));
const SECRET = process.env.SESSION_SECRET || process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || DYNAMIC_SECRET;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const hasCredentials = !!(SUPABASE_URL && (SUPABASE_ANON_KEY || SUPABASE_SERVICE_ROLE_KEY));

// Constant-time string comparison to prevent timing side-channel attacks
export function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Returns headers utilizing Service Role Key if available to bypass RLS, falling back to Anon Key
function getHeaders() {
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY || '';
  return {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json'
  };
}

// Hashing algorithm: PBKDF2 with SHA-512 and 210,000 iterations (OWASP security benchmark)
export function hashPassword(password, salt, iterations = 210000) {
  return crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
}

// Verifies password hash trying OWASP 210,000 iterations first, with fallback to 1,000 iterations for legacy hashes
export function verifyPasswordHash(password, salt, storedHash) {
  if (!password || !salt || !storedHash) return false;
  const hashNew = hashPassword(password, salt, 210000);
  if (safeCompare(hashNew, storedHash)) return true;
  // Legacy 1000 iteration fallback
  const hashLegacy = hashPassword(password, salt, 1000);
  return safeCompare(hashLegacy, storedHash);
}

export function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

// Generate signed session cookie with 24h internal expiration to prevent tampering and replay attacks
export function signSession(data) {
  const payload = {
    ...data,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24-hour expiration
  };
  const serialized = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', SECRET).update(serialized).digest('hex');
  return `${serialized}.${hmac}`;
}

// Verify signed session cookie and check expiration
export function verifySessionToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [serialized, signature] = parts;
  const hmac = crypto.createHmac('sha256', SECRET).update(serialized).digest('hex');
  if (!safeCompare(hmac, signature)) return null; // Signature verification failed
  try {
    const session = JSON.parse(serialized);
    if (session.exp && session.exp < Math.floor(Date.now() / 1000)) {
      return null; // Session expired
    }
    return session;
  } catch {
    return null;
  }
}

// Resolves current user session and check if they have permission to access a specific panel
export async function checkPermission(permissionName) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('npm_admin_session')?.value;
    if (!token) return null;

    const session = verifySessionToken(token);
    if (!session) return null;

    // Master admins have access to all tabs
    if (session.role === 'admin') return session;

    // Check specific tab permission
    if (session.permissions && session.permissions[permissionName] === true) {
      return session;
    }

    return null;
  } catch (error) {
    console.error('checkPermission error:', error);
    return null;
  }
}

// Database helper queries

export async function getAdminUser(username) {
  if (!hasCredentials) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?username=eq.${encodeURIComponent(username)}&limit=1`, {
      headers: getHeaders(),
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      return data[0] || null;
    }
    return null;
  } catch (err) {
    console.error('getAdminUser error:', err);
    return null;
  }
}

export async function getAllAdminUsers() {
  if (!hasCredentials) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?order=username.asc`, {
      headers: getHeaders(),
      cache: 'no-store'
    });
    if (res.ok) {
      const users = await res.json();
      
      // Auto-seed default admin if table is empty AND process.env.ADMIN_PASSWORD is set
      if (users.length === 0 && process.env.ADMIN_PASSWORD) {
        const seeded = await createAdminUser(
          'admin',
          process.env.ADMIN_PASSWORD,
          'admin',
          { blogs: true, tracking: true, leads: true, analytics: true, seo: true, gallery: true },
          'Master Admin'
        );
        if (seeded) {
          const freshRes = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?order=username.asc`, {
            headers: getHeaders(),
            cache: 'no-store'
          });
          if (freshRes.ok) return await freshRes.json();
        }
      }
      return users;
    }
    
    // Status 404 means the database table admin_users is missing in Supabase
    if (res.status === 404) {
      return null;
    }
    return [];
  } catch (err) {
    console.error('getAllAdminUsers error:', err);
    return [];
  }
}

export async function createAdminUser(username, password, role = 'staff', permissions = {}, fullName = '') {
  if (!hasCredentials) return false;
  const salt = generateSalt();
  const passwordHash = hashPassword(password, salt);

  const payload = {
    username: username.trim(),
    password_hash: passwordHash,
    salt,
    role,
    permissions,
    full_name: fullName.trim()
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.error('createAdminUser error:', err);
    return false;
  }
}

export async function updateAdminUser(id, updates) {
  if (!hasCredentials) return false;

  const payload = { ...updates };
  
  // If editing password, generate new hash and salt
  if (updates.password) {
    const salt = generateSalt();
    payload.password_hash = hashPassword(updates.password, salt);
    payload.salt = salt;
    delete payload.password;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?id=eq.${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.error('updateAdminUser error:', err);
    return false;
  }
}

export async function deleteAdminUser(id) {
  if (!hasCredentials) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?id=eq.${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.ok;
  } catch (err) {
    console.error('deleteAdminUser error:', err);
    return false;
  }
}
