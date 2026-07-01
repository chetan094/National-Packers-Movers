import { NextResponse } from 'next/server';
import { checkPermission } from '@/lib/auth';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 3. Generate Unique Filename to prevent collision
    const originalName = file.name || 'image.png';
    const cleanName = originalName.replace(/[^a-zA-Z0-9\.\-_]/g, '_');
    const uniqueFilename = `${Date.now()}_${cleanName}`;

    // 4. Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Upload to Supabase Storage Bucket
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/blog-images/${uniqueFilename}`;
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
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/blog-images/${uniqueFilename}`;
    return NextResponse.json({ url: publicUrl }, { status: 200 });

  } catch (error) {
    console.error('Error in POST /api/admin/upload:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
