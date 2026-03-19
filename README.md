# GigShield Frontend

GigShield is an AI-powered parametric income insurance demo for food delivery workers.

This frontend is built for hackathon Phase 1 with a minimal but production-structured setup:

- React functional components
- Tailwind CSS
- Route-based pages
- Local state with useState only
- Mock data only (no backend/auth)

## Run Locally

1. Install dependencies:

   npm install

2. Start development server:

   npm start

3. Build production bundle:

   npm run build

## Demo Flow

1. Open landing page and click Get Protected.
2. On dashboard, simulate triggers (rain, heatwave, AQI, outage).
3. Observe Trigger Activated alert and payout updates.
4. Switch fraud persona between normal and suspicious.
5. High risk state shows Verification Required.

## Project Structure

src/

- components/ Dashboard UI modules
- pages/ Landing and dashboard routes
- data/ Mock JSON datasets
- utils/ Payout, fraud, formatting helpers
