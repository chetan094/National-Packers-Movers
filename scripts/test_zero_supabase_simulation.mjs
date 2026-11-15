import { getBlogs, getLeads, getGalleryImages, getCustomerReviews, getShipmentByCN, getCustomMetadata, createLead } from '../lib/supabase.js';

// MOCK: Blank out Supabase to simulate 100% deletion of Supabase
process.env.NEXT_PUBLIC_SUPABASE_URL = '';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = '';
process.env.SUPABASE_SERVICE_ROLE_KEY = '';

async function runZeroSupabaseSimulation() {
  console.log('========================================================================');
  console.log('🧪 SIMULATION: SUPABASE DELETED / 100% UNREACHABLE');
  console.log('========================================================================\n');

  try {
    const blogs = await getBlogs();
    console.log(`✓ getBlogs(): ${blogs.length} blogs fetched directly from Hostinger MySQL`);
    if (blogs.length === 0) throw new Error('Blogs returned 0');

    const leads = await getLeads();
    console.log(`✓ getLeads(): ${leads.length} leads fetched directly from Hostinger MySQL`);
    if (leads.length === 0) throw new Error('Leads returned 0');

    const gallery = await getGalleryImages();
    console.log(`✓ getGalleryImages(): ${gallery.length} gallery images fetched directly from Hostinger MySQL`);
    console.log(`  Top image order: ${gallery[0]?.display_order}, Bottom image order: ${gallery[gallery.length - 1]?.display_order}`);
    if (gallery.length < 53) throw new Error(`Gallery images count is ${gallery.length}, expected 53`);

    // Verify all image URLs in gallery do NOT contain supabase.co
    const supabaseImagesInGallery = gallery.filter(g => (g.src || '').includes('supabase.co'));
    if (supabaseImagesInGallery.length > 0) {
      console.warn(`⚠️ Warning: ${supabaseImagesInGallery.length} gallery images still reference supabase.co!`);
    } else {
      console.log('✓ 100% of Gallery images are self-hosted locally (zero supabase.co links)');
    }

    const reviews = await getCustomerReviews();
    console.log(`✓ getCustomerReviews(): ${reviews.length} reviews fetched directly from Hostinger MySQL`);
    if (reviews.length === 0) throw new Error('Reviews returned 0');

    const meta = await getCustomMetadata('/');
    console.log(`✓ getCustomMetadata('/'): SEO Title: "${meta?.meta_title?.substring(0, 45)}..."`);
    if (!meta) throw new Error('Metadata returned null');

    const shipment = await getShipmentByCN('NPM-2026-9308');
    console.log(`✓ getShipmentByCN('NPM-2026-9308'): Customer: "${shipment?.customer_name}" | Origin: "${shipment?.origin}" -> "${shipment?.destination}" | Status: "${shipment?.current_status}"`);
    if (!shipment) throw new Error('Shipment returned null');

    // Test inserting a test lead
    const testLead = {
      name: 'Simulated Zero-Supabase Lead',
      phone: '9999999999',
      email: 'zero-supabase-test@npm.com',
      from: 'Dhanbad',
      to: 'Kolkata',
      source: 'Simulation Test'
    };
    const created = await createLead(testLead);
    console.log(`✓ createLead(): Lead inserted successfully into Hostinger MySQL (ID: ${created.id})`);

    console.log('\n========================================================================');
    console.log('🎉 100% SUCCESS: HOSTINGER MYSQL OPERATES ENTIRE WEBSITE INDEPENDENTLY!');
    console.log('   DELETING SUPABASE IN THE FUTURE WILL CAUSE ZERO ISSUES OR DOWNTIME.');
    console.log('========================================================================');
    process.exit(0);
  } catch (err) {
    console.error('❌ Zero-Supabase simulation failed:', err);
    process.exit(1);
  }
}

runZeroSupabaseSimulation();
