import fs from 'fs/promises';
import path from 'path';
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
      const slug = titleToSlug(title);
      const timestamp = Date.now();
      filename = `${slug}-${timestamp}.${ext}`;
    } else {
      filename = `gallery-photo-${Date.now()}.${ext}`;
    }

    // 4. Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Save locally to public/photos/ (Self-hosted on Hostinger / Local)
    const publicPhotosDir = path.join(process.cwd(), 'public', 'photos');
    await fs.mkdir(publicPhotosDir, { recursive: true });
    const localFilePath = path.join(publicPhotosDir, filename);
    await fs.writeFile(localFilePath, buffer);
    console.log(`[MEDIA UPLOAD] Successfully saved file locally: ${localFilePath}`);

    // Also persist in persistent external media directory on Hostinger if it exists
    const persistentHostingerDir = '/home/u373069423/media_uploads';
    try {
      await fs.mkdir(persistentHostingerDir, { recursive: true });
      await fs.writeFile(path.join(persistentHostingerDir, filename), buffer);
    } catch {}

    // 6. Optional background backup to Supabase (only if credentials still exist)
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const uploadUrl = `${SUPABASE_URL}/storage/v1/object/blog-images/${filename}`;
        await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': file.type || 'application/octet-stream',
          },
          body: buffer,
        });
      } catch (backupErr) {
        console.warn('[UPLOAD BACKUP] Supabase backup upload skipped/failed:', backupErr.message);
      }
    }

    // 7. Return local self-hosted URL
    const publicUrl = `/photos/${filename}`;
    return NextResponse.json({ url: publicUrl, filename }, { status: 200 });

  } catch (error) {
    console.error('Error in POST /api/admin/upload:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
