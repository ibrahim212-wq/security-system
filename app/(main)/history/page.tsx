// ─────────────────────────────────────────────
// History Page — /history
//
// Shows a chronological log of all security events.
// Events are grouped by date. In production these would
// be fetched from the `events` table in Supabase.
// ─────────────────────────────────────────────

import StatusBadge from "@/components/StatusBadge";
import { History, Camera, DoorOpen, Activity, Bell } from "lucide-react";

// Map event types to icons
const iconMap = {
  motion: Activity,
  door:   DoorOpen,
  camera: Camera,
  alert:  Bell,
};

// Placeholder data — replace with Supabase query
const eventGroups = [
  {
    date: "Today — Mar 31, 2026",
    events: [
      { id: "1", type: "motion" as const, description: "Motion detected at front door", location: "Front Door", time: "18:02", severity: "high" as const },
      { id: "2", type: "camera" as const, description: "Camera 2 reconnected",          location: "Backyard",   time: "17:48", severity: "low" as const },
      { id: "3", type: "door"   as const, description: "Side gate opened",               location: "Side Gate",  time: "16:30", severity: "medium" as const },
    ],
  },
  {
    date: "Yesterday — Mar 30, 2026",
    events: [
      { id: "4", type: "alert"  as const, description: "Tamper alert on sensor #3", location: "Living Room", time: "22:15", severity: "high" as const },
      { id: "5", type: "motion" as const, description: "Motion in garage",          location: "Garage",      time: "08:44", severity: "medium" as const },
      { id: "6", type: "door"   as const, description: "Front door locked",         location: "Front Door",  time: "07:10", severity: "low" as const },
    ],
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F3F3F6" }}>
      <div className="flex flex-col max-w-sm mx-auto w-full min-h-screen bg-white shadow-2xl">

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
          {eventGroups.map((group) => (
            <div key={group.date}>
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1"
                style={{ color: "#7A8BB0" }}
              >
                {group.date}
              </p>
              <div className="flex flex-col gap-2">
                {group.events.map((event) => {
                  const Icon = iconMap[event.type];
                  return (
                    <div
                      key={event.id}
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{ background: "#ECECF1" }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "#1F49D8" }}
                      >
                        <Icon size={16} color="#fff" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-[#1A1A1A] truncate">
                          {event.description}
                        </p>
                        <p className="text-[11px] text-[#7A8BB0] mt-0.5">{event.location}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <StatusBadge severity={event.severity} />
                        <span className="text-[11px] text-[#7A8BB0]">{event.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
