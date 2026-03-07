'use client';

import { useSession } from 'next-auth/react';
import { ApplicationForm } from './ApplicationForm';
import { ApplicationsList } from './ApplicationsList';
import { useState } from 'react';

export function Dashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate');

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, {session.user.name || 'User'}!
          </h1>
          <p className="text-gray-600">Create powerful applications with AI assistance</p>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('generate')}
                className={`px-8 py-4 font-semibold ${
                  activeTab === 'generate'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Generate New
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-8 py-4 font-semibold ${
                  activeTab === 'history'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Applications
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'generate' ? (
              <ApplicationForm />
            ) : (
              <ApplicationsList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
