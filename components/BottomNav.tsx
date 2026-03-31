// ─────────────────────────────────────────────
// BottomNav — Mobile-style bottom navigation bar
//
// Renders navigation links at the bottom of the screen on mobile,
// and as a left sidebar on larger screens (md+).
// Uses Next.js `usePathname` to highlight the active route.
// ─────────────────────────────────────────────

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  User,
  ShieldCheck,
} from "lucide-react";

// Navigation items — each maps to a route in the app
const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "History",   href: "/history",   icon: History },
  { label: "Profile",   href: "/profile",   icon: User },
];

export default function BottomNav() {
  // Get the current URL path to highlight the active nav item
  const pathname = usePathname();

  return (
    <>
      {/* ── Mobile bottom bar (visible on small screens) ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand-900/95 backdrop-blur-md border-t border-brand-700">
        <ul className="flex items-center justify-around h-16">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  className={`flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                    isActive
                      ? "text-blue-300"
                      : "text-brand-300 hover:text-white"
                  }`}
                >
                  <Icon size={22} />
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Desktop left sidebar (visible on md+ screens) ── */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-56 bg-brand-900/95 backdrop-blur-md border-r border-brand-700 z-50">
        {/* Logo / brand header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-brand-700">
          <ShieldCheck size={28} className="text-blue-400" />
          <span className="text-lg font-bold tracking-wide">Security</span>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col gap-1 p-4 mt-2">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                      : "text-brand-300 hover:bg-brand-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
