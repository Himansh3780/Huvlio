'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Loader, Download } from 'lucide-react';
import jsPDF from 'jspdf';

interface FormData {
  name: string;
  email: string;
  type: 'job' | 'university' | 'scholarship' | 'visa' | 'internship';
  experience: string;
  skills: string;
  achievements: string;
  motivations: string;
  template?: string;
}

export function ApplicationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<any>(null);

  const onSubmit = useCallback(async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || 'Failed to generate application');
        return;
      }

      const result = await response.json();
      setGenerated(result);
      toast.success('Application generated successfully!');
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const exportPDF = useCallback(() => {
    if (!generated) return;

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;

    let yPosition = margin;

    // Title
    doc.setFontSize(16);
    doc.text(generated.title, margin, yPosition);
    yPosition += 10;

    // Content
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(generated.content, maxWidth);
    
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 7;
    });

    doc.save(`${generated.title}.pdf`);
    toast.success('PDF exported successfully!');
  }, [generated]);

  const appTypes: Array<FormData['type']> = ['job', 'university', 'scholarship', 'visa', 'internship'];

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Application Type
          </label>
          <select
            {...register('type', { required: 'Application type is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an application type</option>
            {appTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)} Application
              </option>
            ))}
          </select>
          {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Experience
          </label>
          <textarea
            {...register('experience', { required: 'Experience is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your relevant experience..."
            rows={4}
          />
          {errors.experience && <p className="text-red-600 text-sm mt-1">{errors.experience.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Key Skills
          </label>
          <textarea
            {...register('skills', { required: 'Skills are required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="List your relevant skills..."
            rows={3}
          />
          {errors.skills && <p className="text-red-600 text-sm mt-1">{errors.skills.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Achievements & Awards
          </label>
          <textarea
            {...register('achievements', { required: 'Achievements are required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Share your notable achievements..."
            rows={3}
          />
          {errors.achievements && <p className="text-red-600 text-sm mt-1">{errors.achievements.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Motivation & Goals
          </label>
          <textarea
            {...register('motivations', { required: 'Motivations are required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us why this opportunity is important to you..."
            rows={4}
          />
          {errors.motivations && <p className="text-red-600 text-sm mt-1">{errors.motivations.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Application'
          )}
        </button>
      </form>

      {generated && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">{generated.title}</h3>
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Download size={18} />
              Export PDF
            </button>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{generated.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
