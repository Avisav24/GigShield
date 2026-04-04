import Card from "./Card";
import { selectLabel } from "../utils/i18n";
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
  languageMode,
}) {
  const activeProfile = fraudProfiles[activePersonaKey];
  const riskLevel = getRiskLevelFromScore(activeProfile.score);
  const showVerification = requiresVerification(riskLevel);

  return (
    <Card
      icon="risk"
      languageMode={languageMode}
      title={
        selectLabel(languageMode, "Trust Check", "ट्रस्ट जांच")
      }
      subtitle={
        selectLabel(
          languageMode,
          "Keeps support safe for real workers",
          "यह असली वर्कर्स के लिए सहायता को सुरक्षित रखता है",
        )
      }
    >
      <div className="space-y-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
            {selectLabel(languageMode, "Demo: Choose Worker Profile", "डेमो: वर्कर प्रोफ़ाइल चुनें")}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(fraudProfiles).map(([personaKey]) => {
              const isSelected = personaKey === activePersonaKey;
              return (
                <button
                  key={personaKey}
                  type="button"
                  onClick={() => onPersonaChange(personaKey)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-gray-900 bg-gray-900 text-white shadow-lg"
                      : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                  }`}
                >
                  <p className="text-xs font-black uppercase tracking-widest">
                    {personaKey === "normal"
                      ? selectLabel(languageMode, "Verified Worker", "सत्यापित वर्कर")
                      : selectLabel(languageMode, "Needs Extra Check", "अतिरिक्त जांच आवश्यक")}
                  </p>
                  <p className={`mt-1 text-[10px] font-bold opacity-70 ${isSelected ? "text-white" : "text-gray-500"}`}>
                    {personaKey === "normal" ? selectLabel(languageMode, "Fast payout path", "तेज़ भुगतान मार्ग") : selectLabel(languageMode, "Verification needed", "सत्यापन आवश्यक")}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {selectLabel(languageMode, "Trust Score", "ट्रस्ट स्कोर")}
            </p>
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-tighter ring-1 ${getRiskBadgeClasses(riskLevel)}`}
            >
              {riskLevel}
            </span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-5xl font-black text-gray-900 tracking-tighter">
              {activeProfile.score}<span className="text-xl text-gray-300 ml-1">/100</span>
            </span>
          </div>

          {showVerification ? (
            <div className="rounded-2xl bg-red-50 border border-red-100 p-4 animate-enter flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 animate-pulse" />
              <p className="text-xs font-bold text-red-700 leading-relaxed">
                {selectLabel(languageMode, "Selfie check needed before payment. This protects genuine workers.", "भुगतान से पहले सेल्फी जांच जरूरी है। यह असली वर्कर्स की सुरक्षा करता है।")}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-green-50 border border-green-100 p-4 animate-enter flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5" />
              <p className="text-xs font-bold text-green-700 leading-relaxed">
                {selectLabel(languageMode, "Profile verified. Payment can be sent instantly.", "प्रोफ़ाइल सत्यापित। भुगतान तुरंत भेजा जा सकता है।")}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default FraudDetectionIndicator;
