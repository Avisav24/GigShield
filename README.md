# GigShield

GigShield is an AI-enabled parametric income protection platform for India's platform-based delivery workers. It is designed for riders working with Zomato, Swiggy, Zepto, Blinkit, Amazon-style last-mile operations, and similar gig networks whose earnings are disrupted by external events they cannot control.

This product does not cover health, life, personal accidents, or vehicle repair. It only protects against loss of delivery income caused by verified external disruptions.

## Problem Statement

Delivery workers are paid on output and availability. When rain, heatwaves, dangerous AQI, curfews, app outages, or other external disruptions reduce safe working hours or stop order flow, riders lose income immediately.

Traditional insurance is not a good fit for this problem because:

- It is claim-heavy and document-heavy.
- It is usually not aligned with the worker's weekly earning cycle.
- It requires proving loss after the disruption instead of responding automatically to known external events.

GigShield uses a parametric model instead:

- detect a verified disruption
- check the worker's active weekly policy
- validate risk and fraud controls
- trigger instant income support automatically

## Delivery Persona

Primary persona:

- Name: Ramesh
- Age: 26
- City: Delhi NCR
- Work style: full-time or peak-hour delivery rider
- Platforms: Swiggy + Zomato or similar multi-app stack
- Weekly earnings: `₹6,000-₹15,000`
- Financial reality: depends on weekly cash-out, has little buffer for 1-2 days of lost work

Secondary personas:

- Peak-hours rider in Mumbai who works lunch and dinner rush only
- Weekend-heavy rider in Bengaluru who depends on surge demand
- High-exposure rider in Delhi where AQI and weather volatility are frequent

## Persona-Based Scenarios

### Scenario 1: Heavy Rain

- Ramesh starts a shift in Gurugram.
- Rainfall crosses the city safety threshold from the weather feed.
- Order density drops and roads become unsafe.
- GigShield detects the trigger, verifies his weekly policy, checks daily cap and fraud controls, and starts payout without manual paperwork.

### Scenario 2: AQI Spike

- A Delhi rider is scheduled for evening shifts.
- AQI crosses the hazardous threshold.
- Safe outdoor work hours drop sharply.
- GigShield uses the AQI trigger to release income support for the covered disruption window.

### Scenario 3: Platform Outage

- A rider is available and online but the partner platform is degraded.
- Order flow stops due to verified platform downtime.
- GigShield classifies this as parametric loss of income and automatically initiates payout.

### Scenario 4: Fraud Attempt

- A suspicious user repeatedly triggers payouts from outside the expected operating zone.
- GigShield applies velocity checks, geolocation consistency, duplicate-claim prevention, and selfie verification before releasing funds.
- Suspicious payouts are blocked or routed for moderation.

## End-to-End Workflow

### 1. Onboarding

Worker enters:

- identity details
- city
- work pattern
- weekly earnings band
- platform
- rider ID
- optional vehicle type
- rider proof screenshot
- preferred disruption triggers

The onboarding flow then:

- builds a rider persona risk profile
- recommends a plan
- previews weekly price
- activates the worker's protection profile

Relevant implementation:

- [StepProfile.jsx](./src/components/verification/StepProfile.jsx)
- [StepPlatform.jsx](./src/components/verification/StepPlatform.jsx)
- [StepRiderProof.jsx](./src/components/verification/StepRiderProof.jsx)
- [StepCoverage.jsx](./src/components/verification/StepCoverage.jsx)
- [onboardingProfile.js](./src/utils/onboardingProfile.js)

### 2. Weekly Policy Creation

Worker selects a weekly plan:

- Basic
- Standard
- Pro

Each plan defines:

- weekly premium
- coverage hours
- payout amount by trigger
- daily payout cap

Relevant implementation:

- [planDetails.json](./src/data/planDetails.json)
- [pricing.js](./src/utils/pricing.js)
- [PricingPage.jsx](./src/pages/PricingPage.jsx)

### 3. Risk Assessment

GigShield estimates rider disruption risk based on:

- city risk
- work pattern
- weekly earnings dependency
- platform dependency
- selected disruption triggers
- fraud/risk posture

This risk influences:

- weekly premium
- recommended plan
- predictive early-support logic
- verification friction

Relevant implementation:

- [onboardingProfile.js](./src/utils/onboardingProfile.js)
- [fraud.js](./src/utils/fraud.js)
- [predictiveSafetyNet.js](./src/utils/predictiveSafetyNet.js)

### 4. Parametric Trigger Monitoring

GigShield monitors external conditions using live, mock, or simulated integrations:

- weather APIs
- AQI-style environmental conditions
- traffic signals
- platform status signals
- local disruption events

When a trigger fires, the engine checks:

- whether the trigger is covered by the selected plan
- whether the worker is inside coverage hours
- whether the daily cap still has room
- whether the domain is allowed under policy rules

Relevant implementation:

- [triggerEngine.js](./src/utils/triggerEngine.js)
- [integrations.js](./src/utils/integrations.js)
- [policy.js](./src/utils/policy.js)
- [payout.js](./src/utils/payout.js)

### 5. Claims and Payout Automation

GigShield uses a zero-touch claims model:

- disruption detected
- payout initiated automatically
- fraud and verification checks applied
- payout receipt created
- status moves through lifecycle states

Lifecycle states demonstrated:

- pending-verification
- verified
- processing
- settled
- failed

Relevant implementation:

- [payoutReceipt.js](./src/utils/payoutReceipt.js)
- [PayoutPage.jsx](./src/pages/PayoutPage.jsx)
- [PayoutReceivedPage.jsx](./src/pages/PayoutReceivedPage.jsx)
- [PayoutHistoryPage.jsx](./src/pages/PayoutHistoryPage.jsx)

### 6. Fraud Detection and Moderation

GigShield includes intelligent fraud protection specifically shaped for delivery use cases:

- anomaly detection on behavior and payout attempts
- location validation against expected city zone
- activity validation through rider persona and session behavior
- duplicate-claim prevention using cooldown and dedup rules
- velocity limits for repeated payout attempts
- selfie/liveness verification for high-risk sessions
- admin moderation queue for flagged payouts

Relevant implementation:

- [payoutSecurity.js](./src/utils/payoutSecurity.js)
- [triggerEngine.js](./src/utils/triggerEngine.js)
- [SelfieVerificationPanel.jsx](./src/components/SelfieVerificationPanel.jsx)
- [FraudGuardPage.jsx](./src/pages/FraudGuardPage.jsx)
- [AdminOperationsPage.jsx](./src/pages/AdminOperationsPage.jsx)

### 7. Analytics and Trust Views

Worker-side analytics:

- earnings protected this week
- weekly support left
- trigger status
- payout history
- predictive risk radar

Admin-side analytics:

- failed vs settled payouts
- false positive rate
- risk bucket distribution
- anomaly alerts
- moderation queue
- trust metrics and payout success rate

Relevant implementation:

- [DashboardPage.jsx](./src/pages/DashboardPage.jsx)
- [TrustCenterPage.jsx](./src/pages/TrustCenterPage.jsx)
- [AdminOperationsPage.jsx](./src/pages/AdminOperationsPage.jsx)
- [phase3Analytics.js](./src/utils/phase3Analytics.js)

## Weekly Premium Model

GigShield is intentionally designed around weekly pricing because delivery workers usually think in weekly earning and withdrawal cycles, not monthly insurance cycles.

### Base Weekly Plans

- Basic: `₹79/week`
- Standard: `₹129/week`
- Pro: `₹179/week`

Defined in:

- [planDetails.json](./src/data/planDetails.json)

### Dynamic Weekly Premium Calculation

The live premium is adjusted using:

- selected plan base premium
- number of linked platforms
- risk multiplier

Current pricing logic:

```txt
adjusted weekly premium =
  (base weekly premium + extra platform fee) x risk multiplier
```

Current risk multipliers:

- Low: `1.00`
- Medium: `1.10`
- High: `1.25`

Current extra platform load:

- `₹12` per additional linked platform

Implemented in:

- [pricing.js](./src/utils/pricing.js)

### Why Weekly Pricing Works

- aligns with rider payout rhythm
- reduces upfront purchase friction
- makes protection easy to renew or pause
- fits micro-insurance behavior better than monthly billing

## Parametric Triggers

GigShield uses external-event triggers rather than manual loss documentation.

Current trigger categories:

- Heavy rain
- Heatwave
- AQI spike
- Platform outage
- Curfew or lockdown
- Local strike
- Zone closure

Current sources:

- weather API or fallback feeds
- mock traffic adapter
- simulated platform outage adapter
- local trigger simulation data

Implemented in:

- [triggerEvents.json](./src/data/triggerEvents.json)
- [integrations.js](./src/utils/integrations.js)
- [TriggerPage.jsx](./src/pages/TriggerPage.jsx)

### Policy Boundary

Covered:

- income loss caused by verified environmental, platform, or social disruptions

Not covered:

- health
- life
- accidents
- vehicle repair

Enforced in:

- [policy.js](./src/utils/policy.js)

## Why We Chose Web

GigShield is currently built as a web platform instead of a mobile-first native app.

Reasoning:

- fastest to prototype and iterate during hackathon phases
- easier for judges to access instantly using a shared URL
- supports both worker and admin workflows in the same product surface
- works well for responsive onboarding, dashboard, and admin operations
- can later evolve into PWA or wrapper-based mobile deployment

Why this is appropriate for this challenge:

- the user journey is form-heavy and dashboard-heavy
- admin and insurer views are also required
- a web product lowers the barrier for demo, testing, and collaboration

## AI / ML Strategy

GigShield uses AI/ML-inspired decisioning across pricing, risk forecasting, and fraud prevention.

### 1. Dynamic Pricing

The current system adjusts weekly premium using rider risk and platform count. The next ML step is to tune weekly premium using hyper-local disruption likelihood such as:

- flood-prone zones
- chronic AQI hotspots
- frequent platform instability
- time-of-day exposure patterns

Example:

- a historically low-risk zone can receive a lower weekly premium
- a high-volatility zone can receive more protection hours or different pricing

### 2. Predictive Risk Modeling

The predictive safety net estimates disruption probability using weighted factors:

- weather
- outage risk
- traffic
- regional risk
- historical trends

This supports:

- early support readiness
- predictive payout planning
- next-week insurer forecasting

Implemented in:

- [predictiveSafetyNet.js](./src/utils/predictiveSafetyNet.js)
- [PredictiveHistoryPage.jsx](./src/pages/PredictiveHistoryPage.jsx)

### 3. Intelligent Fraud Detection

Fraud controls include:

- high/medium/low risk session classification
- duplicate trigger protection
- payout attempt velocity limits
- geolocation consistency
- liveness and selfie verification
- moderation queue and anomaly analytics

This is especially relevant for delivery-specific fraud such as:

- GPS spoofing
- repeated payout attempts
- trigger farming
- fake disruption claims not matching city conditions

### 4. Recommended Future ML Enhancements

- zone-level disruption risk model trained on historical weather and rider shift data
- anomaly model on payout frequency by rider, city, and trigger type
- reputation model for lower-friction approvals to trusted riders
- insurer-side forecasting of weekly loss ratios by city and trigger cluster

## Tech Stack

Frontend:

- React 19
- Vite
- React Router
- Tailwind CSS
- GSAP
- Lenis

Backend:

- Express 5
- CORS
- dotenv

Data and persistence:

- Supabase
- localStorage fallback

AI / verification / simulation:

- MediaPipe Tasks Vision for selfie verification assets
- mock traffic and platform integrations
- weather integration with fallback behavior

Testing:

- Vitest
- Testing Library

## Current Product Surfaces

Public routes:

- `/`
- `/product`
- `/pricing`
- `/triggers`
- `/fraud-guard`
- `/get-protected`
- `/signin`
- `/signup`
- `/auth`
- `/auth/callback`

Protected worker/admin routes:

- `/dashboard`
- `/payout`
- `/payout-received`
- `/payout-history`
- `/predictive-history`
- `/community-heatmap`
- `/team-protection`
- `/trust-center`
- `/admin-ops`

## Development Plan By Phase

### Phase 1: Ideate & Know Your Delivery Worker

Scope:

- define persona
- define problem workflow
- define weekly premium logic
- define parametric triggers
- justify product platform choice
- document AI/ML direction
- produce a minimal prototype and strategy video

Phase 1 output in this repo:

- idea document in this README
- public-facing product pages
- onboarding concept
- pricing and trigger explanation

### Phase 2: Protect Your Worker

Scope:

- registration process
- insurance policy management
- dynamic premium calculation
- claims management

Current repo coverage for Phase 2:

- registration and sign-in flow
- onboarding and protection activation flow
- weekly policy selection
- dynamic weekly premium calculation
- trigger-based payout lifecycle

### Phase 3: Perfect for Your Worker

Scope:

- advanced fraud detection
- instant payout simulation
- worker dashboard
- insurer/admin dashboard

Current repo coverage for Phase 3:

- fraud and moderation surfaces
- payout lifecycle and settlement simulation
- worker analytics dashboard
- admin ops and trust metrics
- predictive analytics and moderation queue

## Deliverable Mapping

### Must-Have Features

- AI-powered risk assessment: implemented through persona profiling, predictive risk scoring, and dynamic weekly pricing
- Dynamic premium calculation: implemented on a weekly basis in pricing and onboarding flows
- Predictive risk modeling: implemented through predictive safety net logic and dashboard radar
- Intelligent fraud detection: implemented with anomaly checks, location validation, verification gates, and moderation
- Parametric automation: implemented via trigger monitoring, automatic claim initiation, and payout lifecycle simulation
- Integration capabilities: supported through weather API fallback, mock traffic, simulated platform APIs, and payout simulation

### Expected Deliverables

- optimized onboarding: yes
- risk profiling using AI/ML logic: yes
- weekly policy creation: yes
- loss-of-income parametric claim triggering: yes
- payout processing: simulated
- analytics dashboard: yes

## Video Submission Notes

Add your public demo links here before submission:

- Phase 1 strategy video: `ADD_PUBLIC_VIDEO_LINK`
- Phase 2 demo video: `ADD_PUBLIC_VIDEO_LINK`
- Phase 3 demo video: `ADD_PUBLIC_VIDEO_LINK`

Suggested 2-minute Phase 1 video structure:

1. Problem and rider persona
2. Why weekly parametric protection
3. Product workflow
4. AI/ML strategy
5. Prototype walkthrough

## Local Setup

Install:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Run backend API:

```bash
npm run start:api
```

Useful scripts:

```bash
npm run build
npm run lint
npm run test
```

## Environment Variables

Frontend:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ENABLE_BACKEND_PERSISTENCE=true
VITE_ADMIN_EMAILS=admin1@example.com,admin2@example.com
VITE_STRICT_TOKEN_ENFORCEMENT=false
```

Backend:

```bash
PORT=3001
WEATHER_API_KEY=...
GROQ_API_KEY=...
```

## Current Limitations

- payout rails are simulated, not production payment settlement
- platform integrations are mocked or simulated
- AQI feed is represented through trigger logic rather than a full external live integration
- ML models are rule-based or heuristic today and not yet trained production models
- the repository still has some unrelated existing test/build issues outside the README and submission-story work

## Submission Summary

GigShield is a web-based parametric income protection platform for gig delivery workers. It uses weekly pricing, AI-assisted risk assessment, automated disruption triggers, fraud controls, and instant payout simulation to protect workers against external income loss events. The product is intentionally focused on delivery income continuity and explicitly excludes health, life, accident, and vehicle repair coverage.
