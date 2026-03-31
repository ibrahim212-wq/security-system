// ─────────────────────────────────────────────
// Login Page — /login
//
// Pixel-accurate recreation of the mobile mockup:
// deep cobalt-blue background, hexagonal radar logo,
// white floating input fields with right-side icons,
// dark pill LOGIN button, and a "Forget Password" link.
// ─────────────────────────────────────────────

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

// ── Envelope icon (right side of email input) ──
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ── Lock icon (right side of password input) ──
function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();

  // Form field state
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  // UI feedback state
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    /* ── Full-screen deep cobalt-blue background ── */
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "linear-gradient(180deg, #1a4fbb 0%, #1253a8 60%, #0e3d8a 100%)" }}
    >
      <div className="w-full max-w-xs flex flex-col items-center">

        {/* ── Logo ── */}
        <div className="mb-10">
          <Image src="/logo.png" alt="Security System Logo" width={185} height={185} className="object-contain" priority />
        </div>

        {/* ── Form (no card, fields float on the blue bg) ── */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">

          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white text-base font-normal pl-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full bg-white text-gray-700 placeholder-gray-400 rounded-2xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
              />
              {/* Mail icon — right side */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <MailIcon />
              </span>
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white text-base font-normal pl-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-white text-gray-700 placeholder-gray-400 rounded-2xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
              />
              {/* Lock icon — right side */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <LockIcon />
              </span>
            </div>

            {/* Forget password — right-aligned below password input */}
            <div className="flex justify-end pr-1">
              <Link
                href="#"
                className="text-white text-sm hover:text-blue-200 transition-colors"
              >
                Forget Password
              </Link>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-xl px-3 py-2 text-center">
              {error}
            </p>
          )}

          {/* LOGIN button — dark pill, bold uppercase */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-4 rounded-2xl bg-gray-900 hover:bg-black disabled:opacity-60 text-white font-bold text-lg tracking-widest uppercase transition-colors shadow-xl shadow-black/40"
          >
            {loading ? "..." : "LOGIN"}
          </button>

          {/* Link to signup */}
          <p className="text-center text-white/70 text-sm mt-1">
            No account?{" "}
            <Link href="/signup" className="text-white font-semibold hover:text-blue-200 underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
