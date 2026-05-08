// ─────────────────────────────────────────────
// Login Page — /login
//
// PREMIUM FUTURISTIC CYBERPUNK AI-SECURITY DESIGN
// Deep navy galaxy background, holographic effects,
// animated particles, neural networks, neon glows,
// and premium cyber-security aesthetics.
// ─────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import RadarShieldLogo from "@/components/RadarShieldLogo";

// ── Mail Icon with Neon Glow ──
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ── Lock Icon with Neon Glow ──
function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// ── Premium Futuristic Logo with AI Scanner Rings ──
function PremiumLogo() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: '200px', height: '240px' }}>
      {/* Deep radial glow background */}
      <div className="absolute inset-0 rounded-full animate-pulse" style={{ 
        background: 'radial-gradient(circle, rgba(0, 150, 255, 0.4) 0%, rgba(0, 100, 200, 0.2) 30%, transparent 70%)',
        filter: 'blur(20px)'
      }} />
      
      {/* Outer rotating scanner ring */}
      <div className="absolute w-[190px] h-[190px] rounded-full border-2 border-cyan-400/20 animate-[spin_20s_linear_infinite]" 
        style={{ 
          boxShadow: '0 0 30px rgba(0, 200, 255, 0.3), inset 0 0 30px rgba(0, 200, 255, 0.1)',
          borderStyle: 'dashed'
        }} 
      />
      
      {/* Middle rotating scanner ring (opposite direction) */}
      <div className="absolute w-[170px] h-[170px] rounded-full border border-cyan-300/30 animate-[spin_15s_linear_infinite_reverse]" 
        style={{ 
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
        }} 
      />
      
      {/* Inner scanner ring with segments */}
      <div className="absolute w-[150px] h-[150px] rounded-full border-2 border-cyan-400/40" 
        style={{ 
          boxShadow: '0 0 25px rgba(0, 212, 255, 0.5), inset 0 0 15px rgba(0, 200, 255, 0.2)',
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 212, 255, 0.3) 60deg, transparent 120deg, transparent 180deg, rgba(0, 212, 255, 0.3) 240deg, transparent 300deg)'
        }} 
      />
      
      {/* Pulsing scanner line */}
      <div className="absolute w-[140px] h-[140px] rounded-full overflow-hidden">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[scan_3s_ease-in-out_infinite]" 
          style={{ top: '50%', filter: 'blur(2px)' }} 
        />
      </div>
      
      {/* Concentric glowing rings radiating outward */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[220px] h-[220px] rounded-full border border-cyan-400/10 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute w-[240px] h-[240px] rounded-full border border-cyan-400/8" />
        <div className="absolute w-[260px] h-[260px] rounded-full border border-cyan-400/5" />
        <div className="absolute w-[280px] h-[280px] rounded-full border border-cyan-400/3" />
      </div>
      
      {/* Original RadarShieldLogo - RESTORED */}
      <div className="relative z-10" style={{ filter: 'drop-shadow(0 0 30px rgba(0, 200, 255, 0.8)) drop-shadow(0 0 60px rgba(0, 150, 255, 0.5))' }}>
        <RadarShieldLogo size={110} />
      </div>
      
      {/* Holographic scan effect overlay */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" style={{ width: '120px', height: '120px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-[scan_2s_linear_infinite]" />
      </div>
    </div>
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

// ── Premium Galaxy Cyberpunk Background ──
function GalaxyBackground() {
  const particles = [
    { delay: 0, duration: 4, size: 4, top: '10%', left: '15%', color: '#00D4FF' },
    { delay: 1, duration: 5, size: 3, top: '20%', left: '80%', color: '#00BFFF' },
    { delay: 0.5, duration: 6, size: 5, top: '15%', left: '60%', color: '#00CFFF' },
    { delay: 2, duration: 4.5, size: 3, top: '30%', left: '25%', color: '#0099FF' },
    { delay: 1.5, duration: 5.5, size: 4, top: '40%', left: '85%', color: '#00D4FF' },
    { delay: 0.8, duration: 4.2, size: 2, top: '50%', left: '10%', color: '#00BFFF' },
    { delay: 2.2, duration: 6, size: 5, top: '60%', left: '70%', color: '#00CFFF' },
    { delay: 1.2, duration: 4.8, size: 3, top: '70%', left: '30%', color: '#0099FF' },
    { delay: 0.3, duration: 5.2, size: 4, top: '80%', left: '75%', color: '#00D4FF' },
    { delay: 1.8, duration: 4.6, size: 3, top: '25%', left: '45%', color: '#00BFFF' },
    { delay: 2.5, duration: 5.8, size: 2, top: '45%', left: '55%', color: '#00CFFF' },
    { delay: 0.6, duration: 4.4, size: 4, top: '65%', left: '20%', color: '#0099FF' },
    { delay: 1.4, duration: 5, size: 3, top: '85%', left: '90%', color: '#00D4FF' },
    { delay: 2, duration: 4.2, size: 5, top: '5%', left: '40%', color: '#00BFFF' },
    { delay: 0.9, duration: 5.5, size: 2, top: '90%', left: '50%', color: '#00CFFF' },
    { delay: 1.6, duration: 4.8, size: 3, top: '35%', left: '5%', color: '#0099FF' },
    { delay: 2.3, duration: 5.3, size: 4, top: '75%', left: '65%', color: '#00D4FF' },
    { delay: 0.4, duration: 4.7, size: 2, top: '55%', left: '95%', color: '#00BFFF' },
  ];

  const networkNodes = [
    { x1: '15%', y1: '10%', x2: '25%', y2: '20%', delay: 0 },
    { x1: '25%', y1: '20%', x2: '45%', y2: '30%', delay: 0.5 },
    { x1: '45%', y1: '30%', x2: '60%', y2: '15%', delay: 1 },
    { x1: '60%', y1: '15%', x2: '80%', y2: '20%', delay: 1.5 },
    { x1: '80%', y1: '20%', x2: '90%', y2: '40%', delay: 0.3 },
    { x1: '10%', y1: '50%', x2: '30%', y2: '60%', delay: 0.8 },
    { x1: '30%', y1: '60%', x2: '50%', y2: '45%', delay: 1.2 },
    { x1: '50%', y1: '45%', x2: '70%', y2: '70%', delay: 1.8 },
    { x1: '70%', y1: '70%', x2: '85%', y2: '80%', delay: 0.6 },
    { x1: '20%', y1: '80%', x2: '40%', y2: '85%', delay: 1.4 },
    { x1: '40%', y1: '85%', x2: '60%', y2: '90%', delay: 2 },
    { x1: '5%', y1: '30%', x2: '15%', y2: '40%', delay: 0.2 },
    { x1: '85%', y1: '50%', x2: '95%', y2: '60%', delay: 1 },
    { x1: '35%', y1: '75%', x2: '55%', y2: '65%', delay: 1.6 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient layers */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(0, 60, 120, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(0, 40, 100, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(0, 30, 80, 0.15) 0%, transparent 70%)
        `
      }} />
      
      {/* Digital scan lines effect */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.1) 2px, rgba(0, 212, 255, 0.1) 4px)',
        pointerEvents: 'none'
      }} />
      
      {/* Animated network constellation */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 100, 200, 0)" />
            <stop offset="50%" stopColor="rgba(0, 200, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 100, 200, 0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {networkNodes.map((node, i) => (
          <NetworkLine key={i} {...node} />
        ))}
      </svg>
      
      {/* Floating glowing particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}
      
      {/* Circuit board pattern overlay */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none">
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M10 50 L30 50 L30 30 L50 30" fill="none" stroke="#00D4FF" strokeWidth="0.5" />
          <path d="M50 10 L50 30 L70 30 L70 50" fill="none" stroke="#00D4FF" strokeWidth="0.5" />
          <circle cx="30" cy="50" r="2" fill="#00D4FF" />
          <circle cx="50" cy="30" r="2" fill="#00D4FF" />
          <circle cx="70" cy="50" r="2" fill="#00D4FF" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
      
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-40 h-40">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d="M0 40 L0 0 L40 0" fill="none" stroke="rgba(0, 200, 255, 0.3)" strokeWidth="2" />
          <path d="M0 60 L0 0 L60 0" fill="none" stroke="rgba(0, 200, 255, 0.15)" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-40 h-40">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d="M100 40 L100 0 L60 0" fill="none" stroke="rgba(0, 200, 255, 0.3)" strokeWidth="2" />
          <path d="M100 60 L100 0 L40 0" fill="none" stroke="rgba(0, 200, 255, 0.15)" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-40 h-40">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d="M0 60 L0 100 L40 100" fill="none" stroke="rgba(0, 200, 255, 0.3)" strokeWidth="2" />
          <path d="M0 40 L0 100 L60 100" fill="none" stroke="rgba(0, 200, 255, 0.15)" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d="M100 60 L100 100 L60 100" fill="none" stroke="rgba(0, 200, 255, 0.3)" strokeWidth="2" />
          <path d="M100 40 L100 100 L40 100" fill="none" stroke="rgba(0, 200, 255, 0.15)" strokeWidth="1" />
        </svg>
      </div>
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
    /* ── Full-screen deep space galaxy background ── */
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `
          linear-gradient(180deg, #010614 0%, #020B2D 30%, #031540 70%, #020B2D 100%)
        `
      }}
    >
      <GalaxyBackground />
      
      {/* Main content container with holographic centering */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4" 
        style={{ 
          paddingTop: '40px', 
          paddingBottom: '40px',
        }}>
        
        {/* ── Premium AI Scanner Logo Area ── */}
        <div className="animate-fade-in" style={{ marginBottom: '48px' }}>
          <PremiumLogo />
        </div>

        {/* ── Holographic Glassmorphism Form Container ── */}
        <div 
          className="relative w-full max-w-[380px] animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          {/* Ambient glow behind form */}
          <div 
            className="absolute -inset-4 rounded-[40px] blur-3xl opacity-60"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 150, 255, 0.25) 0%, rgba(0, 100, 200, 0.1) 50%, transparent 70%)'
            }}
          />
          
          {/* Glassmorphism form card */}
          <form 
            onSubmit={handleLogin} 
            className="relative w-full flex flex-col px-8 py-10 rounded-[32px]"
            style={{ 
              background: 'linear-gradient(135deg, rgba(5, 20, 70, 0.6) 0%, rgba(3, 15, 50, 0.5) 50%, rgba(2, 10, 40, 0.6) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 200, 255, 0.25)',
              boxShadow: `
                0 0 40px rgba(0, 150, 255, 0.2),
                0 0 80px rgba(0, 100, 200, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
              `
            }}
          >
            {/* Subtle holographic shimmer overlay */}
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 40%, rgba(0, 212, 255, 0.03) 50%, transparent 60%)',
              }}
            />

            {/* Email field */}
            <div className="relative flex flex-col" style={{ marginBottom: '24px' }}>
              <label 
                className="text-cyan-100 text-[13px] font-medium tracking-wider uppercase text-left mb-2"
                style={{ 
                  paddingLeft: '16px',
                  textShadow: '0 0 10px rgba(0, 200, 255, 0.5)'
                }}
              >
                Email
              </label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="example@email.com"
                  className="w-full h-[56px] text-white text-[15px] rounded-full pl-5 pr-14 
                    focus:outline-none transition-all duration-300 ease-out
                    placeholder:text-cyan-300/40"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(0, 30, 80, 0.7) 0%, rgba(0, 20, 60, 0.6) 100%)',
                    border: focusedField === 'email' 
                      ? '2px solid #00D4FF' 
                      : '1.5px solid rgba(0, 200, 255, 0.4)',
                    boxShadow: focusedField === 'email'
                      ? '0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 150, 255, 0.3), inset 0 0 20px rgba(0, 200, 255, 0.05)'
                      : '0 0 10px rgba(0, 212, 255, 0.2), inset 0 0 15px rgba(0, 100, 200, 0.05)',
                  }}
                />
                {/* Glowing icon container */}
                <span 
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                  style={{ 
                    color: focusedField === 'email' ? '#00D4FF' : 'rgba(0, 212, 255, 0.6)',
                    filter: focusedField === 'email' ? 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.8))' : 'none'
                  }}
                >
                  <MailIcon />
                </span>
                
                {/* Focus glow ring animation */}
                {focusedField === 'email' && (
                  <div 
                    className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
                    style={{
                      boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
                    }}
                  />
                )}
              </div>
            </div>

            {/* Password field */}
            <div className="relative flex flex-col" style={{ marginBottom: '16px' }}>
              <label 
                className="text-cyan-100 text-[13px] font-medium tracking-wider uppercase text-left mb-2"
                style={{ 
                  paddingLeft: '16px',
                  textShadow: '0 0 10px rgba(0, 200, 255, 0.5)'
                }}
              >
                Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="••••••••"
                  className="w-full h-[56px] text-white text-[15px] rounded-full pl-5 pr-14 
                    focus:outline-none transition-all duration-300 ease-out
                    placeholder:text-cyan-300/40"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(0, 30, 80, 0.7) 0%, rgba(0, 20, 60, 0.6) 100%)',
                    border: focusedField === 'password' 
                      ? '2px solid #00D4FF' 
                      : '1.5px solid rgba(0, 200, 255, 0.4)',
                    boxShadow: focusedField === 'password'
                      ? '0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 150, 255, 0.3), inset 0 0 20px rgba(0, 200, 255, 0.05)'
                      : '0 0 10px rgba(0, 212, 255, 0.2), inset 0 0 15px rgba(0, 100, 200, 0.05)',
                  }}
                />
                {/* Glowing lock icon */}
                <span 
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                  style={{ 
                    color: focusedField === 'password' ? '#00D4FF' : 'rgba(0, 212, 255, 0.6)',
                    filter: focusedField === 'password' ? 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.8))' : 'none'
                  }}
                >
                  <LockIcon />
                </span>
                
                {/* Focus glow ring */}
                {focusedField === 'password' && (
                  <div 
                    className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
                    style={{
                      boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
                    }}
                  />
                )}
              </div>

              {/* Forget password with neon glow effect */}
              <div className="flex items-center justify-end mt-4">
                <div 
                  className="h-[1px] flex-1 mr-4"
                  style={{ 
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0, 200, 255, 0.3) 100%)'
                  }}
                />
                <Link
                  href="#"
                  className="text-cyan-200 text-[13px] font-normal transition-all duration-300 hover:text-white"
                  style={{ textShadow: '0 0 10px rgba(0, 200, 255, 0.5)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textShadow = '0 0 20px rgba(0, 212, 255, 1), 0 0 40px rgba(0, 150, 255, 0.8)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textShadow = '0 0 10px rgba(0, 200, 255, 0.5)';
                    e.currentTarget.style.color = 'rgba(0, 200, 255, 0.8)';
                  }}
                >
                  Forget Password
                </Link>
              </div>
            </div>

            {/* Error message with cyber styling */}
            {error && (
              <div 
                className="relative overflow-hidden rounded-xl mb-6 animate-fade-in"
                style={{
                  background: 'linear-gradient(135deg, rgba(200, 0, 50, 0.2) 0%, rgba(150, 0, 40, 0.15) 100%)',
                  border: '1px solid rgba(255, 50, 100, 0.4)',
                  boxShadow: '0 0 20px rgba(255, 0, 50, 0.2)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent animate-shimmer" />
                <p className="relative text-red-200 text-sm px-4 py-3 text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            {/* PREMIUM LOGIN BUTTON — Deep glossy gradient with strong neon glow */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full h-[60px] rounded-full text-white font-bold text-[16px] tracking-[3px] uppercase 
                transition-all duration-300 ease-out overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed mt-4"
              style={{ 
                background: 'linear-gradient(135deg, #001a4d 0%, #003d99 30%, #004db3 50%, #003d99 70%, #001a4d 100%)',
                border: '2px solid #00D4FF',
                boxShadow: `
                  0 0 20px rgba(0, 212, 255, 0.6),
                  0 0 40px rgba(0, 150, 255, 0.4),
                  0 0 60px rgba(0, 100, 200, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                `,
                textShadow: '0 0 10px rgba(0, 212, 255, 0.8)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = `
                    0 0 30px rgba(0, 212, 255, 0.9),
                    0 0 60px rgba(0, 150, 255, 0.6),
                    0 0 90px rgba(0, 100, 200, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                  `;
                  e.currentTarget.style.background = 'linear-gradient(135deg, #002666 0%, #004db3 30%, #0066cc 50%, #004db3 70%, #002666 100%)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `
                  0 0 20px rgba(0, 212, 255, 0.6),
                  0 0 40px rgba(0, 150, 255, 0.4),
                  0 0 60px rgba(0, 100, 200, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                `;
                e.currentTarget.style.background = 'linear-gradient(135deg, #001a4d 0%, #003d99 30%, #004db3 50%, #003d99 70%, #001a4d 100%)';
              }}
            >
              {/* Button shimmer effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  transform: 'translateX(-100%)',
                  animation: 'shimmer 2s infinite'
                }}
              />
              
              {/* Button glow pulse */}
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(0, 212, 255, 0.5)'
                }}
              />
              
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <span className="animate-pulse">AUTHENTICATING...</span>
                ) : (
                  'LOGIN'
                )}
              </span>
            </button>

            {/* Sign up link with neon glow */}
            <p className="text-center mt-8">
              <span className="text-cyan-200/70 text-[14px]">No account? </span>
              <Link 
                href="/signup" 
                className="text-white text-[14px] font-bold transition-all duration-300"
                style={{ 
                  textShadow: '0 0 10px rgba(0, 200, 255, 0.6)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = '0 0 20px rgba(0, 212, 255, 1), 0 0 40px rgba(0, 150, 255, 0.8)';
                  e.currentTarget.style.color = '#00D4FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = '0 0 10px rgba(0, 200, 255, 0.6)';
                  e.currentTarget.style.color = '#fff';
                }}
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
