import { query, isDbConfigured } from '../lib/db.js';

async function test() {
  console.log('Testing Hostinger MySQL Connection from lib/db.js...');
  console.log('isDbConfigured():', isDbConfigured());

  try {
    const blogs = await query('SELECT count(*) as count FROM blogs');
    const leads = await query('SELECT count(*) as count FROM leads');
    const gallery = await query('SELECT count(*) as count FROM gallery_images');
    const reviews = await query('SELECT count(*) as count FROM customer_reviews');

    console.log('✓ Blogs Count:', blogs[0].count);
    console.log('✓ Leads Count:', leads[0].count);
    console.log('✓ Gallery Images Count:', gallery[0].count);
    console.log('✓ Customer Reviews Count:', reviews[0].count);
    console.log('🎉 Direct MySQL connection through lib/db.js is 100% OPERATIONAL!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database query error:', err);
    process.exit(1);
  }
}

test();
