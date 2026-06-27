import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('npm_admin_session')?.value;
  return session === 'authenticated';
}

export async function GET(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const images = await getGalleryImages(true);
    return NextResponse.json(images);
  } catch (error) {
    console.error('API GET /api/admin/gallery error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { src, alt, title, description, display_order } = body;

    if (!src || !alt || !title) {
      return NextResponse.json({ error: 'Missing required parameters: src, alt, or title' }, { status: 400 });
    }

    const newImage = await createGalleryImage({
      src,
      alt,
      title,
      description: description || null,
      display_order: parseInt(display_order) || 0
    });

    return NextResponse.json({ success: true, image: newImage });
  } catch (error) {
    console.error('API POST /api/admin/gallery error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { id, src, alt, title, description, display_order } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 });
    }

    const updates = {};
    if (src !== undefined) updates.src = src;
    if (alt !== undefined) updates.alt = alt;
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (display_order !== undefined) updates.display_order = parseInt(display_order) || 0;

    const updated = await updateGalleryImage(id, updates);
    return NextResponse.json({ success: true, image: updated });
  } catch (error) {
    console.error('API PATCH /api/admin/gallery error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 });
    }

    await deleteGalleryImage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API DELETE /api/admin/gallery error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
