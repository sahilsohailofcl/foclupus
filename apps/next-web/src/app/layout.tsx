import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './components/providers/Providers';
import Script from 'next/script'; 

const GA_MEASUREMENT_ID = 'G-VRNS11LJX1'; 

export const metadata: Metadata = {
  title: 'Foclupus - The Focused Wolf',
  description: 'Gamified productivity and dopamine detox app.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 1. Google Tag gtag.js script */}
      {/* The script element props will now pass due to the ts-ignore above */}
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} 
        strategy="afterInteractive" 
      />
      
      {/* 2. Google Tag config script */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
