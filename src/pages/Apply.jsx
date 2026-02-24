import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = "https://web.xethumbnail.workers.dev";

const CLAN_OPTIONS = [
  "LINGGA DJATI", "Moskow Two", "SPECIALIST", "Loyola", "Monke", "GUJJU GANG", 
  "We are Sam", "Rock starz!!", "SHADOW SAINTS", "Old Thugs", "sentinels", 
  "SATAN", "Monke 2", "UNDEAD GAMING", "Son of Sam", "Benäts", "Dragon's Den", "Dragons Den Fam"
];

export default function Apply() {
  const [formData, setFormData] = useState({ 
    discordUsername: '', playerName: '', playerTag: '', choices: ['', '', ''] 
  });
  const [status, setStatus] = useState(null);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...formData.choices];
    newChoices[index] = value;
    setFormData({ ...formData, choices: newChoices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(`${API_URL}/api/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="container" style={{ maxWidth: '600px', width: '100%', textAlign: 'center', marginTop: '10vh' }}>
        <span className="material-symbols-rounded" style={{ fontSize: '5rem', color: '#22c55e', marginBottom: '1rem' }}>check_circle</span>
        <h1 style={{ marginBottom: '1rem' }}>Application Submitted!</h1>
        <p style={{ color: 'var(--md-text-muted)', marginBottom: '2rem' }}>
          Your application has been sent to our leaders. **You must join our Discord server** to complete the interview process!
        </p>
        <a href="https://discord.gg/FwvK3dusNr" target="_blank" rel="noreferrer" className="btn btn-discord" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
          <span className="material-symbols-rounded">forum</span> Join Discord Now
        </a>
      </main>
    );
  }

  return (
    <main className="container" style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem', color: 'var(--md-primary)' }}>Apply to Dragon's Den</h1>
      
      <div style={{ background: 'rgba(92, 136, 218, 0.1)', border: '1px solid var(--md-secondary)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
          💡 <strong>Tip:</strong> Please <Link to="/clans" style={{color: 'var(--md-secondary)', fontWeight: 'bold'}}>review our clan list</Link> to find the best fit before applying. We will help you secure a spot in up to 3 choices!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>Discord Username (Required) <span style={{color: '#ef4444'}}>*</span></label>
          <input required type="text" className="form-control" value={formData.discordUsername} onChange={e => setFormData({...formData, discordUsername: e.target.value})} placeholder="e.g. clashpro99" />
          <small style={{ color: 'var(--md-text-muted)', fontSize: '0.8rem' }}>Discord is mandatory for all members.</small>
        </div>

        {/* MOBILE RESPONSIVE FIX: Auto-fit grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>In-Game Name <span style={{color: '#ef4444'}}>*</span></label>
            <input required type="text" className="form-control" value={formData.playerName} onChange={e => setFormData({...formData, playerName: e.target.value})} placeholder="ClashKing" />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Player Tag (#) <span style={{color: '#ef4444'}}>*</span></label>
            <input required type="text" className="form-control" value={formData.playerTag} onChange={e => setFormData({...formData, playerTag: e.target.value})} placeholder="#YQU99V8" />
          </div>
        </div>

        <label style={{ fontWeight: 600, color: 'var(--md-text-muted)', display: 'block', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Your Preferred Clans (Choose up to 3)</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[0, 1, 2].map(index => (
            <select key={index} className="form-control" value={formData.choices[index]} onChange={e => handleChoiceChange(index, e.target.value)} required={index === 0}>
              <option value="">{`-- Select Choice ${index + 1} ${index === 0 ? '(Required)' : '(Optional)'} --`}</option>
              {CLAN_OPTIONS.map(clan => (
                <option key={clan} value={clan}>{clan}</option>
              ))}
            </select>
          ))}
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Submit Application'}
        </button>

        {status === 'error' && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
      </form>
    </main>
  );
}
