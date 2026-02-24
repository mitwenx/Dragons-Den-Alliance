import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ClanContext } from '../App';

const CATEGORIES = {
  "Competitive": ['#JGGYC8QV', '#2QV0Q029L', '#GP2Y82UQ', '#GJQJU2QJ', '#2LJYCYYY9', '#2QGVCCPJC', '#2GC8RQ0PJ', '#JGYPQPG8', '#2GL02LGL0', '#2GV92CC2L'],
  "Casual": ['#2JRRYUQCL', '#PGVCC2GJ', '#2RRCR0P2J'],
  "Feeder": ['#2Y98L0VV0', '#2JGCUCQQQ'],
  "Alliance Partners": ['#2QLL02GPV', '#2RGUGV988', '#2RJR99R92']
};

export default function Clans() {
  // Uses pre-loaded data from App.jsx so loading is instant
  const clansData = useContext(ClanContext);

  if (!clansData) {
    return (
      <main className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--md-primary)' }}>Our Alliance Clans</h1>
          <p style={{ color: 'var(--md-text-muted)' }}>Find the perfect fit based on your playstyle.</p>
        </div>
        <div style={{textAlign: 'center', color: 'var(--md-text-muted)', marginTop: '10vh'}}>
          <span className="material-symbols-rounded" style={{animation: 'spin 1s infinite linear', fontSize: '3rem'}}>refresh</span>
          <p style={{marginTop: '1rem'}}>Loading alliance data...</p>
        </div>
      </main>
    );
  }

  // Group clans by category
  const grouped = { "Competitive": [], "Casual": [], "Feeder": [], "Alliance Partners": [] };
  clansData.forEach(clan => {
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

  return (
    <main className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--md-primary)' }}>Our Alliance Clans</h1>
        <p style={{ color: 'var(--md-text-muted)' }}>Find the perfect fit based on your playstyle.</p>
      </div>

      {Object.entries(grouped).map(([category, clanList]) => (
        clanList.length > 0 && (
          <div key={category} style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--md-surface-variant)', paddingBottom: '0.5rem', color: 'white' }}>
              {category} Clans
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {clanList.map(clan => (
                <Link key={clan.tag} to={`/clans/${clan.tag.replace('#', '')}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={clan.badgeUrls.small} alt="Badge" style={{ width: '60px' }} />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{clan.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--md-text-muted)' }}>
                      <span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: 'middle' }}>groups</span> {clan.members}/50
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      ))}
    </main>
  );
}
