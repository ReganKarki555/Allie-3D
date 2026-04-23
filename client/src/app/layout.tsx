import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Allie 3D Store',
  description: 'Modern ecommerce storefront with Next.js, TypeScript, and Tailwind CSS.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
