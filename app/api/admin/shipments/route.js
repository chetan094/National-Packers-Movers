import { NextResponse } from 'next/server';
import { getShipments, createShipment, updateShipment, deleteShipment } from '@/lib/supabase';
import { checkPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  return !!(await checkPermission('tracking'));
}

export async function GET() {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const shipments = await getShipments();
    return NextResponse.json(shipments);
  } catch (error) {
    console.error('API GET /api/admin/shipments error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const {
      consignment_number,
      customer_name,
      customer_phone,
      origin,
      destination,
      booking_date,
      current_status,
      current_location,
      vehicle_number,
      driver_name,
      driver_phone,
      status_history
    } = body;

    // Validation
    if (!consignment_number || !customer_name || !origin || !destination) {
      return NextResponse.json(
        { error: 'Missing required fields: consignment_number, customer_name, origin, and destination are mandatory.' },
        { status: 400 }
      );
    }

    const newShipment = await createShipment({
      consignment_number: consignment_number.trim(),
      customer_name: customer_name.trim(),
      customer_phone: customer_phone ? customer_phone.trim() : null,
      origin: origin.trim(),
      destination: destination.trim(),
      booking_date: booking_date || null,
      current_status: current_status || 'Booked',
      current_location: current_location ? current_location.trim() : null,
      vehicle_number: vehicle_number ? vehicle_number.trim() : null,
      driver_name: driver_name ? driver_name.trim() : null,
      driver_phone: driver_phone ? driver_phone.trim() : null,
      status_history: status_history || []
    });

    return NextResponse.json({ success: true, shipment: newShipment });
  } catch (error) {
    console.error('API POST /api/admin/shipments error:', error);
    // Check for unique key constraint error
    const errorMsg = error.message || '';
    if (errorMsg.includes('duplicate key') || errorMsg.includes('409') || errorMsg.includes('already exists')) {
      return NextResponse.json(
        { error: 'Consignment number already exists in database. Please choose a unique CN.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: errorMsg || 'Internal server error' }, { status: 500 });
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
      return NextResponse.json({ error: 'Missing id or updates parameters' }, { status: 400 });
    }

    const updated = await updateShipment(id, updates);
    return NextResponse.json({ success: true, shipment: updated });
  } catch (error) {
    console.error('API PATCH /api/admin/shipments error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
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
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    await deleteShipment(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API DELETE /api/admin/shipments error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
