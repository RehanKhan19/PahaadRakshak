import historicalFloods from '../data/historicalFloods.json' with { type: 'json' };
type Input = { latitude: number; longitude: number; weather: { precipitationMm: number; temperatureC: number }; terrain: { elevationM: number; slope: number }; modelProbability?: number };
export function buildRiskAssessment(input: Input) {
  const historicalLikelihood = historicalFloods.defaultLikelihood;
  const heuristic = Math.min(1, input.weather.precipitationMm / 30 * 0.55 + input.terrain.slope * 0.25 + historicalLikelihood * 0.2);
  const probability = Math.round((input.modelProbability ?? heuristic) * 100) / 100;
  const level = probability >= 0.7 ? 'Critical' : probability >= 0.35 ? 'Warning' : 'Safe';
  return { location: { latitude: input.latitude, longitude: input.longitude }, probability, level, weather: input.weather, terrain: input.terrain, factors: [`Rainfall: ${input.weather.precipitationMm} mm`, `Elevation: ${input.terrain.elevationM} m`, `Historical likelihood: ${historicalLikelihood}`] };
}
