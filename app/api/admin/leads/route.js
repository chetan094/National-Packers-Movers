import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLeads, updateLead, deleteLead } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('npm_admin_session')?.value;
  return session === 'authenticated';
}

export async function GET() {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const leads = await getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    console.error('API GET /api/admin/leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { id, updates } = body;
    if (!id || !updates) {
      return NextResponse.json({ error: 'Missing id or updates parameters' }, { status: 400 });
    }
    const updated = await updateLead(id, updates);
    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error('API PATCH /api/admin/leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Try parsing from query parameters
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    // Or parse from body if not present in query params
    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing lead id parameter' }, { status: 400 });
    }
    await deleteLead(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API DELETE /api/admin/leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
