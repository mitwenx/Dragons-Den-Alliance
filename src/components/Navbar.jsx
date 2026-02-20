import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const = useState(false);

  const navStyle = {
    background: 'rgba(26, 29, 36, 0.9)', backdropFilter: 'blur(10px)',
    position: 'fixed', width: '100%', top: 0, zIndex: 1000,
    borderBottom: '1px solid var(--md-surface-variant)'
  };

  const containerStyle = {
    maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  };

  const linksStyle = {
    display: isOpen ? 'flex' : 'none', 
    gap: '2rem', alignItems: 'center',
    ...(window.innerWidth <= 768 ? {
      position: 'absolute', top: '100%', left: 0, width: '100%', 
      background: 'var(--md-surface)', flexDirection: 'column', padding: '1rem 0'
    } : { display: 'flex' })
  };

  return (
    <header style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--md-primary)', textDecoration: 'none', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="material-symbols-rounded">local_fire_department</span> Dragon's Den
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} style={{ display: window.innerWidth <= 768 ? 'block' : 'none', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          <span className="material-symbols-rounded">{isOpen ? 'close' : 'menu'}</span>
        </button>
        <nav style={linksStyle} onClick={() => setIsOpen(false)}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <Link to="/clans" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>Our Clans</Link>
          <Link to="/apply" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>Apply</Link>
          <a href="https://discord.gg/FwvK3dusNr" target="_blank" rel="noreferrer" className="btn btn-discord">
            <span className="material-symbols-rounded" style={{ fontSize: '1.2rem' }}>forum</span> Join Discord
          </a>
        </nav>
      </div>
    </header>
  );
}
