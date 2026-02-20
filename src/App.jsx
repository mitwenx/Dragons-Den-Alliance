import React from 'react';
// CHANGED: Import HashRouter instead of BrowserRouter
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Apply from './pages/Apply';

// Dummy component for Clans page
const OurClans = () => (
  <main className="container">
    <h1 style={{color: 'var(--md-primary)'}}>Our Alliance Clans</h1>
    <p>List of clans will appear here.</p>
  </main>
);

export default function App() {
  return (
    // CHANGED: Using HashRouter
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
