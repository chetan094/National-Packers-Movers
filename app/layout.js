import { Inter, Rajdhani, Barlow_Condensed } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import WhatsAppButton from '@/components/WhatsAppButton/WhatsAppButton';
import PageCurtain from '@/components/animations/PageCurtain';
import GlobalAnimations from '@/components/animations/GlobalAnimations';
import AnalyticsTracker from '@/components/AnalyticsTracker/AnalyticsTracker';
import WebMcpRegister from '@/components/WebMcpRegister/WebMcpRegister';

const inter = Inter({ subsets: ['latin'], variable: '--inter', display: 'swap' });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--rajdhani', display: 'swap' });
const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--barlow', display: 'swap' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: 'National Packers & Movers — Trusted Since 1987 | All India Service',
  description: 'National Packers & Movers — India\'s trusted relocation experts since 1987. Household, Corporate, Industrial & Vehicle relocation across Jharkhand, West Bengal, Bihar, MP, UP, Odisha. Get a free quote today.',
  keywords: 'packers and movers india, national packers movers, household relocation, corporate shifting, industrial transport, vehicle relocation, packers movers dhanbad, packers movers jharkhand',
  alternates: {
    canonical: 'https://www.thenationalpackersmovers.com',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'National Packers & Movers — Trusted Since 1987',
    description: 'Professional relocation services across India. Serving 6 states, 1200+ cities since 1987.',
    url: 'https://www.thenationalpackersmovers.com',
    siteName: 'National Packers & Movers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'National Packers & Movers — Trusted Relocation Experts',
    description: 'IBA-compliant household, corporate, industrial & vehicle shifting across India.',
  },
};

const GLOBAL_MOVING_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'MovingCompany', 'Organization'],
  'name': 'National Packers & Movers',
  'alternateName': 'National Packers Movers',
  'legalName': 'National Packers and Movers',
  'description': "India's trusted relocation experts since 1987. Household, corporate, industrial and vehicle relocation across Jharkhand, West Bengal, Bihar, MP, UP, Odisha.",
  'url': 'https://www.thenationalpackersmovers.com',
  'logo': 'https://www.thenationalpackersmovers.com/icon.png',
  'image': 'https://www.thenationalpackersmovers.com/icon.png',
  'telephone': '+91-9835168368',
  'email': 'info@thenationalpackersmovers.com',
  'priceRange': '₹₹',
  'currenciesAccepted': 'INR',
  'paymentAccepted': 'Cash, Credit Card, Debit Card, UPI, Net Banking',
  'openingHours': 'Mo-Su 00:00-23:59',
  'foundingDate': '1987',
  'founder': {
    '@type': 'Person',
    'name': 'Debabrata Jhampaty'
  },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Kasturba Nagar, Near Dhanbad Thana',
    'addressLocality': 'Dhanbad',
    'addressRegion': 'Jharkhand',
    'postalCode': '826001',
    'addressCountry': 'IN'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 23.7957,
    'longitude': 86.4304
  },
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.9',
    'reviewCount': '1250',
    'bestRating': '5'
  },
  'areaServed': [
    'Jharkhand', 'West Bengal', 'Bihar', 'Madhya Pradesh', 'Uttar Pradesh', 'Odisha'
  ],
  'sameAs': [
    'https://www.youtube.com/@NationalPackersandMovers11',
    'https://www.instagram.com/national.packers.and.movers/',
    'https://www.facebook.com/people/National-Packers-Movers/100077275401485/',
    'https://www.threads.com/@national.packers.and.movers'
  ]
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-VEWXPBBRFB';

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOBAL_MOVING_SCHEMA) }}
        />
      </head>
      <body className={`${inter.variable} ${rajdhani.variable} ${barlowCondensed.variable}`}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <PageCurtain />
        <GlobalAnimations />
        <AnalyticsTracker />
        <WebMcpRegister />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

