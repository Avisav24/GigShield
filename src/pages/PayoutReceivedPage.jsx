import { Link } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { useSiteLanguage } from "../utils/siteLanguage";
import { selectLabel } from "../utils/i18n";
import { formatCurrency } from "../utils/format";
import {
  downloadReceiptJson,
  downloadReceiptPdf,
  getPayoutReceipt,
} from "../utils/payoutReceipt";

function PayoutReceivedPage() {
  const { languageMode, setLanguageMode } = useSiteLanguage();
  const receipt = getPayoutReceipt();

  return (
    <main className="frame-shell min-h-screen py-6 sm:py-8">
      <section className="board animate-enter overflow-hidden">
        <div className="top-strip">
          {selectLabel(
            languageMode,
            "Payout completed and ready for your records.",
            "भुगतान पूरा हुआ और आपके रिकॉर्ड के लिए तैयार है।",
          )}
        </div>

        <header className="border-b border-coal-200 px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="kicker">{selectLabel(languageMode, "Payout", "भुगतान")}</p>
              <h1 className="hero-title mt-3 text-4xl leading-[0.9] sm:text-5xl">
                {selectLabel(languageMode, "Payout received", "भुगतान प्राप्त")}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-coal-500 sm:text-base">
                {selectLabel(
                  languageMode,
                  "Your latest payout has been marked as received.",
                  "आपका नवीनतम भुगतान प्राप्त के रूप में दर्ज हो गया है।",
                )}
              </p>
            </div>

            <LanguageToggle languageMode={languageMode} setLanguageMode={setLanguageMode} />
          </div>
        </header>

        <div className="grid gap-4 px-4 py-6 sm:px-6">
          {!receipt || !receipt.receivedAt ? (
            <section className="board-soft p-4 sm:p-5">
              <p className="kicker">{selectLabel(languageMode, "No received payout", "कोई प्राप्त भुगतान नहीं")}</p>
              <p className="mt-2 text-sm text-coal-600">
                {selectLabel(
                  languageMode,
                  "Receive a payout first from the payout page.",
                  "पहले भुगतान पेज से राशि प्राप्त करें।",
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link to="/payout" className="primary-btn">
                  {selectLabel(languageMode, "Go to payout", "भुगतान पेज खोलें")}
                </Link>
              </div>
            </section>
          ) : (
            <section className="rounded-xl border border-moss-300 bg-moss-50 p-4 text-coal-900 sm:p-5">
              <p className="kicker">{selectLabel(languageMode, "Receipt confirmation", "रसीद पुष्टि")}</p>
              <p className="mt-2 text-3xl font-bold">{formatCurrency(receipt.payoutAmount ?? 0)}</p>
              <p className="mt-2 text-sm text-coal-700">{receipt.reason}</p>

              <div className="mt-4 rounded-lg border border-coal-200 bg-white/70 px-3 py-2 text-xs text-coal-700">
                <p>
                  <span className="font-semibold">{selectLabel(languageMode, "Trigger", "ट्रिगर")}</span>: {" "}
                  {receipt.triggerLabel || receipt.triggerId}
                </p>
                <p>
                  <span className="font-semibold">{selectLabel(languageMode, "Plan", "योजना")}</span>: {" "}
                  {receipt.planName || receipt.planId}
                </p>
                <p>
                  <span className="font-semibold">{selectLabel(languageMode, "Received at", "प्राप्त समय")}</span>: {" "}
                  {new Date(receipt.receivedAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">{selectLabel(languageMode, "Payout ID", "भुगतान आईडी")}</span>: {" "}
                  {receipt.payoutId || "-"}
                </p>
                <p>
                  <span className="font-semibold">{selectLabel(languageMode, "Created at", "बनाया गया")}</span>: {" "}
                  {receipt.createdAt ? new Date(receipt.createdAt).toLocaleString() : "-"}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/dashboard" className="primary-btn">
                  {selectLabel(languageMode, "Back to dashboard", "डैशबोर्ड पर वापस")}
                </Link>
                <Link to="/payout" className="secondary-btn">
                  {selectLabel(languageMode, "View payout page", "भुगतान पेज देखें")}
                </Link>
                <Link to="/payout/history" className="secondary-btn">
                  {selectLabel(languageMode, "View payout history", "भुगतान इतिहास देखें")}
                </Link>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => downloadReceiptJson(receipt)}
                >
                  {selectLabel(languageMode, "Download JSON", "JSON डाउनलोड करें")}
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    downloadReceiptPdf(receipt);
                  }}
                >
                  {selectLabel(languageMode, "Download PDF", "PDF डाउनलोड करें")}
                </button>
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

export default PayoutReceivedPage;
