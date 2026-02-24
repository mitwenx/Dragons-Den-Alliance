import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Clans from './pages/Clans';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clans" element={<Clans />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
      
      <footer style={{ backgroundColor: 'var(--md-surface)', borderTop: '1px solid var(--md-surface-variant)', padding: '3rem 2rem', textAlign: 'center', marginTop: '4rem' }}>
        <p style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem' }}>
          © 2026 Dragon's Den Alliance. Not affiliated with Supercell.
        </p>
      </footer>
    </Router>
  );
}
