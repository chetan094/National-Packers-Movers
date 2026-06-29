import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('npm_admin_session')?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Support legacy master session cookie
    if (token === 'authenticated') {
      return NextResponse.json({ 
        authenticated: true,
        user: {
          username: 'admin',
          role: 'admin',
          permissions: { blogs: true, tracking: true, leads: true, analytics: true, seo: true, gallery: true }
        }
      });
    }

    const session = verifySessionToken(token);
    if (session) {
      return NextResponse.json({ authenticated: true, user: session });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error('Session verify error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

