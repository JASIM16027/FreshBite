import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FreshBite - Delicious Food Delivered Fast',
  description: 'Order fresh, delicious food online and get it delivered right to your doorstep. Browse our menu of burgers, pizza, Asian cuisine, desserts, and more.',
  keywords: 'food delivery, online ordering, restaurants, burgers, pizza, Asian food, desserts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}