// ─────────────────────────────────────────────
// Dashboard Page — /dashboard
//
// Pixel-accurate recreation of the reference mobile UI:
// solid blue top app-bar, white content body, light gray
// info rows, red/green action buttons, solid blue bottom nav.
// ─────────────────────────────────────────────

import Image from "next/image";
import {
  Menu,
  Bell,
  MapPin,
  X,
  Check,
  User,
} from "lucide-react";
import DashboardBottomNav from "@/components/DashboardBottomNav";

// ── Alert detail rows — matches the reference card content ──
const detailRows = [
  { label: "Name",              value: "Ziyad Mostafa Elsayed Ismail Awad" },
  { label: "ID Number",         value: "3030xxxxxxxxxx" },
  { label: "Age",               value: "22" },
  { label: "Similarity",        value: "85 %" },
  { label: "Time of detection", value: "9:00 PM" },
  { label: "Date",              value: "2026/01/20" },
  { label: "Legal case",        value: "Thief" },
];

export default function DashboardPage() {
  return (
    // ── Outer wrapper: white body fills everything below blue bar ──
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto shadow-2xl">

      {/* ══════════════════════════════════════════
          BLUE TOP APP BAR
      ══════════════════════════════════════════ */}
      <header
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "#1A44CC" }}
      >
        {/* Hamburger menu */}
        <button aria-label="Menu">
          <Menu size={24} color="#fff" />
        </button>

        {/* Center logo + title */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Security System Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </div>

        {/* Notification bell with red dot */}
        <div className="relative">
          <Bell size={22} color="#fff" />
          <span
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
            style={{ background: "#E8334A" }}
          >
            1
          </span>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          PAGE TITLE AREA — still on blue bg
      ══════════════════════════════════════════ */}
      <div
        className="px-4 pt-3 pb-5 text-center"
        style={{ background: "#1A44CC" }}
      >
        <h1 className="text-white text-[26px] font-extrabold tracking-wide">
          Security System
        </h1>
      </div>

      {/* ══════════════════════════════════════════
          WHITE CONTENT BODY
      ══════════════════════════════════════════ */}
      <div className="flex-1 bg-white px-4 pt-5 pb-28 flex flex-col gap-4">

        {/* ── "Security Name" pill header ── */}
        <div
          className="flex items-center justify-between rounded-full px-4 py-2"
          style={{ background: "#1A44CC" }}
        >
          <span className="text-white text-sm font-semibold tracking-wide">
            Security Name
          </span>
          {/* Sliders/filter icon */}
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-0.5 rounded-full bg-white"
                style={{ height: i === 1 ? 14 : 10, marginTop: i === 1 ? 0 : 2 }}
              />
            ))}
          </div>
        </div>

        {/* ── Alert header row ── */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-[#1A1A1A] text-base font-bold">
            Criminal detected
          </span>
          {/* Pink heart/alert emoji pill */}
          <span
            className="text-xs px-2 py-0.5 rounded-full font-bold"
            style={{ background: "#FDEEF2", color: "#E8334A" }}
          >
            ♥
          </span>
        </div>

        {/* ── Delivery / location row ── */}
        <div
          className="flex items-center gap-3 rounded-2xl px-3 py-3"
          style={{ background: "#F2F4F8" }}
        >
          {/* Avatar placeholder */}
          <div
            className="w-10 h-10 rounded-full shrink-0 overflow-hidden flex items-center justify-center"
            style={{ background: "#C8D0E7" }}
          >
            <User size={22} color="#7A8BB0" />
          </div>
          <div>
            <p className="text-[11px] text-[#7A8BB0] font-medium">Deliver from</p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} color="#E8334A" />
              <span className="text-[13px] font-semibold text-[#1A1A1A]">
                Mall Masr , Gate 3
              </span>
            </div>
          </div>
        </div>

        {/* ── Detail info rows ── */}
        <div className="flex flex-col gap-2">
          {detailRows.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl px-4 py-3"
              style={{ background: "#F2F4F8" }}
            >
              <p className="text-[13px] text-[#1A1A1A]">
                <span className="font-bold">{label} : </span>
                <span className="font-normal text-[#3A3A3A]">{value}</span>
              </p>
            </div>
          ))}
        </div>

        {/* ── Action buttons: ✕ Reject  ✓ Approve ── */}
        <div className="flex items-center justify-center gap-10 mt-2">
          {/* Red X button */}
          <button
            aria-label="Reject"
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "#fff", border: "3px solid #E8334A" }}
          >
            <X size={28} color="#E8334A" strokeWidth={3} />
          </button>

          {/* Green check button */}
          <button
            aria-label="Approve"
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "#fff", border: "3px solid #22C55E" }}
          >
            <Check size={28} color="#22C55E" strokeWidth={3} />
          </button>
        </div>

      </div>

      {/* ── Bottom navigation ── */}
      <DashboardBottomNav />
    </div>
  );
}
