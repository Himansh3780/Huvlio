'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    limit: '5 generations/month',
    features: [
      '5 monthly generations',
      '3 application types',
      'Basic templates',
      'Email support',
      'PDF export',
    ],
    featured: false,
    buttonText: 'Get Started',
    href: '/auth/signin',
  },
  {
    name: 'Premium',
    price: '₹29',
    period: '/month',
    limit: 'Unlimited generations',
    features: [
      'Unlimited generations',
      'All application types',
      'Advanced templates',
      'Priority support',
      'PDF + Word export',
      'AI refinement tool',
      'Ad-free experience',
    ],
    featured: true,
    buttonText: 'Start Free Trial',
    href: '/auth/signin',
  },
];

export function Pricing() {
  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Start free, upgrade anytime
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg p-8 ${
                plan.featured
                  ? 'bg-blue-600 text-white shadow-xl scale-105'
                  : 'bg-white border-2 border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                {plan.period && <span className={plan.featured ? 'text-blue-100' : 'text-gray-600'}>{plan.period}</span>}
                <p className={`text-sm mt-2 ${plan.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.limit}
                </p>
              </div>

              <Link
                href={plan.href}
            className={`block text-center py-3 rounded-lg font-semibold mb-8 transition ${
                  plan.featured
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.buttonText}
              </Link>

              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check size={20} className={plan.featured ? 'text-white' : 'text-green-600'} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
