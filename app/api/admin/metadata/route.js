import { NextResponse } from 'next/server';
import { getCustomMetadata, upsertCustomMetadata, getCustomMetadataList } from '@/lib/supabase';
import { checkPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  return !!(await checkPermission('seo'));
}

export async function GET(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (path) {
      const data = await getCustomMetadata(path);
      return NextResponse.json(data || null);
    } else {
      const list = await getCustomMetadataList();
      return NextResponse.json(list);
    }
  } catch (error) {
    console.error('API GET /api/admin/metadata error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { path, meta_title, meta_description, meta_keywords, is_noindex } = body;

    if (!path || !meta_title || !meta_description) {
      return NextResponse.json({ error: 'Missing path, meta_title or meta_description parameters' }, { status: 400 });
    }

    const updated = await upsertCustomMetadata({
      path,
      meta_title,
      meta_description,
      meta_keywords,
      is_noindex
    });

    return NextResponse.json({ success: true, metadata: updated });
  } catch (error) {
    console.error('API POST /api/admin/metadata error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
