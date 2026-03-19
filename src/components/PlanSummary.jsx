import Card from "./Card";
import { formatCurrency } from "../utils/format";

/*
 * Displays the worker's active insurance plan and current coverage state.
 * This mirrors the live contract state shown in the GigShield dashboard.
 */
function PlanSummary({ selectedPlan, coverageActive }) {
  const statusClasses = coverageActive
    ? "bg-moss-100 text-moss-600"
    : "bg-red-100 text-red-700";

  return (
    <Card
      title="Worker Coverage"
      subtitle="Your current insurance plan and runtime coverage status"
    >
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="board-soft p-4">
          <dt className="text-coal-500">Current plan</dt>
          <dd className="mt-1 text-base font-semibold text-coal-900">
            {selectedPlan.name}
          </dd>
        </div>
        <div className="board-soft p-4">
          <dt className="text-coal-500">Weekly premium</dt>
          <dd className="mt-1 text-base font-semibold text-coal-900">
            {formatCurrency(selectedPlan.weeklyPremium)}
          </dd>
        </div>
        <div className="board-soft p-4">
          <dt className="text-coal-500">Coverage hours</dt>
          <dd className="mt-1 text-base font-semibold text-coal-900">
            {selectedPlan.coverageHours}
          </dd>
        </div>
        <div className="board-soft p-4">
          <dt className="text-coal-500">Coverage status</dt>
          <dd className="mt-1">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses}`}
            >
              {coverageActive ? "Coverage Active" : "Coverage Paused"}
            </span>
          </dd>
        </div>
      </dl>
    </Card>
  );
}

export default PlanSummary;
