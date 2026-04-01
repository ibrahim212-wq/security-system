// ─────────────────────────────────────────────
// Profile Page — /profile
//
// Shows the authenticated user's information and
// account settings. The sign-out button calls
// Supabase Auth and redirects to /login.
// ─────────────────────────────────────────────

"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  Shield,
  LogOut,
  ChevronRight,
  Bell,
  Lock,
} from "lucide-react";

// Settings menu items
const settingsItems = [
  { label: "Notifications", icon: Bell,  href: "#" },
  { label: "Security",      icon: Lock,  href: "#" },
  { label: "Account",       icon: User,  href: "#" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen" style={{ background: "#F3F3F6" }}>
        <div className="flex flex-col max-w-sm mx-auto w-full min-h-screen bg-white shadow-2xl">
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[#7A8BB0]">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F3F3F6" }}>
      <div className="flex flex-col max-w-sm mx-auto w-full min-h-screen bg-white shadow-2xl">

        {/* ── Blue top bar ── */}
        <header
          className="flex items-center justify-center px-4 py-3"
          style={{ background: "#1F49D8" }}
        >
          <User size={28} color="#fff" />
        </header>

        {/* ── Page title ── */}
        <div
          className="px-4 pt-2 pb-5 text-center"
          style={{ background: "#1F49D8" }}
        >
          <h1 className="text-white text-[26px] font-extrabold tracking-wide">
            Profile
          </h1>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 bg-white px-4 pt-5 pb-28 flex flex-col gap-4">

          {/* Avatar & name card */}
          <div
            className="flex items-center gap-4 rounded-2xl px-4 py-4"
            style={{ background: "#ECECF1" }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold shrink-0"
              style={{ background: "#1F49D8" }}
            >
              {user.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#1A1A1A]">{user.full_name || 'User'}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Shield size={12} color="#1F49D8" />
                <span className="text-[11px] font-medium" style={{ color: "#7A8BB0" }}>{user.role || 'User'}</span>
              </div>
              <p className="text-[11px] mt-0.5" style={{ color: "#7A8BB0" }}>Member since January 2026</p>
            </div>
          </div>

          {/* Contact info */}
          <div
            className="flex flex-col gap-3 rounded-2xl p-4"
            style={{ background: "#ECECF1" }}
          >
            <div className="flex items-center gap-3">
              <Mail size={16} color="#7A8BB0" />
              <span className="text-[13px] text-[#1A1A1A]">{user.email || 'No email'}</span>
            </div>
            <div className="h-px" style={{ background: "#C8D0E7" }} />
            <div className="flex items-center gap-3">
              <Phone size={16} color="#7A8BB0" />
              <span className="text-[13px] text-[#1A1A1A]">{user.phone || 'No phone'}</span>
            </div>
          </div>

          {/* Settings menu */}
          <div className="flex flex-col gap-2 rounded-2xl p-1" style={{ background: "#ECECF1" }}>
            {settingsItems.map(({ label, icon: Icon }, idx) => (
              <div key={label}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl active:opacity-70 transition-opacity">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "#1F49D8" }}
                  >
                    <Icon size={14} color="#fff" />
                  </div>
                  <span className="flex-1 text-left text-[13px] font-bold text-[#1A1A1A]">{label}</span>
                  <ChevronRight size={14} color="#7A8BB0" />
                </button>
                {idx < settingsItems.length - 1 && (
                  <div className="h-px mx-4" style={{ background: "#C8D0E7" }} />
                )}
              </div>
            ))}
          </div>

          {/* Sign out button */}
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold active:opacity-70 transition-opacity"
            style={{ background: "#FDEEF2", color: "#E8334A" }}
          >
            <LogOut size={16} />
            Sign Out
          </button>

        </div>

      </div>
    </div>
  );
}
