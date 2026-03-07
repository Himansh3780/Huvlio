import React, { useState } from 'react';

const DocumentForm = ({ templateId, templateData }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateId,
                    userInputs: formData
                })
            });

            const data = await response.json();

            if (data.success) {
                setResult(data.text);
            } else {
                setError(data.error || 'Failed to generate document');
            }
        } catch (err) {
            setError('An error occurred during generation');
        } finally {
            setLoading(false);
        }
    };

    if (!templateData) return <div>Template not found</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{templateData.name}</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>{templateData.description}</p>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                {templateData.fields.map((field) => (
                    <div key={field.name}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                            <textarea
                                name={field.name}
                                required={field.required}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '5px',
                                    border: '1px solid #ddd',
                                    minHeight: '120px'
                                }}
                            />
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                required={field.required}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '5px',
                                    border: '1px solid #ddd'
                                }}
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '1rem',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '1.1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? 'Generating...' : 'Generate Document'}
                </button>
            </form>

            {error && (
                <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff5f5', color: '#c53030', border: '1px solid #feb2b2', borderRadius: '5px' }}>
                    {error}
                </div>
            )}

            {result && (
                <div style={{ marginTop: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Generated Document</h3>
                    <div style={{
                        padding: '2rem',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'serif',
                        lineHeight: 1.6
                    }}>
                        {result}
                    </div>
                    <button
                        style={{
                            marginTop: '1.5rem',
                            padding: '0.8rem 2rem',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                        onClick={() => {
                            // Future: PDF Download
                            alert('PDF Download Feature Coming Soon!');
                        }}
                    >
                        Download as PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default DocumentForm;
