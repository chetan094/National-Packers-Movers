import { NextResponse } from 'next/server';
import { checkPermission } from '@/lib/auth';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Converts a human-readable title to a URL-safe filename slug.
 * e.g. "Premium Cushion Sofa Wrapping" → "premium-cushion-sofa-wrapping"
 */
function titleToSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[&]/g, 'and')          // & → and
    .replace(/[^a-z0-9\s-]/g, '')    // remove special chars
    .replace(/\s+/g, '-')            // spaces → hyphens
    .replace(/-+/g, '-')             // collapse multiple hyphens
    .replace(/^-|-$/g, '');          // trim leading/trailing hyphens
}

export async function POST(request) {
  try {
    // 1. Session Auth Check
    const allowed = (await checkPermission('blogs')) || (await checkPermission('gallery'));
    if (!allowed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse FormData
    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title') || '';  // Admin-provided title

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 3. Build SEO-friendly filename from title (or fallback to timestamp)
    const ext = (file.name || 'image.jpg').split('.').pop().toLowerCase() || 'jpg';
    let filename;

    if (title && title.trim().length > 0) {
      // Auto-rename: convert title to slug → SEO-friendly filename
      const slug = titleToSlug(title);
      // Add timestamp suffix to prevent collisions if same title uploaded twice
      const timestamp = Date.now();
      filename = `${slug}-${timestamp}.${ext}`;
    } else {
      // Fallback: timestamp-based name if no title provided
      filename = `gallery-photo-${Date.now()}.${ext}`;
    }

    // 4. Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Upload to Supabase Storage Bucket
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/blog-images/${filename}`;
    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: buffer,
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Supabase upload error:', errText);
      return NextResponse.json({ error: `Upload failed: ${errText}` }, { status: 500 });
    }

    // 6. Construct public URL
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/blog-images/${filename}`;
    return NextResponse.json({ url: publicUrl, filename }, { status: 200 });

  } catch (error) {
    console.error('Error in POST /api/admin/upload:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
