import { Router } from 'express';
export const alertsRouter = Router();
alertsRouter.get('/', (_request, response) => response.json({ alerts: [{ id: 'demo-1', severity: 'warning', message: 'Monitor rainfall and follow official local guidance.', createdAt: new Date().toISOString() }] }));
