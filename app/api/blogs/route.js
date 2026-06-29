import { NextResponse } from 'next/server';
import { getBlogs, createBlog } from '@/lib/supabase';
import { checkPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogs = await getBlogs(true);
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error in GET /api/blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Auth Check
    const allowed = await checkPermission('blogs');
    if (!allowed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, excerpt, content, image_url, category, faqs } = body;

    // Validation
    if (!title || !slug || !excerpt || !content || !image_url || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBlog = await createBlog({
      title,
      slug,
      excerpt,
      content,
      image_url,
      category,
      faqs: faqs || [],
      created_at: new Date().toISOString()
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/blogs:', error);
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
