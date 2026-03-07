'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              AppGen
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition">
              Blog
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition">
              Pricing
            </Link>

            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/blog" className="block text-gray-700 hover:text-blue-600 py-2">
              Blog
            </Link>
            <Link href="/pricing" className="block text-gray-700 hover:text-blue-600 py-2">
              Pricing
            </Link>
            {session?.user ? (
              <>
                <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600 py-2">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left text-red-600 hover:text-red-700 py-2"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/auth/signin" className="block text-blue-600 hover:text-blue-700 py-2">
                Sign in
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
