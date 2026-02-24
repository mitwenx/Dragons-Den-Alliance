import React, { useState, useEffect, createContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Clans from './pages/Clans';
import ClanDetails from './pages/ClanDetails';

// Create a Context to hold pre-fetched clan data globally
export const ClanContext = createContext();

export default function App() {
  const [clansData, setClansData] = useState(null);

  useEffect(() => {
    // Pre-fetch clan data immediately on site load so the Clans page is instant
    fetch("https://web.xethumbnail.workers.dev/api/clans-data")
      .then(res => res.json())
      .then(data => {
        if (!data.error) setClansData(data);
      })
      .catch(e => console.error("Error fetching clans", e));
  }, []);

  return (
    <ClanContext.Provider value={clansData}>
      <Router>
        {/* Flex layout forces Footer to the bottom of the screen */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          
          <div style={{ flex: 1, paddingTop: '80px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clans" element={<Clans />} />
              <Route path="/clans/:tag" element={<ClanDetails />} />
              <Route path="/apply" element={<Apply />} />
            </Routes>
          </div>
          
          <Footer />
        </div>
      </Router>
    </ClanContext.Provider>
  );
}
