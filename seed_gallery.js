const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// 1. Load SQL Schema
const sqlPath = path.join(__dirname, 'create_gallery_table.sql');
if (!fs.existsSync(sqlPath)) {
  console.error('SQL schema file not found at: ' + sqlPath);
  process.exit(1);
}
const schemaSql = fs.readFileSync(sqlPath, 'utf8');

// 2. Load and parse PHOTOS from GalleryGrid.js
const gridPath = path.join(__dirname, 'components', 'GalleryGrid', 'GalleryGrid.js');
if (!fs.existsSync(gridPath)) {
  console.error('GalleryGrid.js file not found at: ' + gridPath);
  process.exit(1);
}
const gridContent = fs.readFileSync(gridPath, 'utf8');
const photosMatch = gridContent.match(/const PHOTOS = (\[[\s\S]*?\]);/);
if (!photosMatch) {
  console.error("Could not find PHOTOS array in GalleryGrid.js");
  process.exit(1);
}

let PHOTOS = [];
try {
  PHOTOS = eval(photosMatch[1]);
  console.log(`✓ Successfully extracted ${PHOTOS.length} photos from GalleryGrid.js`);
} catch (e) {
  console.error("Failed to parse PHOTOS array using eval:", e);
  process.exit(1);
}

// 3. Setup PostgreSQL config
const passwordsToTry = [
  'Aidhee#Deep080404',
  'Aishee#Deep080404',
  'debabrata74618'
];

const config = {
  host: 'db.sgsaucmxuztrmtiojksa.supabase.co',
  port: 5432,
  user: 'postgres',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
};

async function run() {
  let connected = false;
  let client = null;

  for (const password of passwordsToTry) {
    console.log(`Attempting connection with password: ${password.substring(0, 3)}...`);
    client = new Client({ ...config, password });
    
    try {
      await client.connect();
      console.log('✓ Successfully connected to Supabase PostgreSQL!');
      connected = true;
      break;
    } catch (err) {
      console.error(`✗ Connection failed with password: ${password.substring(0, 3)}... - Error: ${err.message}`);
      client = null;
    }
  }

  if (!connected || !client) {
    console.error('CRITICAL: All password attempts failed. Database seeding aborted.');
    process.exit(1);
  }

  try {
    // A. Create Table and Policies
    console.log('Creating table and configuring policies...');
    await client.query(schemaSql);
    console.log('✓ Database table create_gallery_table.sql executed successfully.');

    // B. Check if data already exists
    const countRes = await client.query('SELECT count(*) FROM gallery_images');
    const existingCount = parseInt(countRes.rows[0].count);
    console.log(`Current records in gallery_images: ${existingCount}`);

    if (existingCount > 0) {
      console.log('⚠ Table already contains records. Skipping seeding to prevent duplication.');
    } else {
      console.log('Seeding initial photos into gallery_images...');
      for (let i = 0; i < PHOTOS.length; i++) {
        const photo = PHOTOS[i];
        const displayOrder = (i + 1) * 10; // 10, 20, 30... for easy ordering updates
        
        await client.query(
          'INSERT INTO gallery_images (src, alt, title, description, display_order) VALUES ($1, $2, $3, $4, $5)',
          [photo.src, photo.alt, photo.title, photo.desc || null, displayOrder]
        );
      }
      console.log(`✓ Successfully seeded ${PHOTOS.length} photos into gallery_images!`);
    }

  } catch (err) {
    console.error('✗ SQL execution failed:', err);
  } finally {
    await client.end();
    console.log('Connection closed.');
  }
}

run();
