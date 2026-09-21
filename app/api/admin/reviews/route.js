import { NextResponse } from 'next/server';
import { getCustomerReviews, createCustomerReview, updateCustomerReview, deleteCustomerReview } from '@/lib/supabase';
import { checkPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  const session = (await checkPermission('testimonials')) || (await checkPermission('leads')) || (await checkPermission('admin'));
  return !!session;
}

export async function GET() {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Fetch all reviews regardless of status
    const reviews = await getCustomerReviews({ status: 'all', limit: 200 }, true);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('API GET /api/admin/reviews error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { name, phone, state_slug, state_name, city_slug, city_name, rating, review_text, status } = body;

    if (!name || !review_text) {
      return NextResponse.json({ error: 'Name and review text are required' }, { status: 400 });
    }

    const review = await createCustomerReview({
      name: name.trim(),
      phone: phone ? String(phone).replace(/\D/g, '') : null,
      state_slug: (state_slug || 'jharkhand').toLowerCase().trim(),
      state_name: state_name || 'Jharkhand',
      city_slug: (city_slug || 'dhanbad').toLowerCase().trim(),
      city_name: city_name || 'Dhanbad',
      rating: parseInt(rating || 5, 10),
      review_text: review_text.trim(),
      status: status || 'approved',
      source: 'Admin Entry'
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error('API POST /api/admin/reviews error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json({ error: 'Review ID and updates are required' }, { status: 400 });
    }

    const updated = await updateCustomerReview(id, updates);
    return NextResponse.json({ success: true, review: updated });
  } catch (error) {
    console.error('API PATCH /api/admin/reviews error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    await deleteCustomerReview(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API DELETE /api/admin/reviews error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
