import { sendLeadNotifications } from '@/lib/notifications';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if credentials exist, fall back to mock log warnings in dev if not set yet
const hasCredentials = !!(SUPABASE_URL && (SUPABASE_ANON_KEY || SUPABASE_SERVICE_ROLE_KEY));

function getHeaders() {
  // Use service_role key if available to bypass RLS securely on server-side requests.
  // Fall back to anon key if not set.
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY || '';
  return {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

export async function getBlogs(forceFresh = false) {
  if (!hasCredentials) {
    console.warn('Supabase credentials missing. Returning empty blog list.');
    return [];
  }
  try {
    const fetchOptions = {
      method: 'GET',
      headers: getHeaders()
    };
    if (forceFresh) {
      fetchOptions.cache = 'no-store';
    } else {
      fetchOptions.next = { revalidate: 30 }; // Cache page data for 30s (ISR)
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blogs?order=created_at.desc`, fetchOptions);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Get failed: ${err}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching blogs from Supabase:', error);
    return [];
  }
}

export async function getBlogBySlug(slug, forceFresh = false) {
  if (!hasCredentials) return null;
  try {
    const fetchOptions = {
      method: 'GET',
      headers: getHeaders()
    };
    if (forceFresh) {
      fetchOptions.cache = 'no-store';
    } else {
      fetchOptions.next = { revalidate: 30 };
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blogs?slug=eq.${slug}&limit=1`, fetchOptions);
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch (error) {
    console.error(`Error fetching blog by slug ${slug}:`, error);
    return null;
  }
}

export async function createBlog(blog) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blogs`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(blog)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to insert blog: ${err}`);
  }
  return await res.json();
}

export async function updateBlog(id, blog) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blogs?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(blog)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update blog: ${err}`);
  }
  return await res.json();
}

export async function deleteBlog(id) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blogs?id=eq.${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to delete blog: ${err}`);
  }
  return true;
}

export async function createLead(lead) {
  if (!hasCredentials) {
    console.warn('Supabase credentials missing. Mocking lead creation in console.');
    return { success: true, mock: true };
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      email: lead.email || null,
      from_city: lead.from || null,
      to_city: lead.to || null,
      moving_date: lead.date || null,
      move_type: lead.moveType || null,
      notes: lead.notes || lead.message || null,
      inventory: lead.inventory || null,
      matched_vehicle: lead.matchedVehicle || null,
      total_cft: lead.totalCft || 0,
      source: lead.source,
      status: lead.status || 'New'
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to insert lead: ${err}`);
  }
  const data = await res.json();
  const createdRecord = data[0] || data;

  // Trigger instant Telegram & Email alerts
  try {
    await sendLeadNotifications(lead);
  } catch (notifyErr) {
    console.error('Lead notification trigger error:', notifyErr);
  }

  return createdRecord;
}

export async function getLeads() {
  if (!hasCredentials) {
    console.warn('Supabase credentials missing. Returning empty leads list.');
    return [];
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?order=created_at.desc`, {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store'
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Get leads failed: ${err}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching leads from Supabase:', error);
    return [];
  }
}

export async function updateLead(id, updates) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  
  const dbUpdates = {};
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
  if (updates.email !== undefined) dbUpdates.email = updates.email;
  if (updates.from_city !== undefined) dbUpdates.from_city = updates.from_city;
  if (updates.to_city !== undefined) dbUpdates.to_city = updates.to_city;
  if (updates.moving_date !== undefined) dbUpdates.moving_date = updates.moving_date;
  if (updates.move_type !== undefined) dbUpdates.move_type = updates.move_type;
  if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
  if (updates.status !== undefined) dbUpdates.status = updates.status;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(dbUpdates)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update lead: ${err}`);
  }
  const data = await res.json();
  return data[0] || data;
}

export async function deleteLead(id) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to delete lead: ${err}`);
  }
  return true;
}

export async function createAnalyticsEvent(event) {
  if (!hasCredentials) return { success: true, mock: true };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/analytics_events`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      event_type: event.event_type,
      event_name: event.event_name,
      page_path: event.page_path,
      session_id: event.session_id,
      referrer: event.referrer,
      device_type: event.device_type,
      ip_address: event.ip_address || null,
      visitor_location: event.visitor_location || null
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to insert analytics event: ${err}`);
  }
  return await res.json();
}

export async function getAnalyticsSummary() {
  if (!hasCredentials) return null;
  
  try {
    // Fetch last 5000 events to run aggregations server-side
    const res = await fetch(`${SUPABASE_URL}/rest/v1/analytics_events?order=created_at.desc&limit=5000`, {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store'
    });
    
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to fetch raw analytics: ${err}`);
    }
    
    const events = await res.json();
    
    // Fetch total leads count for conversion stats
    const leadsRes = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=id`, {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store'
    });
    const leads = leadsRes.ok ? await leadsRes.json() : [];
    const totalLeads = leads.length;
    
    // Perform server-side in-memory aggregation
    const uniqueSessions = new Set();
    let totalPageViews = 0;
    let timeSpentEventsCount = 0;
    let totalDuration = 0;
    
    const pathStats = {}; // { path: { views: 0, totalDuration: 0, durationCount: 0 } }
    const deviceStats = { mobile: 0, tablet: 0, desktop: 0 };
    const clickStats = {
      whatsapp_float_click: 0,
      whatsapp_click: 0,
      call_click: 0,
      calculator_submit: 0,
      quote_submit: 0,
      contact_submit: 0,
      testimonials_submit: 0,
      review_submit: 0
    };
    const mediaStats = { video: {}, image: {} };
    const recentActivity = [];
    
    events.forEach((evt, idx) => {
      uniqueSessions.add(evt.session_id);
      
      // Capture recent visitor actions (latest 15 events)
      if (idx < 15) {
        recentActivity.push({
          id: evt.id,
          event_type: evt.event_type,
          event_name: evt.event_name,
          page_path: evt.page_path,
          device_type: evt.device_type,
          created_at: evt.created_at,
          ip_address: evt.ip_address || '127.0.0.1',
          visitor_location: evt.visitor_location || 'Localhost'
        });
      }
      
      if (evt.event_type === 'page_view') {
        totalPageViews++;
        
        if (!pathStats[evt.page_path]) {
          pathStats[evt.page_path] = { views: 0, totalDuration: 0, durationCount: 0 };
        }
        pathStats[evt.page_path].views++;
        
        const dt = evt.device_type || 'desktop';
        deviceStats[dt] = (deviceStats[dt] || 0) + 1;
      }
      
      if (evt.event_type === 'time_spent') {
        const duration = parseInt(evt.event_name) || 0;
        if (duration > 0 && duration < 3600) {
          totalDuration += duration;
          timeSpentEventsCount++;
          
          if (!pathStats[evt.page_path]) {
            pathStats[evt.page_path] = { views: 0, totalDuration: 0, durationCount: 0 };
          }
          pathStats[evt.page_path].totalDuration += duration;
          pathStats[evt.page_path].durationCount++;
        }
      }
      
      if (evt.event_type === 'click') {
        clickStats[evt.event_name] = (clickStats[evt.event_name] || 0) + 1;
      }
      
      if (evt.event_type === 'video_play') {
        mediaStats.video[evt.event_name] = (mediaStats.video[evt.event_name] || 0) + 1;
      }
      
      if (evt.event_type === 'image_view') {
        mediaStats.image[evt.event_name] = (mediaStats.image[evt.event_name] || 0) + 1;
      }
    });
    
    // Map path statistics
    const pagesList = Object.entries(pathStats).map(([path, data]) => {
      const avgDur = data.durationCount > 0 ? Math.round(data.totalDuration / data.durationCount) : 0;
      return {
        path,
        views: data.views,
        avg_duration: avgDur
      };
    }).sort((a, b) => b.views - a.views);
    
    const uniqueVisitorsCount = uniqueSessions.size;
    const avgSessionDuration = timeSpentEventsCount > 0 ? Math.round(totalDuration / timeSpentEventsCount) : 0;
    const conversionRate = uniqueVisitorsCount > 0 ? ((totalLeads / uniqueVisitorsCount) * 100).toFixed(2) : '0.00';
    
    return {
      summary: {
        unique_visitors: uniqueVisitorsCount,
        total_page_views: totalPageViews,
        avg_duration: avgSessionDuration,
        conversion_rate: parseFloat(conversionRate),
        total_leads: totalLeads,
        total_duration: totalDuration
      },
      device_splits: deviceStats,
      pages_breakdown: pagesList,
      clicks_breakdown: clickStats,
      media_engagement: mediaStats,
      recent_activity: recentActivity
    };
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return null;
  }
}

export async function getCustomMetadata(path, forceFresh = false) {
  if (!hasCredentials) return null;
  try {
    const fetchOptions = {
      method: 'GET',
      headers: getHeaders()
    };
    if (forceFresh) {
      fetchOptions.cache = 'no-store';
    } else {
      fetchOptions.next = { revalidate: 30 };
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_metadata?path=eq.${encodeURIComponent(path)}`, fetchOptions);
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch (error) {
    console.error(`Error fetching custom metadata for path ${path}:`, error);
    return null;
  }
}

export async function upsertCustomMetadata(meta) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const existing = await getCustomMetadata(meta.path, true);
  
  const body = {
    path: meta.path,
    meta_title: meta.meta_title,
    meta_description: meta.meta_description,
    meta_keywords: meta.meta_keywords || null,
    is_noindex: !!meta.is_noindex,
    updated_at: new Date().toISOString()
  };

  let res;
  if (existing) {
    res = await fetch(`${SUPABASE_URL}/rest/v1/site_metadata?path=eq.${encodeURIComponent(meta.path)}`, {
      method: 'PATCH',
      headers: {
        ...getHeaders(),
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(body)
    });
  } else {
    res = await fetch(`${SUPABASE_URL}/rest/v1/site_metadata`, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(body)
    });
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to save custom metadata: ${err}`);
  }
  return await res.json();
}

export async function getCustomMetadataList() {
  if (!hasCredentials) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_metadata?order=path.asc`, {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store'
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to fetch metadata list: ${err}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching custom metadata list:', error);
    return [];
  }
}

export async function getGalleryImages(forceFresh = false) {
  if (!hasCredentials) {
    console.warn('Supabase credentials missing. Returning empty gallery list.');
    return [];
  }
  try {
    const fetchOptions = {
      method: 'GET',
      headers: getHeaders()
    };
    if (forceFresh) {
      fetchOptions.cache = 'no-store';
    } else {
      fetchOptions.next = { revalidate: 30 }; // Cache for 30s (ISR)
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/gallery_images?order=display_order.asc,created_at.desc`, fetchOptions);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Get failed: ${err}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching gallery images from Supabase:', error);
    return [];
  }
}

export async function createGalleryImage(image) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/gallery_images`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(image)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to insert gallery image: ${err}`);
  }
  return await res.json();
}

export async function updateGalleryImage(id, updates) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/gallery_images?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(updates)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update gallery image: ${err}`);
  }
  return await res.json();
}

export async function deleteGalleryImage(id) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/gallery_images?id=eq.${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to delete gallery image: ${err}`);
  }
  return true;
}

export async function getShipmentByCN(cn) {
  if (!hasCredentials) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/shipments?consignment_number=eq.${encodeURIComponent(cn)}&limit=1`, {
      method: 'GET',
      headers: getHeaders(),
      next: { revalidate: 10 } // Cache for 10s
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch (error) {
    console.error(`Error fetching shipment by CN ${cn}:`, error);
    return null;
  }
}

export async function getShipments() {
  if (!hasCredentials) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/shipments?order=created_at.desc`, {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Error fetching shipments list:', error);
    return [];
  }
}

export async function createShipment(shipment) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/shipments`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(shipment)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create shipment: ${err}`);
  }
  const data = await res.json();
  return data[0] || data;
}

export async function updateShipment(id, updates) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/shipments?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(updates)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update shipment: ${err}`);
  }
  const data = await res.json();
  return data[0] || data;
}

export async function deleteShipment(id) {
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/shipments?id=eq.${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to delete shipment: ${err}`);
  }
  return true;
}



