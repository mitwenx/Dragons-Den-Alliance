import React, { useEffect, useState } from 'react';

// Replace with your actual Cloudflare Worker URL
const API_URL = "https://web.xethumbnail.workers.dev"; 

export default function Clans() {
  const [clan, setClan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/clan-stats`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch clan data");
        return res.json();
      })
      .then(data => {
        // If the API returns an error object, throw it
        if(data.error) throw new Error(data.error);
        setClan(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load clan data. Check API Key or Proxy settings.");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container" style={{textAlign: 'center', color: 'var(--md-text-muted)', marginTop: '20vh'}}>
      <span className="material-symbols-rounded" style={{animation: 'spin 1s infinite linear', fontSize: '3rem'}}>refresh</span>
      <p style={{marginTop: '1rem'}}>Contacting Supercell...</p>
    </div>
  );

  if (error) return (
    <div className="container" style={{textAlign: 'center', color: '#ef4444', marginTop: '20vh'}}>
      <span className="material-symbols-rounded" style={{fontSize: '3rem'}}>warning</span>
      <p style={{marginTop: '1rem'}}>{error}</p>
    </div>
  );

  return (
    <main className="container">
      {/* Clan Hero Section */}
      <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', marginBottom: '3rem', border: '1px solid var(--md-primary)' }}>
        {clan.badgeUrls && (
            <img src={clan.badgeUrls.medium} alt="Clan Badge" style={{ width: '120px', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(245, 184, 61, 0.4))' }} />
        )}
        <h1 style={{ fontSize: '3rem', color: 'var(--md-primary)', lineHeight: '1.1' }}>{clan.name}</h1>
        <p style={{ color: 'var(--md-text-muted)', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>{clan.tag}</p>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontStyle: 'italic', color: '#cbd5e1' }}>"{clan.description}"</p>
        
        <a href={`https://link.clashofclans.com/en?action=OpenClanProfile&tag=${clan.tag.replace('#', '')}`} className="btn btn-primary" target="_blank" rel="noreferrer">
          <span className="material-symbols-rounded">swords</span> Open in Game
        </a>
      </div>

      {/* Stats Grid */}
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
         <span className="material-symbols-rounded" style={{color: 'var(--md-secondary)'}}>analytics</span> Clan Statistics
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        
        {/* War Wins */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem' }}>War Wins</span>
            <span className="material-symbols-rounded" style={{ color: '#22c55e' }}>trophy</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{clan.warWins}</div>
        </div>

        {/* Win Streak */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem' }}>Win Streak</span>
            <span className="material-symbols-rounded" style={{ color: '#f59e0b' }}>local_fire_department</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{clan.warWinStreak}</div>
        </div>

        {/* Members */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem' }}>Members</span>
            <span className="material-symbols-rounded" style={{ color: 'var(--md-secondary)' }}>groups</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{clan.members}/50</div>
        </div>

        {/* Clan Level */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem' }}>Clan Level</span>
            <span className="material-symbols-rounded" style={{ color: 'var(--md-primary)' }}>stars</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{clan.clanLevel}</div>
        </div>

        {/* Location */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem' }}>Location</span>
            <span className="material-symbols-rounded" style={{ color: '#94a3b8' }}>public</span>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '10px' }}>{clan.location?.name || 'International'}</div>
        </div>

        {/* Required Trophies */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem' }}>Req. Trophies</span>
            <span className="material-symbols-rounded" style={{ color: '#eab308' }}>military_tech</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{clan.requiredTrophies}</div>
        </div>
        
      </div>
    </main>
  );
}
