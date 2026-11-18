export const dynamic = 'force-dynamic';

import { branchesData } from '@/data/branchesData';
import { routesData, getRoutesForCity } from '@/data/routesData';
import { CANONICAL_STATE_CITIES } from '@/data/allCitiesData';
import { getBlogs } from '@/lib/supabase';

// Canonical whitelist of cities per state (143 cities across 6 states)
const STATE_CITIES = CANONICAL_STATE_CITIES;

const BASE_URL = 'https://www.thenationalpackersmovers.com';

export default async function sitemap() {
  // Core static pages
  const routes = [
    '',
    '/about',
    '/contact',
    '/gallery',
    '/get-quote',
    '/services',
    '/testimonials',
    '/blog',
    '/branches',
    '/routes',
    '/faqs',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Services pages
  const services = [
    'household-relocation',
    'corporate-relocation',
    'industrial-relocation',
    'vehicle-relocation',
    'warehousing-storage',
    'transit-insurance',
    'loading-unloading'
  ].map((service) => ({
    url: `${BASE_URL}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Branches (States)
  const states = Object.keys(branchesData.states).map((state) => ({
    url: `${BASE_URL}/branches/${state}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Whitelisted cities (registered + fallback programmatic ones)
  const cities = [];
  Object.entries(STATE_CITIES).forEach(([state, cityList]) => {
    cityList.forEach((city) => {
      cities.push({
        url: `${BASE_URL}/branches/${state}/${city}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  // Dynamic blogs from Supabase
  let blogRoutes = [];
  try {
    const blogs = await getBlogs();
    if (blogs && Array.isArray(blogs)) {
      blogRoutes = blogs.map((blog) => ({
        url: `${BASE_URL}/blog/${blog.slug}`,
        lastModified: new Date(blog.updated_at || blog.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
    }
  } catch (err) {
    console.error('Error generating blogs for sitemap:', err);
  }

  // Generate all dynamic routes for sitemap based on our whitelist of cities
  const dynamicRouteUrls = [];
  const cap = (s) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  Object.entries(STATE_CITIES).forEach(([state, cityList]) => {
    cityList.forEach((cityKey) => {
      const cityName = cap(cityKey);
      const routesForCity = getRoutesForCity(cityKey, cityName);
      
      routesForCity.forEach((r) => {
        const routeUrl = `${BASE_URL}/routes/${r.origin}-to-${r.destination}`;
        if (!dynamicRouteUrls.includes(routeUrl)) {
          dynamicRouteUrls.push(routeUrl);
        }
      });
    });
  });

  const routeRoutes = dynamicRouteUrls.map(url => ({
    url,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...routes, ...services, ...states, ...cities, ...blogRoutes, ...routeRoutes];
}
