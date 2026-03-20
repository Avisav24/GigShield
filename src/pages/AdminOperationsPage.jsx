import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import LanguageToggle from "../components/LanguageToggle";
import { useSiteLanguage } from "../utils/siteLanguage";
import { selectLabel } from "../utils/i18n";
import {
  getPayoutHistory,
  getFailureReasonLabel,
  savePayoutReceipt,
  transitionPayoutLifecycle,
} from "../utils/payoutReceipt";
import { getTrackedEvents } from "../utils/observability";
import { getOverrideLogs, appendOverrideLog } from "../utils/adminOps";
import { getTriggerAuditEvents } from "../utils/triggerEngine";

function AdminOperationsPage() {
  const { languageMode, setLanguageMode } = useSiteLanguage();
  const [history, setHistory] = useState(() => getPayoutHistory());
  const [overrideLogs, setOverrideLogs] = useState(() => getOverrideLogs());

  const flaggedQueue = useMemo(
    () => history.filter((item) => item.lifecycleStatus === "failed" || item.failureReasonCode),
    [history],
  );

  const trackedEvents = getTrackedEvents();
  const triggerAudit = getTriggerAuditEvents();

  const fraudAnalytics = useMemo(() => {
    const failed = history.filter((item) => item.lifecycleStatus === "failed");
    const settled = history.filter((item) => item.lifecycleStatus === "settled");
    const falsePositives = failed.filter((item) => item.retryCount > 0 && item.lifecycleTimeline?.some((x) => x.status === "settled"));

    const turnaroundValues = settled
      .map((item) => {
        const created = item.createdAt ? new Date(item.createdAt).getTime() : 0;
        const received = item.receivedAt ? new Date(item.receivedAt).getTime() : 0;
        if (!created || !received || received < created) {
          return null;
        }
        return Math.round((received - created) / 1000);
      })
      .filter((value) => typeof value === "number");

    const avgTurnaroundSec =
      turnaroundValues.length > 0
        ? Math.round(turnaroundValues.reduce((a, b) => a + b, 0) / turnaroundValues.length)
        : 0;

    const riskBuckets = history.reduce(
      (acc, item) => {
        const key = item.riskLevel || "Unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {},
    );

    return {
      failedCount: failed.length,
      settledCount: settled.length,
      falsePositiveRate: failed.length > 0 ? ((falsePositives.length / failed.length) * 100).toFixed(1) : "0.0",
      avgTurnaroundSec,
      riskBuckets,
    };
  }, [history]);

  const slaTracker = useMemo(() => {
    const verificationDurations = [];
    const settlementDurations = [];

    history.forEach((item) => {
      const timeline = Array.isArray(item.lifecycleTimeline) ? item.lifecycleTimeline : [];
      const pending = timeline.find((step) => step.status === "pending-verification");
      const verified = timeline.find((step) => step.status === "verified");
      const processing = timeline.find((step) => step.status === "processing");
      const settled = timeline.find((step) => step.status === "settled");

      if (pending && verified) {
        const sec = Math.round((new Date(verified.at).getTime() - new Date(pending.at).getTime()) / 1000);
        if (sec >= 0) {
          verificationDurations.push(sec);
        }
      }

      if (processing && settled) {
        const sec = Math.round((new Date(settled.at).getTime() - new Date(processing.at).getTime()) / 1000);
        if (sec >= 0) {
          settlementDurations.push(sec);
        }
      }
    });

    const avg = (values) =>
      values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;

    return {
      avgVerificationSec: avg(verificationDurations),
      avgSettlementSec: avg(settlementDurations),
    };
  }, [history]);

  const refresh = () => {
    setHistory(getPayoutHistory());
    setOverrideLogs(getOverrideLogs());
  };

  const applyOverride = (item, decision) => {
    const nextStatus = decision === "approve" ? "settled" : "failed";
    const next = transitionPayoutLifecycle(
      item,
      nextStatus,
      `Admin ${decision} override`,
      {
        manualOverride: {
          decision,
          at: new Date().toISOString(),
        },
        receivedAt: decision === "approve" ? new Date().toISOString() : item.receivedAt || "",
      },
    );

    savePayoutReceipt(next);
    appendOverrideLog({
      payoutId: item.payoutId,
      decision,
      reasonCode: item.failureReasonCode || "MANUAL_OVERRIDE",
      details: item.failureReason || item.reason || "",
    });
    refresh();
  };

  return (
    <main className="frame-shell min-h-screen py-6 sm:py-8">
      <section className="board animate-enter overflow-hidden">
        <div className="top-strip">Admin Operations | Fraud Analytics | SLA Tracker</div>

        <header className="border-b border-coal-200 px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="kicker">{selectLabel(languageMode, "Admin Console", "एडमिन कंसोल")}</p>
              <h1 className="hero-title mt-3 text-4xl leading-[0.9] sm:text-5xl">Ops Panel</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <LanguageToggle languageMode={languageMode} setLanguageMode={setLanguageMode} />
              <Link to="/dashboard" className="secondary-btn">Dashboard</Link>
            </div>
          </div>
        </header>

        <div className="grid gap-4 px-4 py-6 sm:px-6">
          <section className="board-soft p-4">
            <p className="kicker">Flagged claims queue</p>
            <div className="mt-3 space-y-2">
              {flaggedQueue.length === 0 ? <p className="text-xs text-coal-600">No flagged claims.</p> : null}
              {flaggedQueue.map((item) => (
                <div key={item.payoutId} className="rounded-lg border border-coal-200 bg-white px-3 py-2 text-xs">
                  <p className="font-semibold text-coal-900">{item.payoutId}</p>
                  <p className="text-coal-700">{item.failureReasonCode || "-"} | {item.failureReasonCode ? getFailureReasonLabel(item.failureReasonCode) : item.reason}</p>
                  <div className="mt-2 flex gap-2">
                    <button type="button" className="primary-btn" onClick={() => applyOverride(item, "approve")}>Approve</button>
                    <button type="button" className="secondary-btn" onClick={() => applyOverride(item, "reject")}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <article className="board-soft p-4 text-sm">
              <p className="kicker">Fraud analytics</p>
              <p className="mt-2">Failed: {fraudAnalytics.failedCount}</p>
              <p>Settled: {fraudAnalytics.settledCount}</p>
              <p>False positive rate: {fraudAnalytics.falsePositiveRate}%</p>
              <p>Approval turnaround: {fraudAnalytics.avgTurnaroundSec}s</p>
            </article>

            <article className="board-soft p-4 text-sm">
              <p className="kicker">Risk buckets</p>
              {Object.entries(fraudAnalytics.riskBuckets).map(([key, value]) => (
                <p key={key}>{key}: {value}</p>
              ))}
            </article>

            <article className="board-soft p-4 text-sm">
              <p className="kicker">SLA tracker</p>
              <p>Avg verification time: {slaTracker.avgVerificationSec}s</p>
              <p>Avg settlement time: {slaTracker.avgSettlementSec}s</p>
            </article>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <article className="board-soft p-4 text-xs">
              <p className="kicker">Manual override logs</p>
              <div className="mt-3 space-y-2">
                {overrideLogs.slice(0, 10).map((item) => (
                  <div key={item.id} className="rounded-lg border border-coal-200 bg-white px-3 py-2">
                    <p className="font-semibold">{item.payoutId} | {item.decision}</p>
                    <p>{item.reasonCode}</p>
                    <p>{new Date(item.at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="board-soft p-4 text-xs">
              <p className="kicker">Audit + observability</p>
              <p className="mt-2">Trigger audit events: {triggerAudit.length}</p>
              <p>Tracked app events: {trackedEvents.length}</p>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}

export default AdminOperationsPage;
