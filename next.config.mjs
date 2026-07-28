/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Performance ──────────────────────────────────────────────────
  compress: true,           // Enable Gzip/Brotli response compression
  poweredByHeader: false,   // Remove "X-Powered-By: Next.js" leak
  reactStrictMode: true,    // Surface bugs early in development

  // ── Image Optimization ───────────────────────────────────────────
  images: {
    // Allow next/image to optimize images from external Supabase storage
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sgsaucmxuztrmtiojksa.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Serve modern compressed formats (AVIF first, WebP fallback)
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 60 days on Vercel CDN
    minimumCacheTTL: 60 * 60 * 24 * 60,
  },

  // ── Security Headers ─────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',                        // Prevent clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',                           // Prevent MIME-type sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',   // Limit referrer exposure
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)', // Lock browser APIs
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',                                // Speed up DNS lookups
          },
        ],
      },
      {
        // Aggressively cache static images for 1 year (immutable)
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Aggressively cache photos folder for 1 year
        source: '/photos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

