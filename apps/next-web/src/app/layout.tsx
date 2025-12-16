import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './components/providers/Providers';
import Script from 'next/script';

// Your GA Measurement ID
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
      {/* 1. Google Tag Manager/Analytics setup 
        The 'next/script' component is used to correctly inject scripts into the <head> 
        or before the <body> closing tag, optimizing loading. 
      */}
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} 
        strategy="afterInteractive" // Loads script after hydration 
        // Optional: Preloads the connection for faster loading
        // onLoad={() => console.log('Google Analytics script loaded')}
      />
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
