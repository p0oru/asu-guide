import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sun Devil Guide',
  description: 'Your ultimate guide to navigating life at Arizona State University',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col relative`}
      >
        {/* Trident Watermark */}
        <div
          className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-[0.03]"
          aria-hidden="true"
        >
          <img
            src="/asu_trident.svg"
            alt=""
            className="h-[60vh] w-auto brightness-50 dark:brightness-100"
          />
        </div>
        
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
