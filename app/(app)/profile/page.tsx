// ─────────────────────────────────────────────
// Profile Page — /profile
//
// Shows the authenticated user's information and
// account settings. The sign-out button calls
// Supabase Auth and redirects to /login.
// ─────────────────────────────────────────────

"use client";

import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabase";
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

// Placeholder user data — replace with real Supabase session
const mockUser = {
  full_name: "Ibrahim Al-Amin",
  email: "ibrahim@example.com",
  phone: "+966 50 000 0000",
  role: "Administrator",
  joined: "January 2026",
};

// Settings menu items
const settingsItems = [
  { label: "Notifications", icon: Bell,  href: "#" },
  { label: "Security",      icon: Lock,  href: "#" },
  { label: "Account",       icon: User,  href: "#" },
];

export default function ProfilePage() {
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <PageShell>
      <div className="p-4 md:p-8 max-w-3xl mx-auto">

        {/* ── Header ── */}
        <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>

        {/* ── Avatar & name card ── */}
        <div className="bg-brand-900/60 backdrop-blur-md border border-brand-700/50 rounded-2xl p-5 flex items-center gap-4 mb-4">
          {/* Avatar placeholder */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-900/40 shrink-0">
            {mockUser.full_name.charAt(0)}
          </div>
          <div>
            <p className="text-white text-lg font-semibold">{mockUser.full_name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Shield size={12} className="text-blue-400" />
              <span className="text-blue-300 text-xs font-medium">{mockUser.role}</span>
            </div>
            <p className="text-brand-400 text-xs mt-0.5">Member since {mockUser.joined}</p>
          </div>
        </div>

        {/* ── Contact info ── */}
        <div className="bg-brand-900/60 backdrop-blur-md border border-brand-700/50 rounded-2xl p-4 mb-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-brand-400 shrink-0" />
            <span className="text-white text-sm">{mockUser.email}</span>
          </div>
          <div className="h-px bg-brand-700/50" />
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-brand-400 shrink-0" />
            <span className="text-white text-sm">{mockUser.phone}</span>
          </div>
        </div>

        {/* ── Settings menu ── */}
        <div className="bg-brand-900/60 backdrop-blur-md border border-brand-700/50 rounded-2xl p-1 mb-4">
          {settingsItems.map(({ label, icon: Icon }, idx) => (
            <div key={label}>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-800/60 transition-colors group">
                <Icon size={16} className="text-brand-400 group-hover:text-blue-400 transition-colors" />
                <span className="flex-1 text-left text-sm text-white">{label}</span>
                <ChevronRight size={14} className="text-brand-500" />
              </button>
              {/* Divider between items (not after last) */}
              {idx < settingsItems.length - 1 && (
                <div className="h-px bg-brand-700/40 mx-4" />
              )}
            </div>
          ))}
        </div>

        {/* ── Sign out button ── */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 rounded-2xl py-3 text-sm font-semibold transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </PageShell>
  );
}
