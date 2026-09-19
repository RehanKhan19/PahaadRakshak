# HillFlood AI

Flood-risk monitoring and evacuation guidance for hilly regions. This repository is organized as a small monorepo with an Express backend and a React dashboard.

## Structure

```text
hillflood-ai/
├── backend/      # API, external-data adapters, risk engine
├── frontend/     # React + Tailwind + Leaflet dashboard
├── shared/       # Contracts shared between frontend and backend
└── docs/         # Architecture, dataset notes, demo checklist
```

## Quick start

1. In `backend`, copy `.env.example` to `.env`, then run `npm install` and `npm run dev`.
2. In `frontend`, run `npm install` and `npm run dev`.
3. Open the Vite URL shown in the terminal. The frontend expects the API at `http://localhost:5000` by default.

The Hugging Face adapter starts in a safe fallback mode until `HF_TOKEN` and `HF_MODEL_ID` are supplied.
