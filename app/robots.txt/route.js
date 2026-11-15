export function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/

Content-Signal: search=yes, ai-train=no

Sitemap: https://www.thenationalpackersmovers.com/sitemap.xml
Sitemap: https://www.thenationalpackersmovers.com/image-sitemap.xml
`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
