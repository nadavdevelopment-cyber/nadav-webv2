import type { Metadata } from 'next';
import './globals.css';
import './projects.css';
import './mobile-footer.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nadav.com.ar'),
  title: 'NADAV — Custom Websites, E-commerce & Business Software',
  description: 'NADAV designs and builds custom websites, e-commerce stores, booking systems, restaurant ordering, and business software for companies ready for a better digital experience.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: 'NADAV — Digital Products Built Around Your Business',
    description: 'Custom websites, online stores, booking and ordering systems, and business software—designed and developed as one experience.',
    url: 'https://nadav.com.ar',
    siteName: 'NADAV',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'NADAV — Custom Digital Products',
    description: 'Custom websites, e-commerce, booking and ordering systems, and business software.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-US"><body>{children}</body></html>;
}
