import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav style={{
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eaeaea',
            backgroundColor: '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#0070f3' }}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    🚀 Huvlio
                </Link>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <Link href="/templates" style={{ textDecoration: 'none', color: '#333', fontWeight: 500 }}>
                    Templates
                </Link>
                <Link href="/account" style={{ textDecoration: 'none', color: '#333', fontWeight: 500 }}>
                    My Documents
                </Link>
                <Link href="/auth/login" style={{
                    textDecoration: 'none',
                    color: '#0070f3',
                    border: '1px solid #0070f3',
                    padding: '0.4rem 1.2rem',
                    borderRadius: '5px'
                }}>
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
