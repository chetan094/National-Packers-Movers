export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: [
      'https://www.thenationalpackersmovers.com/sitemap.xml',
      'https://www.thenationalpackersmovers.com/image-sitemap.xml',
    ],
  };
}
