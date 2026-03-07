'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function SignIn() {
  const router = useRouter();

  const handleGitHubSignIn = async () => {
    await signIn('github', { redirect: true, callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start generating amazing applications
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGitHubSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            <Github size={20} />
            Sign in with GitHub
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/" className="text-blue-600 hover:text-blue-500">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
