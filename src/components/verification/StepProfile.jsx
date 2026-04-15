import { useState } from "react";
import { validateAge, validateCity, validateFullName } from "../../utils/validation";

const workPatterns = [
  { id: "full_time", label: "Full-time rider", desc: "Daily shifts across the week" },
  { id: "peak_hours", label: "Peak-hours rider", desc: "Lunch and dinner rush focus" },
  { id: "flexible", label: "Flexible rider", desc: "Mixed hours based on demand" },
  { id: "weekends", label: "Weekend-heavy rider", desc: "Mostly high-demand weekends" },
];

const weeklyEarningsBands = [
  { id: "under_6000", label: "Under ₹6,000 / week" },
  { id: "6000_10000", label: "₹6,000 - ₹10,000 / week" },
  { id: "10000_15000", label: "₹10,000 - ₹15,000 / week" },
  { id: "above_15000", label: "₹15,000+ / week" },
];

export default function StepProfile({ formData, updateField, onNext }) {
  const [touched, setTouched] = useState({ fullName: false, city: false, age: false });

  const valid = {
    fullName: validateFullName(formData.fullName),
    city: validateCity(formData.city),
    age: validateAge(formData.age),
  };
  const canProceed = valid.fullName && valid.city && valid.age;

  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="kicker mb-1">Step 1 of 4</p>
        <h2 className="hero-title text-3xl sm:text-4xl leading-tight">Tell us about your delivery routine</h2>
        <p className="mt-2 text-coal-500 text-sm">We use this to personalise your weekly disruption risk profile</p>
      </div>

      <div className="board-soft p-5 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-coal-700 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => { updateField("fullName", e.target.value); touch("fullName"); }}
            onBlur={() => touch("fullName")}
            placeholder="Your full name"
            className={`w-full rounded-xl border px-4 py-2.5 text-sm text-coal-900 outline-none transition focus:ring-2 focus:ring-electric-500 ${
              touched.fullName && !valid.fullName ? "border-red-400 bg-red-50" : "border-coal-300 bg-white"
            }`}
          />
          {touched.fullName && !valid.fullName && (
            <p className="text-red-500 text-xs mt-1">Please enter your full name</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-coal-700 mb-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => { updateField("city", e.target.value); touch("city"); }}
              onBlur={() => touch("city")}
              placeholder="Mumbai"
              className={`w-full rounded-xl border px-4 py-2.5 text-sm text-coal-900 outline-none transition focus:ring-2 focus:ring-electric-500 ${
                touched.city && !valid.city ? "border-red-400 bg-red-50" : "border-coal-300 bg-white"
              }`}
            />
            {touched.city && !valid.city && (
              <p className="text-red-500 text-xs mt-1">Required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-coal-700 mb-1">Age</label>
            <input
              type="number"
              inputMode="numeric"
              value={formData.age}
              onChange={(e) => { updateField("age", e.target.value); touch("age"); }}
              onBlur={() => touch("age")}
              placeholder="25"
              min={18}
              max={65}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm text-coal-900 outline-none transition focus:ring-2 focus:ring-electric-500 ${
                touched.age && !valid.age ? "border-red-400 bg-red-50" : "border-coal-300 bg-white"
              }`}
            />
            {touched.age && !valid.age && (
              <p className="text-red-500 text-xs mt-1">Must be 18–65</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-coal-700 mb-2">Work Pattern</label>
          <div className="grid gap-2 sm:grid-cols-2">
            {workPatterns.map((pattern) => {
              const selected = formData.workPattern === pattern.id;
              return (
                <button
                  key={pattern.id}
                  type="button"
                  onClick={() => updateField("workPattern", pattern.id)}
                  className={`rounded-2xl border p-3 text-left transition ${
                    selected
                      ? "border-coal-900 bg-coal-900 text-white"
                      : "border-coal-200 bg-white text-coal-800 hover:border-coal-400"
                  }`}
                >
                  <p className="text-sm font-semibold">{pattern.label}</p>
                  <p className={`mt-1 text-xs ${selected ? "text-white/75" : "text-coal-500"}`}>{pattern.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-coal-700 mb-2">Typical Weekly Earnings</label>
          <div className="grid gap-2 sm:grid-cols-2">
            {weeklyEarningsBands.map((band) => {
              const selected = formData.weeklyEarningsBand === band.id;
              return (
                <button
                  key={band.id}
                  type="button"
                  onClick={() => updateField("weeklyEarningsBand", band.id)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    selected
                      ? "border-electric-500 bg-electric-50 text-electric-700"
                      : "border-coal-200 bg-white text-coal-700 hover:border-coal-400"
                  }`}
                >
                  {band.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={!canProceed}
        onClick={onNext}
        className="primary-btn w-full py-3 text-base disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  );
}
