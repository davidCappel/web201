import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Superhero Creator',
  description: 'Create and manage your superhero team',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-100`}>
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Superhero Creator
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/create" className="hover:underline">
                Create Hero
              </Link>
            </div>
          </div>
        </nav>

        {children}

        <footer className="bg-gray-800 text-white p-4 mt-auto">
          <div className="container mx-auto text-center">
            <p>© {new Date().getFullYear()} Superhero Creator. All rights reserved.</p>
          </div>
        </footer>
        
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}