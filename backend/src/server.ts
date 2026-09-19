import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { alertsRouter } from './routes/alerts.js';
import { riskRouter } from './routes/risk.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json());
app.get('/api/health', (_request, response) => response.json({ status: 'ok', service: 'hillflood-api' }));
app.use('/api/risk', riskRouter);
app.use('/api/alerts', alertsRouter);

app.listen(Number(process.env.PORT ?? 5000), () => console.log('HillFlood API listening on port 5000'));
