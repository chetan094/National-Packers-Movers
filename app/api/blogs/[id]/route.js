import { NextResponse } from 'next/server';
import { updateBlog, deleteBlog } from '@/lib/supabase';
import { checkPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  try {
    // Auth Check
    const allowed = await checkPermission('blogs');
    if (!allowed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await updateBlog(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error in PATCH /api/blogs:', error);
    return NextResponse.json({ error: error.message || 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    // Auth Check
    const allowed = await checkPermission('blogs');
    if (!allowed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await deleteBlog(id);

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/blogs:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete blog' }, { status: 500 });
  }
}

