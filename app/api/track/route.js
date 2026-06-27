import { getShipmentByCN } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cn = searchParams.get('cn');

    if (!cn) {
      return Response.json(
        { success: false, error: 'Consignment number parameter is required.' },
        { status: 400 }
      );
    }

    const shipment = await getShipmentByCN(cn.trim());

    if (!shipment) {
      return Response.json(
        { success: false, error: 'No shipment record found for the provided consignment number.' },
        { status: 404 }
      );
    }

    // Secure sensitive parameters before exposing to public
    const maskPhone = (phone) => {
      if (!phone) return 'N/A';
      const clean = phone.trim();
      if (clean.length < 6) return '******';
      return `${clean.slice(0, 4)}XXXX${clean.slice(-2)}`;
    };

    const maskName = (name) => {
      if (!name) return 'Valued Customer';
      const parts = name.trim().split(/\s+/);
      if (parts.length === 1) {
        const word = parts[0];
        return word.length > 2 ? `${word[0]}***${word[word.length - 1]}` : 'Customer';
      }
      const first = parts[0];
      const last = parts[parts.length - 1];
      return `${first[0]}. ${last}`;
    };

    const maskedShipment = {
      id: shipment.id,
      consignment_number: shipment.consignment_number,
      customer_name: maskName(shipment.customer_name),
      origin: shipment.origin,
      destination: shipment.destination,
      booking_date: shipment.booking_date,
      current_status: shipment.current_status,
      current_location: shipment.current_location || 'Awaiting Departure',
      vehicle_number: shipment.vehicle_number || 'Under Allocation',
      driver_name: shipment.driver_name || 'Assigned Driver',
      driver_phone: maskPhone(shipment.driver_phone),
      status_history: shipment.status_history || [],
      created_at: shipment.created_at
    };

    return Response.json({ success: true, shipment: maskedShipment });
  } catch (error) {
    console.error('[PUBLIC TRACKING API ERROR]:', error);
    return Response.json(
      { success: false, error: 'Internal server error processing shipment query.' },
      { status: 500 }
    );
  }
}
