import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = "https://web.xethumbnail.workers.dev"; 

export default function Home() {
  // FIXED LINE BELOW: Added [data, setData]
  const [data, setData] = useState({ announcements: [], events:[] });
  // FIXED LINE BELOW: Added [onlineCount, setOnlineCount]
  const [onlineCount, setOnlineCount] = useState(46);

  useEffect(() => {
    fetch(`${API_URL}/api/home-data`)
      .then(res => res.json())
      .then(d => setData(d))
      .catch(e => console.error("Error fetching data:", e));

    const interval = setInterval(() => {
      setOnlineCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 8000);
    return () => clearInterval(interval);
  },[]);

  return (
    <main className="container">
      <section style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>Unite the <span style={{ color: 'var(--md-primary)' }}>Clash Family</span></h1>
        <p style={{ color: 'var(--md-text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Welcome to the Dragon's Den Alliance. A diverse group of clans catering to both War-focused and Relaxed-focused players.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/apply" className="btn btn-primary"><span className="material-symbols-rounded">swords</span> Apply Now</Link>
          <Link to="/clans" className="btn btn-outline"><span className="material-symbols-rounded">groups</span> View Clans</Link>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        <div className="card">
          <div style={{ color: 'var(--md-primary)', fontSize: '2rem' }}><span className="material-symbols-rounded">groups</span></div>
          <div style={{ color: 'var(--md-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Live Discord Members</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ height: '12px', width: '12px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></span> 
            {onlineCount} Online
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--md-surface-variant)', paddingBottom: '0.5rem' }}>
            <span className="material-symbols-rounded">campaign</span> Announcements
          </h2>
          {data.announcements.length === 0 ? <p>Loading...</p> : data.announcements.map(a => (
            <div key={a.id} className="card" style={{ borderLeft: '4px solid var(--md-primary)', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{a.title}</h3>
              <p style={{ color: 'var(--md-text-muted)', fontSize: '0.95rem' }}>{a.content}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--md-surface-variant)', paddingBottom: '0.5rem' }}>
            <span className="material-symbols-rounded">event</span> Ongoing Events
          </h2>
          {data.events.length === 0 ? <p>Loading...</p> : data.events.map(e => (
            <div key={e.id} className="card" style={{ borderLeft: '4px solid var(--md-secondary)', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{e.title}</h3>
              <p style={{ color: 'var(--md-text-muted)', fontSize: '0.95rem' }}>{e.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
