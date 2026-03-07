import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import templates from '../../config/templates.json';

const TemplatesIndex = () => {
    const templateKeys = Object.keys(templates);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Document Templates</h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {templateKeys.map((key) => {
                        const template = templates[key];
                        return (
                            <div key={key} style={{
                                padding: '2rem',
                                border: '1px solid #eaeaea',
                                borderRadius: '10px',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                backgroundColor: '#fff',
                                cursor: 'pointer'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                <h3 style={{ marginBottom: '0.8rem' }}>{template.name}</h3>
                                <p style={{ color: '#666', marginBottom: '1.5rem', minHeight: '3rem' }}>{template.description}</p>
                                <Link href={`/templates/${key}`} style={{
                                    color: '#0070f3',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    Use Template <span>&rarr;</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TemplatesIndex;
