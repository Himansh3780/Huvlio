import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{
          padding: '6rem 2rem',
          textAlign: 'center',
          backgroundColor: '#fff',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', color: '#111' }}>
            Generate Professional <span style={{ color: '#0070f3' }}>Official Documents</span> in Seconds
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#666', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
            The AI-powered hub for programmatic SEO and official application generation.
            Download high-quality PDFs instantly.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link href="/templates" style={{
              padding: '1.2rem 2.8rem',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1.2rem',
              fontWeight: 600,
              boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
            }}>
              Browse Templates
            </Link>
            <Link href="/auth/signup" style={{
              padding: '1.2rem 2.8rem',
              backgroundColor: '#fff',
              color: '#0070f3',
              textDecoration: 'none',
              borderRadius: '8px',
              border: '2px solid #0070f3',
              fontSize: '1.2rem',
              fontWeight: 600
            }}>
              Get Started Free
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '5rem 2rem', backgroundColor: '#fafafa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem' }}>Popular Documents</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
              {[
                { name: 'Leave Application', id: 'Leave', desc: 'Request official time off' },
                { name: 'ATM Location', id: 'ATM', desc: 'Submit ATM placement requests' },
                { name: 'Bank Draft', id: 'BankDraft', desc: 'Official draft issuance request' },
                { name: 'Complaint Letter', id: 'Complaint', desc: 'File formal complaints easily' }
              ].map((doc) => (
                <Link key={doc.id} href={`/templates/${doc.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    padding: '2rem',
                    border: '1px solid #eee',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    cursor: 'pointer'
                  }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <h3 style={{ marginBottom: '1rem' }}>{doc.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>{doc.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
