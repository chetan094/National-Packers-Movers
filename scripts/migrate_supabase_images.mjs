import fs from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';

const DB_CONFIG = {
  host: process.env.DB_HOST || 'srv665.hstgr.io',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'u373069423_npm_admin',
  password: process.env.DB_PASSWORD || 'Dhanbad@14',
  database: process.env.DB_NAME || 'u373069423_npm_db',
  connectTimeout: 30000,
  ssl: false
};

const PHOTOS_DIR = path.resolve('public/photos');

async function downloadAndSave(url, targetPath) {
  console.log(`[DOWNLOAD] Fetching: ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(targetPath, buffer);
  console.log(`✓ Saved to disk: ${targetPath} (${buffer.length} bytes)`);
}

async function main() {
  console.log('========================================================================');
  console.log('📥 DOWNLOADING SUPABASE IMAGES & MIGRATING TO LOCAL REPOSITORY');
  console.log('========================================================================\n');

  await fs.mkdir(PHOTOS_DIR, { recursive: true });

  const connection = await mysql.createConnection(DB_CONFIG);
  console.log('✓ Connected to Hostinger MySQL');

  // 1. Check gallery_images
  const [galleryRows] = await connection.query(
    "SELECT id, src, title, display_order FROM `gallery_images` WHERE `src` LIKE '%supabase.co%'"
  );
  console.log(`Found ${galleryRows.length} gallery images hosted on Supabase Storage`);

  for (const row of galleryRows) {
    const url = row.src;
    const urlParts = url.split('/');
    const originalFilename = urlParts[urlParts.length - 1].split('?')[0];
    const localFilename = originalFilename.startsWith('gallery-photo-')
      ? originalFilename
      : `gallery-photo-${originalFilename}`;
    const targetFilePath = path.join(PHOTOS_DIR, localFilename);
    const newLocalSrc = `/photos/${localFilename}`;

    await downloadAndSave(url, targetFilePath);

    // Update in MySQL preserving ID and display_order
    await connection.query(
      "UPDATE `gallery_images` SET `src` = ? WHERE `id` = ?",
      [newLocalSrc, row.id]
    );
    console.log(`✓ Updated gallery image ID ${row.id} (Order: ${row.display_order}): src -> ${newLocalSrc}\n`);
  }

  // 2. Check blogs
  const [blogRows] = await connection.query(
    "SELECT id, image_url, title, slug FROM `blogs` WHERE `image_url` LIKE '%supabase.co%'"
  );
  console.log(`Found ${blogRows.length} blogs hosted on Supabase Storage`);

  for (const row of blogRows) {
    const url = row.image_url;
    const urlParts = url.split('/');
    const originalFilename = urlParts[urlParts.length - 1].split('?')[0];
    const localFilename = `blog-${originalFilename}`;
    const targetFilePath = path.join(PHOTOS_DIR, localFilename);
    const newLocalSrc = `/photos/${localFilename}`;

    await downloadAndSave(url, targetFilePath);

    // Update in MySQL preserving ID
    await connection.query(
      "UPDATE `blogs` SET `image_url` = ? WHERE `id` = ?",
      [newLocalSrc, row.id]
    );
    console.log(`✓ Updated blog ID ${row.id} (${row.slug}): image_url -> ${newLocalSrc}\n`);
  }

  // Verification: Count how many still use supabase.co
  const [checkGallery] = await connection.query(
    "SELECT count(*) as count FROM `gallery_images` WHERE `src` LIKE '%supabase.co%'"
  );
  const [checkBlogs] = await connection.query(
    "SELECT count(*) as count FROM `blogs` WHERE `image_url` LIKE '%supabase.co%'"
  );

  console.log('========================================================================');
  console.log('🎉 IMAGE MIGRATION COMPLETE');
  console.log(`Remaining Supabase gallery images: ${checkGallery[0].count}`);
  console.log(`Remaining Supabase blog images: ${checkBlogs[0].count}`);
  console.log('========================================================================');

  await connection.end();
}

main().catch(err => {
  console.error('Error during image migration:', err);
  process.exit(1);
});
