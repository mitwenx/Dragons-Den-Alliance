import React, { useState } from 'react';

const API_URL = "https://your-worker-name.your-username.workers.dev";

export default function Apply() {
  const = useState({ playerName: '', playerTag: '', desiredClan: 'Loyola' });
  const = useState(null);

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
        setFormData({ playerName: '', playerTag: '', desiredClan: 'Loyola' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="container" style={{ maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '1rem', color: 'var(--md-primary)' }}>Apply to Dragon's Den</h1>
      <p style={{ color: 'var(--md-text-muted)', marginBottom: '2rem' }}>Fill out this form and our leaders will review it via Discord.</p>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>In-Game Name</label>
          <input required type="text" className="form-control" value={formData.playerName} onChange={e => setFormData({...formData, playerName: e.target.value})} placeholder="e.g. ClashKing" />
        </div>
        
        <div className="form-group">
          <label>Player Tag (#)</label>
          <input required type="text" className="form-control" value={formData.playerTag} onChange={e => setFormData({...formData, playerTag: e.target.value})} placeholder="#YQU99V8" />
        </div>

        <div className="form-group">
          <label>Desired Clan</label>
          <select className="form-control" value={formData.desiredClan} onChange={e => setFormData({...formData, desiredClan: e.target.value})}>
            <option value="Loyola">Loyola (Competitive)</option>
            <option value="Gujju Gang">Gujju Gang (Casual)</option>
            <option value="Moskow Two">Moskow Two (Feeder)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Submit Application'}
        </button>

        {status === 'success' && <p style={{ color: '#22c55e', marginTop: '1rem', textAlign: 'center' }}>Application sent to Discord successfully!</p>}
        {status === 'error' && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
      </form>
    </main>
  );
}
