'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function GetStarted() {
  const { data: session } = useSession();

  if (session?.user) {
    return null; // Don't show CTA if already logged in
  }

  return (
    <div className="py-16 px-4 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Start generating your first application for free. No credit card required.
        </p>
        <Link
          href="/auth/signin"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Create Free Account
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
