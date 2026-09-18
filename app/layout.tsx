import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { site } from '@/lib/content';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: site.metaTitle,
  description: site.metaDescription,
  applicationName: site.retailerName,
  robots: { index: true, follow: true },
  openGraph: {
    title: site.metaTitle,
    description: site.metaDescription,
    siteName: site.retailerName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.metaTitle,
    description: site.metaDescription,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1d1060',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the boot script below sets `data-reveal` on
    // <html> before React hydrates, which is a deliberate mismatch.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/*
          Arms the entrance reveals before first paint, and disarms them if the
          app never hydrates.

          `.reveal` is visible by default in CSS; this attribute is what hides
          it. Setting it inline (before paint) avoids a flash of the final
          state. The deadline then removes the attribute unless a mounted
          Reveal has set `__revealReady`, so a chunk 404, a JS error or a
          disabled-JS visitor still sees every section — just without motion.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var d=document.documentElement;d.setAttribute('data-reveal','on');
setTimeout(function(){if(!window.__revealReady)d.removeAttribute('data-reveal');},2500);
}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a
          href="#fiber"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-arvig-700 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to plans
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
