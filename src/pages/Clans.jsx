import React, { useEffect, useState } from 'react';

const API_URL = "https://web.xethumbnail.workers.dev"; 

const CATEGORIES = {
  "Competitive": ['#JGGYC8QV', '#2QV0Q029L', '#GP2Y82UQ', '#GJQJU2QJ', '#2LJYCYYY9', '#2QGVCCPJC', '#2GC8RQ0PJ', '#JGYPQPG8', '#2GL02LGL0', '#2GV92CC2L'],
  "Casual": ['#2JRRYUQCL', '#PGVCC2GJ', '#2RRCR0P2J'],
  "Feeder": ['#2Y98L0VV0', '#2JGCUCQQQ'],
  "Alliance Partners": ['#2QLL02GPV', '#2RGUGV988', '#2RJR99R92']
};

export default function Clans() {
  const [clans, setClans] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClan, setSelectedClan] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/clans-data`)
      .then(res => res.json())
      .then(data => {
        if(data.error) throw new Error(data.error);
        
        // Group clans by category
        const grouped = { "Competitive": [], "Casual": [], "Feeder": [], "Alliance Partners": [] };
        data.forEach(clan => {
          let placed = false;
          for (const [category, tags] of Object.entries(CATEGORIES)) {
            if (tags.includes(clan.tag)) {
              grouped[category].push(clan);
              placed = true;
              break;
            }
          }
          if (!placed) grouped["Alliance Partners"].push(clan);
        });

        setClans(grouped);
        setLoading(false);
      })
      .catch(err => {
        setError("Could not load clan data. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container" style={{textAlign: 'center', color: 'var(--md-text-muted)', marginTop: '20vh'}}>
      <span className="material-symbols-rounded" style={{animation: 'spin 1s infinite linear', fontSize: '3rem'}}>refresh</span>
      <p style={{marginTop: '1rem'}}>Loading latest clan data...</p>
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
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--md-primary)' }}>Our Alliance Clans</h1>
        <p style={{ color: 'var(--md-text-muted)' }}>Find the perfect fit based on your playstyle.</p>
      </div>

      {Object.entries(clans).map(([category, clanList]) => (
        clanList.length > 0 && (
          <div key={category} style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--md-surface-variant)', paddingBottom: '0.5rem', color: 'white' }}>
              {category} Clans
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {clanList.map(clan => (
                <div key={clan.tag} className="card" onClick={() => setSelectedClan(clan)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={clan.badgeUrls.small} alt="Badge" style={{ width: '60px' }} />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{clan.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--md-text-muted)' }}>
                      <span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: 'middle' }}>groups</span> {clan.members}/50
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {/* MODAL FOR CLAN DETAILS */}
      {selectedClan && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }} onClick={() => setSelectedClan(null)}>
          <div className="card" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', width: '100%', position: 'relative' }}>
            <button onClick={() => setSelectedClan(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <span className="material-symbols-rounded">close</span>
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img src={selectedClan.badgeUrls.medium} alt="Badge" style={{ width: '100px', filter: 'drop-shadow(0 0 10px rgba(245, 184, 61, 0.4))' }} />
              <h2 style={{ color: 'var(--md-primary)', marginTop: '10px' }}>{selectedClan.name}</h2>
              <p style={{ color: 'var(--md-text-muted)' }}>{selectedClan.tag}</p>
            </div>

            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#cbd5e1' }}>"{selectedClan.description}"</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--md-bg)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--md-text-muted)' }}>Clan Level</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedClan.clanLevel}</div>
              </div>
              <div style={{ background: 'var(--md-bg)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--md-text-muted)' }}>War Wins</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedClan.warWins}</div>
              </div>
              <div style={{ background: 'var(--md-bg)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--md-text-muted)' }}>Req. Trophies</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedClan.requiredTrophies}</div>
              </div>
              <div style={{ background: 'var(--md-bg)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--md-text-muted)' }}>Win Streak</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedClan.warWinStreak}</div>
              </div>
            </div>

            <a href={`https://link.clashofclans.com/en?action=OpenClanProfile&tag=${selectedClan.tag.replace('#', '')}`} className="btn btn-primary" target="_blank" rel="noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
              Open in Game
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
