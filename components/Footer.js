import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            borderTop: '1px solid #eaeaea',
            marginTop: 'auto',
            backgroundColor: '#fafafa',
            color: '#666'
        }}>
            <p style={{ marginBottom: '1rem' }}>&copy; {new Date().getFullYear()} Huvlio AI. All rights reserved.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.9rem' }}>
                <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
                <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
                <a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</a>
            </div>
        </footer>
    );
};

export default Footer;
