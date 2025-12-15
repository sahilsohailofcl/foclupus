import './globals.css'; // Your global styles
import type { Metadata } from 'next';
import { Providers } from './components/providers/Providers';

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
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}