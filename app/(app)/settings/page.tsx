// ─────────────────────────────────────────────
// Settings Page — /settings
//
// Placeholder settings screen matching the app theme.
// Blue header, white body, grouped setting rows.
// ─────────────────────────────────────────────

import Image from "next/image";
import { Bell, Lock, User, LogOut, ChevronRight, Shield } from "lucide-react";
import DashboardBottomNav from "@/components/DashboardBottomNav";

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: User,   label: "Edit Profile",        description: "Update your name and photo" },
      { icon: Lock,   label: "Change Password",     description: "Update your login credentials" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { icon: Bell,   label: "Alert Notifications", description: "Motion, door and camera alerts" },
      { icon: Shield, label: "Security Alerts",     description: "High-priority threat notifications" },
    ],
  },
  {
    title: "Session",
    items: [
      { icon: LogOut, label: "Sign Out",            description: "Log out of this device" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F3F3F6" }}>
      <div className="flex flex-col max-w-sm mx-auto w-full min-h-screen bg-white shadow-2xl">

        {/* ── Blue top bar ── */}
        <header
          className="flex items-center justify-center px-4 py-3"
          style={{ background: "#1F49D8" }}
        >
          <Image
            src="/logo.png"
            alt="Security System Logo"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </header>

        {/* ── Page title ── */}
        <div
          className="px-4 pt-2 pb-5 text-center"
          style={{ background: "#1F49D8" }}
        >
          <h1 className="text-white text-[26px] font-extrabold tracking-wide">
            Settings
          </h1>
        </div>

        {/* ── Settings body ── */}
        <div className="flex-1 bg-white px-4 pt-5 pb-28 flex flex-col gap-5">
          {settingsSections.map(({ title, items }) => (
            <div key={title}>
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1"
                style={{ color: "#7A8BB0" }}
              >
                {title}
              </p>
              <div className="flex flex-col gap-2">
                {items.map(({ icon: Icon, label, description }) => (
                  <button
                    key={label}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 w-full text-left active:opacity-70 transition-opacity"
                    style={{ background: "#ECECF1" }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "#1F49D8" }}
                    >
                      <Icon size={18} color="#fff" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#1A1A1A]">{label}</p>
                      <p className="text-[11px] text-[#7A8BB0] mt-0.5">{description}</p>
                    </div>
                    <ChevronRight size={16} color="#7A8BB0" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <DashboardBottomNav />
      </div>
    </div>
  );
}
