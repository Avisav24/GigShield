import Card from "./Card";
import { formatCurrency } from "../utils/format";

/*
 * Demo control panel that mimics external trigger ingestion (weather, AQI, outage signals).
 * Clicking a trigger calls the parent callback to apply payout logic and refresh dashboard values.
 */
function TriggerSimulationPanel({
  triggerEvents,
  selectedPlanId,
  selectedPlanName,
  latestTrigger,
  latestPayout,
  onSimulateTrigger,
}) {
  return (
    <Card
      title="Trigger Simulation"
      subtitle={`Trigger payouts for the ${selectedPlanName} plan`}
      className="lg:col-span-2"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {triggerEvents.map((event) => (
          <button
            key={event.id}
            type="button"
            onClick={() => onSimulateTrigger(event.id)}
            className="group board-soft px-4 py-3 text-left text-sm font-semibold text-coal-900 transition hover:-translate-y-0.5 hover:bg-coal-900 hover:text-white"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-electric-500 transition group-hover:bg-signal-500" />
              {event.buttonLabel}
            </span>
          </button>
        ))}
      </div>

      {latestTrigger ? (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-signal-600 bg-signal-50 p-4 text-sm text-coal-900"
        >
          <p className="font-bold tracking-wide">Trigger Activated</p>
          <p className="mt-1">
            {latestTrigger.label} payout applied for {selectedPlanName}:{" "}
            {formatCurrency(latestPayout)}
          </p>
          <p className="mt-1 text-xs text-coal-700">
            Event reference: {latestTrigger.id} | Plan: {selectedPlanId}
          </p>
        </div>
      ) : null}
    </Card>
  );
}

export default TriggerSimulationPanel;
