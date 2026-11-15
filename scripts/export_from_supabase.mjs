import fs from 'fs/promises';
import path from 'path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sgsaucmxuztrmtiojksa.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_tRQxgxH3vLbRJkAXdWVk9w_hPqGG3I7';

function getHeaders() {
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };
}

async function fetchTable(tableName, query = '') {
  try {
    const url = `${SUPABASE_URL}/rest/v1/${tableName}${query}`;
    console.log(`Fetching from Supabase: ${tableName}...`);
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) {
      console.warn(`Could not fetch ${tableName}: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    console.log(`✓ Fetched ${data.length} records from ${tableName}`);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(`Error fetching ${tableName}:`, err.message);
    return [];
  }
}

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 1 : 0;
  if (typeof val === 'object') {
    return `'${JSON.stringify(val).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0': return '\\0';
        case '\x08': return '\\b';
        case '\x09': return '\\t';
        case '\x1a': return '\\z';
        case '\n': return '\\n';
        case '\r': return '\\r';
        case '"':
        case "'":
        case '\\':
        case '%': return '\\' + char;
        default: return char;
      }
    })}'`;
  }
  return `'${String(val).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case '\0': return '\\0';
      case '\x08': return '\\b';
      case '\x09': return '\\t';
      case '\x1a': return '\\z';
      case '\n': return '\\n';
      case '\r': return '\\r';
      case '"':
      case "'":
      case '\\':
      case '%': return '\\' + char;
      default: return char;
    }
  })}'`;
}

async function run() {
  console.log('====================================================');
  console.log('Extracting live data from Supabase for Hostinger MySQL');
  console.log('====================================================');

  const [
    blogs,
    leads,
    shipments,
    reviews,
    gallery,
    metadata,
    users,
    analytics
  ] = await Promise.all([
    fetchTable('blogs', '?order=created_at.desc'),
    fetchTable('leads', '?order=created_at.desc'),
    fetchTable('shipments', '?order=created_at.desc'),
    fetchTable('customer_reviews', '?order=created_at.desc'),
    fetchTable('gallery_images', '?order=display_order.asc'),
    fetchTable('site_metadata', '?order=path.asc'),
    fetchTable('admin_users', '?order=username.asc'),
    fetchTable('analytics_events', '?order=created_at.desc&limit=2000')
  ]);

  let sql = `-- ========================================================================\n`;
  sql += `-- Complete Database Export: Supabase -> Hostinger MySQL (u373069423_npm_db)\n`;
  sql += `-- Generated on: ${new Date().toISOString()}\n`;
  sql += `-- ========================================================================\n\n`;
  sql += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

  // Read base schema DDL
  const schemaPath = path.join(process.cwd(), 'schema_mysql.sql');
  const baseSchema = await fs.readFile(schemaPath, 'utf8');
  sql += baseSchema + `\n\n`;

  // Blogs Data
  if (blogs.length > 0) {
    sql += `-- Dumping data for table blogs (${blogs.length} rows)\n`;
    for (const b of blogs) {
      sql += `INSERT INTO \`blogs\` (\`id\`, \`title\`, \`slug\`, \`excerpt\`, \`content\`, \`image_url\`, \`category\`, \`created_at\`) VALUES (${escapeSql(b.id)}, ${escapeSql(b.title)}, ${escapeSql(b.slug)}, ${escapeSql(b.excerpt)}, ${escapeSql(b.content)}, ${escapeSql(b.image_url)}, ${escapeSql(b.category)}, ${escapeSql(b.created_at)}) ON DUPLICATE KEY UPDATE \`title\`=VALUES(\`title\`);\n`;
    }
    sql += `\n`;
  }

  // Leads Data
  if (leads.length > 0) {
    sql += `-- Dumping data for table leads (${leads.length} rows)\n`;
    for (const l of leads) {
      sql += `INSERT INTO \`leads\` (\`id\`, \`name\`, \`phone\`, \`email\`, \`from_city\`, \`to_city\`, \`moving_date\`, \`move_type\`, \`notes\`, \`inventory\`, \`matched_vehicle\`, \`total_cft\`, \`source\`, \`status\`, \`created_at\`) VALUES (${escapeSql(l.id)}, ${escapeSql(l.name)}, ${escapeSql(l.phone)}, ${escapeSql(l.email)}, ${escapeSql(l.from_city)}, ${escapeSql(l.to_city)}, ${escapeSql(l.moving_date)}, ${escapeSql(l.move_type)}, ${escapeSql(l.notes)}, ${escapeSql(l.inventory)}, ${escapeSql(l.matched_vehicle)}, ${escapeSql(l.total_cft || 0)}, ${escapeSql(l.source)}, ${escapeSql(l.status || 'New')}, ${escapeSql(l.created_at)}) ON DUPLICATE KEY UPDATE \`status\`=VALUES(\`status\`);\n`;
    }
    sql += `\n`;
  }

  // Shipments Data
  if (shipments.length > 0) {
    sql += `-- Dumping data for table shipments (${shipments.length} rows)\n`;
    for (const s of shipments) {
      sql += `INSERT INTO \`shipments\` (\`id\`, \`consignment_number\`, \`customer_name\`, \`customer_phone\`, \`origin\`, \`destination\`, \`booking_date\`, \`current_status\`, \`current_location\`, \`vehicle_number\`, \`driver_name\`, \`driver_phone\`, \`status_history\`, \`created_at\`) VALUES (${escapeSql(s.id)}, ${escapeSql(s.consignment_number)}, ${escapeSql(s.customer_name)}, ${escapeSql(s.customer_phone)}, ${escapeSql(s.origin)}, ${escapeSql(s.destination)}, ${escapeSql(s.booking_date)}, ${escapeSql(s.current_status)}, ${escapeSql(s.current_location)}, ${escapeSql(s.vehicle_number)}, ${escapeSql(s.driver_name)}, ${escapeSql(s.driver_phone)}, ${escapeSql(s.status_history)}, ${escapeSql(s.created_at)}) ON DUPLICATE KEY UPDATE \`current_status\`=VALUES(\`current_status\`);\n`;
    }
    sql += `\n`;
  }

  // Customer Reviews Data
  if (reviews.length > 0) {
    sql += `-- Dumping data for table customer_reviews (${reviews.length} rows)\n`;
    for (const r of reviews) {
      sql += `INSERT INTO \`customer_reviews\` (\`id\`, \`name\`, \`phone\`, \`state_slug\`, \`state_name\`, \`city_slug\`, \`city_name\`, \`rating\`, \`review_text\`, \`status\`, \`display_target\`, \`source\`, \`created_at\`) VALUES (${escapeSql(r.id)}, ${escapeSql(r.name)}, ${escapeSql(r.phone)}, ${escapeSql(r.state_slug)}, ${escapeSql(r.state_name)}, ${escapeSql(r.city_slug)}, ${escapeSql(r.city_name)}, ${escapeSql(r.rating)}, ${escapeSql(r.review_text)}, ${escapeSql(r.status || 'approved')}, ${escapeSql(r.display_target || 'both')}, ${escapeSql(r.source)}, ${escapeSql(r.created_at)}) ON DUPLICATE KEY UPDATE \`rating\`=VALUES(\`rating\`);\n`;
    }
    sql += `\n`;
  }

  // Gallery Images Data
  if (gallery.length > 0) {
    sql += `-- Dumping data for table gallery_images (${gallery.length} rows)\n`;
    for (const g of gallery) {
      sql += `INSERT INTO \`gallery_images\` (\`id\`, \`src\`, \`alt\`, \`title\`, \`description\`, \`display_order\`, \`created_at\`) VALUES (${escapeSql(g.id)}, ${escapeSql(g.src)}, ${escapeSql(g.alt)}, ${escapeSql(g.title)}, ${escapeSql(g.description)}, ${escapeSql(g.display_order || 0)}, ${escapeSql(g.created_at)}) ON DUPLICATE KEY UPDATE \`display_order\`=VALUES(\`display_order\`);\n`;
    }
    sql += `\n`;
  }

  // Site Metadata Data
  if (metadata.length > 0) {
    sql += `-- Dumping data for table site_metadata (${metadata.length} rows)\n`;
    for (const m of metadata) {
      sql += `INSERT INTO \`site_metadata\` (\`id\`, \`path\`, \`meta_title\`, \`meta_description\`, \`meta_keywords\`, \`is_noindex\`, \`updated_at\`) VALUES (${escapeSql(m.id)}, ${escapeSql(m.path)}, ${escapeSql(m.meta_title)}, ${escapeSql(m.meta_description)}, ${escapeSql(m.meta_keywords)}, ${escapeSql(m.is_noindex)}, ${escapeSql(m.updated_at)}) ON DUPLICATE KEY UPDATE \`meta_title\`=VALUES(\`meta_title\`);\n`;
    }
    sql += `\n`;
  }

  // Admin Users Data
  if (users.length > 0) {
    sql += `-- Dumping data for table admin_users (${users.length} rows)\n`;
    for (const u of users) {
      sql += `INSERT INTO \`admin_users\` (\`id\`, \`username\`, \`password_hash\`, \`salt\`, \`role\`, \`permissions\`, \`full_name\`, \`raw_password\`, \`created_at\`) VALUES (${escapeSql(u.id)}, ${escapeSql(u.username)}, ${escapeSql(u.password_hash)}, ${escapeSql(u.salt)}, ${escapeSql(u.role)}, ${escapeSql(u.permissions)}, ${escapeSql(u.full_name)}, ${escapeSql(u.raw_password)}, ${escapeSql(u.created_at)}) ON DUPLICATE KEY UPDATE \`role\`=VALUES(\`role\`);\n`;
    }
    sql += `\n`;
  }

  // Analytics Events Data
  if (analytics.length > 0) {
    sql += `-- Dumping data for table analytics_events (${analytics.length} rows)\n`;
    for (const a of analytics) {
      sql += `INSERT INTO \`analytics_events\` (\`id\`, \`event_type\`, \`event_name\`, \`page_path\`, \`session_id\`, \`referrer\`, \`device_type\`, \`ip_address\`, \`visitor_location\`, \`created_at\`) VALUES (${escapeSql(a.id)}, ${escapeSql(a.event_type)}, ${escapeSql(a.event_name)}, ${escapeSql(a.page_path)}, ${escapeSql(a.session_id)}, ${escapeSql(a.referrer)}, ${escapeSql(a.device_type)}, ${escapeSql(a.ip_address)}, ${escapeSql(a.visitor_location)}, ${escapeSql(a.created_at)}) ON DUPLICATE KEY UPDATE \`event_type\`=VALUES(\`event_type\`);\n`;
    }
    sql += `\n`;
  }

  sql += `SET FOREIGN_KEY_CHECKS = 1;\n`;

  const outputPath = path.join(process.cwd(), 'hostinger_database_complete.sql');
  await fs.writeFile(outputPath, sql, 'utf8');
  console.log(`\n====================================================`);
  console.log(`✓ COMPLETE MIGRATION SQL READY: ${outputPath}`);
  console.log(`Total records converted and exported successfully.`);
  console.log(`====================================================\n`);
}

run();
