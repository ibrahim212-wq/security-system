// ─────────────────────────────────────────────
// Dashboard Page — /dashboard
//
// Mobile-first security dashboard matching the reference UI.
// Royal blue gradient background, stat cards with glow borders,
// recent events list with severity badges, fixed bottom nav.
// ─────────────────────────────────────────────

import {
  ShieldCheck,
  Camera,
  Bell,
  Thermometer,
  DoorOpen,
  AlertTriangle,
  Activity,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

// ── Severity badge colors matching reference exactly ──
const severityStyles = {
  high:   { bg: "bg-[#D96B8B]/20", border: "border-[#D96B8B]/40", text: "text-[#F08AAA]", dot: "bg-[#F08AAA]" },
  medium: { bg: "bg-[#D8B84B]/20", border: "border-[#D8B84B]/40", text: "text-[#F2D766]", dot: "bg-[#F2D766]" },
  low:    { bg: "bg-[#3BAE73]/20", border: "border-[#3BAE73]/40", text: "text-[#7EE39D]", dot: "bg-[#7EE39D]" },
};

// ── Stat card data ──
const stats = [
  { label: "Cameras",    value: "4 / 4", icon: Camera,      iconBg: "bg-blue-500/20",   iconColor: "text-blue-300" },
  { label: "Alerts",     value: "1",     icon: Bell,        iconBg: "bg-[#D96B8B]/20",  iconColor: "text-[#F08AAA]" },
  { label: "Sensors",    value: "12",    icon: Thermometer, iconBg: "bg-[#3BAE73]/20",  iconColor: "text-[#7EE39D]" },
  { label: "Open Doors", value: "0",     icon: DoorOpen,    iconBg: "bg-[#D8B84B]/20",  iconColor: "text-[#F2D766]" },
];

// ── Recent event data ──
const recentEvents = [
  {
    id: "1",
    icon: Activity,
    description: "Motion detected at front door",
    location: "Front Door",
    timestamp: "2 min ago",
    severity: "high" as const,
  },
  {
    id: "2",
    icon: Camera,
    description: "Camera 2 came online",
    location: "Backyard",
    timestamp: "15 min ago",
    severity: "low" as const,
  },
  {
    id: "3",
    icon: DoorOpen,
    description: "Side gate opened",
    location: "Side Gate",
    timestamp: "1 hr ago",
    severity: "medium" as const,
  },
];

export default function DashboardPage() {
  return (
    // ── Full page: deep royal blue gradient, mobile-first ──
    <div
      className="min-h-screen pb-24"
      style={{ background: "linear-gradient(180deg, #182B6B 0%, #1B3080 18%, #1F56C2 55%, #245ACB 100%)" }}
    >
      {/* ── Centered phone-width content column ── */}
      <div className="max-w-sm mx-auto px-4 pt-10">

        {/* ── TOP HEADER ── */}
        <div className="flex items-start justify-between mb-7">
          <div>
            <h1 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">
              Dashboard
            </h1>
            <p className="text-[#A9BCEB] text-sm mt-0.5 font-normal">
              Welcome back, Ibrahim
            </p>
          </div>

          {/* Armed badge — green pill */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 mt-1"
            style={{ background: "rgba(59,174,115,0.18)", border: "1px solid rgba(126,227,157,0.35)" }}
          >
            <ShieldCheck size={13} className="text-[#7EE39D]" />
            <span className="text-[#7EE39D] text-xs font-bold tracking-wide">Armed</span>
          </div>
        </div>

        {/* ── STATS GRID — 2 columns ── */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
            <div
              key={label}
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{
                background: "rgba(39,70,163,0.55)",
                border: "1px solid rgba(46,99,232,0.55)",
                boxShadow: "0 0 16px rgba(46,99,232,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Icon bubble */}
              <div className={`${iconBg} rounded-xl p-2.5 shrink-0`}>
                <Icon size={20} className={iconColor} />
              </div>

              {/* Value + label */}
              <div>
                <p className="text-[#F5F7FF] text-xl font-extrabold leading-none">{value}</p>
                <p className="text-[#A9BCEB] text-[11px] mt-1 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── RECENT EVENTS CONTAINER ── */}
        <div
          className="rounded-3xl p-4"
          style={{
            background: "rgba(39,70,163,0.45)",
            border: "1px solid rgba(46,99,232,0.5)",
            boxShadow: "0 0 24px rgba(46,99,232,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Section title */}
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={15} className="text-[#F2D766]" />
            <h2 className="text-[#F5F7FF] text-sm font-bold tracking-wide uppercase">
              Recent Events
            </h2>
          </div>

          {/* Event rows */}
          <ul className="flex flex-col gap-2.5">
            {recentEvents.map((event) => {
              const s = severityStyles[event.severity];
              const Icon = event.icon;
              return (
                <li
                  key={event.id}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3"
                  style={{
                    background: "rgba(27,48,128,0.6)",
                    border: "1px solid rgba(46,99,232,0.35)",
                  }}
                >
                  {/* Type icon bubble */}
                  <div className="bg-blue-500/20 rounded-xl p-2 shrink-0">
                    <Icon size={16} className="text-blue-300" />
                  </div>

                  {/* Description + location */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F5F7FF] text-[13px] font-semibold leading-snug truncate">
                      {event.description}
                    </p>
                    <p className="text-[#A9BCEB] text-[11px] mt-0.5">{event.location}</p>
                  </div>

                  {/* Right side: badge + time */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {/* Severity badge */}
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border ${s.bg} ${s.border} ${s.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {event.severity}
                    </span>
                    <span className="text-[#A9BCEB] text-[10px]">{event.timestamp}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      {/* ── Bottom navigation ── */}
      <BottomNav />
    </div>
  );
}
