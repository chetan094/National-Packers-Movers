const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if credentials exist, fall back to mock log warnings in dev if not set yet
const hasCredentials = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

function getHeaders() {
  return {
    'apikey': SUPABASE_ANON_KEY || '',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY || ''}`,
    'Content-Type': 'application/json',
  };
}

export async function getBlogs() {
  if (!hasCredentials) {
    console.warn('Supabase credentials missing. Returning empty blog list.');
    return [];
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blogs?order=created_at.desc`, {
      method: 'GET',
      headers: getHeaders(),
      next: { revalidate: 30 } // Cache page data for 30s (ISR)
    });
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

export async function getBlogBySlug(slug) {
  if (!hasCredentials) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blogs?slug=eq.${slug}&limit=1`, {
      method: 'GET',
      headers: getHeaders(),
      next: { revalidate: 30 }
    });
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
  return data[0] || data;
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

