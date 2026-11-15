import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const MIME_TYPES = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  avif: 'image/avif',
  svg: 'image/svg+xml',
  gif: 'image/gif'
};

export async function GET(request, { params }) {
  try {
    const { filename } = await params;
    if (!filename || filename.includes('..')) {
      return new NextResponse('Invalid filename', { status: 400 });
    }

    const ext = filename.split('.').pop().toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // 1. Try public/photos/
    const localPath = path.join(process.cwd(), 'public', 'photos', filename);
    try {
      const buffer = await fs.readFile(localPath);
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
    } catch {}

    // 2. Try Hostinger persistent uploads dir
    const persistentPath = path.join('/home/u373069423/media_uploads', filename);
    try {
      const buffer = await fs.readFile(persistentPath);
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
    } catch {}

    return new NextResponse('Media not found', { status: 404 });
  } catch (err) {
    console.error('Error serving media:', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}
