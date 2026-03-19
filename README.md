# 🛡️ GigShield

AI-powered parametric income insurance for food delivery workers. Protect your earnings against unexpected events with instant payouts triggered by real-world conditions.

**[🚀 Live Demo](https://gigshield-demo.vercel.app)** | **[📖 Repository](https://github.com/Avisav24/GigShield)**

---

## 📸 Screenshots

### Landing Page
![GigShield Landing Page](./docs/screenshots/landing-page.png)
*Hero page introducing GigShield's coverage promise with product features and call-to-action buttons.*

### Dashboard – Coverage Overview
![Dashboard Coverage](./docs/screenshots/dashboard-coverage.png)
*Real-time earnings protection and plan details at a glance.*

### Dashboard – Trigger Simulation
![Trigger Simulation](./docs/screenshots/trigger-simulation.png)
*Simulate weather and platform events to see instant payout calculations.*

### Dashboard – Fraud Detection
![Fraud Detection](./docs/screenshots/fraud-detection.png)
*Risk scoring and verification requirements for worker protection.*

---

## ✨ Features

- **Parametric Insurance**: Instant payouts triggered by external events (weather, platform outages)
- **Real-time Earnings Protection**: Track protected earnings and see payouts calculated instantly
- **Plan Variants**: Choose from Basic, Standard, or Pro plans with flexible coverage hours
- **Fraud Detection**: AI-powered risk scoring with verification workflows
- **Activity Tracking**: Monitor orders completed, active status, and last engagement time
- **Responsive Design**: Clean, modern UI optimized for desktop and mobile
- **Mock Data**: Fully functional demo with pre-populated worker profiles and event scenarios

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Styling**: Tailwind CSS 3.4.17 with custom design system
- **Routing**: react-router-dom 7.13.1
- **Deployment**: Vercel (SPA configured)
- **Package Manager**: npm 10+

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Avisav24/GigShield.git
cd GigShield

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card.jsx         # Card wrapper with board styling
│   ├── PlanSummary.jsx  # Plan details and coverage status
│   ├── EarningsSnapshot.jsx
│   ├── TriggerSimulationPanel.jsx
│   ├── FraudDetectionIndicator.jsx
│   └── ActivityPanel.jsx
├── pages/               # Page components
│   ├── LandingPage.jsx  # Public landing/intro page
│   └── DashboardPage.jsx # Main worker dashboard
├── data/                # Mock data (JSON)
│   ├── userProfile.json
│   ├── planDetails.json
│   ├── triggerEvents.json
│   ├── fraudScores.json
│   └── activityData.json
├── utils/               # Helper functions
│   ├── format.js        # Currency and time formatting
│   ├── payout.js        # Payout calculations
│   └── fraud.js         # Risk scoring logic
├── App.jsx              # Root component with routing
├── main.jsx             # App entry point
└── index.css            # Global styles and Tailwind imports
```

---

## 🎮 Demo Flow

1. **Landing Page**: Explore GigShield's features and value proposition
2. **Dashboard**: View your active plan and earnings protection
3. **Trigger Events**: Simulate weather or platform events to see instant payouts
4. **Risk Assessment**: Toggle fraud detection persona (normal/suspicious) to see risk scoring
5. **Activity Log**: Monitor your delivery activity and engagement status

### Example Triggers
- **Heavy Rain**: ₹150-500 depending on plan
- **Heatwave**: ₹200-600 depending on plan
- **Air Quality Index Spike**: ₹150-500 depending on plan
- **Platform Outage**: ₹300-1000 depending on plan

---

## 🎨 Design System

Custom color palette:
- **Coal** (#1a1a1a): Primary dark color
- **Electric** (#00d9ff): Accent/highlight color
- **Signal** (#ff6b35): Warning/alert color
- **Moss** (#2d614a): Success/positive color

Typography:
- **Display**: Archivo (bold, statements)
- **Body**: Space Grotesk (readable, clean)

---

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## 📝 License

This project is part of GigShield's demo and educational materials.

---

## 📧 Contact

For questions or feedback about GigShield, please open an issue in this repository.

---

**Built with ❤️ for food delivery workers**