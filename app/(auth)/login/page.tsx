// ─────────────────────────────────────────────
// Login Page — /login
//
// Cybersecurity / blockchain aesthetic matching
// reference image with deep navy blue background,
// glowing particles, neural network effects,
// and precise styling as specified.
// ─────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

// ── Padlock icon (top-left corner) ──
function CornerPadlockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// ── Hexagonal Shield with Fingerprint Diamond Logo ──
function HexagonalShieldLogo() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: '180px', height: '180px' }}>
      {/* Outer circular glow halo */}
      <div className="absolute inset-0 rounded-full bg-[#00D4FF]/10 blur-2xl"></div>
      
      {/* Concentric circular lines (radar/sonar pulse effect) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[160px] h-[160px] rounded-full border border-[#00D4FF]/20"></div>
        <div className="absolute w-[140px] h-[140px] rounded-full border border-[#00D4FF]/30"></div>
        <div className="absolute w-[120px] h-[120px] rounded-full border border-[#00D4FF]/40"></div>
        <div className="absolute w-[100px] h-[100px] rounded-full border border-[#00D4FF]/50"></div>
      </div>
      
      {/* Hexagonal shield */}
      <div className="relative z-10 flex items-center justify-center">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 0.8))' }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        
        {/* Fingerprint / Diamond hybrid icon inside shield */}
        <div className="absolute">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 1))' }}>
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Neural Network / Constellation Background Component ──
function NeuralNetworkBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Scattered glowing cyan dots of varying sizes */}
      <div className="absolute top-[10%] left-[15%] w-3 h-3 rounded-full bg-[#00D4FF] opacity-80" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 1))' }}></div>
      <div className="absolute top-[20%] left-[70%] w-2 h-2 rounded-full bg-[#00D4FF] opacity-60"></div>
      <div className="absolute top-[30%] left-[25%] w-1.5 h-1.5 rounded-full bg-[#00D4FF] opacity-50"></div>
      <div className="absolute top-[40%] left-[80%] w-2.5 h-2.5 rounded-full bg-[#00D4FF] opacity-70" style={{ filter: 'drop-shadow(0 0 6px rgba(0, 212, 255, 0.8))' }}></div>
      <div className="absolute top-[50%] left-[10%] w-2 h-2 rounded-full bg-[#00D4FF] opacity-40"></div>
      <div className="absolute top-[60%] left-[60%] w-1.5 h-1.5 rounded-full bg-[#00D4FF] opacity-50"></div>
      <div className="absolute top-[70%] left-[30%] w-2 h-2 rounded-full bg-[#00D4FF] opacity-60"></div>
      <div className="absolute top-[80%] left-[75%] w-1 h-1 rounded-full bg-[#00D4FF] opacity-40"></div>
      <div className="absolute top-[15%] left-[45%] w-2 h-2 rounded-full bg-[#00D4FF] opacity-50"></div>
      <div className="absolute top-[35%] left-[55%] w-1.5 h-1.5 rounded-full bg-[#00D4FF] opacity-40"></div>
      <div className="absolute top-[55%] left-[40%] w-2 h-2 rounded-full bg-[#00D4FF] opacity-60"></div>
      <div className="absolute top-[75%] left-[85%] w-1.5 h-1.5 rounded-full bg-[#00D4FF] opacity-50"></div>
      <div className="absolute top-[25%] left-[90%] w-2 h-2 rounded-full bg-[#00D4FF] opacity-70" style={{ filter: 'drop-shadow(0 0 6px rgba(0, 212, 255, 0.8))' }}></div>
      <div className="absolute top-[45%] left-[20%] w-1 h-1 rounded-full bg-[#00D4FF] opacity-40"></div>
      <div className="absolute top-[65%] left-[50%] w-2 h-2 rounded-full bg-[#00D4FF] opacity-60"></div>
      <div className="absolute top-[85%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#00D4FF] opacity-50"></div>
      
      {/* Connecting lines creating neural/tech mesh */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <line x1="15%" y1="10%" x2="45%" y2="15%" stroke="#00D4FF" strokeWidth="0.5" />
        <line x1="45%" y1="15%" x2="80%" y2="40%" stroke="#00D4FF" strokeWidth="0.5" />
        <line x1="25%" y1="30%" x2="45%" y2="15%" stroke="#00D4FF" strokeWidth="0.5" />
        <line x1="55%" y1="35%" x2="80%" y2="40%" stroke="#00D4FF" strokeWidth="0.5" />
        <line x1="40%" y1="55%" x2="60%" y2="65%" stroke="#00D4FF" strokeWidth="0.5" />
        <line x1="10%" y1="50%" x2="40%" y2="55%" stroke="#00D4FF" strokeWidth="0.5" />
        <line x1="30%" y1="70%" x2="40%" y2="55%" stroke="#00D4FF" strokeWidth="0.5" />
        <line x1="50%" y1="65%" x2="75%" y2="80%" stroke="#00D4FF" strokeWidth="0.5" />
        <line x1="70%" y1="20%" x2="90%" y2="25%" stroke="#00D4FF" strokeWidth="0.5" />
        <line x1="80%" y1="40%" x2="90%" y2="25%" stroke="#00D4FF" strokeWidth="0.5" />
      </svg>
      
      {/* Circuit board traces along right edge */}
      <svg className="absolute top-0 right-0 w-32 h-full opacity-15">
        <line x1="0" y1="20%" x2="20" y2="20%" stroke="#0A2A6E" strokeWidth="1" />
        <line x1="20" y1="20%" x2="20" y2="40%" stroke="#0A2A6E" strokeWidth="1" />
        <line x1="0" y1="40%" x2="20" y2="40%" stroke="#0A2A6E" strokeWidth="1" />
        <line x1="0" y1="60%" x2="15" y2="60%" stroke="#0A2A6E" strokeWidth="1" />
        <line x1="15" y1="60%" x2="15" y2="80%" stroke="#0A2A6E" strokeWidth="1" />
        <line x1="0" y1="80%" x2="15" y2="80%" stroke="#0A2A6E" strokeWidth="1" />
      </svg>
      
      {/* Circuit board traces along bottom edge */}
      <svg className="absolute bottom-0 left-0 w-full h-24 opacity-15">
        <line x1="20%" y1="20" x2="20%" y2="0" stroke="#0A2A6E" strokeWidth="1" />
        <line x1="20%" y1="20" x2="40%" y2="20" stroke="#0A2A6E" strokeWidth="1" />
        <line x1="40%" y1="20" x2="40%" y2="0" stroke="#0A2A6E" strokeWidth="1" />
        <line x1="60%" y1="20" x2="60%" y2="0" stroke="#0A2A6E" strokeWidth="1" />
        <line x1="60%" y1="20" x2="80%" y2="20" stroke="#0A2A6E" strokeWidth="1" />
        <line x1="80%" y1="20" x2="80%" y2="0" stroke="#0A2A6E" strokeWidth="1" />
      </svg>
    </div>
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
    /* ── Full-screen deep navy blue background with particles ── */
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: "linear-gradient(180deg, #020B2D 0%, #050F3A 100%)"
      }}
    >
      <NeuralNetworkBackground />
      
      {/* Top-left padlock icon */}
      <div className="absolute top-6 left-6 opacity-50">
        <CornerPadlockIcon />
      </div>
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6" style={{ paddingTop: '60px' }}>
        
        {/* ── Hexagonal Shield Logo ── */}
        <div style={{ marginBottom: '40px' }}>
          <HexagonalShieldLogo />
        </div>

        {/* ── Form Container ── */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5" style={{ maxWidth: '340px' }}>

          {/* Email field */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-normal text-left" style={{ paddingLeft: '4px' }}>
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full text-white placeholder-[#7A9CC0] rounded-[26px] pl-5 pr-12 py-[15px] text-sm focus:outline-none border-2 border-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all"
                style={{ background: 'rgba(5, 20, 70, 0.8)' }}
              />
              {/* Mail icon — right side in cyan-white */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00D4FF] pointer-events-none">
                <MailIcon />
              </span>
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-normal text-left" style={{ paddingLeft: '4px' }}>
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full text-white placeholder-[#7A9CC0] rounded-[26px] pl-5 pr-12 py-[15px] text-sm focus:outline-none border-2 border-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all"
                style={{ background: 'rgba(5, 20, 70, 0.8)' }}
              />
              {/* Lock icon — right side in cyan-white */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00D4FF] pointer-events-none">
                <LockIcon />
              </span>
            </div>

            {/* Forget password — right-aligned with dashed underline */}
            <div className="flex justify-end mt-1">
              <Link
                href="#"
                className="text-white text-xs relative"
              >
                Forget Password
                <span className="absolute bottom-0 left-0 w-full border-b border-dashed border-[#00D4FF]/50"></span>
              </Link>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 text-center">
              {error}
            </p>
          )}

          {/* LOGIN button — neon cyan border, dark navy fill */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-[14px] rounded-[28px] text-white font-bold text-base tracking-widest uppercase transition-all disabled:opacity-60 disabled:cursor-not-allowed border-2 border-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.6)] hover:shadow-[0_0_30px_rgba(0,212,255,0.8)]"
            style={{ background: 'rgba(5, 20, 70, 0.85)' }}
          >
            {loading ? "..." : "LOGIN"}
          </button>

          {/* Link to signup */}
          <p className="text-center text-white text-sm mt-5">
            No account?{" "}
            <Link href="/signup" className="text-white font-bold underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
