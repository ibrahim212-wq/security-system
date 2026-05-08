// ─────────────────────────────────────────────
// Login Page — /login
//
// EXACT REPLICA of reference design
// Shield logo with face, circuit patterns,
// glowing particles, exact form layout
// ─────────────────────────────────────────────

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

// ── Shield Logo with Face (from reference image) ──
function ShieldLogo() {
  return (
    <div className="relative w-[140px] h-[160px]">
      <svg viewBox="0 0 140 160" className="w-full h-full">
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066cc" />
            <stop offset="50%" stopColor="#004499" />
            <stop offset="100%" stopColor="#002266" />
          </linearGradient>
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0099ff" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Shield outline with glow */}
        <path 
          d="M70 5 L130 35 L130 95 Q130 125 70 150 Q10 125 10 95 L10 35 Z" 
          fill="url(#shieldGrad)" 
          stroke="#00d4ff" 
          strokeWidth="2"
          filter="url(#glow)"
        />
        
        {/* Inner shield border */}
        <path 
          d="M70 15 L120 40 L120 90 Q120 115 70 135 Q20 115 20 90 L20 40 Z" 
          fill="none" 
          stroke="#00d4ff" 
          strokeWidth="1.5"
          opacity="0.6"
        />
        
        {/* Face/Fingerprint pattern - left side (digital) */}
        <g opacity="0.9">
          {/* Left side - digital grid pattern */}
          <path d="M35 50 L55 50" stroke="#00d4ff" strokeWidth="1.5" />
          <path d="M35 65 L55 65" stroke="#00d4ff" strokeWidth="1.5" />
          <path d="M35 80 L55 80" stroke="#00d4ff" strokeWidth="1.5" />
          <path d="M35 95 L50 95" stroke="#00d4ff" strokeWidth="1.5" />
          <circle cx="45" cy="45" r="3" fill="#00d4ff" />
          <circle cx="40" cy="75" r="2" fill="#00d4ff" />
          <circle cx="50" cy="88" r="2" fill="#00d4ff" />
        </g>
        
        {/* Face/Fingerprint pattern - right side (human) */}
        <g opacity="0.9">
          {/* Right side - organic face pattern */}
          <ellipse cx="85" cy="55" rx="8" ry="10" fill="none" stroke="#00d4ff" strokeWidth="1.5" />
          <circle cx="82" cy="52" r="2" fill="#00d4ff" />
          <circle cx="88" cy="52" r="2" fill="#00d4ff" />
          <path d="M80 62 Q85 65 90 62" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
          <path d="M85 70 L85 85" stroke="#00d4ff" strokeWidth="1.5" />
          <path d="M75 75 Q85 72 95 75" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
        </g>
        
        {/* Center dividing line */}
        <line x1="70" y1="25" x2="70" y2="125" stroke="#00d4ff" strokeWidth="2" opacity="0.8" />
        
        {/* Outer rings */}
        <circle cx="70" cy="70" r="55" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.3" />
        <circle cx="70" cy="70" r="45" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.4" />
        <circle cx="70" cy="70" r="35" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
        
        {/* Connection dots */}
        <circle cx="70" cy="15" r="3" fill="#00d4ff" />
        <circle cx="70" cy="125" r="3" fill="#00d4ff" />
        <circle cx="25" cy="40" r="2" fill="#00d4ff" />
        <circle cx="115" cy="40" r="2" fill="#00d4ff" />
        <circle cx="25" cy="100" r="2" fill="#00d4ff" />
        <circle cx="115" cy="100" r="2" fill="#00d4ff" />
      </svg>
      
      {/* Glow effect behind shield */}
      <div className="absolute inset-0 rounded-full animate-pulse" style={{
        background: 'radial-gradient(circle, rgba(0, 150, 255, 0.4) 0%, transparent 70%)',
        filter: 'blur(20px)',
        zIndex: -1
      }} />
    </div>
  );
}

// ── Lock Icon for left side ──
function LockSideIcon() {
  return (
    <div className="relative">
      <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
        <defs>
          <radialGradient id="lockGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00aaff" />
            <stop offset="100%" stopColor="#0066cc" />
          </radialGradient>
        </defs>
        {/* Lock body */}
        <rect x="8" y="25" width="34" height="30" rx="4" fill="url(#lockGrad)" stroke="#00d4ff" strokeWidth="1.5" />
        {/* Lock shackle */}
        <path d="M15 25 V18 Q15 8 25 8 Q35 8 35 18 V25" fill="none" stroke="#00d4ff" strokeWidth="2" />
        {/* Keyhole */}
        <circle cx="25" cy="38" r="4" fill="#001122" />
        <path d="M25 42 L25 48" stroke="#001122" strokeWidth="2" />
      </svg>
      {/* Glow */}
      <div className="absolute inset-0 animate-pulse" style={{
        background: 'radial-gradient(circle, rgba(0, 180, 255, 0.5) 0%, transparent 60%)',
        filter: 'blur(10px)',
        zIndex: -1
      }} />
    </div>
  );
}

// ── Envelope Icon ──
function EnvelopeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="#00d4ff" />
      <path d="M22 7L12 13L2 7" stroke="#00d4ff" />
    </svg>
  );
}

// ── Small Lock Icon for password field ──
function SmallLockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
      <rect x="4" y="11" width="16" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// ── Animated Floating Particle ──
function FloatingParticle({ delay, duration, size, top, left, color }: { delay: number, duration: number, size: number, top: string, left: string, color: string }) {
  return (
    <div
      className="absolute rounded-full animate-float"
      style={{
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

// ── Galaxy Network Line ──
function NetworkLine({ x1, y1, x2, y2, delay }: { x1: string, y1: string, x2: string, y2: string, delay: number }) {
  return (
    <line 
      x1={x1} y1={y1} x2={x2} y2={y2} 
      stroke="url(#lineGradient)" 
      strokeWidth="1"
      className="animate-pulse"
      style={{ animationDelay: `${delay}s`, opacity: 0.6 }}
    />
  );
}

// ── Circuit Pattern Background ──
function CircuitBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dark base */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #000511 0%, #001133 50%, #000511 100%)'
      }} />
      
      {/* Radial glow at top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]" style={{
        background: 'radial-gradient(ellipse, rgba(0, 100, 200, 0.3) 0%, transparent 70%)'
      }} />
      
      {/* Floating particles */}
      <FloatingParticle delay={0} duration={3} size={3} top="10%" left="15%" color="#00aaff" />
      <FloatingParticle delay={0.5} duration={4} size={2} top="20%" left="85%" color="#0099ff" />
      <FloatingParticle delay={1} duration={3.5} size={3} top="5%" left="50%" color="#00ccff" />
      <FloatingParticle delay={1.5} duration={4} size={2} top="30%" left="25%" color="#00aaff" />
      <FloatingParticle delay={2} duration={3} size={4} top="15%" left="75%" color="#00ddff" />
      <FloatingParticle delay={0.3} duration={4.5} size={2} top="25%" left="10%" color="#0099ff" />
      <FloatingParticle delay={0.8} duration={3.5} size={3} top="35%" left="90%" color="#00aaff" />
      <FloatingParticle delay={1.2} duration={4} size={2} top="40%" left="5%" color="#00ccff" />
      <FloatingParticle delay={1.7} duration={3.5} size={3} top="45%" left="95%" color="#0099ff" />
      
      {/* Circuit patterns on sides */}
      <svg className="absolute left-0 top-0 h-full w-[150px] opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuitLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00aaff" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* Vertical lines */}
        <line x1="20" y1="0" x2="20" y2="100%" stroke="url(#circuitLeft)" strokeWidth="1" />
        <line x1="50" y1="0" x2="50" y2="100%" stroke="url(#circuitLeft)" strokeWidth="0.8" />
        <line x1="80" y1="0" x2="80" y2="100%" stroke="url(#circuitLeft)" strokeWidth="0.6" />
        {/* Horizontal connections */}
        <line x1="20" y1="100" x2="50" y2="100" stroke="#00aaff" strokeWidth="1" />
        <line x1="50" y1="150" x2="80" y2="150" stroke="#00aaff" strokeWidth="0.8" />
        <line x1="20" y1="200" x2="50" y2="200" stroke="#00aaff" strokeWidth="0.8" />
        <line x1="50" y1="250" x2="80" y2="250" stroke="#00aaff" strokeWidth="0.6" />
        <line x1="20" y1="300" x2="50" y2="300" stroke="#00aaff" strokeWidth="0.8" />
        <line x1="50" y1="350" x2="80" y2="350" stroke="#00aaff" strokeWidth="0.6" />
        <line x1="20" y1="400" x2="50" y2="400" stroke="#00aaff" strokeWidth="0.8" />
        <line x1="50" y1="450" x2="80" y2="450" stroke="#00aaff" strokeWidth="0.6" />
        <line x1="20" y1="500" x2="50" y2="500" stroke="#00aaff" strokeWidth="0.8" />
        <line x1="50" y1="550" x2="80" y2="550" stroke="#00aaff" strokeWidth="0.6" />
        {/* Nodes */}
        <circle cx="20" cy="100" r="3" fill="#00aaff" />
        <circle cx="50" cy="100" r="2" fill="#00aaff" />
        <circle cx="50" cy="150" r="2" fill="#00aaff" />
        <circle cx="80" cy="150" r="2" fill="#00aaff" />
        <circle cx="20" cy="200" r="3" fill="#00aaff" />
        <circle cx="50" cy="250" r="2" fill="#00aaff" />
        <circle cx="80" cy="300" r="2" fill="#00aaff" />
        <circle cx="20" cy="400" r="3" fill="#00aaff" />
        <circle cx="50" cy="500" r="2" fill="#00aaff" />
      </svg>
      
      <svg className="absolute right-0 top-0 h-full w-[150px] opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuitRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00aaff" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* Vertical lines */}
        <line x1="130" y1="0" x2="130" y2="100%" stroke="url(#circuitRight)" strokeWidth="1" />
        <line x1="100" y1="0" x2="100" y2="100%" stroke="url(#circuitRight)" strokeWidth="0.8" />
        <line x1="70" y1="0" x2="70" y2="100%" stroke="url(#circuitRight)" strokeWidth="0.6" />
        {/* Horizontal connections */}
        <line x1="130" y1="120" x2="100" y2="120" stroke="#00aaff" strokeWidth="1" />
        <line x1="100" y1="180" x2="70" y2="180" stroke="#00aaff" strokeWidth="0.8" />
        <line x1="130" y1="240" x2="100" y2="240" stroke="#00aaff" strokeWidth="0.8" />
        <line x1="100" y1="300" x2="70" y2="300" stroke="#00aaff" strokeWidth="0.6" />
        <line x1="130" y1="360" x2="100" y2="360" stroke="#00aaff" strokeWidth="0.8" />
        <line x1="100" y1="420" x2="70" y2="420" stroke="#00aaff" strokeWidth="0.6" />
        <line x1="130" y1="480" x2="100" y2="480" stroke="#00aaff" strokeWidth="0.8" />
        <line x1="100" y1="540" x2="70" y2="540" stroke="#00aaff" strokeWidth="0.6" />
        {/* Nodes */}
        <circle cx="130" cy="120" r="3" fill="#00aaff" />
        <circle cx="100" cy="120" r="2" fill="#00aaff" />
        <circle cx="100" cy="180" r="2" fill="#00aaff" />
        <circle cx="70" cy="180" r="2" fill="#00aaff" />
        <circle cx="130" cy="240" r="3" fill="#00aaff" />
        <circle cx="100" cy="300" r="2" fill="#00aaff" />
        <circle cx="70" cy="360" r="2" fill="#00aaff" />
        <circle cx="130" cy="480" r="3" fill="#00aaff" />
        <circle cx="100" cy="540" r="2" fill="#00aaff" />
      </svg>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0, 170, 255, 0.1) 4px, rgba(0, 170, 255, 0.1) 8px)'
      }} />
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();

  // Form field state
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    /* ── Full-screen cyber security background ── */
    <div className="min-h-screen relative overflow-hidden">
      <CircuitBackground />
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        
        {/* ── Logo Area with Shield and Lock Icon ── */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Lock icon on left side */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2">
            <LockSideIcon />
          </div>
          
          {/* Main Shield Logo */}
          <div className="animate-fade-in">
            <ShieldLogo />
          </div>
        </div>

        {/* ── Login Form Container ── */}
        <div className="w-full max-w-[320px]">
          <form onSubmit={handleLogin} className="flex flex-col">
            
            {/* Email field */}
            <div className="mb-5">
              <label className="text-white text-[15px] font-normal mb-2 block">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="example@email.com"
                  className="w-full h-[50px] text-white text-[15px] rounded-[25px] pl-5 pr-12 
                    focus:outline-none transition-all duration-300"
                  style={{ 
                    background: 'rgba(0, 10, 40, 0.6)',
                    border: '1.5px solid #00aaff',
                    boxShadow: focusedField === 'email'
                      ? '0 0 20px rgba(0, 170, 255, 0.6), inset 0 0 10px rgba(0, 100, 200, 0.2)'
                      : '0 0 15px rgba(0, 170, 255, 0.3), inset 0 0 8px rgba(0, 100, 200, 0.15)',
                  }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <EnvelopeIcon />
                </span>
              </div>
            </div>

            {/* Password field */}
            <div className="mb-3">
              <label className="text-white text-[15px] font-normal mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="••••••••"
                  className="w-full h-[50px] text-white text-[15px] rounded-[25px] pl-5 pr-12 
                    focus:outline-none transition-all duration-300"
                  style={{ 
                    background: 'rgba(0, 10, 40, 0.6)',
                    border: '1.5px solid #00aaff',
                    boxShadow: focusedField === 'password'
                      ? '0 0 20px rgba(0, 170, 255, 0.6), inset 0 0 10px rgba(0, 100, 200, 0.2)'
                      : '0 0 15px rgba(0, 170, 255, 0.3), inset 0 0 8px rgba(0, 100, 200, 0.15)',
                  }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <SmallLockIcon />
                </span>
              </div>
            </div>

            {/* Forget Password - right aligned */}
            <div className="flex justify-end mb-6">
              <Link
                href="#"
                className="text-white text-[13px] hover:text-cyan-300 transition-colors"
                style={{ textShadow: '0 0 8px rgba(0, 200, 255, 0.5)' }}
              >
                Forget Password
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl text-center text-red-300 text-sm"
                style={{
                  background: 'rgba(200, 0, 50, 0.2)',
                  border: '1px solid rgba(255, 50, 100, 0.4)',
                }}
              >
                {error}
              </div>
            )}

            {/* LOGIN Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] rounded-[26px] text-white font-semibold text-[18px] tracking-[2px] 
                transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mb-6"
              style={{ 
                background: 'linear-gradient(180deg, #001a4d 0%, #003399 100%)',
                border: '2px solid #00aaff',
                boxShadow: '0 0 20px rgba(0, 170, 255, 0.5), 0 0 40px rgba(0, 150, 255, 0.3)',
                textShadow: '0 0 10px rgba(0, 200, 255, 0.8)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 170, 255, 0.8), 0 0 60px rgba(0, 150, 255, 0.5)';
                  e.currentTarget.style.background = 'linear-gradient(180deg, #002266 0%, #0044aa 100%)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 170, 255, 0.5), 0 0 40px rgba(0, 150, 255, 0.3)';
                e.currentTarget.style.background = 'linear-gradient(180deg, #001a4d 0%, #003399 100%)';
              }}
            >
              {loading ? 'AUTHENTICATING...' : 'LOGIN'}
            </button>

            {/* Sign up link */}
            <p className="text-center">
              <span className="text-white/70 text-[14px]">No account? </span>
              <Link 
                href="/signup" 
                className="text-white text-[14px] underline hover:text-cyan-300 transition-colors"
                style={{ textShadow: '0 0 8px rgba(0, 200, 255, 0.5)' }}
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      
      {/* Global CSS animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-float {
          animation: float var(--duration, 6s) ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
