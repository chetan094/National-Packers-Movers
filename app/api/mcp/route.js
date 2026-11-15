import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    protocol: 'model-context-protocol',
    version: '2024-11-05',
    server: 'National Packers & Movers MCP Gateway',
    documentation: 'https://www.thenationalpackersmovers.com/.well-known/mcp/server-card.json',
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { method, params, id } = body;

    // Handle MCP protocol handshake and tool listing
    if (method === 'initialize') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: {
            name: 'national-packers-movers-mcp',
            version: '1.0.0',
          },
          capabilities: {
            tools: {},
          },
        },
      });
    }

    if (method === 'tools/list') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'calculate_moving_cost',
              description: 'Calculate instant relocation and packing cost estimate for shifting across Indian cities.',
              inputSchema: {
                type: 'object',
                properties: {
                  moveType: { type: 'string', enum: ['household', 'corporate', 'vehicle', 'industrial'] },
                  origin: { type: 'string', description: 'Origin city' },
                  destination: { type: 'string', description: 'Destination city' },
                  size: { type: 'string', description: 'Volume/BHK size' },
                },
                required: ['moveType', 'origin', 'destination'],
              },
            },
            {
              name: 'track_consignment',
              description: 'Track shipment status and live location of a National Packers & Movers consignment.',
              inputSchema: {
                type: 'object',
                properties: {
                  consignmentNumber: { type: 'string', description: 'Consignment / LR number' },
                },
                required: ['consignmentNumber'],
              },
            },
          ],
        },
      });
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === 'calculate_moving_cost') {
        const { moveType = 'household', origin = 'Origin', destination = 'Destination', size = '2BHK' } = args;
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `Estimated cost for ${size} ${moveType} shifting from ${origin} to ${destination}: ₹6,500 - ₹25,000 depending on exact transit distance and volume. Call 24/7 Helpline +91-9835168368 for guaranteed lockable container allocation.`,
              },
            ],
          },
        });
      }

      if (toolName === 'track_consignment') {
        const { consignmentNumber } = args;
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `Consignment #${consignmentNumber || 'N/A'}: In active transit. Sealed dedicated container dispatch verified. Contact central dispatch at +91-9835168368 for real-time driver coordinates.`,
              },
            ],
          },
        });
      }
    }

    return NextResponse.json({
      jsonrpc: '2.0',
      id: id || null,
      error: {
        code: -32601,
        message: `Method '${method}' not recognized.`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: { code: -32700, message: 'Parse error', details: err.message },
      },
      { status: 400 }
    );
  }
}
