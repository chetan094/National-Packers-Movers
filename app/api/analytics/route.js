import { createAnalyticsEvent } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();
    const userAgent = req.headers.get('user-agent') || '';
    
    // Basic regex classification for user device types
    let deviceType = 'desktop';
    if (/Mobi|Android|iPhone|webOS/i.test(userAgent)) {
      deviceType = 'mobile';
    } else if (/iPad|Tablet/i.test(userAgent)) {
      deviceType = 'tablet';
    }
    
    // Extract client IP address
    let ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    if (ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }
    
    // Check Vercel location headers first
    const vercelCity = req.headers.get('x-vercel-ip-city') || '';
    const vercelRegion = req.headers.get('x-vercel-ip-country-region') || '';
    const vercelCountry = req.headers.get('x-vercel-ip-country') || '';
    
    let location = 'Unknown';
    if (vercelCity || vercelRegion) {
      location = `${vercelCity}${vercelCity && vercelRegion ? ', ' : ''}${vercelRegion}${vercelCountry ? ` (${vercelCountry})` : ''}`;
    } else if (ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
      // Fallback: Query public geolocation lookup
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}`, { signal: AbortSignal.timeout(2000) });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === 'success') {
            location = `${geoData.city}, ${geoData.regionName || geoData.region} (${geoData.countryCode})`;
          }
        }
      } catch (e) {
        console.error('IP Geolocation error:', e);
      }
    } else {
      location = 'Localhost';
    }
    
    // Save record to database
    await createAnalyticsEvent({
      event_type: body.event_type,
      event_name: body.event_name,
      page_path: body.page_path,
      session_id: body.session_id,
      referrer: body.referrer || null,
      device_type: deviceType,
      ip_address: ip,
      visitor_location: location
    });
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Error inserting analytics event:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
