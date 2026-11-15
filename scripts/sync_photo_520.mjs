import mysql from 'mysql2/promise';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sgsaucmxuztrmtiojksa.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_tRQxgxH3vLbRJkAXdWVk9w_hPqGG3I7';

const DB_CONFIG = {
  host: process.env.DB_HOST || 'srv665.hstgr.io',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'u373069423_npm_admin',
  password: process.env.DB_PASSWORD || 'Dhanbad@14',
  database: process.env.DB_NAME || 'u373069423_npm_db',
  connectTimeout: 30000,
  ssl: false
};

function getHeaders() {
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };
}

async function sync() {
  console.log('========================================================================');
  console.log('🔄 SYNCING NEWEST RECORDS (INCLUDING PHOTO 520) FROM SUPABASE TO MYSQL');
  console.log('========================================================================\n');

  // 1. Fetch from Supabase
  const res = await fetch(`${SUPABASE_URL}/rest/v1/gallery_images?order=display_order.asc`, { headers: getHeaders() });
  if (!res.ok) {
    throw new Error(`Failed to fetch from Supabase: ${res.status} ${res.statusText}`);
  }
  const supabaseGallery = await res.json();
  console.log(`✓ Fetched ${supabaseGallery.length} total gallery images from Supabase`);

  // 2. Connect to Hostinger MySQL
  const connection = await mysql.createConnection(DB_CONFIG);
  console.log('✓ Connected to Hostinger MySQL');

  // 3. Upsert all gallery images
  let inserted = 0;
  for (const g of supabaseGallery) {
    const id = g.id || crypto.randomUUID();
    const [result] = await connection.query(
      `INSERT INTO \`gallery_images\` (\`id\`, \`src\`, \`alt\`, \`title\`, \`description\`, \`display_order\`, \`created_at\`)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         \`src\` = VALUES(\`src\`),
         \`alt\` = VALUES(\`alt\`),
         \`title\` = VALUES(\`title\`),
         \`description\` = VALUES(\`description\`),
         \`display_order\` = VALUES(\`display_order\`)`,
      [
        id, g.src, g.alt, g.title, g.description || null, g.display_order || 0,
        g.created_at ? new Date(g.created_at) : new Date()
      ]
    );
    if (result.affectedRows === 1) inserted++;
  }
  console.log(`✓ Upsert completed (newly inserted: ${inserted})`);

  // 4. Verify Photo 520
  const [rows520] = await connection.query('SELECT * FROM `gallery_images` WHERE `display_order` = 520');
  console.log('\n--- VERIFICATION OF PHOTO 520 IN MYSQL ---');
  if (rows520.length > 0) {
    console.log('✓ Photo 520 successfully found in Hostinger MySQL:');
    console.log('  Title:', rows520[0].title);
    console.log('  Src:', rows520[0].src);
    console.log('  Display Order:', rows520[0].display_order);
  } else {
    console.error('❌ Photo 520 NOT found in MySQL');
  }

  // 5. Total count in MySQL
  const [countRows] = await connection.query('SELECT count(*) as total FROM `gallery_images`');
  console.log(`\n🎉 Total Gallery Images in Hostinger MySQL now: ${countRows[0].total}`);

  await connection.end();
  process.exit(0);
}

sync().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
