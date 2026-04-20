// ─────────────────────────────────────────────
// History Page — /history
//
// Shows processed results from notifications
// Displays confirmed/rejected status for each item
// Loads from Supabase for persistent storage
// ─────────────────────────────────────────────

"use client";

import { useState } from "react";
import { History, Check, X, RefreshCw } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

export default function HistoryPage() {
  const { processedResults, refreshProcessedResults } = useNotifications();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshProcessedResults();
    setRefreshing(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F3F3F6" }}>
      <div className="flex flex-col w-full min-h-screen bg-white shadow-2xl relative sm:max-w-md sm:mx-auto">

        {/* ── Blue top bar ── */}
        <header
          className="flex items-center justify-between px-4 py-3"
          style={{ background: "#1F49D8" }}
        >
          <History size={28} color="#fff" />
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={20} color="#fff" className={refreshing ? "animate-spin" : ""} />
          </button>
        </header>

        {/* ── Page title ── */}
        <div
          className="px-4 pt-2 pb-5 text-center"
          style={{ background: "#1F49D8" }}
        >
          <h1 className="text-white text-[26px] font-extrabold tracking-wide">
            History
          </h1>
          <p className="text-white/80 text-xs mt-1">
            {processedResults.length} {processedResults.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 bg-white px-4 pt-5 pb-28 flex flex-col gap-4">
          {processedResults.length === 0 ? (
            <div className="text-center py-12">
              <History size={32} color="#7A8BB0" className="mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No processed results yet</p>
              <p className="text-gray-400 text-xs mt-1">Confirmed and rejected results will appear here</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {processedResults.map((result) => (
                <div
                  key={result.id}
                  className="rounded-2xl px-4 py-4"
                  style={{
                    background: result.status === "confirmed" ? "#F0FDF4" : "#FEF2F2",
                    border: `2px solid ${result.status === "confirmed" ? "#22C55E" : "#E8334A"}`
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#1F49D8" }}
                    >
                      {result.status === "confirmed" ? (
                        <Check size={16} color="#fff" />
                      ) : (
                        <X size={16} color="#fff" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[13px] font-bold text-[#1A1A1A] truncate">
                          {result.person_name}
                        </p>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: result.status === "confirmed" ? "#22C55E" : "#E8334A",
                            color: "#fff"
                          }}
                        >
                          {result.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A8BB0]">ID: {result.person_id}</p>
                      <p className="text-[11px] text-[#7A8BB0]">Case: {result.legal_case}</p>
                      <p className="text-[11px] text-[#7A8BB0]">Score: {result.score.toFixed(2)}</p>
                      <p className="text-[11px] text-[#7A8BB0]">Node: {result.node_id}</p>
                      <p className="text-[10px] text-[#7A8BB0] mt-1">
                        {new Date(result.timestamp).toLocaleString()}
                      </p>
                      <p className="text-[9px] text-[#7A8BB0] mt-0.5">
                        Processed: {new Date(result.processedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
