'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block mb-4">
          <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <Sparkles size={16} />
            AI-Powered Application Generator
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Generate Perfect Applications in Minutes
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Stop spending hours writing applications. Let AI create personalized, 
          compelling content for jobs, universities, scholarships, and more.
        </p>

        <div className="flex gap-4 justify-center">
          {session?.user ? (
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition"
            >
              Go to Dashboard
              <ArrowRight size={20} />
            </Link>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition"
              >
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                View Pricing
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
