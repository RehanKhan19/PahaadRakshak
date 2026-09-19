import { Router } from 'express';
import { z } from 'zod';
import { buildRiskAssessment } from '../services/riskEngine.js';
import { getTerrain } from '../services/terrainService.js';
import { getWeather } from '../services/weatherService.js';
import { predictFloodProbability } from '../services/modelService.js';
import { findSafeZones, buildEvacuationRoute } from '../services/evacuationService.js';

export const riskRouter = Router();
const querySchema = z.object({ latitude: z.coerce.number().min(-90).max(90), longitude: z.coerce.number().min(-180).max(180), simulation: z.enum(['normal', 'heavy-rain', 'flash-flood']).optional() });

riskRouter.get('/', async (request, response, next) => {
  try {
    const input = querySchema.parse(request.query);
    const [weather, terrain] = await Promise.all([getWeather(input), getTerrain(input)]);
    const modelProbability = await predictFloodProbability({ weather, terrain });
    const assessment = buildRiskAssessment({ ...input, weather, terrain, modelProbability });
    const safeZones = findSafeZones(input, terrain.elevationM);
    response.json({ ...assessment, safeZones, evacuationRoute: buildEvacuationRoute(input, safeZones[0]) });
  } catch (error) { next(error); }
});
