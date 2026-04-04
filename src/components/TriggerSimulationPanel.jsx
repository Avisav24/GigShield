import Card from "./Card";
import { formatCurrency } from "../utils/format";
import { selectLabel } from "../utils/i18n";
import { Link } from "react-router-dom";

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
  latestPayoutMeta,
  paidTodayAmount,
  dailyPayoutCap,
  onSimulateTrigger,
  languageMode,
}) {
  const statusStyles = {
    paid: "border-moss-300 bg-moss-50 text-coal-900",
    capped: "border-signal-600 bg-signal-50 text-coal-900",
    "blocked-cap": "border-red-300 bg-red-50 text-red-800",
    "blocked-coverage": "border-red-300 bg-red-50 text-red-800",
    "blocked-verification": "border-red-300 bg-red-50 text-red-800",
    "blocked-policy": "border-red-300 bg-red-50 text-red-800",
    "blocked-cooldown": "border-red-300 bg-red-50 text-red-800",
    "blocked-dedup": "border-red-300 bg-red-50 text-red-800",
    "invalid-trigger": "border-red-300 bg-red-50 text-red-800",
  };

  const hindiEventLabelById = {
    "heavy-rain": "भारी बारिश इमरजेंसी",
    heatwave: "भारी गर्मी इमरजेंसी",
    "aqi-spike": "खराब हवा इमरजेंसी",
    "platform-outage": "ऐप बंद इमरजेंसी",
  };

  const englishEventLabelById = {
    "heavy-rain": "Heavy Rain Emergency",
    heatwave: "Extreme Heat Emergency",
    "aqi-spike": "Bad Air Emergency",
    "platform-outage": "App Outage Emergency",
  };

  const statusLabelByCode = {
    paid: { en: "Support approved", hi: "सहायता स्वीकृत" },
    capped: { en: "Partial support approved", hi: "आंशिक सहायता स्वीकृत" },
    "blocked-cap": { en: "Daily limit reached", hi: "दैनिक सीमा पूरी" },
    "blocked-coverage": { en: "Outside protection hours", hi: "सुरक्षा समय के बाहर" },
    "blocked-verification": { en: "Verification needed", hi: "सत्यापन आवश्यक" },
    "blocked-policy": { en: "Not included in your plan", hi: "आपकी योजना में शामिल नहीं" },
    "blocked-cooldown": { en: "Please wait and retry", hi: "कृपया इंतजार करें" },
    "blocked-dedup": { en: "Already checked recently", hi: "अभी हाल में जांचा गया" },
    "invalid-trigger": { en: "Invalid emergency input", hi: "अमान्य इमरजेंसी इनपुट" },
  };

  const getLocalizedEventLabel = (event) =>
    selectLabel(
      languageMode,
      englishEventLabelById[event.id] ?? event.label,
      hindiEventLabelById[event.id] ?? event.label,
    );

  const getLocalizedStatusLabel = (statusCode) => {
    const fallback = { en: "Under review", hi: "जांच जारी" };
    const statusMeta = statusLabelByCode[statusCode] ?? fallback;
    return selectLabel(languageMode, statusMeta.en, statusMeta.hi);
  };

  return (
    <Card
      icon="trigger"
      languageMode={languageMode}
      title={
        selectLabel(languageMode, "Check Emergency Support", "इमरजेंसी सहायता जांचें")
      }
      subtitle={
        selectLabel(
          languageMode,
          "Tap a situation to see if support money starts",
          "सहायता भुगतान शुरू होगा या नहीं, यह देखने के लिए स्थिति चुनें",
        )
      }
      className="lg:col-span-2"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {triggerEvents.map((event) => (
          <button
            key={event.id}
            type="button"
            onClick={() => onSimulateTrigger(event.id)}
            className="group relative overflow-hidden rounded-2xl bg-white/60 p-5 text-left border border-white/60 hover:bg-white transition-all shadow-sm active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-widest text-gray-900">
                {getLocalizedEventLabel(event)}
              </span>
              <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-red-500 transition-colors" />
            </div>
            <p className="mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              {selectLabel(languageMode, "Tap to Check", "जांचने के लिए टैप करें")}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          {selectLabel(languageMode, "Today Support Used", "आज उपयोग हुई सहायता")}
        </p>
        <p className="text-sm font-black text-gray-900">
          {formatCurrency(paidTodayAmount)} <span className="text-gray-300">/</span> {formatCurrency(dailyPayoutCap)}
        </p>
      </div>

      {latestTrigger && (
        <div
          role="alert"
          className={`mt-6 rounded-2xl border p-6 animate-enter ${
            statusStyles[latestPayoutMeta.status] || "border-gray-200 bg-white text-gray-900"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
              {selectLabel(languageMode, "Status", "स्थिति")}: {getLocalizedStatusLabel(latestPayoutMeta.status)}
            </span>
            {latestPayoutMeta.triggerConfidenceScore && (
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-black/5">
                {latestPayoutMeta.triggerConfidenceScore}% {selectLabel(languageMode, "Match", "मैच")}
              </span>
            )}
          </div>

          <h4 className="text-lg font-black tracking-tight mb-1">
            {latestPayoutMeta.status === "paid" || latestPayoutMeta.status === "capped"
              ? selectLabel(languageMode, "Support Approved", "सहायता स्वीकृत")
              : selectLabel(languageMode, "Support Not Started", "सहायता शुरू नहीं हुई")}
          </h4>
          
          <p className="text-sm font-medium opacity-90 leading-relaxed">
            {latestPayoutMeta.status === "paid" && selectLabel(languageMode, `${getLocalizedEventLabel(latestTrigger)} confirmed. ${formatCurrency(latestPayout)} support will be sent automatically.`, `${hindiEventLabelById[latestTrigger.id]} सत्यापित। ${formatCurrency(latestPayout)} की सहायता राशि स्वतः भेजी जाएगी।`)}
            {latestPayoutMeta.status === "capped" && selectLabel(languageMode, `${formatCurrency(latestPayout)} support approved. Daily limit reached.`, `${formatCurrency(latestPayout)} सहायता स्वीकृत। दैनिक सीमा पूरी।`)}
            {(latestPayoutMeta.status === "blocked-cap" || latestPayoutMeta.status.startsWith("blocked")) && latestPayoutMeta.reason}
          </p>

          {(latestPayoutMeta.status === "paid" || latestPayoutMeta.status === "capped") && (
            <div className="mt-6">
              <Link to="/payout" className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-900 px-8 text-xs font-black uppercase tracking-widest text-white hover:bg-gray-800 transition-colors">
                {selectLabel(languageMode, "Go to Payment", "भुगतान पेज खोलें")}
              </Link>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default TriggerSimulationPanel;
