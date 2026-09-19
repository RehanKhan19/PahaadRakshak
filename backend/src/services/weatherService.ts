type Coordinates = { latitude: number; longitude: number; simulation?: string };
export async function getWeather({ latitude, longitude, simulation }: Coordinates) {
  const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation`).then(r => r.ok ? r.json() : Promise.reject(new Error('Weather service unavailable')));
  const multiplier = simulation === 'flash-flood' ? 8 : simulation === 'heavy-rain' ? 4 : 1;
  return { temperatureC: data.current.temperature_2m, precipitationMm: data.current.precipitation * multiplier };
}
