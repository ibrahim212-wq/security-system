// ─────────────────────────────────────────────
// History Page — /history
//
// Shows processed results from notifications
// Displays confirmed/rejected status for each item
// ─────────────────────────────────────────────

"use client";

import { History, Check, X } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

export default function HistoryPage() {
  const { processedResults } = useNotifications();

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
          {processedResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No processed results yet</p>
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
                        {result.timestamp}
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
