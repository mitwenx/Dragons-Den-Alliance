import React from 'react';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--md-surface)', 
      borderTop: '1px solid var(--md-surface-variant)', 
      padding: '3rem 2rem', 
      textAlign: 'center',
      marginTop: 'auto' // Pushes footer down when content is short
    }}>
      <p style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem' }}>
        © 2026 Dragon's Den Alliance. Not affiliated with Supercell.
      </p>
    </footer>
  );
}
