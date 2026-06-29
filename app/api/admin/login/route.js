import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminUser, hashPassword, signSession } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const cleanUsername = (username || 'admin').trim();

    // 1. Try to fetch user from Supabase database admin_users table
    const dbUser = await getAdminUser(cleanUsername);

    if (dbUser) {
      // User exists in database, verify hashed password
      const calculatedHash = hashPassword(password, dbUser.salt);
      if (calculatedHash === dbUser.password_hash) {
        const session = {
          id: dbUser.id,
          username: dbUser.username,
          role: dbUser.role,
          permissions: dbUser.permissions
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
      return NextResponse.json({ success: false, error: 'Invalid username or password.' }, { status: 401 });
    }

    // 2. If user not found in DB and identifier is 'admin', check env fallback (backward compatibility)
    if (cleanUsername === 'admin') {
      const adminPassword = process.env.ADMIN_PASSWORD || 'debabrata74618';
      if (password === adminPassword) {
        const session = {
          username: 'admin',
          role: 'admin',
          permissions: { blogs: true, tracking: true, leads: true, analytics: true, seo: true, gallery: true }
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

    return NextResponse.json({ success: false, error: 'User credentials not recognized.' }, { status: 401 });
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

