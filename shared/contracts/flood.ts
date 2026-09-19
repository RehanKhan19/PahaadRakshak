export type RiskLevel = 'Safe' | 'Warning' | 'Critical';

export interface RiskResponse {
  location: { latitude: number; longitude: number };
  probability: number;
  level: RiskLevel;
  factors: string[];
  weather: { precipitationMm: number; temperatureC: number };
  terrain: { elevationM: number; slope: number };
}
