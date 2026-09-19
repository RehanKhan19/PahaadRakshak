import { useEffect, useState } from 'react';
const api = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const fallback: Record<string, any> = {
  normal: { level: 'Safe', probability: .18, weather: { precipitationMm: 3.2, temperatureC: 16 }, terrain: { elevationM: 1890 }, safeZones: [{ name: 'Auli Community Shelter', elevationM: 2010 }] },
  'heavy-rain': { level: 'Warning', probability: .54, weather: { precipitationMm: 18.6, temperatureC: 14 }, terrain: { elevationM: 1890 }, safeZones: [{ name: 'Auli Community Shelter', elevationM: 2010 }] },
  'flash-flood': { level: 'Critical', probability: .86, weather: { precipitationMm: 47.4, temperatureC: 12 }, terrain: { elevationM: 1890 }, safeZones: [{ name: 'Auli Community Shelter', elevationM: 2010 }] },
};
export function useFloodRisk(latitude: number, longitude: number, simulation: string) {
  const [data, setData] = useState<any>(fallback[simulation]); const [loading, setLoading] = useState(false); const [usingDemoData, setUsingDemoData] = useState(true);
  useEffect(() => { let live = true; setData(fallback[simulation]); setLoading(true); setUsingDemoData(true); fetch(`${api}/api/risk?latitude=${latitude}&longitude=${longitude}&simulation=${simulation}`).then(r => r.ok ? r.json() : Promise.reject()).then(value => { if (live) { setData(value); setUsingDemoData(false); } }).catch(() => undefined).finally(() => live && setLoading(false)); return () => { live = false; }; }, [latitude, longitude, simulation]);
  return { data, loading, usingDemoData };
}
