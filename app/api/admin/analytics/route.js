import { NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/supabase';
import { checkPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  return !!(await checkPermission('analytics'));
}

export async function GET() {
  try {
    // Authenticate admin request
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Fetch aggregated analytical metrics
    const summary = await getAnalyticsSummary();
    if (!summary) {
      return NextResponse.json({ error: 'Failed to aggregate analytics summary' }, { status: 500 });
    }
    
    return NextResponse.json(summary);
  } catch (error) {
    console.error('API GET /api/admin/analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
