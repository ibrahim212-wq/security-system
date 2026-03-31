// ─────────────────────────────────────────────
// History Page — /history
//
// Shows a chronological log of all security events.
// Events are grouped by date. In production these would
// be fetched from the `events` table in Supabase.
// ─────────────────────────────────────────────

import PageShell from "@/components/PageShell";
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
    <PageShell>
      <div className="p-4 md:p-8 max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <History size={22} className="text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Event History</h1>
            <p className="text-brand-300 text-sm">All logged security events</p>
          </div>
        </div>

        {/* ── Event groups ── */}
        <div className="flex flex-col gap-6">
          {eventGroups.map((group) => (
            <div key={group.date}>
              {/* Date header */}
              <h2 className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2 px-1">
                {group.date}
              </h2>

              {/* Events list */}
              <ul className="flex flex-col gap-2">
                {group.events.map((event) => {
                  const Icon = iconMap[event.type];
                  return (
                    <li
                      key={event.id}
                      className="flex items-center gap-3 bg-brand-900/60 backdrop-blur-md border border-brand-700/50 rounded-2xl p-3"
                    >
                      {/* Type icon */}
                      <div className="bg-brand-800 rounded-xl p-2 shrink-0">
                        <Icon size={18} className="text-blue-400" />
                      </div>

                      {/* Event info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {event.description}
                        </p>
                        <p className="text-brand-400 text-xs">{event.location}</p>
                      </div>

                      {/* Right side: badge + time */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <StatusBadge severity={event.severity} />
                        <span className="text-brand-500 text-xs">{event.time}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
