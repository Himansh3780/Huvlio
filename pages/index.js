import React, { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (will implement with Supabase)
    setLoading(false);
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>🚀 Huvlio AI Document Writer</h1>
        <p>Generate professional documents in seconds</p>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <p>Loading...</p>
          </div>
        ) : user ? (
          <div>
            <p>Welcome, {user.email}!</p>
            <button onClick={() => setUser(null)}>Logout</button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2>Get Started</h2>
            <p>Create professional documents with AI in just seconds</p>
            
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <a href="/auth/login" style={{ 
                padding: '12px 30px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                textDecoration: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Login
              </a>
              <a href="/auth/signup" style={{ 
                padding: '12px 30px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                textDecoration: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Sign Up
              </a>
            </div>
          </div>
        )}

        <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {['Leave', 'ATM Grab', 'Bank Draft', 'Complaint'].map((doc) => (
            <div key={doc} style={{ 
              padding: '20px', 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3>{doc}</h3>
              <p>Generate {doc} documents</p>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '60px', color: '#666' }}>
        <p>&copy; 2026 Huvlio. All rights reserved.</p>
      </footer>
    </div>
  );
}
