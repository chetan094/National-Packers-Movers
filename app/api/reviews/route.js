import { NextResponse } from 'next/server';
import { getCustomerReviews, createCustomerReview } from '@/lib/supabase';
import { sendLeadNotifications } from '@/lib/notifications';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city_slug = searchParams.get('city_slug');
    const state_slug = searchParams.get('state_slug');
    const status = searchParams.get('status') || 'approved';
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const reviews = await getCustomerReviews({ city_slug, state_slug, status, limit }, true);
    return NextResponse.json({ reviews });
  } catch (err) {
    console.error('Error in GET /api/reviews:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, state_slug, state_name, city_slug, city_name, rating, review_text } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }
    if (!review_text || typeof review_text !== 'string' || !review_text.trim()) {
      return NextResponse.json({ error: 'Review text is required' }, { status: 400 });
    }
    const numRating = parseInt(rating, 10);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5 stars' }, { status: 400 });
    }
    if (!state_slug || !city_slug) {
      return NextResponse.json({ error: 'State and City are required' }, { status: 400 });
    }

    // 2. Moderation Rule:
    // Ratings 4-5 stars are auto-approved to show instant customer appreciation;
    // Ratings 1-3 stars are set to 'pending' to protect against competitor sabotage.
    const status = numRating >= 4 ? 'approved' : 'pending';

    const reviewPayload = {
      name: name.trim().slice(0, 100),
      phone: phone ? String(phone).replace(/\D/g, '').slice(0, 15) : null,
      state_slug: state_slug.toLowerCase().trim(),
      state_name: state_name || state_slug,
      city_slug: city_slug.toLowerCase().trim(),
      city_name: city_name || city_slug,
      rating: numRating,
      review_text: review_text.trim().slice(0, 1500),
      status,
      display_target: 'both',
      source: 'Website Review Form'
    };

    const newReview = await createCustomerReview(reviewPayload);

    // 3. Send Telegram / Email Alert to Debabrata & Chetan
    try {
      await sendLeadNotifications({
        name: `⭐ Review by ${reviewPayload.name} (${reviewPayload.rating} Stars)`,
        phone: reviewPayload.phone || 'Not provided',
        from_city: `${reviewPayload.city_name}, ${reviewPayload.state_name}`,
        to_city: reviewPayload.status === 'approved' ? 'Auto-Approved' : 'Pending Moderation',
        notes: `Review: "${reviewPayload.review_text}"`,
        source: `Website Review (${reviewPayload.city_name})`
      });
    } catch (notifErr) {
      console.warn('Could not dispatch review notification:', notifErr);
    }

    return NextResponse.json({
      success: true,
      review: newReview,
      message: status === 'approved' 
        ? 'Thank you! Your review has been published.' 
        : 'Thank you! Your review has been submitted for moderation.'
    });
  } catch (err) {
    console.error('Error in POST /api/reviews:', err);
    return NextResponse.json({ error: err.message || 'Failed to submit review' }, { status: 500 });
  }
}
