import { Inter, Rajdhani, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import WhatsAppButton from '@/components/WhatsAppButton/WhatsAppButton';
import PageCurtain from '@/components/animations/PageCurtain';
import GlobalAnimations from '@/components/animations/GlobalAnimations';

const inter = Inter({ subsets: ['latin'], variable: '--inter', display: 'swap' });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--rajdhani', display: 'swap' });
const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], weight: ['400','600','700','800'], variable: '--barlow', display: 'swap' });

export const metadata = {
  title: 'National Packers & Movers — Trusted Since 1987 | All India Service',
  description: 'National Packers & Movers — India\'s trusted relocation experts since 1987. Household, Corporate, Industrial & Vehicle relocation across Jharkhand, West Bengal, Bihar, MP, UP, Odisha. Get a free quote today.',
  keywords: 'packers and movers india, national packers movers, household relocation, corporate shifting, industrial transport, vehicle relocation, packers movers dhanbad, packers movers jharkhand',
  alternates: {
    canonical: 'https://thenationalpackersmovers.com',
  },
  openGraph: {
    title: 'National Packers & Movers — Trusted Since 1987',
    description: 'Professional relocation services across India. Serving 6 states, 15+ cities since 1987.',
    url: 'https://thenationalpackersmovers.com',
    siteName: 'National Packers & Movers',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${rajdhani.variable} ${barlowCondensed.variable}`}>
        <PageCurtain />
        <GlobalAnimations />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

