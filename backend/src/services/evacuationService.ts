type Point = { latitude: number; longitude: number };
export function findSafeZones(location: Point, elevationM: number) {
  return [{ id: 'zone-1', name: 'Higher-ground safe zone', latitude: location.latitude + 0.01, longitude: location.longitude + 0.01, elevationM: elevationM + 120 }];
}
export function buildEvacuationRoute(from: Point, to: Point | undefined) { return to ? { points: [from, to], guidance: 'Move uphill by the marked route; avoid streams and low-lying roads.' } : null; }
