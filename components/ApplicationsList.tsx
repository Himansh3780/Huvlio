'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Trash2, Download, Eye } from 'lucide-react';
import jsPDF from 'jspdf';

interface Application {
  id: string;
  title: string;
  type: string;
  content: string;
  createdAt: string;
}

export function ApplicationsList() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setApplications(applications.filter((app) => app.id !== id));
        toast.success('Application deleted');
      }
    } catch (error) {
      toast.error('Failed to delete application');
    }
  };

  const exportPDF = (app: Application) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;

    let yPosition = margin;

    doc.setFontSize(16);
    doc.text(app.title, margin, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    const lines = doc.splitTextToSize(app.content, maxWidth);

    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 7;
    });

    doc.save(`${app.title}.pdf`);
    toast.success('PDF exported successfully!');
  };

  if (loading) {
    return <div className="text-center py-8">Loading applications...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No applications yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{app.title}</h3>
            <p className="text-sm text-gray-600">
              {new Date(app.createdAt).toLocaleDateString()} • {app.type}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedApp(app)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title="View"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={() => exportPDF(app)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
              title="Download"
            >
              <Download size={18} />
            </button>
            <button
              onClick={() => deleteApplication(app.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl max-h-96 w-full overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedApp.title}</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedApp.content}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="mt-6 w-full bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
