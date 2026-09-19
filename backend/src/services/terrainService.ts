type Coordinates = { latitude: number; longitude: number };
export async function getTerrain({ latitude, longitude }: Coordinates) {
  const url = `https://api.open-topo-data.org/v1/aster30m?locations=${latitude},${longitude}`;
  const data = await fetch(url).then(r => r.ok ? r.json() : Promise.reject(new Error('Terrain service unavailable')));
  return { elevationM: data.results?.[0]?.elevation ?? 0, slope: 0.25 };
}
