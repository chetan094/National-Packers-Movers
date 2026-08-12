import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BASE_URL = 'https://www.thenationalpackersmovers.com';

// ─── STATIC FALLBACK PHOTOS ───────────────────────────────────────────────────
// These are the photos that live in /public/photos/ on the server.
// They appear in the gallery when NO Supabase gallery_images exist yet.
// Their URLs ARE valid on the live website (Vercel deploys /public/ files).
const STATIC_PHOTOS = [
  { src: `${BASE_URL}/photos/premium-cushion-sofa-wrapping.jpg`,      title: 'Premium Cushion Sofa Wrapping',      caption: 'Expert packing crew wrapping high-value wooden and leather sofas using bubble wrap.' },
  { src: `${BASE_URL}/photos/safe-container-vehicle-loading.jpg`,     title: 'Safe Container Vehicle Loading',      caption: 'Stacking cartons and wrapped household items inside our lockable, weather-proof container vehicles.' },
  { src: `${BASE_URL}/photos/seamless-corporate-office-shifting.jpg`, title: 'Seamless Corporate Office Shifting',  caption: 'PSU and bank employee cabins, computer servers, and office desks carefully boxed for transit.' },
  { src: `${BASE_URL}/photos/safe-car-carrier-shifting.jpg`,          title: 'Safe Car Carrier Shifting',           caption: 'Loading family cars onto specialized double-deck carrier trucks for damage-free highway transit.' },
  { src: `${BASE_URL}/photos/palletized-storage-warehousing.jpg`,     title: 'Palletized Storage and Warehousing',  caption: 'Clean, insect-free storage facility with strict inventory tracking and 24/7 security watch.' },
  { src: `${BASE_URL}/photos/waterproof-cardboard-packaging.jpg`,     title: 'Waterproof Cardboard Packaging',      caption: 'Heavy-duty shifting boxes wrapped in waterproof stretch wrap against highway dust and monsoon rains.' },
  { src: `${BASE_URL}/photos/fragile-kitchenware-wrapping.jpg`,       title: 'Fragile Kitchenware Wrapping',        caption: 'Delicate kitchen glass sets and bone china plates wrapped individually in foam sheets.' },
  { src: `${BASE_URL}/photos/destination-bed-reassembly.jpg`,         title: 'Destination Bed Reassembly',          caption: 'Unpacking and placing heavy items, including the safe reassembly of beds and cabinets.' },
  { src: `${BASE_URL}/photos/team-loading-operations.jpg`,            title: 'Team Loading Operations',             caption: 'Professional loaders carefully handling heavy domestic appliances onto direct shipping carriers.' },
  { src: `${BASE_URL}/photos/uniform-packing-crew.jpg`,               title: 'Uniform Packing Crew',                caption: 'Our staff in official corporate uniforms, demonstrating organization and reliability.' },
  { src: `${BASE_URL}/photos/gps-tracked-container-fleet.jpg`,        title: 'GPS-Tracked Container Fleet',         caption: 'Our lockable, closed-container trucks on direct routes across states with zero midway transfers.' },
  { src: `${BASE_URL}/photos/heavy-furniture-shifting.jpg`,           title: 'Heavy Furniture Shifting',            caption: 'Experienced crews using specialized belts to carry heavy wardrobes and double beds safely.' },
  { src: `${BASE_URL}/photos/secure-cargo-stacking-layout.jpg`,       title: 'Secure Cargo Stacking Layout',        caption: 'Interlocking packing methods to eliminate item movements during highway transit.' },
  { src: `${BASE_URL}/photos/dual-layer-bubble-wrapping.jpg`,         title: 'Dual-Layer Bubble Wrapping',          caption: 'Wrapping fragile electronics, LED TVs, and mirrors using thick bubble wrap and stretch wrapping.' },
  { src: `${BASE_URL}/photos/apartment-residential-relocation.jpg`,   title: 'Apartment Residential Relocation',    caption: 'Complete door-to-door residential relocations in Ranchi, Dhanbad, and Patna.' },
  { src: `${BASE_URL}/photos/doorstep-unloading-setup.jpg`,           title: 'Doorstep Unloading and Setup',        caption: 'Supervisors cross-checking the item checklist during doorstep unloading and placing items.' },
  { src: `${BASE_URL}/photos/bike-relocation-packing.jpg`,            title: 'Bike Relocation Packing',             caption: 'Professional two-wheeler packing using multi-layer bubble wrapping and cargo carrier transit.' },
  { src: `${BASE_URL}/photos/national-logistics-transit.jpg`,         title: 'National Logistics Transit',          caption: 'Our transport vehicles loaded and ready for safe highway dispatch from our branch office.' },
  { src: `${BASE_URL}/photos/national-packing-operations.jpg`,        title: 'National Packing Operations',         caption: 'Experienced shifting crews wrapping domestic assets using heavy-duty stretch wraps.' },
  { src: `${BASE_URL}/photos/relocation-packing-standards.jpg`,       title: 'Relocation Packing Standards',        caption: 'Standardized wrapping layouts for home furniture and delicate electronics before transit.' },
  { src: `${BASE_URL}/photos/cargo-loading-dispatch.jpg`,             title: 'Cargo Loading and Dispatch',          caption: 'Carefully stacking boxes inside container trucks to ensure zero movement during transit.' },
  { src: `${BASE_URL}/photos/container-loading-process.jpg`,          title: 'Container Loading Process',           caption: 'Locked container loading at our transit terminal for long-distance relocations.' },
  { src: `${BASE_URL}/photos/multi-layer-packing-process.jpg`,        title: 'Multi-Layer Packing Process',         caption: 'Wrapping fragile kitchenware, chinaware, and electronics in dynamic thick cushion rolls.' },
  { src: `${BASE_URL}/photos/goods-dispatch-transit.jpg`,             title: 'Goods Dispatch Transit',              caption: 'Supervising direct interstate vehicle transit dispatch.' },
  { src: `${BASE_URL}/photos/national-shifting-crew.jpg`,             title: 'National Shifting Crew',              caption: 'Uniformed, trained logistics staff handling large domestic items down residential floors.' },
  { src: `${BASE_URL}/photos/secure-shifting-operations.jpg`,         title: 'Secure Shifting Operations',          caption: 'Using high-strength tie-down straps inside closed truck containers.' },
  { src: `${BASE_URL}/photos/direct-container-loading.jpg`,           title: 'Direct Container Loading',            caption: 'Stacking goods systematically with heavy items at the base and lighter boxes on top.' },
  { src: `${BASE_URL}/photos/household-goods-packing.jpg`,            title: 'Household Goods Packing',             caption: 'Multi-layered bubble wrapping on electrical appliances for maximum protection during transit.' },
  { src: `${BASE_URL}/photos/direct-route-dispatch.jpg`,              title: 'Direct Route Dispatch',               caption: 'National Packers container carrier fleet ready for immediate direct transport across states.' },
  { src: `${BASE_URL}/photos/doorstep-relocation-setup.jpg`,          title: 'Doorstep Relocation Setup',           caption: 'Offloading household items and setting them up in the customer\'s new home.' },
  { src: `${BASE_URL}/photos/premium-wrapping-materials.jpg`,         title: 'Premium Wrapping Materials',          caption: 'Heavy-duty cardboard boxes, high-density bubble wrap, stretch films, and sealing tapes.' },
  { src: `${BASE_URL}/photos/safe-warehousing-facilities.jpg`,        title: 'Safe Warehousing Facilities',         caption: 'Clean, secure, insect-free storage facility with strict inventory controls.' },
  { src: `${BASE_URL}/photos/gps-cargo-container-fleet.jpg`,          title: 'GPS Cargo Container Fleet',           caption: 'Our container trucks dispatching directly with no transshipment or intermediate handling.' },
  { src: `${BASE_URL}/photos/furniture-wrapping-process.jpg`,         title: 'Furniture Wrapping Process',          caption: 'Wrapping double beds, wardrobes, and cabinets with thick foam sheets and outer cardboard.' },
  { src: `${BASE_URL}/photos/highway-transit-stacking.jpg`,           title: 'Highway Transit Stacking',            caption: 'Securing household items in interlocking layouts to eliminate vibrations and road bumps.' },
  { src: `${BASE_URL}/photos/doorstep-offloading-crew.jpg`,           title: 'Doorstep Offloading Crew',            caption: 'Our supervisors cross-checking items off the inventory list during unloading.' },
  { src: `${BASE_URL}/photos/heavy-duty-box-wrapping.jpg`,            title: 'Heavy Duty Box Wrapping',             caption: 'Heavy-duty boxes wrapped with thick shrink wrap to prevent dust and water damage.' },
  { src: `${BASE_URL}/photos/palletized-storage-system.jpg`,          title: 'Palletized Storage System',           caption: 'Staging areas inside our clean warehouse for temporary cargo holding.' },
  { src: `${BASE_URL}/photos/secure-warehouse-racking.jpg`,           title: 'Secure Warehouse Racking',            caption: 'Industrial heavy-duty racks holding locked inventory pallets under 24/7 security.' },
  { src: `${BASE_URL}/photos/national-cargo-operations.jpg`,          title: 'National Cargo Operations',           caption: 'Staging and organizing boxes inside our storage hub before direct route transit dispatch.' },
  { src: `${BASE_URL}/photos/highway-container-loading.jpg`,          title: 'Highway Container Loading',           caption: 'Stacking cargo into our container fleets safely under supervisor verification.' },
  { src: `${BASE_URL}/photos/national-dispatch-teams.jpg`,            title: 'National Dispatch Teams',             caption: 'Dispatch crews coordinating transits and checking transport documents.' },
  { src: `${BASE_URL}/photos/interstate-cargo-relocation.jpg`,        title: 'Interstate Cargo Relocation',         caption: 'Heavy cargo containers carrying household and corporate consignments across cities.' },
  { src: `${BASE_URL}/photos/gps-shifting-fleet.jpg`,                 title: 'GPS Shifting Fleet',                  caption: 'Our company-owned fleet parked at our primary corporate shipping terminal.' },
  { src: `${BASE_URL}/photos/direct-interstate-shipping.jpg`,         title: 'Direct Interstate Shipping',          caption: 'National Packers closed container fleet on major highways for express deliveries.' },
  { src: `${BASE_URL}/photos/safe-packaging-process.jpg`,             title: 'Safe Packaging Process',              caption: 'Using double-wall cardboard sheets and heavy-duty tape wrapping for appliances.' },
  { src: `${BASE_URL}/photos/loading-cargo-operations.jpg`,           title: 'Loading Cargo Operations',            caption: 'Systematically stacking household packages in container vehicles to prevent transit friction.' },
  { src: `${BASE_URL}/photos/secure-vehicle-carrier.jpg`,             title: 'Secure Vehicle Carrier',              caption: 'Specialized vehicle carrier operations loading cars damage-free with secure wheel clamps.' },
  { src: `${BASE_URL}/photos/fragile-packing-standards.jpg`,          title: 'Fragile Packing Standards',           caption: 'Using heavy-duty bubble wrap layers followed by secure tape seals on LED TVs and monitors.' },
];

/**
 * Fetches the live gallery images from Supabase.
 * These are the REAL photos uploaded by the admin — hosted on Supabase CDN.
 * Returns [] if Supabase is unreachable or empty.
 */
async function getSupabaseGalleryImages() {
  if (!SUPABASE_URL || !(SUPABASE_ANON_KEY || SUPABASE_SERVICE_ROLE_KEY)) return [];
  try {
    const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/gallery_images?order=display_order.asc,created_at.desc`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        next: { revalidate: 60 }, // Re-fetch sitemap every 60 seconds
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function GET() {
  // Fetch real Supabase photos — these are the single source of truth
  const supabasePhotos = await getSupabaseGalleryImages();

  // Use Supabase records if they exist (they ARE the gallery).
  // Only fall back to static list if Supabase is completely empty.
  const allImages = supabasePhotos.length > 0
    ? supabasePhotos.map(img => ({
        src: img.src.startsWith('http')
          ? img.src                              // Real Supabase CDN URL — use as-is
          : `${BASE_URL}${img.src}`,             // Local /photos/ path — make absolute
        title: img.title || img.alt || 'National Packers & Movers Gallery Photo',
        caption: img.description || img.desc || 'National Packers & Movers — Professional Relocation Services',
      }))
    : STATIC_PHOTOS;

  const galleryPageUrl = `${BASE_URL}/gallery`;

  const imageEntries = allImages.map(img => `
    <image:image>
      <image:loc>${img.src}</image:loc>
      <image:title>${(img.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
      <image:caption>${(img.caption || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:caption>
      <image:license>${BASE_URL}/terms</image:license>
    </image:image>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${galleryPageUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${imageEntries}
  </url>
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
    },
  });
}

