import Card from "./Card";
import { formatTime } from "../utils/format";

/*
 * Represents worker-side operational telemetry used by GigShield signals.
 * The panel is static mock data but keeps the demo tied to rider activity context.
 */
function ActivityPanel({ activity, lastActiveTime }) {
  const movementClasses =
    activity.movementStatus === "Active"
      ? "bg-moss-100 text-moss-600"
      : "bg-coal-100 text-coal-700";

  return (
    <Card
      title="Activity Panel"
      subtitle="Mock rider operations data for demo context"
    >
      <dl className="space-y-3 text-sm">
        <div className="board-soft flex items-center justify-between px-4 py-3">
          <dt className="text-coal-500">Orders completed today</dt>
          <dd className="font-bold text-coal-900">
            {activity.ordersCompletedToday}
          </dd>
        </div>

        <div className="board-soft flex items-center justify-between px-4 py-3">
          <dt className="text-coal-500">Last active time</dt>
          <dd className="font-bold text-coal-900">
            {formatTime(lastActiveTime)}
          </dd>
        </div>

        <div className="board-soft flex items-center justify-between px-4 py-3">
          <dt className="text-coal-500">Movement status</dt>
          <dd>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${movementClasses}`}
            >
              {activity.movementStatus}
            </span>
          </dd>
        </div>
      </dl>
    </Card>
  );
}

export default ActivityPanel;
