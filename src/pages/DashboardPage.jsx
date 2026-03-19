import { Link } from "react-router-dom";
import { useState } from "react";
import ActivityPanel from "../components/ActivityPanel";
import EarningsSnapshot from "../components/EarningsSnapshot";
import FraudDetectionIndicator from "../components/FraudDetectionIndicator";
import PlanSummary from "../components/PlanSummary";
import TriggerSimulationPanel from "../components/TriggerSimulationPanel";
import activityData from "../data/activityData.json";
import fraudScores from "../data/fraudScores.json";
import planDetails from "../data/planDetails.json";
import triggerEvents from "../data/triggerEvents.json";
import userProfile from "../data/userProfile.json";
import { formatCurrency } from "../utils/format";
import { applyTriggerToEarnings, getPayoutForTrigger } from "../utils/payout";

/*
 * Main demo console for the worker journey.
 * Local state tracks the selected plan, payouts, trigger history, and fraud persona simulation.
 */
function DashboardPage() {
  const selectedPlan =
    planDetails.find((plan) => plan.id === userProfile.selectedPlanId) ??
    planDetails[0];

  const [coverageActive] = useState(userProfile.coverageActive);
  const [earningsProtectedThisWeek, setEarningsProtectedThisWeek] = useState(
    userProfile.earningsProtectedThisWeek,
  );
  const [lastPayoutAmount, setLastPayoutAmount] = useState(
    userProfile.lastPayoutAmount,
  );
  const [latestTriggerId, setLatestTriggerId] = useState("");
  const [activePersonaKey, setActivePersonaKey] = useState("normal");
  const [lastActiveTime, setLastActiveTime] = useState(
    activityData.lastActiveTime,
  );

  const latestTrigger =
    triggerEvents.find((event) => event.id === latestTriggerId) ?? null;

  const handleSimulateTrigger = (triggerId) => {
    const payoutAmount = getPayoutForTrigger(
      triggerEvents,
      triggerId,
      selectedPlan.id,
    );
    setLastPayoutAmount(payoutAmount);
    setEarningsProtectedThisWeek((currentAmount) =>
      applyTriggerToEarnings(currentAmount, payoutAmount),
    );
    setLatestTriggerId(triggerId);
    setLastActiveTime(new Date().toISOString());
  };

  return (
    <main className="frame-shell min-h-screen py-6 sm:py-8">
      <header className="board animate-enter mb-5 overflow-hidden">
        <div className="top-strip">
          Demo mode active: use trigger simulation buttons to watch payouts
          update instantly.
        </div>

        <div className="border-b border-coal-200 px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="kicker">Worker Dashboard</p>
              <h1 className="hero-title mt-3 text-4xl leading-[0.9] sm:text-5xl">
                Hi {userProfile.name}.
              </h1>
              <p className="mt-3 text-sm text-coal-500">
                Platforms: {userProfile.platforms.join(", ")} | City:{" "}
                {userProfile.city}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  coverageActive
                    ? "bg-moss-100 text-moss-600"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {coverageActive ? "Coverage Active" : "Coverage Paused"}
              </span>
              <Link to="/" className="secondary-btn">
                Back to Landing
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <article className="board-soft p-3">
              <p className="kicker">Current Plan</p>
              <p className="mt-1 text-lg font-semibold text-coal-900">
                {selectedPlan.name}
              </p>
            </article>
            <article className="board-soft p-3">
              <p className="kicker">Weekly Premium</p>
              <p className="mt-1 text-lg font-semibold text-coal-900">
                {formatCurrency(selectedPlan.weeklyPremium)}
              </p>
            </article>
            <article className="board-soft p-3">
              <p className="kicker">Coverage Hours</p>
              <p className="mt-1 text-lg font-semibold text-coal-900">
                {selectedPlan.coverageHours}
              </p>
            </article>
          </div>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <PlanSummary
          selectedPlan={selectedPlan}
          coverageActive={coverageActive}
        />
        <EarningsSnapshot
          earningsProtectedThisWeek={earningsProtectedThisWeek}
          lastPayoutAmount={lastPayoutAmount}
        />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <TriggerSimulationPanel
          triggerEvents={triggerEvents}
          selectedPlanId={selectedPlan.id}
          selectedPlanName={selectedPlan.name}
          latestTrigger={latestTrigger}
          latestPayout={lastPayoutAmount}
          onSimulateTrigger={handleSimulateTrigger}
        />
        <FraudDetectionIndicator
          fraudProfiles={fraudScores}
          activePersonaKey={activePersonaKey}
          onPersonaChange={setActivePersonaKey}
        />
        <ActivityPanel
          activity={activityData}
          lastActiveTime={lastActiveTime}
        />
      </section>
    </main>
  );
}

export default DashboardPage;
