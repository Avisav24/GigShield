import Card from "./Card";
import {
  getRiskBadgeClasses,
  getRiskLevelFromScore,
  requiresVerification,
} from "../utils/fraud";

/*
 * Simulates fraud scoring from user behavior profiles.
 * The high-risk state exposes a verification gate to represent payout protection controls.
 */
function FraudDetectionIndicator({
  fraudProfiles,
  activePersonaKey,
  onPersonaChange,
}) {
  const activeProfile = fraudProfiles[activePersonaKey];
  const riskLevel = getRiskLevelFromScore(activeProfile.score);
  const showVerification = requiresVerification(riskLevel);

  return (
    <Card
      title="Fraud Detection Indicator"
      subtitle="Switch persona to simulate low and high risk behavior"
    >
      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        {Object.entries(fraudProfiles).map(([personaKey, profile]) => {
          const isSelected = personaKey === activePersonaKey;
          return (
            <button
              key={personaKey}
              type="button"
              onClick={() => onPersonaChange(personaKey)}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                isSelected
                  ? "border-coal-900 bg-coal-900 text-white"
                  : "border-coal-200 bg-coal-50 text-coal-600 hover:bg-coal-100"
              }`}
            >
              {profile.personaLabel}
            </button>
          );
        })}
      </div>

      <div className="board-soft p-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-coal-500">Risk score</p>
          <span className="text-3xl font-bold text-coal-900">
            {activeProfile.score}/100
          </span>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${getRiskBadgeClasses(riskLevel)}`}
          >
            {riskLevel}
          </span>
        </div>

        {showVerification ? (
          <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            Verification Required
          </p>
        ) : (
          <p className="mt-3 text-sm text-coal-500">
            Behavior pattern looks normal. Auto payouts are allowed.
          </p>
        )}
      </div>
    </Card>
  );
}

export default FraudDetectionIndicator;
