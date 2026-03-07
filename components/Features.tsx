'use client';

import { Zap, Clock, Share2, FileText } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate applications in seconds, not hours',
  },
  {
    icon: FileText,
    title: 'Multiple Formats',
    description: 'Job, university, scholarship, visa, and more templates',
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Spend more time on what matters, less on writing',
  },
  {
    icon: Share2,
    title: 'Easy Export',
    description: 'Download as PDF or Word documents instantly',
  },
];

export function Features() {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Generator?
          </h2>
          <p className="text-xl text-gray-600">
            Enterprise-grade AI with student-friendly pricing
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition"
              >
                <Icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
