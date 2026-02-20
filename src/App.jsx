import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Apply from './pages/Apply';

// A simple dummy component for OurClans just to complete the routing
const OurClans = () => (
  <main className="container"><h1 style={{color: 'var(--md-primary)'}}>Our Alliance Clans</h1><p>List of clans will appear here.</p></main>
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clans" element={<OurClans />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
      
      <footer style={{ backgroundColor: 'var(--md-surface)', borderTop: '1px solid var(--md-surface-variant)', padding: '3rem 2rem', textAlign: 'center', marginTop: '4rem' }}>
        <p style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem' }}>
          © 2026 Dragon's Den Alliance. This site is not affiliated with Supercell.
        </p>
      </footer>
    </Router>
  );
}
