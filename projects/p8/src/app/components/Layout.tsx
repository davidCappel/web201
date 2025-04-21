import React, { ReactNode } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-100">
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

      <main className="container mx-auto py-8 px-4">
        {title && (
          <h1 className="text-3xl font-bold mb-6 text-gray-800">{title}</h1>
        )}
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Superhero Creator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;