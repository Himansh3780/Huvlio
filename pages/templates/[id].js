import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DocumentForm from '../../components/DocumentForm';
import templates from '../../config/templates.json';

const TemplatePage = () => {
    const router = useRouter();
    const { id } = router.query;

    // Wait for id to be available from query
    if (!id) return <div>Loading...</div>;

    const templateData = templates[id];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '3rem 2rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <button
                        onClick={() => router.back()}
                        style={{
                            marginBottom: '2rem',
                            background: 'none',
                            border: 'none',
                            color: '#0070f3',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        &larr; Back to Templates
                    </button>

                    <DocumentForm templateId={id} templateData={templateData} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TemplatePage;
