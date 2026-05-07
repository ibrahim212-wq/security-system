// ─────────────────────────────────────────────
// DashboardBottomNav — matches the reference image exactly:
// solid blue bar, 4 items (Home, Explore, Settings, Profile),
// white icons + white labels, active item slightly brighter.
// ─────────────────────────────────────────────

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Settings, User } from "lucide-react";

const navItems = [
  { label: "Home",     href: "/dashboard", icon: Home },
  { label: "Explore",  href: "/history",   icon: Map },
  { label: "Settings", href: "/settings",  icon: Settings },
  { label: "Profile",  href: "/profile",   icon: User },
];

export default function DashboardBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full sm:max-w-md z-50"
      style={{
        background: "#1A44CC",
        borderTop: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <ul className="flex items-center justify-around h-14">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="flex flex-col items-center justify-center gap-0.5 h-full"
              >
                <Icon
                  size={20}
                  color={isActive ? "#ffffff" : "rgba(255,255,255,0.65)"}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span
                  className="text-[9px] font-semibold"
                  style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.65)" }}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
