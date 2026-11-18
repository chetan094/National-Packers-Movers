import crypto from 'crypto';
import { sendLeadNotifications } from './notifications.js';
import { query, isDbConfigured } from './db.js';

// ========================================================================
// Sovereign Hostinger MySQL Database Operations
// Replaced legacy Supabase BaaS — 100% self-hosted on Hostinger MySQL
// ========================================================================

// ────────────────────────────────────────────────────────────────────────
// Blogs Operations
// ────────────────────────────────────────────────────────────────────────

export async function getBlogs(forceFresh = false) {
  if (!isDbConfigured()) return [];
  try {
    const rows = await query('SELECT * FROM `blogs` ORDER BY `created_at` DESC');
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error('Error fetching blogs from MySQL:', error.message);
    return [];
  }
}

export async function getBlogBySlug(slug, forceFresh = false) {
  if (!isDbConfigured()) return null;
  try {
    const rows = await query('SELECT * FROM `blogs` WHERE `slug` = ? LIMIT 1', [slug]);
    return (rows && rows.length > 0) ? rows[0] : null;
  } catch (error) {
    console.error(`Error fetching blog by slug ${slug} from MySQL:`, error.message);
    return null;
  }
}

export async function createBlog(blog) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
  const id = blog.id || crypto.randomUUID();
  await query(
    `INSERT INTO \`blogs\` (\`id\`, \`title\`, \`slug\`, \`excerpt\`, \`content\`, \`image_url\`, \`category\`, \`created_at\`)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, blog.title, blog.slug, blog.excerpt, blog.content, blog.image_url, blog.category, blog.created_at ? new Date(blog.created_at) : new Date()]
  );
  return { id, ...blog };
}

export async function updateBlog(id, blog) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
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
  return { id, ...blog };
}

export async function deleteBlog(id) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
  await query('DELETE FROM `blogs` WHERE `id` = ?', [id]);
  return true;
}

// ────────────────────────────────────────────────────────────────────────
// Leads Operations
// ────────────────────────────────────────────────────────────────────────

export async function createLead(lead) {
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

  if (isDbConfigured()) {
    try {
      await query(
        `INSERT INTO \`leads\` (\`id\`, \`name\`, \`phone\`, \`email\`, \`from_city\`, \`to_city\`, \`moving_date\`, \`move_type\`, \`notes\`, \`inventory\`, \`matched_vehicle\`, \`total_cft\`, \`source\`, \`status\`, \`created_at\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          leadData.id, leadData.name, leadData.phone, leadData.email, leadData.from_city, leadData.to_city,
          leadData.moving_date, leadData.move_type, leadData.notes, leadData.inventory, leadData.matched_vehicle,
          leadData.total_cft, leadData.source, leadData.status, leadData.created_at
        ]
      );
    } catch (mysqlErr) {
      console.error('MySQL createLead failed:', mysqlErr.message);
    }
  }

  // Trigger instant Telegram & Email alerts
  try {
    await sendLeadNotifications(lead);
  } catch (notifyErr) {
    console.error('Lead notification trigger error:', notifyErr);
  }

  return leadData;
}

export async function getLeads() {
  if (!isDbConfigured()) return [];
  try {
    const rows = await query('SELECT * FROM `leads` ORDER BY `created_at` DESC');
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error('Error fetching leads from MySQL:', error.message);
    return [];
  }
}

export async function updateLead(id, updates) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
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
  return { id, ...updates };
}

export async function deleteLead(id) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
  await query('DELETE FROM `leads` WHERE `id` = ?', [id]);
  return true;
}

// ────────────────────────────────────────────────────────────────────────
// Analytics Operations
// ────────────────────────────────────────────────────────────────────────

export async function createAnalyticsEvent(event) {
  if (!isDbConfigured()) return { success: true };
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
  } catch (error) {
    // Non-blocking for client telemetry
    return { success: false, error: error.message };
  }
}

export async function getAnalyticsSummary() {
  if (!isDbConfigured()) return null;
  try {
    const events = await query('SELECT * FROM `analytics_events` ORDER BY `created_at` DESC LIMIT 5000');
    const leadRows = await query('SELECT COUNT(*) as total FROM `leads`');
    const totalLeads = leadRows?.[0]?.total || 0;

    const uniqueSessions = new Set();
    let totalPageViews = 0;
    let timeSpentEventsCount = 0;
    let totalDuration = 0;

    const pathStats = {};
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

    (events || []).forEach((evt, idx) => {
      uniqueSessions.add(evt.session_id);

      if (idx < 15) {
        recentActivity.push({
          id: evt.id,
          event_type: evt.event_type,
          event_name: evt.event_name,
          page_path: evt.page_path,
          device_type: evt.device_type,
          created_at: evt.created_at,
          ip_address: evt.ip_address || '127.0.0.1',
          visitor_location: evt.visitor_location || 'India'
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

    const pagesList = Object.entries(pathStats).map(([path, data]) => {
      const avgDur = data.durationCount > 0 ? Math.round(data.totalDuration / data.durationCount) : 0;
      return { path, views: data.views, avg_duration: avgDur };
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
    console.error('Error fetching analytics summary from MySQL:', error.message);
    return null;
  }
}

// ────────────────────────────────────────────────────────────────────────
// Custom SEO Metadata Operations
// ────────────────────────────────────────────────────────────────────────

export async function getCustomMetadata(path, forceFresh = false) {
  if (!isDbConfigured()) return null;
  try {
    const rows = await query('SELECT * FROM `site_metadata` WHERE `path` = ? LIMIT 1', [path]);
    return (rows && rows.length > 0) ? rows[0] : null;
  } catch (error) {
    console.error(`Error fetching custom metadata for ${path} from MySQL:`, error.message);
    return null;
  }
}

export async function upsertCustomMetadata(meta) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
  const id = meta.id || crypto.randomUUID();
  await query(
    `INSERT INTO \`site_metadata\` (\`id\`, \`path\`, \`meta_title\`, \`meta_description\`, \`meta_keywords\`, \`is_noindex\`, \`updated_at\`)
     VALUES (?, ?, ?, ?, ?, ?, NOW())
     ON DUPLICATE KEY UPDATE \`meta_title\`=VALUES(\`meta_title\`), \`meta_description\`=VALUES(\`meta_description\`), \`meta_keywords\`=VALUES(\`meta_keywords\`), \`is_noindex\`=VALUES(\`is_noindex\`), \`updated_at\`=NOW()`,
    [id, meta.path, meta.meta_title, meta.meta_description, meta.meta_keywords || null, meta.is_noindex ? 1 : 0]
  );
  return meta;
}

export async function getCustomMetadataList() {
  if (!isDbConfigured()) return [];
  try {
    const rows = await query('SELECT * FROM `site_metadata` ORDER BY `path` ASC');
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error('Error fetching custom metadata list from MySQL:', error.message);
    return [];
  }
}

// ────────────────────────────────────────────────────────────────────────
// Gallery Operations
// ────────────────────────────────────────────────────────────────────────

export async function getGalleryImages(forceFresh = false) {
  if (!isDbConfigured()) return [];
  try {
    const rows = await query('SELECT * FROM `gallery_images` ORDER BY `display_order` ASC, `created_at` DESC');
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error('Error fetching gallery images from MySQL:', error.message);
    return [];
  }
}

export async function createGalleryImage(image) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
  const id = image.id || crypto.randomUUID();
  await query(
    `INSERT INTO \`gallery_images\` (\`id\`, \`src\`, \`alt\`, \`title\`, \`description\`, \`display_order\`, \`created_at\`)
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    [id, image.src, image.alt, image.title, image.description || null, image.display_order || 0]
  );
  return { id, ...image };
}

export async function updateGalleryImage(id, updates) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
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
  return { id, ...updates };
}

export async function deleteGalleryImage(id) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
  await query('DELETE FROM `gallery_images` WHERE `id` = ?', [id]);
  return true;
}

// ────────────────────────────────────────────────────────────────────────
// Consignment Tracking Operations
// ────────────────────────────────────────────────────────────────────────

export async function getShipmentByCN(cn) {
  if (!isDbConfigured() || !cn) return null;
  try {
    const rows = await query('SELECT * FROM `shipments` WHERE `consignment_number` = ? LIMIT 1', [cn.trim()]);
    if (rows && rows.length > 0) {
      const item = rows[0];
      if (typeof item.status_history === 'string') {
        try { item.status_history = JSON.parse(item.status_history); } catch {}
      }
      return item;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching shipment by CN ${cn} from MySQL:`, error.message);
    return null;
  }
}

export async function getShipments() {
  if (!isDbConfigured()) return [];
  try {
    const rows = await query('SELECT * FROM `shipments` ORDER BY `created_at` DESC');
    if (Array.isArray(rows) && rows.length > 0) {
      return rows.map(item => {
        if (typeof item.status_history === 'string') {
          try { item.status_history = JSON.parse(item.status_history); } catch {}
        }
        return item;
      });
    }
    return [];
  } catch (error) {
    console.error('Error fetching shipments from MySQL:', error.message);
    return [];
  }
}

export async function createShipment(shipment) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
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
}

export async function updateShipment(id, updates) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
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
  return { id, ...updates };
}

export async function deleteShipment(id) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
  await query('DELETE FROM `shipments` WHERE `id` = ?', [id]);
  return true;
}

// ────────────────────────────────────────────────────────────────────────
// Customer Reviews Operations
// ────────────────────────────────────────────────────────────────────────

export async function getCustomerReviews({ city_slug, state_slug, status = 'approved', limit = 100 } = {}, forceFresh = false) {
  if (!isDbConfigured()) return [];
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
      // Granular display_target filtering:
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
    }
    return [];
  } catch (error) {
    console.error('Error fetching customer reviews from MySQL:', error.message);
    return [];
  }
}

export async function createCustomerReview(reviewData) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
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
}

export async function updateCustomerReview(id, updates) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
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
  return { id, ...updates };
}

export async function deleteCustomerReview(id) {
  if (!isDbConfigured()) throw new Error('Database not configured.');
  await query('DELETE FROM `customer_reviews` WHERE `id` = ?', [id]);
  return true;
}
