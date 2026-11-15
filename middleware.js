import { NextResponse } from 'next/server';

const HOMEPAGE_MARKDOWN = `# National Packers & Movers — India's Trusted Relocation Experts Since 1987

Established in 1987 by Debabrata Jhampaty, National Packers & Movers is India's leading relocation and logistics company headquartered in Dhanbad, Jharkhand.

## Key Relocation Services
- **Household Relocation:** 1BHK, 2BHK, 3BHK, and independent villa moving with 7-layer specialized packing.
- **Corporate & Office Shifting:** Minimal-downtime office moving, IT equipment, server racks, and office workstations.
- **Industrial Logistics:** Heavy machinery, manufacturing equipment, raw materials, and mining logistics across Eastern India.
- **Vehicle Relocation:** Specialized enclosed car carriers and two-wheeler door-to-door transit.
- **Warehousing & Storage:** 24/7 CCTV-monitored, moisture-proof storage facilities.

## Coverage Areas
Active branch network serving Jharkhand (Dhanbad, Ranchi, Jamshedpur, Bokaro), West Bengal (Kolkata, Asansol, Durgapur), Bihar (Patna, Gaya), Uttar Pradesh (Lucknow, Varanasi, Kanpur), Madhya Pradesh (Bhopal, Indore), Andhra Pradesh, and 1,200+ cities pan-India.

## Contact & Quotes
- **Booking Helpline:** +91-9835168368 / +91-9431113263
- **Instant Cost Calculator:** https://www.thenationalpackersmovers.com/get-quote
- **Consignment Tracking:** https://www.thenationalpackersmovers.com/track-shipment
- **Machine-Readable LLM Specification:** https://www.thenationalpackersmovers.com/llms.txt
- **MCP Server Card:** https://www.thenationalpackersmovers.com/.well-known/mcp/server-card.json
`;

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get('accept') || '';

  // Content negotiation: Serve Markdown if client explicitly requests text/markdown
  if (pathname === '/' && acceptHeader.includes('text/markdown')) {
    return new NextResponse(HOMEPAGE_MARKDOWN, {
      status: 200,
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'link': '</llms.txt>; rel="alternate"; type="text/markdown"',
        'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  }

  const response = NextResponse.next();

  // Ensure RFC 8288 Link header on homepage HTML responses
  if (pathname === '/') {
    response.headers.set('Link', '</llms.txt>; rel="alternate"; type="text/markdown"');
  }

  return response;
}

export const config = {
  matcher: ['/'],
};
