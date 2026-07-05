import { NextResponse } from 'next/server';
import { getLeads, updateLead, deleteLead, createLead } from '@/lib/supabase';
import { checkPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  return !!(await checkPermission('leads'));
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

// ─── POST: Manually add a lead from the admin dashboard ──────────────────────
export async function POST(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { name, phone, email, from_city, to_city, moving_date, notes, source } = body;
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }
    const lead = await createLead({
      name,
      phone,
      email: email || null,
      from: from_city || null,
      to: to_city || null,
      date: moving_date || null,
      notes: notes || null,
      source: source || 'Manual Entry',
      status: 'New'
    });
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('API POST /api/admin/leads error:', error);
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
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

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
