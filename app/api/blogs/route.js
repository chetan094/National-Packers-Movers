import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getBlogs, createBlog } from '@/lib/supabase';

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error in GET /api/blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const session = cookieStore.get('npm_admin_session')?.value;
    if (session !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, excerpt, content, image_url, category } = body;

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
      created_at: new Date().toISOString()
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/blogs:', error);
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
