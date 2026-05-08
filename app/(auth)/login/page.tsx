// ─────────────────────────────────────────────
// Login Page — /login
//
// Dark cyberpunk/futuristic aesthetic with
// deep navy blue background, glowing particles,
// neural network effects, and precise styling
// matching the reference image.
// ─────────────────────────────────────────────

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// ── Envelope icon (right side of email input) ──
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ── Lock icon (right side of password input) ──
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// ── Existing Shield Logo with Stacked Layers (KEEP EXACTLY AS-IS) ──
function ExistingShieldLogo() {
  return (
    <div className="relative z-10">
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 20px rgba(0, 180, 255, 0.6))' }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 180, 255, 0.8))' }}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
    </div>
  );
}

// ── Logo with Concentric Rings Wrapper ──
function LogoWithRings() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: '180px', height: '220px' }}>
      {/* Soft cyan radial glow behind the logo */}
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 180, 255, 0.3) 0%, transparent 70%)' }}></div>
      
      {/* Concentric glowing rings radiating outward */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[170px] h-[170px] rounded-full border border-cyan-400/15"></div>
        <div className="absolute w-[190px] h-[190px] rounded-full border border-cyan-400/10"></div>
        <div className="absolute w-[210px] h-[210px] rounded-full border border-cyan-400/8"></div>
        <div className="absolute w-[230px] h-[230px] rounded-full border border-cyan-400/5"></div>
        <div className="absolute w-[250px] h-[250px] rounded-full border border-cyan-400/3"></div>
      </div>
      
      {/* Existing Logo */}
      <ExistingShieldLogo />
    </div>
  );
}

// ── Cyberpunk Background with Particles and Neural Network ──
function CyberpunkBackground() {
  // Generate random particles with varying sizes (2px to 6px) and opacity (0.3 to 1.0)
  const particles = [
    { top: '8%', left: '12%', size: 6, opacity: 1.0 },
    { top: '15%', left: '25%', size: 4, opacity: 0.6 },
    { top: '12%', left: '70%', size: 5, opacity: 0.8 },
    { top: '22%', left: '85%', size: 3, opacity: 0.4 },
    { top: '28%', left: '45%', size: 5, opacity: 0.7 },
    { top: '35%', left: '15%', size: 3, opacity: 0.5 },
    { top: '42%', left: '65%', size: 4, opacity: 0.6 },
    { top: '48%', left: '90%', size: 6, opacity: 0.9 },
    { top: '55%', left: '8%', size: 3, opacity: 0.4 },
    { top: '62%', left: '35%', size: 4, opacity: 0.6 },
    { top: '68%', left: '78%', size: 5, opacity: 0.7 },
    { top: '75%', left: '22%', size: 2, opacity: 0.3 },
    { top: '82%', left: '55%', size: 4, opacity: 0.5 },
    { top: '88%', left: '88%', size: 3, opacity: 0.4 },
    { top: '18%', left: '55%', size: 2, opacity: 0.3 },
    { top: '32%', left: '82%', size: 3, opacity: 0.5 },
    { top: '45%', left: '28%', size: 5, opacity: 0.8 },
    { top: '58%', left: '92%', size: 2, opacity: 0.3 },
    { top: '72%', left: '42%', size: 4, opacity: 0.6 },
    { top: '85%', left: '12%', size: 3, opacity: 0.4 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Scattered glowing cyan-blue particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#00D4FF]"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: p.opacity > 0.5 ? '0 0 8px rgba(0, 212, 255, 0.8)' : 'none'
          }}
        />
      ))}
      
      {/* Connecting lines with thin semi-transparent strokes */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 1 }}>
        <line x1="12%" y1="8%" x2="25%" y2="15%" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="0.5" />
        <line x1="25%" y1="15%" x2="45%" y2="28%" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="0.5" />
        <line x1="45%" y1="28%" x2="65%" y2="42%" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="0.5" />
        <line x1="70%" y1="12%" x2="85%" y2="22%" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="0.5" />
        <line x1="85%" y1="22%" x2="90%" y2="48%" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="0.5" />
        <line x1="15%" y1="35%" x2="28%" y2="45%" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="0.5" />
        <line x1="35%" y1="62%" x2="55%" y2="82%" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="0.5" />
        <line x1="78%" y1="68%" x2="88%" y2="88%" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="0.5" />
        <line x1="8%" y1="55%" x2="22%" y2="75%" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="0.5" />
        <line x1="55%" y1="35%" x2="78%" y2="68%" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="0.5" />
      </svg>
      
      {/* Circuit board traces along right edge and bottom-right */}
      <svg className="absolute top-0 right-0 w-24 h-full" style={{ opacity: 1 }}>
        {/* Right edge traces */}
        <line x1="20" y1="25%" x2="20" y2="35%" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="20" y1="35%" x2="40" y2="35%" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="15" y1="45%" x2="15" y2="55%" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="15" y1="55%" x2="35" y2="55%" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="25" y1="65%" x2="25" y2="75%" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="25" y1="75%" x2="45" y2="75%" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="18" y1="82%" x2="18" y2="90%" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
      </svg>
      
      <svg className="absolute bottom-0 right-0 w-48 h-32" style={{ opacity: 1 }}>
        {/* Bottom-right corner traces */}
        <line x1="10" y1="20" x2="30" y2="20" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="30" y1="20" x2="30" y2="40" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="30" y1="40" x2="50" y2="40" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="50" y1="40" x2="50" y2="25" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="60" y1="50" x2="80" y2="50" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="80" y1="50" x2="80" y2="30" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="45" y1="60" x2="65" y2="60" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
        <line x1="65" y1="60" x2="65" y2="75" stroke="rgba(0, 100, 200, 0.1)" strokeWidth="1.5" />
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
        background: "linear-gradient(180deg, #020B2D 0%, #03102E 100%)"
      }}
    >
      <CyberpunkBackground />
      
      {/* Main content container with precise spacing */}
      <div className="relative z-10 flex flex-col items-center min-h-screen" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
        
        {/* ── Logo with Concentric Rings ── */}
        <div style={{ height: '220px', marginBottom: '40px' }}>
          <LogoWithRings />
        </div>

        {/* ── Form Container ── */}
        <form onSubmit={handleLogin} className="w-full flex flex-col px-6" style={{ maxWidth: '340px' }}>

          {/* Email field */}
          <div className="flex flex-col" style={{ marginBottom: '20px' }}>
            <label className="text-white text-[15px] font-normal text-left" style={{ marginBottom: '8px', paddingLeft: '4px' }}>
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full h-[52px] text-white text-sm rounded-[26px] pl-4 pr-12 focus:outline-none transition-all"
                style={{ 
                  background: 'rgba(5, 15, 60, 0.75)',
                  border: '1.5px solid #00D4FF',
                  boxShadow: '0 0 10px rgba(0, 212, 255, 0.4), 0 0 20px rgba(0, 212, 255, 0.15)'
                }}
              />
              {/* Mail icon — right side in cyan */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00D4FF] pointer-events-none">
                <MailIcon />
              </span>
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col" style={{ marginBottom: '10px' }}>
            <label className="text-white text-[15px] font-normal text-left" style={{ marginBottom: '8px', paddingLeft: '4px' }}>
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full h-[52px] text-white text-sm rounded-[26px] pl-4 pr-12 focus:outline-none transition-all"
                style={{ 
                  background: 'rgba(5, 15, 60, 0.75)',
                  border: '1.5px solid #00D4FF',
                  boxShadow: '0 0 10px rgba(0, 212, 255, 0.4), 0 0 20px rgba(0, 212, 255, 0.15)'
                }}
              />
              {/* Lock icon — right side in cyan */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00D4FF] pointer-events-none">
                <LockIcon />
              </span>
            </div>

            {/* Forget password — right-aligned with dashed line to the left */}
            <div className="flex items-center justify-end" style={{ marginTop: '10px' }}>
              <div style={{ width: '80px', borderBottom: '1px dashed rgba(0, 180, 255, 0.4)', marginRight: '12px' }}></div>
              <Link
                href="#"
                className="text-white text-[13px] font-normal"
              >
                Forget Password
              </Link>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 text-center" style={{ marginBottom: '20px' }}>
              {error}
            </p>
          )}

          {/* LOGIN button — neon cyan border, dark navy fill, stronger glow */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[56px] rounded-[28px] text-white font-bold text-[17px] tracking-[2px] uppercase transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ 
              background: 'rgba(5, 15, 60, 0.8)',
              border: '2px solid #00D4FF',
              boxShadow: '0 0 14px rgba(0, 212, 255, 0.5), 0 0 28px rgba(0, 212, 255, 0.2)',
              marginTop: '24px'
            }}
          >
            {loading ? "..." : "LOGIN"}
          </button>

          {/* Link to signup */}
          <p className="text-center text-white text-[14px]" style={{ marginTop: '28px' }}>
            No account?{" "}
            <Link href="/signup" className="font-bold underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
