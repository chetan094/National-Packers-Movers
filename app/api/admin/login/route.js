import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminUser, verifyPasswordHash, safeCompare, signSession } from '@/lib/auth';
import { checkRateLimit, recordFailedAttempt, clearRateLimit } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 5, 15 * 60 * 1000); // 5 attempts per 15 mins

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many failed login attempts. Please wait 15 minutes before trying again.' },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();
    const cleanUsername = (username || 'admin').trim();

    if (!password) {
      recordFailedAttempt(ip);
      return NextResponse.json({ success: false, error: 'Password is required.' }, { status: 400 });
    }

    // 1. Fetch user from Supabase database admin_users table
    const dbUser = await getAdminUser(cleanUsername);

    if (dbUser) {
      // User exists in database, verify salted PBKDF2 hash using timing-safe comparison
      const isValid = verifyPasswordHash(password, dbUser.salt, dbUser.password_hash);
      if (isValid) {
        clearRateLimit(ip);
        const session = {
          id: dbUser.id,
          username: dbUser.username,
          role: dbUser.role,
          permissions: dbUser.permissions,
          full_name: dbUser.full_name
        };
        const token = signSession(session);
        const cookieStore = await cookies();
        cookieStore.set('npm_admin_session', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        });
        return NextResponse.json({ success: true });
      }
      recordFailedAttempt(ip);
      return NextResponse.json({ success: false, error: 'Invalid username or password.' }, { status: 401 });
    }

    // 2. If user not found in DB and ADMIN_PASSWORD env is explicitly configured, check env secret (no hardcoded fallback)
    if (cleanUsername === 'admin' && process.env.ADMIN_PASSWORD) {
      if (safeCompare(password, process.env.ADMIN_PASSWORD)) {
        clearRateLimit(ip);
        const session = {
          username: 'admin',
          role: 'admin',
          permissions: { blogs: true, tracking: true, leads: true, analytics: true, seo: true, gallery: true },
          full_name: 'Master Admin'
        };
        const token = signSession(session);
        const cookieStore = await cookies();
        cookieStore.set('npm_admin_session', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        });
        return NextResponse.json({ success: true });
      }
    }

    recordFailedAttempt(ip);
    return NextResponse.json({ success: false, error: 'Invalid username or password.' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.set('npm_admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

