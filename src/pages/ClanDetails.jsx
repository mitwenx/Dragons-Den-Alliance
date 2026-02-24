import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ClanContext } from '../App';

export default function ClanDetails() {
  const { tag } = useParams();
  const clansData = useContext(ClanContext);
  const [clan, setClan] = useState(null);

  useEffect(() => {
    const actualTag = `#${tag}`;
    if (clansData) {
      setClan(clansData.find(c => c.tag === actualTag));
    } else {
      // Fallback in case user reloads the page directly on this URL
      fetch("https://web.xethumbnail.workers.dev/api/clans-data")
        .then(res => res.json())
        .then(data => {
          if (!data.error) setClan(data.find(c => c.tag === actualTag));
        });
    }
  }, [tag, clansData]);

  if (!clan) {
    return (
      <div className="container" style={{textAlign: 'center', color: 'var(--md-text-muted)', marginTop: '20vh'}}>
        <span className="material-symbols-rounded" style={{animation: 'spin 1s infinite linear', fontSize: '3rem'}}>refresh</span>
        <p style={{marginTop: '1rem'}}>Loading clan details...</p>
      </div>
    );
  }

  // Extract Leaders & Co-Leaders
  const leader = clan.memberList?.find(m => m.role === 'leader');
  const coLeaders = clan.memberList?.filter(m => m.role === 'coLeader') || [];

  return (
    <main className="container">
      <Link to="/clans" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--md-secondary)', textDecoration: 'none', marginBottom: '2rem' }}>
        <span className="material-symbols-rounded">arrow_back</span> Back to Clans
      </Link>

      <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', marginBottom: '3rem', border: '1px solid var(--md-primary)' }}>
        <img src={clan.badgeUrls.medium} alt="Clan Badge" style={{ width: '120px', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(245, 184, 61, 0.4))' }} />
        <h1 style={{ fontSize: '3rem', color: 'var(--md-primary)', lineHeight: '1.1' }}>{clan.name}</h1>
        <p style={{ color: 'var(--md-text-muted)', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>{clan.tag}</p>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontStyle: 'italic', color: '#cbd5e1' }}>"{clan.description}"</p>
        
        <a href={`https://link.clashofclans.com/en?action=OpenClanProfile&tag=${clan.tag.replace('#', '')}`} className="btn btn-primary" target="_blank" rel="noreferrer">
          <span className="material-symbols-rounded">swords</span> Open in Game
        </a>
      </div>

      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
         <span className="material-symbols-rounded" style={{color: 'var(--md-secondary)'}}>analytics</span> Performance Stats
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        <div className="card">
          <div style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Clan Level</div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{clan.clanLevel}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>War Wins</div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{clan.warWins}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Win Streak</div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{clan.warWinStreak}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Members</div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{clan.members}/50</div>
        </div>
      </div>

      {/* Leadership Section */}
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
         <span className="material-symbols-rounded" style={{color: 'var(--md-primary)'}}>admin_panel_settings</span> Leadership Team
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {leader && (
          <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#ef4444', fontWeight: 'bold', marginBottom: '5px' }}>Leader</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{leader.name}</div>
          </div>
        )}

        {coLeaders.map(co => (
          <div key={co.tag} className="card" style={{ borderLeft: '4px solid var(--md-secondary)' }}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--md-secondary)', fontWeight: 'bold', marginBottom: '5px' }}>Co-Leader</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{co.name}</div>
          </div>
        ))}
      </div>

    </main>
  );
}
