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
