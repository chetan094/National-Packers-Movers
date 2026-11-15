import crypto from 'crypto';
import { sendLeadNotifications } from './notifications.js';
import { query, isDbConfigured } from './db.js';

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
  if (isDbConfigured()) {
    try {
      const rows = await query('SELECT * FROM `blogs` ORDER BY `created_at` DESC');
      if (rows && rows.length > 0) return rows;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL getBlogs failed, falling back to Supabase:', mysqlErr.message);
    }
  }
  if (!hasCredentials) {
    console.warn('Database credentials missing. Returning empty blog list.');
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
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlogBySlug(slug, forceFresh = false) {
  if (isDbConfigured()) {
    try {
      const rows = await query('SELECT * FROM `blogs` WHERE `slug` = ? LIMIT 1', [slug]);
      if (rows && rows.length > 0) return rows[0];
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL getBlogBySlug failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const id = blog.id || crypto.randomUUID();
      await query(
        `INSERT INTO \`blogs\` (\`id\`, \`title\`, \`slug\`, \`excerpt\`, \`content\`, \`image_url\`, \`category\`, \`created_at\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, blog.title, blog.slug, blog.excerpt, blog.content, blog.image_url, blog.category, blog.created_at ? new Date(blog.created_at) : new Date()]
      );
      return { id, ...blog };
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL createBlog failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const fields = [];
      const values = [];
      for (const [k, v] of Object.entries(blog)) {
        fields.push(`\`${k}\` = ?`);
        values.push(v);
      }
      if (fields.length > 0) {
        values.push(id);
        await query(`UPDATE \`blogs\` SET ${fields.join(', ')} WHERE \`id\` = ?`, values);
        return { id, ...blog };
      }
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL updateBlog failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      await query('DELETE FROM \`blogs\` WHERE \`id\` = ?', [id]);
      return true;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL deleteBlog failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  let createdRecord = null;

  if (isDbConfigured()) {
    try {
      const id = lead.id || crypto.randomUUID();
      const leadData = {
        id,
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
        source: lead.source || 'Website',
        status: lead.status || 'New',
        created_at: new Date()
      };
      await query(
        `INSERT INTO \`leads\` (\`id\`, \`name\`, \`phone\`, \`email\`, \`from_city\`, \`to_city\`, \`moving_date\`, \`move_type\`, \`notes\`, \`inventory\`, \`matched_vehicle\`, \`total_cft\`, \`source\`, \`status\`, \`created_at\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          leadData.id, leadData.name, leadData.phone, leadData.email, leadData.from_city, leadData.to_city,
          leadData.moving_date, leadData.move_type, leadData.notes, leadData.inventory, leadData.matched_vehicle,
          leadData.total_cft, leadData.source, leadData.status, leadData.created_at
        ]
      );
      createdRecord = leadData;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL createLead failed, falling back to Supabase:', mysqlErr.message);
    }
  }

  if (!createdRecord) {
    if (!hasCredentials) {
      console.warn('Database credentials missing. Mocking lead creation in console.');
      createdRecord = { success: true, mock: true };
    } else {
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
      createdRecord = data[0] || data;
    }
  }

  // Trigger instant Telegram & Email alerts
  try {
    await sendLeadNotifications(lead);
  } catch (notifyErr) {
    console.error('Lead notification trigger error:', notifyErr);
  }

  return createdRecord;
}

export async function getLeads() {
  if (isDbConfigured()) {
    try {
      const rows = await query('SELECT * FROM `leads` ORDER BY `created_at` DESC');
      if (rows && rows.length > 0) return rows;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL getLeads failed, falling back to Supabase:', mysqlErr.message);
    }
  }
  if (!hasCredentials) {
    console.warn('Database credentials missing. Returning empty leads list.');
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
    console.error('Error fetching leads:', error);
    return [];
  }
}

export async function updateLead(id, updates) {
  if (isDbConfigured()) {
    try {
      const fields = [];
      const values = [];
      for (const [k, v] of Object.entries(updates)) {
        fields.push(`\`${k}\` = ?`);
        values.push(v);
      }
      if (fields.length > 0) {
        values.push(id);
        await query(`UPDATE \`leads\` SET ${fields.join(', ')} WHERE \`id\` = ?`, values);
        return { id, ...updates };
      }
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL updateLead failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      await query('DELETE FROM `leads` WHERE `id` = ?', [id]);
      return true;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL deleteLead failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const id = event.id || crypto.randomUUID();
      await query(
        `INSERT INTO \`analytics_events\` (\`id\`, \`event_type\`, \`event_name\`, \`page_path\`, \`session_id\`, \`referrer\`, \`device_type\`, \`ip_address\`, \`visitor_location\`, \`created_at\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, event.event_type, event.event_name || null, event.page_path, event.session_id,
          event.referrer || null, event.device_type || 'desktop', event.ip_address || null,
          event.visitor_location || null, new Date()
        ]
      );
      return { success: true };
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL createAnalyticsEvent failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const rows = await query('SELECT * FROM `site_metadata` WHERE `path` = ? LIMIT 1', [path]);
      if (rows && rows.length > 0) return rows[0];
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL getCustomMetadata failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const id = meta.id || crypto.randomUUID();
      await query(
        `INSERT INTO \`site_metadata\` (\`id\`, \`path\`, \`meta_title\`, \`meta_description\`, \`meta_keywords\`, \`is_noindex\`, \`updated_at\`)
         VALUES (?, ?, ?, ?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE \`meta_title\`=VALUES(\`meta_title\`), \`meta_description\`=VALUES(\`meta_description\`), \`meta_keywords\`=VALUES(\`meta_keywords\`), \`is_noindex\`=VALUES(\`is_noindex\`), \`updated_at\`=NOW()`,
        [id, meta.path, meta.meta_title, meta.meta_description, meta.meta_keywords || null, meta.is_noindex ? 1 : 0]
      );
      return meta;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL upsertCustomMetadata failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const rows = await query('SELECT * FROM `site_metadata` ORDER BY `path` ASC');
      if (rows && rows.length > 0) return rows;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL getCustomMetadataList failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const rows = await query('SELECT * FROM `gallery_images` ORDER BY `display_order` ASC, `created_at` DESC');
      if (rows && rows.length > 0) return rows;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL getGalleryImages failed, falling back to Supabase:', mysqlErr.message);
    }
  }
  if (!hasCredentials) {
    console.warn('Database credentials missing. Returning empty gallery list.');
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
    console.error('Error fetching gallery images:', error);
    return [];
  }
}

export async function createGalleryImage(image) {
  if (isDbConfigured()) {
    try {
      const id = image.id || crypto.randomUUID();
      await query(
        `INSERT INTO \`gallery_images\` (\`id\`, \`src\`, \`alt\`, \`title\`, \`description\`, \`display_order\`, \`created_at\`)
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [id, image.src, image.alt, image.title, image.description || null, image.display_order || 0]
      );
      return { id, ...image };
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL createGalleryImage failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const fields = [];
      const values = [];
      for (const [k, v] of Object.entries(updates)) {
        fields.push(`\`${k}\` = ?`);
        values.push(v);
      }
      if (fields.length > 0) {
        values.push(id);
        await query(`UPDATE \`gallery_images\` SET ${fields.join(', ')} WHERE \`id\` = ?`, values);
        return { id, ...updates };
      }
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL updateGalleryImage failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      await query('DELETE FROM \`gallery_images\` WHERE \`id\` = ?', [id]);
      return true;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL deleteGalleryImage failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const rows = await query('SELECT * FROM `shipments` WHERE `consignment_number` = ? LIMIT 1', [cn.trim()]);
      if (rows && rows.length > 0) {
        const item = rows[0];
        if (typeof item.status_history === 'string') {
          try { item.status_history = JSON.parse(item.status_history); } catch {}
        }
        return item;
      }
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL getShipmentByCN failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const rows = await query('SELECT * FROM `shipments` ORDER BY `created_at` DESC');
      if (rows && rows.length > 0) {
        return rows.map(item => {
          if (typeof item.status_history === 'string') {
            try { item.status_history = JSON.parse(item.status_history); } catch {}
          }
          return item;
        });
      }
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL getShipments failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const id = shipment.id || crypto.randomUUID();
      const history = shipment.status_history ? JSON.stringify(shipment.status_history) : null;
      await query(
        `INSERT INTO \`shipments\` (\`id\`, \`consignment_number\`, \`customer_name\`, \`customer_phone\`, \`origin\`, \`destination\`, \`booking_date\`, \`current_status\`, \`current_location\`, \`vehicle_number\`, \`driver_name\`, \`driver_phone\`, \`status_history\`, \`created_at\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          id, shipment.consignment_number, shipment.customer_name, shipment.customer_phone || null,
          shipment.origin, shipment.destination, shipment.booking_date ? new Date(shipment.booking_date) : null,
          shipment.current_status || 'Booked', shipment.current_location || null, shipment.vehicle_number || null,
          shipment.driver_name || null, shipment.driver_phone || null, history
        ]
      );
      return { id, ...shipment };
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL createShipment failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      const fields = [];
      const values = [];
      for (const [k, v] of Object.entries(updates)) {
        fields.push(`\`${k}\` = ?`);
        if (k === 'status_history' && typeof v === 'object') {
          values.push(JSON.stringify(v));
        } else {
          values.push(v);
        }
      }
      if (fields.length > 0) {
        values.push(id);
        await query(`UPDATE \`shipments\` SET ${fields.join(', ')} WHERE \`id\` = ?`, values);
        return { id, ...updates };
      }
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL updateShipment failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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
  if (isDbConfigured()) {
    try {
      await query('DELETE FROM \`shipments\` WHERE \`id\` = ?', [id]);
      return true;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL deleteShipment failed, falling back to Supabase:', mysqlErr.message);
    }
  }
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

// ========================================================================
// Customer Reviews Operations
// ========================================================================

export async function getCustomerReviews({ city_slug, state_slug, status = 'approved', limit = 100 } = {}, forceFresh = false) {
  if (isDbConfigured()) {
    try {
      let sql = 'SELECT * FROM `customer_reviews` WHERE 1=1';
      const params = [];
      if (status && status !== 'all') {
        sql += ' AND `status` = ?';
        params.push(status);
      }
      if (city_slug) {
        sql += ' AND `city_slug` = ?';
        params.push(city_slug.toLowerCase());
      } else if (state_slug) {
        sql += ' AND `state_slug` = ?';
        params.push(state_slug.toLowerCase());
      }
      sql += ' ORDER BY `created_at` DESC';
      if (limit) {
        sql += ' LIMIT ?';
        params.push(parseInt(limit, 10));
      }
      const all = await query(sql, params);
      if (Array.isArray(all) && all.length > 0) {
        if (city_slug) {
          return all.filter(r => !r.display_target || r.display_target === 'both' || r.display_target === 'city_only');
        }
        if (state_slug) {
          return all.filter(r => !r.display_target || r.display_target === 'both' || r.display_target === 'state_only');
        }
        return all;
      }
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL getCustomerReviews failed, falling back to Supabase:', mysqlErr.message);
    }
  }
  if (!hasCredentials) return [];
  try {
    const params = new URLSearchParams();
    if (status && status !== 'all') {
      params.append('status', `eq.${status}`);
    }
    if (city_slug) {
      params.append('city_slug', `eq.${city_slug.toLowerCase()}`);
    } else if (state_slug) {
      params.append('state_slug', `eq.${state_slug.toLowerCase()}`);
    }
    params.append('order', 'created_at.desc');
    if (limit) {
      params.append('limit', String(limit));
    }

    const fetchOptions = {
      method: 'GET',
      headers: getHeaders()
    };
    if (forceFresh) {
      fetchOptions.cache = 'no-store';
    } else {
      fetchOptions.next = { revalidate: 30 }; // ISR cache for 30s
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/customer_reviews?${params.toString()}`, fetchOptions);
    if (!res.ok) {
      const err = await res.text();
      console.error('Failed to fetch customer reviews:', err);
      return [];
    }
    const all = await res.json();
    if (!Array.isArray(all)) return [];

    // Granular display_target filtering for branch pages:
    // 'both' (default) -> shows on both city branch and state branch pages
    // 'city_only' -> shows only on city branch page
    // 'state_only' -> shows only on state branch page
    // 'testimonials_only' -> hidden from branch pages, appears on /testimonials
    if (city_slug) {
      return all.filter(r => !r.display_target || r.display_target === 'both' || r.display_target === 'city_only');
    }
    if (state_slug) {
      return all.filter(r => !r.display_target || r.display_target === 'both' || r.display_target === 'state_only');
    }
    return all;
  } catch (err) {
    console.error('Error fetching customer reviews:', err);
    return [];
  }
}

export async function createCustomerReview(reviewData) {
  if (isDbConfigured()) {
    try {
      const id = reviewData.id || crypto.randomUUID();
      const payload = {
        id,
        ...reviewData,
        display_target: reviewData.display_target || 'both'
      };
      await query(
        `INSERT INTO \`customer_reviews\` (\`id\`, \`name\`, \`phone\`, \`state_slug\`, \`state_name\`, \`city_slug\`, \`city_name\`, \`rating\`, \`review_text\`, \`status\`, \`display_target\`, \`source\`, \`created_at\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          payload.id, payload.name, payload.phone || null, payload.state_slug, payload.state_name,
          payload.city_slug, payload.city_name, payload.rating, payload.review_text,
          payload.status || 'approved', payload.display_target, payload.source || 'Website Review Form'
        ]
      );
      return payload;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL createCustomerReview failed, falling back to Supabase:', mysqlErr.message);
    }
  }
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const payload = {
    ...reviewData,
    display_target: reviewData.display_target || 'both'
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/customer_reviews`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create customer review: ${err}`);
  }
  const data = await res.json();
  return data[0] || data;
}

export async function updateCustomerReview(id, updates) {
  if (isDbConfigured()) {
    try {
      const fields = [];
      const values = [];
      for (const [k, v] of Object.entries(updates)) {
        fields.push(`\`${k}\` = ?`);
        values.push(v);
      }
      if (fields.length > 0) {
        values.push(id);
        await query(`UPDATE \`customer_reviews\` SET ${fields.join(', ')} WHERE \`id\` = ?`, values);
        return { id, ...updates };
      }
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL updateCustomerReview failed, falling back to Supabase:', mysqlErr.message);
    }
  }
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/customer_reviews?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      ...getHeaders(),
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(updates)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update customer review: ${err}`);
  }
  const data = await res.json();
  return data[0] || data;
}

export async function deleteCustomerReview(id) {
  if (isDbConfigured()) {
    try {
      await query('DELETE FROM \`customer_reviews\` WHERE \`id\` = ?', [id]);
      return true;
    } catch (mysqlErr) {
      console.warn('[DB FALLBACK] MySQL deleteCustomerReview failed, falling back to Supabase:', mysqlErr.message);
    }
  }
  if (!hasCredentials) throw new Error('Database credentials missing.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/customer_reviews?id=eq.${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to delete customer review: ${err}`);
  }
  return true;
}




