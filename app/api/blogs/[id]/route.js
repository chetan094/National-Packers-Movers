import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateBlog, deleteBlog } from '@/lib/supabase';

export async function PATCH(request, { params }) {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const session = cookieStore.get('npm_admin_session')?.value;
    if (session !== 'authenticated') {
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
    const cookieStore = await cookies();
    const session = cookieStore.get('npm_admin_session')?.value;
    if (session !== 'authenticated') {
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
