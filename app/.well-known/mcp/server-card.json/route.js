import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', '.well-known', 'mcp', 'server-card.json');
    const content = await fs.readFile(filePath, 'utf-8');
    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    const fallback = {
      $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
      name: 'national-packers-movers-mcp',
      version: '1.0.0',
      description: 'Official MCP Server for National Packers & Movers',
      endpoint: 'https://www.thenationalpackersmovers.com/api/mcp',
      tools: [],
    };
    return new Response(JSON.stringify(fallback), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
