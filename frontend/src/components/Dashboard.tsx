import { useMemo, useState } from 'react';
import { MapView } from './MapView';
import { useFloodRisk } from '../hooks/useFloodRisk';

const scenarios = [
  { id: 'normal', label: 'Normal', icon: '☀', detail: 'Clear conditions' },
  { id: 'heavy-rain', label: 'Heavy rain', icon: '☔', detail: 'Monsoon watch' },
  { id: 'flash-flood', label: 'Flash flood', icon: '⚡', detail: 'Emergency mode' },
];

export function Dashboard() {
  const [simulation, setSimulation] = useState('normal');
  const [locationName, setLocationName] = useState('Joshimath, Uttarakhand');
  const { data, loading, usingDemoData } = useFloodRisk(30.7333, 79.0667, simulation);
  const risk = data?.level ?? 'Safe';
  const probability = Math.round((data?.probability ?? 0.18) * 100);
  const tone = risk.toLowerCase();
  const rainfall = data?.weather.precipitationMm ?? 3.2;
  const temperature = data?.weather.temperatureC ?? 16;
  const elevation = data?.terrain.elevationM ?? 1890;
  const safeZone = data?.safeZones?.[0];
  const time = useMemo(() => new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(new Date()), []);

  return <main className="app-shell">
    <aside className="sidebar"><div className="brand"><span className="brand-mark">⌁</span><span>Pahaad<span>Rakshak</span></span></div><nav className="nav-list" aria-label="Dashboard navigation"><a className="nav-item active" href="#overview"><span>▦</span> Overview</a><a className="nav-item" href="#map"><span>⌖</span> Risk map</a><a className="nav-item" href="#routes"><span>⌁</span> Evacuation</a><a className="nav-item" href="#alerts"><span>♢</span> Alerts <b>2</b></a></nav><div className="sidebar-footer"><div className="signal"><i /> Live data connected</div><p>Built for safer mountain communities.</p></div></aside>
    <section className="workspace"><header className="topbar"><div><p className="eyebrow">DISASTER INTELLIGENCE PLATFORM</p><h1>Good morning, response team.</h1></div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♧<i /></button><button className="team-button"><span>RT</span> Response Team <small>⌄</small></button></div></header>
      <section className="hero" id="overview"><div className="hero-copy"><div className="location-row"><span className="pin">●</span><input aria-label="Selected location" value={locationName} onChange={event => setLocationName(event.target.value)} /></div><h2>Flood intelligence,<br /><em>when every minute matters.</em></h2><p>Real-time flood risk insights for mountain communities, turning signals into safe action.</p></div><div className="mountain-art" aria-hidden="true"><span className="sun" /><span className="peak peak-one" /><span className="peak peak-two" /><span className="cloud cloud-one" /><span className="cloud cloud-two" /></div></section>
      <section className="scenario-panel" aria-label="Flood scenario simulation"><div><p className="section-kicker">SIMULATION MODE</p><h3>Explore changing conditions</h3></div><div className="scenario-tabs">{scenarios.map(scenario => <button key={scenario.id} className={simulation === scenario.id ? 'scenario active' : 'scenario'} onClick={() => setSimulation(scenario.id)}><span>{scenario.icon}</span><strong>{scenario.label}</strong><small>{scenario.detail}</small></button>)}</div></section>
      <section className="dashboard-grid"><article className={`risk-card ${tone}`}><div className="card-head"><div><p className="section-kicker">CURRENT FLOOD RISK</p><h3>{loading ? 'Refreshing…' : risk}</h3></div><span className="live-pill"><i /> LIVE</span></div><div className="risk-content"><div className="risk-orb"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="51" /><circle className="progress" cx="60" cy="60" r="51" pathLength="100" style={{ strokeDasharray: `${probability} 100` }} /></svg><b>{probability}<small>%</small></b></div><div><p className="risk-copy">{risk === 'Critical' ? 'Immediate action recommended' : risk === 'Warning' ? 'Stay alert. Conditions are worsening.' : 'Conditions are currently stable.'}</p><div className="risk-scale"><span>Safe</span><span>Warning</span><span>Critical</span></div><div className="scale-line"><i style={{ left: `${Math.max(4, probability)}%` }} /></div></div></div></article>
        <article className="weather-card"><div className="card-head"><div><p className="section-kicker">WEATHER SNAPSHOT</p><h3>Mountain conditions</h3></div><span className="weather-icon">☁</span></div><div className="weather-main"><b>{temperature}°</b><div><strong>Cloudy</strong><p>Updated {time}</p></div></div><div className="metric-row"><div><span>☂</span><p>Rainfall <b>{rainfall} mm</b></p></div><div><span>〰</span><p>Wind <b>12 km/h</b></p></div></div></article>
        <article className="alert-card" id="alerts"><div className="alert-icon">!</div><div><p className="section-kicker">ACTIVE ADVISORY</p><h3>{risk === 'Safe' ? 'No immediate threat' : 'Rainfall watch in effect'}</h3><p>{risk === 'Safe' ? 'We will notify you if conditions change.' : 'Keep residents away from riverbanks and lower roads.'}</p><button>View alert details <span>→</span></button></div></article>
        <article className="map-card" id="map"><div className="card-head"><div><p className="section-kicker">LIVE RISK MAP</p><h3>Area overview</h3></div><button className="text-button">Expand map ↗</button></div><MapView risk={risk} /></article>
        <article className="evacuation-card" id="routes"><div className="card-head"><div><p className="section-kicker">SAFEST ROUTE</p><h3>Evacuation guidance</h3></div><span className="route-time">~ 12 min</span></div><div className="route"><div className="route-points"><i /><span /><i /></div><div><p><b>Current location</b><small>{locationName}</small></p><p><b>{safeZone?.name ?? 'Auli Community Shelter'}</b><small>{safeZone ? `${safeZone.elevationM} m elevation` : `${elevation + 120} m elevation`}</small></p></div></div><button className="route-button">Open evacuation route <span>→</span></button></article></section>
      {usingDemoData && <p className="demo-note">Demo data is shown while the local API is offline.</p>}</section>
  </main>;
}
