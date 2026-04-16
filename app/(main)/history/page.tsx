// ─────────────────────────────────────────────
// History Page — /history
//
// Shows a chronological log of all security events.
// Events are grouped by date. In production these would
// be fetched from the `events` table in Supabase.
// ─────────────────────────────────────────────

import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F3F3F6" }}>
      <div className="flex flex-col w-full min-h-screen bg-white shadow-2xl relative sm:max-w-md sm:mx-auto">

        {/* ── Blue top bar ── */}
        <header
          className="flex items-center justify-center px-4 py-3"
          style={{ background: "#1F49D8" }}
        >
          <History size={28} color="#fff" />
        </header>

        {/* ── Page title ── */}
        <div
          className="px-4 pt-2 pb-5 text-center"
          style={{ background: "#1F49D8" }}
        >
          <h1 className="text-white text-[26px] font-extrabold tracking-wide">
            History
          </h1>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 bg-white px-4 pt-5 pb-28 flex flex-col gap-4">
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No data available</p>
          </div>
        </div>

      </div>
    </div>
  );
}
