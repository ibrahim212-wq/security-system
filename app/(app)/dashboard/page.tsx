// ─────────────────────────────────────────────
// Dashboard Page — /dashboard
//
// Main home screen after login. Shows a summary of the security
// system status: armed/disarmed state, active camera count,
// and the most recent events.
// ─────────────────────────────────────────────

import PageShell from "@/components/PageShell";
import StatusBadge from "@/components/StatusBadge";
import {
  ShieldCheck,
  Camera,
  Bell,
  Thermometer,
  DoorOpen,
  AlertTriangle,
} from "lucide-react";

// Placeholder recent events — replace with real Supabase data later
const recentEvents = [
  {
    id: "1",
    type: "motion" as const,
    description: "Motion detected at front door",
    location: "Front Door",
    timestamp: "2 min ago",
    severity: "high" as const,
  },
  {
    id: "2",
    type: "camera" as const,
    description: "Camera 2 came online",
    location: "Backyard",
    timestamp: "15 min ago",
    severity: "low" as const,
  },
  {
    id: "3",
    type: "door" as const,
    description: "Side gate opened",
    location: "Side Gate",
    timestamp: "1 hr ago",
    severity: "medium" as const,
  },
];

// Quick-stat cards shown at the top of the dashboard
const stats = [
  { label: "Cameras",    value: "4 / 4",  icon: Camera,      color: "text-blue-400" },
  { label: "Alerts",     value: "1",       icon: Bell,        color: "text-red-400" },
  { label: "Sensors",    value: "12",      icon: Thermometer, color: "text-green-400" },
  { label: "Open Doors", value: "0",       icon: DoorOpen,    color: "text-yellow-400" },
];

export default function DashboardPage() {
  return (
    <PageShell>
      <div className="p-4 md:p-8 max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-brand-300 text-sm mt-0.5">Welcome back, Ibrahim</p>
          </div>
          {/* System armed indicator */}
          <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1.5">
            <ShieldCheck size={16} className="text-green-400" />
            <span className="text-green-300 text-xs font-semibold">Armed</span>
          </div>
        </div>

        {/* ── Quick stats grid ── */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-brand-900/60 backdrop-blur-md border border-brand-700/50 rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="bg-brand-800 rounded-xl p-2.5">
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className="text-white text-lg font-bold leading-tight">{value}</p>
                <p className="text-brand-400 text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Recent events ── */}
        <div className="bg-brand-900/60 backdrop-blur-md border border-brand-700/50 rounded-2xl p-4">
          <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-yellow-400" />
            Recent Events
          </h2>

          <ul className="flex flex-col gap-3">
            {recentEvents.map((event) => (
              <li
                key={event.id}
                className="flex items-start justify-between gap-3 bg-brand-800/50 rounded-xl p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {event.description}
                  </p>
                  <p className="text-brand-400 text-xs mt-0.5">{event.location}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <StatusBadge severity={event.severity} />
                  <span className="text-brand-500 text-xs">{event.timestamp}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
