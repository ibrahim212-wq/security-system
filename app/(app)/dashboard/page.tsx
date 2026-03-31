// ─────────────────────────────────────────────
// Dashboard Page — /dashboard
//
// Real interactive security alert dashboard:
// - Mock data object (swap with Supabase later)
// - Live state: menu, notifications, alert actions
// - Clickable buttons with feedback states
// - Dynamic data variables — no hardcoded content
// ─────────────────────────────────────────────

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Bell,
  MapPin,
  X,
  Check,
  User,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import DashboardBottomNav from "@/components/DashboardBottomNav";

// ─────────────────────────────────────────────
// MOCK DATA — replace with Supabase fetch later
//
// To connect real data:
//   1. Create a Supabase table `security_alerts`
//   2. Replace this object with:
//      const { data } = await supabase.from('security_alerts').select('*').single()
//   3. Pass result into <DashboardPage> via props or useEffect + useState
// ─────────────────────────────────────────────
const mockAlertData = {
  securityName: "Security Name",
  alertTitle: "Criminal detected",
  location: "Mall Masr , Gate 3",
  personName: "Ibrahim Al-Amin",
  idNumber: "1020xxxxxxxxxx",
  age: "24",
  similarity: "91 %",
  detectionTime: "10:45 PM",
  detectionDate: "2026/04/01",
  legalCase: "Trespassing",
  notificationCount: 1,
};

// ─────────────────────────────────────────────
// Sub-component: single info row card
// ─────────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: "#ECECF1" }}>
      <p className="text-[13px] text-[#1A1A1A]">
        <span className="font-bold">{label} : </span>
        <span className="font-normal text-[#3A3A3A]">{value}</span>
      </p>
    </div>
  );
}

export default function DashboardPage() {
  // ── UI state ──
  const [menuOpen, setMenuOpen]       = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);
  const [alertAction, setAlertAction] = useState<"none" | "approved" | "rejected">("none");

  // ── Data (swap `mockAlertData` with real fetch result here) ──
  const alert = mockAlertData;

  // ── Build detail rows from data object ──
  const detailRows = [
    { label: "Name",              value: alert.personName },
    { label: "ID Number",         value: alert.idNumber },
    { label: "Age",               value: alert.age },
    { label: "Similarity",        value: alert.similarity },
    { label: "Time of detection", value: alert.detectionTime },
    { label: "Date",              value: alert.detectionDate },
    { label: "Legal case",        value: alert.legalCase },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F3F3F6" }}>
      <div className="flex flex-col max-w-sm mx-auto w-full min-h-screen bg-white shadow-2xl">

        {/* ══════════════════════════════════════
            BLUE TOP APP BAR
        ══════════════════════════════════════ */}
        <header
          className="flex items-center justify-between px-4 py-3"
          style={{ background: "#1F49D8" }}
        >
          {/* Menu button — opens slide-down nav panel */}
          <button
            aria-label="Open menu"
            onClick={() => { setMenuOpen((v) => !v); setNotifOpen(false); }}
            className="p-1 rounded-lg transition-colors active:bg-white/10"
          >
            <Menu size={24} color="#fff" />
          </button>

          {/* Centered logo */}
          <Image
            src="/logo.png"
            alt="Security System Logo"
            width={80}
            height={80}
            className="object-contain"
            priority
          />

          {/* Notification button — opens alert preview panel */}
          <button
            aria-label={`Notifications — ${alert.notificationCount} unread`}
            onClick={() => { setNotifOpen((v) => !v); setMenuOpen(false); }}
            className="relative p-1 rounded-lg transition-colors active:bg-white/10"
          >
            <Bell size={22} color="#fff" />
            {alert.notificationCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: "#E8334A" }}
              >
                {alert.notificationCount}
              </span>
            )}
          </button>
        </header>

        {/* ── Slide-down menu panel ── */}
        {menuOpen && (
          <nav
            className="flex flex-col px-4 pb-2 pt-1"
            style={{ background: "#1A3EC4" }}
            aria-label="Main menu"
          >
            {[
              { label: "Home",     href: "/dashboard" },
              { label: "History",  href: "/history" },
              { label: "Settings", href: "/settings" },
              { label: "Profile",  href: "/profile" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between text-white/90 text-sm py-2.5 border-b border-white/10 last:border-0 hover:text-white transition-colors"
              >
                {label}
                <ChevronRight size={14} className="opacity-50" />
              </Link>
            ))}
          </nav>
        )}

        {/* ── Notification preview panel ── */}
        {notifOpen && (
          <div className="bg-white border-b border-gray-100 px-4 py-3 shadow-md">
            <p className="text-[11px] font-semibold text-[#7A8BB0] uppercase tracking-wide mb-2">Recent Alert</p>
            <div className="flex items-start gap-3 rounded-xl p-3" style={{ background: "#ECECF1" }}>
              <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{alert.alertTitle}</p>
                <p className="text-[11px] text-[#7A8BB0] mt-0.5">{alert.location} · {alert.detectionTime}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Page title — blue bg continues ── */}
        <div
          className="px-4 pt-2 pb-5 text-center"
          style={{ background: "#1F49D8" }}
        >
          <h1 className="text-white text-[26px] font-extrabold tracking-wide">
            Security System
          </h1>
        </div>

        {/* ══════════════════════════════════════
            WHITE CONTENT BODY
        ══════════════════════════════════════ */}
        <div className="flex-1 bg-white px-4 pt-5 pb-28 flex flex-col gap-4">

          {/* "Security Name" blue pill bar */}
          <div
            className="flex items-center justify-between rounded-full px-4 py-2"
            style={{ background: "#1F49D8" }}
          >
            <span className="text-white text-sm font-semibold tracking-wide">
              {alert.securityName}
            </span>
            {/* Filter bars icon */}
            <div className="flex items-end gap-[3px]">
              {[10, 15, 10].map((h, i) => (
                <span
                  key={i}
                  className="block w-[3px] rounded-full bg-white"
                  style={{ height: h }}
                />
              ))}
            </div>
          </div>

          {/* ── Content: active alert or post-action feedback ── */}
          {alertAction === "none" ? (
            <>
              {/* Alert title row */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-[#1A1A1A] text-base font-bold">{alert.alertTitle}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ background: "#FDEEF2", color: "#E8334A" }}
                >
                  ♥
                </span>
              </div>

              {/* Location card */}
              <div
                className="flex items-center gap-3 rounded-2xl px-3 py-3"
                style={{ background: "#ECECF1" }}
              >
                <div
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
                  style={{ background: "#C8D0E7" }}
                >
                  <User size={22} color="#7A8BB0" />
                </div>
                <div>
                  <p className="text-[11px] text-[#7A8BB0] font-medium">Deliver from</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={11} color="#E8334A" />
                    <span className="text-[13px] font-semibold text-[#1A1A1A]">
                      {alert.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detail info rows — built from data object */}
              <div className="flex flex-col gap-2">
                {detailRows.map(({ label, value }) => (
                  <DetailRow key={label} label={label} value={value} />
                ))}
              </div>

              {/* Reject / Approve action buttons */}
              <div className="flex items-center justify-center gap-10 mt-2">
                <button
                  aria-label="Reject this alert"
                  onClick={() => setAlertAction("rejected")}
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-lg active:scale-95 transition-transform"
                  style={{ border: "3px solid #E8334A" }}
                >
                  <X size={28} color="#E8334A" strokeWidth={3} />
                </button>

                <button
                  aria-label="Approve this alert"
                  onClick={() => setAlertAction("approved")}
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-lg active:scale-95 transition-transform"
                  style={{ border: "3px solid #22C55E" }}
                >
                  <Check size={28} color="#22C55E" strokeWidth={3} />
                </button>
              </div>
            </>
          ) : (
            /* ── Post-action feedback screen ── */
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: alertAction === "approved" ? "#22C55E" : "#E8334A",
                }}
              >
                {alertAction === "approved"
                  ? <Check size={32} color="#fff" strokeWidth={3} />
                  : <X size={32} color="#fff" strokeWidth={3} />
                }
              </div>
              <p className="text-[#1A1A1A] font-bold text-base">
                {alertAction === "approved" ? "Alert approved" : "Alert dismissed"}
              </p>
              <p className="text-[#7A8BB0] text-sm text-center px-4">
                {alertAction === "approved"
                  ? "This security alert has been confirmed and logged."
                  : "This security alert has been dismissed."
                }
              </p>
              <button
                onClick={() => setAlertAction("none")}
                className="mt-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold active:opacity-80 transition-opacity"
                style={{ background: "#1F49D8" }}
              >
                View Alert Again
              </button>
            </div>
          )}

        </div>

        {/* ── Bottom navigation ── */}
        <DashboardBottomNav />
      </div>
    </div>
  );
}
