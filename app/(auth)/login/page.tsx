// ─────────────────────────────────────────────
// Login Page — /login
//
// Futuristic cyber-security style redesign with
// neon blue effects, animated particles, and
// modern glassmorphism UI while keeping all
// backend logic and functionality unchanged.
// ─────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";
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

// ── Futuristic Shield Security Logo Component ──
function FuturisticSecurityLogo() {
  return (
    <div className="relative flex items-center justify-center mb-12 animate-fade-in">
      {/* Outer glow ring */}
      <div className="absolute w-48 h-48 rounded-full bg-blue-500/10 blur-3xl animate-pulse-slow"></div>
      
      {/* Circular digital ring 1 */}
      <div className="absolute w-44 h-44 rounded-full border-2 border-blue-400/30 animate-spin-slow"></div>
      
      {/* Circular digital ring 2 */}
      <div className="absolute w-40 h-40 rounded-full border border-cyan-400/20 animate-spin-reverse"></div>
      
      {/* Shield icon with glow */}
      <div className="relative z-10 w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-xl opacity-50"></div>
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="relative z-10 text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>
      
      {/* Decorative dots */}
      <div className="absolute top-0 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
      <div className="absolute left-0 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
      <div className="absolute right-0 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
    </div>
  );
}

// ── Animated Background Particles Component ──
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-float-delay-1 opacity-50"></div>
      <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-float-delay-2 opacity-40"></div>
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-float-delay-3 opacity-50"></div>
      <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-blue-500 rounded-full animate-float-delay-4 opacity-30"></div>
      <div className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-float-delay-5 opacity-40"></div>
      
      {/* Circuit lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
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

  // Animation on mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
    /* ── Full-screen dark futuristic background with cyber effects ── */
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, #0a0e27 0%, #0d1b3d 50%, #0a1628 100%)"
      }}
    >
      <AnimatedBackground />
      
      <div className={`w-full max-w-sm flex flex-col items-center relative z-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* ── Futuristic Security Logo ── */}
        <FuturisticSecurityLogo />

        {/* ── Glassmorphism Form Container ── */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-6 backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl shadow-blue-900/20">

          {/* Email field */}
          <div className="flex flex-col gap-2">
            <label className="text-cyan-300 text-sm font-medium tracking-wide pl-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
              Email
            </label>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full bg-black/40 text-white placeholder-gray-500 rounded-2xl pl-5 pr-12 py-4 text-sm focus:outline-none border-2 border-blue-500/30 focus:border-cyan-400 shadow-lg shadow-blue-900/30 transition-all duration-300 focus:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
              />
              {/* Mail icon — right side with glow */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                <MailIcon />
              </span>
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-2">
            <label className="text-cyan-300 text-sm font-medium tracking-wide pl-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
              Password
            </label>
            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-black/40 text-white placeholder-gray-500 rounded-2xl pl-5 pr-12 py-4 text-sm focus:outline-none border-2 border-blue-500/30 focus:border-cyan-400 shadow-lg shadow-blue-900/30 transition-all duration-300 focus:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
              />
              {/* Lock icon — right side with glow */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                <LockIcon />
              </span>
            </div>

            {/* Forget password — right-aligned below password input */}
            <div className="flex justify-end pr-1 mt-1">
              <Link
                href="#"
                className="text-cyan-300 text-sm hover:text-cyan-200 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300"
              >
                Forget Password
              </Link>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 text-center backdrop-blur-sm">
              {error}
            </p>
          )}

          {/* LOGIN button — futuristic glowing button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(34,211,238,0.8)] hover:scale-105 border-2 border-cyan-400/50 backdrop-blur-sm"
          >
            {loading ? "..." : "LOGIN"}
          </button>

          {/* Link to signup */}
          <p className="text-center text-gray-400 text-sm mt-2">
            No account?{" "}
            <Link href="/signup" className="text-cyan-300 font-semibold hover:text-cyan-200 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300">
              Sign up
            </Link>
          </p>
        </form>
      </div>
      
      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes float-delay-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(-15px); }
          50% { transform: translateY(-25px) translateX(10px); }
          75% { transform: translateY(-10px) translateX(-5px); }
        }
        @keyframes float-delay-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-25px) translateX(15px); }
          50% { transform: translateY(-15px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
        @keyframes float-delay-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(-10px); }
          50% { transform: translateY(-30px) translateX(15px); }
          75% { transform: translateY(-15px) translateX(-5px); }
        }
        @keyframes float-delay-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-30px) translateX(10px); }
          50% { transform: translateY(-20px) translateX(-15px); }
          75% { transform: translateY(-10px) translateX(5px); }
        }
        @keyframes float-delay-5 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(-5px); }
          50% { transform: translateY(-25px) translateX(10px); }
          75% { transform: translateY(-20px) translateX(-15px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay-1 { animation: float-delay-1 9s ease-in-out infinite; }
        .animate-float-delay-2 { animation: float-delay-2 10s ease-in-out infinite; }
        .animate-float-delay-3 { animation: float-delay-3 11s ease-in-out infinite; }
        .animate-float-delay-4 { animation: float-delay-4 12s ease-in-out infinite; }
        .animate-float-delay-5 { animation: float-delay-5 13s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 25s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
