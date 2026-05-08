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
    <div className="relative flex items-center justify-center" style={{ width: '220px', height: '260px' }}>
      {/* Massive deep radial glow background */}
      <div className="absolute inset-0 rounded-full animate-pulse" style={{ 
        background: 'radial-gradient(circle, rgba(0, 180, 255, 0.5) 0%, rgba(0, 120, 220, 0.3) 40%, transparent 80%)',
        filter: 'blur(40px)',
        animationDuration: '2s'
      }} />
      
      {/* Secondary glow layer */}
      <div className="absolute inset-0 rounded-full animate-pulse" style={{ 
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, rgba(0, 150, 200, 0.2) 50%, transparent 90%)',
        filter: 'blur(60px)',
        animationDuration: '3s',
        animationDelay: '0.5s'
      }} />
      
      {/* Outer rotating scanner ring - thick and dramatic */}
      <div className="absolute w-[210px] h-[210px] rounded-full border-3 border-cyan-400/30 animate-[spin_18s_linear_infinite]" 
        style={{ 
          boxShadow: '0 0 50px rgba(0, 200, 255, 0.5), inset 0 0 50px rgba(0, 200, 255, 0.2), 0 0 100px rgba(0, 150, 255, 0.3)',
          borderStyle: 'dashed',
          borderWidth: '3px'
        }} 
      />
      
      {/* Second outer rotating scanner ring (opposite direction) */}
      <div className="absolute w-[190px] h-[190px] rounded-full border-2 border-cyan-300/40 animate-[spin_12s_linear_infinite_reverse]" 
        style={{ 
          boxShadow: '0 0 35px rgba(0, 212, 255, 0.6), inset 0 0 35px rgba(0, 212, 255, 0.15)',
          borderStyle: 'dotted'
        }} 
      />
      
      {/* Middle rotating scanner ring with segments */}
      <div className="absolute w-[170px] h-[170px] rounded-full border-2 border-cyan-400/50 animate-[spin_8s_linear_infinite]" 
        style={{ 
          boxShadow: '0 0 30px rgba(0, 212, 255, 0.7), inset 0 0 20px rgba(0, 200, 255, 0.25)',
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 212, 255, 0.4) 45deg, transparent 90deg, transparent 135deg, rgba(0, 212, 255, 0.4) 180deg, transparent 225deg, rgba(0, 212, 255, 0.4) 270deg, transparent 315deg)'
        }} 
      />
      
      {/* Inner scanner ring with different rotation */}
      <div className="absolute w-[150px] h-[150px] rounded-full border-2 border-cyan-400/60 animate-[spin_6s_linear_infinite_reverse]" 
        style={{ 
          boxShadow: '0 0 25px rgba(0, 212, 255, 0.8), inset 0 0 15px rgba(0, 200, 255, 0.3)',
          background: 'conic-gradient(from 45deg, transparent 0deg, rgba(0, 200, 255, 0.35) 30deg, transparent 60deg, transparent 120deg, rgba(0, 200, 255, 0.35) 150deg, transparent 180deg, transparent 210deg, rgba(0, 200, 255, 0.35) 240deg, transparent 270deg)'
        }} 
      />
      
      {/* Pulsing scanner line - horizontal */}
      <div className="absolute w-[140px] h-[140px] rounded-full overflow-hidden">
        <div className="absolute w-full h-2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-[scan_2.5s_ease-in-out_infinite]" 
          style={{ top: '50%', filter: 'blur(3px)', boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)' }} 
        />
      </div>
      
      {/* Pulsing scanner line - vertical */}
      <div className="absolute w-[140px] h-[140px] rounded-full overflow-hidden">
        <div className="absolute h-full w-2 bg-gradient-to-b from-transparent via-cyan-300 to-transparent animate-[scan_3s_ease-in-out_infinite]" 
          style={{ left: '50%', filter: 'blur(3px)', boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)', animationDelay: '1s' }} 
        />
      </div>
      
      {/* Concentric glowing rings radiating outward - more rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[240px] h-[240px] rounded-full border-2 border-cyan-400/15 animate-ping" style={{ animationDuration: '2.5s' }} />
        <div className="absolute w-[260px] h-[260px] rounded-full border border-cyan-400/12" />
        <div className="absolute w-[280px] h-[280px] rounded-full border border-cyan-400/10" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-400/8" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-cyan-400/5" />
        <div className="absolute w-[340px] h-[340px] rounded-full border border-cyan-400/3" />
      </div>
      
      {/* Orbiting particles */}
      <div className="absolute w-[200px] h-[200px] rounded-full animate-[spin_10s_linear_infinite]">
        <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full" style={{ transform: 'translateX(-50%)', boxShadow: '0 0 15px #00D4FF, 0 0 30px #00D4FF' }} />
      </div>
      <div className="absolute w-[180px] h-[180px] rounded-full animate-[spin_7s_linear_infinite_reverse]">
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-300 rounded-full" style={{ transform: 'translateX(-50%)', boxShadow: '0 0 10px #00BFFF, 0 0 20px #00BFFF' }} />
      </div>
      
      {/* Original RadarShieldLogo - RESTORED with stronger glow */}
      <div className="relative z-10" style={{ filter: 'drop-shadow(0 0 40px rgba(0, 200, 255, 1)) drop-shadow(0 0 80px rgba(0, 150, 255, 0.7)) drop-shadow(0 0 120px rgba(0, 100, 200, 0.5))' }}>
        <RadarShieldLogo size={120} />
      </div>
      
      {/* Holographic scan effect overlay - multiple layers */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" style={{ width: '130px', height: '130px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent animate-[scan_1.5s_linear_infinite]" />
      </div>
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" style={{ width: '140px', height: '140px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="absolute w-full h-full bg-gradient-to-t from-transparent via-cyan-400/10 to-transparent animate-[scan_2s_linear_infinite_reverse]" />
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
    { delay: 0, duration: 4, size: 5, top: '8%', left: '12%', color: '#00D4FF' },
    { delay: 1, duration: 5, size: 4, top: '18%', left: '82%', color: '#00BFFF' },
    { delay: 0.5, duration: 6, size: 6, top: '12%', left: '58%', color: '#00CFFF' },
    { delay: 2, duration: 4.5, size: 4, top: '28%', left: '22%', color: '#0099FF' },
    { delay: 1.5, duration: 5.5, size: 5, top: '38%', left: '88%', color: '#00D4FF' },
    { delay: 0.8, duration: 4.2, size: 3, top: '48%', left: '8%', color: '#00BFFF' },
    { delay: 2.2, duration: 6, size: 6, top: '58%', left: '72%', color: '#00CFFF' },
    { delay: 1.2, duration: 4.8, size: 4, top: '68%', left: '28%', color: '#0099FF' },
    { delay: 0.3, duration: 5.2, size: 5, top: '78%', left: '78%', color: '#00D4FF' },
    { delay: 1.8, duration: 4.6, size: 4, top: '22%', left: '42%', color: '#00BFFF' },
    { delay: 2.5, duration: 5.8, size: 3, top: '42%', left: '52%', color: '#00CFFF' },
    { delay: 0.6, duration: 4.4, size: 5, top: '62%', left: '18%', color: '#0099FF' },
    { delay: 1.4, duration: 5, size: 4, top: '82%', left: '92%', color: '#00D4FF' },
    { delay: 2, duration: 4.2, size: 6, top: '3%', left: '38%', color: '#00BFFF' },
    { delay: 0.9, duration: 5.5, size: 3, top: '88%', left: '48%', color: '#00CFFF' },
    { delay: 1.6, duration: 4.8, size: 4, top: '32%', left: '3%', color: '#0099FF' },
    { delay: 2.3, duration: 5.3, size: 5, top: '72%', left: '62%', color: '#00D4FF' },
    { delay: 0.4, duration: 4.7, size: 3, top: '52%', left: '97%', color: '#00BFFF' },
    { delay: 0.2, duration: 5.5, size: 4, top: '15%', left: '35%', color: '#00D4FF' },
    { delay: 1.1, duration: 4.9, size: 5, top: '45%', left: '68%', color: '#00CFFF' },
    { delay: 1.9, duration: 5.1, size: 3, top: '65%', left: '38%', color: '#0099FF' },
    { delay: 0.7, duration: 4.3, size: 4, top: '85%', left: '15%', color: '#00D4FF' },
    { delay: 2.1, duration: 5.7, size: 5, top: '25%', left: '75%', color: '#00BFFF' },
    { delay: 1.3, duration: 4.5, size: 3, top: '55%', left: '85%', color: '#00CFFF' },
    { delay: 0.1, duration: 5.4, size: 6, top: '5%', left: '55%', color: '#0099FF' },
  ];

  const networkNodes = [
    { x1: '12%', y1: '8%', x2: '22%', y2: '18%', delay: 0 },
    { x1: '22%', y1: '18%', x2: '42%', y2: '28%', delay: 0.5 },
    { x1: '42%', y1: '28%', x2: '58%', y2: '13%', delay: 1 },
    { x1: '58%', y1: '13%', x2: '78%', y2: '18%', delay: 1.5 },
    { x1: '78%', y1: '18%', x2: '88%', y2: '38%', delay: 0.3 },
    { x1: '8%', y1: '48%', x2: '28%', y2: '58%', delay: 0.8 },
    { x1: '28%', y1: '58%', x2: '48%', y2: '43%', delay: 1.2 },
    { x1: '48%', y1: '43%', x2: '68%', y2: '68%', delay: 1.8 },
    { x1: '68%', y1: '68%', x2: '83%', y2: '78%', delay: 0.6 },
    { x1: '18%', y1: '78%', x2: '38%', y2: '83%', delay: 1.4 },
    { x1: '38%', y1: '83%', x2: '58%', y2: '88%', delay: 2 },
    { x1: '3%', y1: '28%', x2: '13%', y2: '38%', delay: 0.2 },
    { x1: '83%', y1: '48%', x2: '93%', y2: '58%', delay: 1 },
    { x1: '33%', y1: '73%', x2: '53%', y2: '63%', delay: 1.6 },
    { x1: '15%', y1: '35%', x2: '35%', y2: '45%', delay: 0.4 },
    { x1: '65%', y1: '55%', x2: '85%', y2: '65%', delay: 1.1 },
    { x1: '45%', y1: '15%', x2: '65%', y2: '25%', delay: 0.7 },
    { x1: '25%', y1: '65%', x2: '45%', y2: '75%', delay: 1.3 },
    { x1: '55%', y1: '85%', x2: '75%', y2: '95%', delay: 0.9 },
    { x1: '5%', y1: '55%', x2: '25%', y2: '65%', delay: 1.7 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient layers - enhanced */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse at 15% 25%, rgba(0, 80, 140, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 75%, rgba(0, 60, 120, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(0, 40, 100, 0.2) 0%, transparent 70%),
          radial-gradient(ellipse at 70% 30%, rgba(0, 100, 180, 0.25) 0%, transparent 40%),
          radial-gradient(ellipse at 30% 80%, rgba(0, 50, 110, 0.2) 0%, transparent 45%)
        `
      }} />
      
      {/* Digital scan lines effect - enhanced */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.15) 2px, rgba(0, 212, 255, 0.15) 4px)',
        pointerEvents: 'none'
      }} />
      
      {/* Horizontal scan lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        background: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0, 180, 255, 0.08) 3px, rgba(0, 180, 255, 0.08) 6px)',
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
      
      {/* Circuit board pattern overlay - enhanced */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.12]" preserveAspectRatio="none">
        <pattern id="circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M10 50 L30 50 L30 30 L50 30" fill="none" stroke="#00D4FF" strokeWidth="0.6" />
          <path d="M50 10 L50 30 L70 30 L70 50" fill="none" stroke="#00D4FF" strokeWidth="0.6" />
          <path d="M30 70 L50 70 L50 90 L70 90" fill="none" stroke="#00D4FF" strokeWidth="0.6" />
          <path d="M90 30 L90 50 L70 50 L70 70" fill="none" stroke="#00D4FF" strokeWidth="0.6" />
          <circle cx="30" cy="50" r="2.5" fill="#00D4FF" />
          <circle cx="50" cy="30" r="2.5" fill="#00D4FF" />
          <circle cx="70" cy="50" r="2.5" fill="#00D4FF" />
          <circle cx="50" cy="70" r="2.5" fill="#00D4FF" />
          <circle cx="90" cy="30" r="2.5" fill="#00D4FF" />
          <circle cx="70" cy="90" r="2.5" fill="#00D4FF" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
      
      {/* Hexagonal grid overlay */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.05]" preserveAspectRatio="none">
        <pattern id="hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <path d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z" fill="none" stroke="#00D4FF" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>
      
      {/* Animated corner accents - enhanced with glow */}
      <div className="absolute top-0 left-0 w-48 h-48">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d="M0 40 L0 0 L40 0" fill="none" stroke="rgba(0, 200, 255, 0.5)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 200, 255, 0.8))' }} />
          <path d="M0 60 L0 0 L60 0" fill="none" stroke="rgba(0, 200, 255, 0.25)" strokeWidth="1.5" />
          <path d="M0 50 L0 0 L50 0" fill="none" stroke="rgba(0, 200, 255, 0.15)" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-48 h-48">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d="M100 40 L100 0 L60 0" fill="none" stroke="rgba(0, 200, 255, 0.5)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 200, 255, 0.8))' }} />
          <path d="M100 60 L100 0 L40 0" fill="none" stroke="rgba(0, 200, 255, 0.25)" strokeWidth="1.5" />
          <path d="M100 50 L100 0 L50 0" fill="none" stroke="rgba(0, 200, 255, 0.15)" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d="M0 60 L0 100 L40 100" fill="none" stroke="rgba(0, 200, 255, 0.5)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 200, 255, 0.8))' }} />
          <path d="M0 40 L0 100 L60 100" fill="none" stroke="rgba(0, 200, 255, 0.25)" strokeWidth="1.5" />
          <path d="M0 50 L0 100 L50 100" fill="none" stroke="rgba(0, 200, 255, 0.15)" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d="M100 60 L100 100 L60 100" fill="none" stroke="rgba(0, 200, 255, 0.5)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 200, 255, 0.8))' }} />
          <path d="M100 40 L100 100 L40 100" fill="none" stroke="rgba(0, 200, 255, 0.25)" strokeWidth="1.5" />
          <path d="M100 50 L100 100 L50 100" fill="none" stroke="rgba(0, 200, 255, 0.15)" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Additional floating UI particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF' }} />
      <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" style={{ boxShadow: '0 0 8px #00BFFF, 0 0 16px #00BFFF', animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 6px #00D4FF, 0 0 12px #00D4FF', animationDelay: '1s' }} />
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
          linear-gradient(180deg, #00030a 0%, #010818 20%, #020B2D 40%, #031540 60%, #021035 80%, #010818 100%)
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
          {/* Ambient glow behind form - enhanced */}
          <div 
            className="absolute -inset-6 rounded-[40px] blur-3xl opacity-70 animate-pulse"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 180, 255, 0.35) 0%, rgba(0, 120, 220, 0.2) 40%, rgba(0, 80, 180, 0.1) 70%, transparent 100%)',
              animationDuration: '4s'
            }}
          />
          
          {/* Glassmorphism form card - enhanced */}
          <form 
            onSubmit={handleLogin} 
            className="relative w-full flex flex-col px-8 py-10 rounded-[32px]"
            style={{ 
              background: 'linear-gradient(135deg, rgba(8, 25, 80, 0.7) 0%, rgba(5, 18, 60, 0.6) 30%, rgba(3, 15, 50, 0.5) 50%, rgba(5, 18, 60, 0.6) 70%, rgba(8, 25, 80, 0.7) 100%)',
              backdropFilter: 'blur(30px)',
              border: '2px solid rgba(0, 200, 255, 0.35)',
              boxShadow: `
                0 0 50px rgba(0, 150, 255, 0.3),
                0 0 100px rgba(0, 100, 200, 0.15),
                0 0 150px rgba(0, 80, 180, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.15),
                inset 0 -1px 0 rgba(0, 0, 0, 0.3)
              `
            }}
          >
            {/* Subtle holographic shimmer overlay - enhanced */}
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 30%, rgba(0, 212, 255, 0.05) 50%, transparent 70%)',
              }}
            />
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none animate-shimmer"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.08) 50%, transparent 100%)',
                opacity: 0.5
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
                    background: 'linear-gradient(135deg, rgba(0, 35, 90, 0.8) 0%, rgba(0, 25, 70, 0.7) 100%)',
                    border: focusedField === 'email' 
                      ? '2.5px solid #00D4FF' 
                      : '2px solid rgba(0, 200, 255, 0.5)',
                    boxShadow: focusedField === 'email'
                      ? '0 0 25px rgba(0, 212, 255, 0.8), 0 0 50px rgba(0, 150, 255, 0.4), 0 0 75px rgba(0, 100, 200, 0.2), inset 0 0 25px rgba(0, 200, 255, 0.08)'
                      : '0 0 15px rgba(0, 212, 255, 0.3), 0 0 30px rgba(0, 150, 255, 0.15), inset 0 0 20px rgba(0, 100, 200, 0.08)',
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
                
                {/* Focus glow ring animation - enhanced */}
                {focusedField === 'email' && (
                  <div 
                    className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
                    style={{
                      boxShadow: '0 0 40px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 150, 255, 0.3)',
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
                    background: 'linear-gradient(135deg, rgba(0, 35, 90, 0.8) 0%, rgba(0, 25, 70, 0.7) 100%)',
                    border: focusedField === 'password' 
                      ? '2.5px solid #00D4FF' 
                      : '2px solid rgba(0, 200, 255, 0.5)',
                    boxShadow: focusedField === 'password'
                      ? '0 0 25px rgba(0, 212, 255, 0.8), 0 0 50px rgba(0, 150, 255, 0.4), 0 0 75px rgba(0, 100, 200, 0.2), inset 0 0 25px rgba(0, 200, 255, 0.08)'
                      : '0 0 15px rgba(0, 212, 255, 0.3), 0 0 30px rgba(0, 150, 255, 0.15), inset 0 0 20px rgba(0, 100, 200, 0.08)',
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
                
                {/* Focus glow ring - enhanced */}
                {focusedField === 'password' && (
                  <div 
                    className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
                    style={{
                      boxShadow: '0 0 40px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 150, 255, 0.3)',
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

            {/* PREMIUM LOGIN BUTTON — Deep glossy gradient with strong neon glow - enhanced */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full h-[64px] rounded-full text-white font-bold text-[17px] tracking-[3px] uppercase 
                transition-all duration-300 ease-out overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed mt-4"
              style={{ 
                background: 'linear-gradient(135deg, #00154d 0%, #003399 25%, #0055cc 50%, #003399 75%, #00154d 100%)',
                border: '3px solid #00D4FF',
                boxShadow: `
                  0 0 25px rgba(0, 212, 255, 0.8),
                  0 0 50px rgba(0, 150, 255, 0.5),
                  0 0 75px rgba(0, 100, 200, 0.3),
                  0 0 100px rgba(0, 80, 180, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.25),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.4)
                `,
                textShadow: '0 0 15px rgba(0, 212, 255, 1), 0 0 30px rgba(0, 150, 255, 0.8)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = `
                    0 0 35px rgba(0, 212, 255, 1),
                    0 0 70px rgba(0, 150, 255, 0.7),
                    0 0 105px rgba(0, 100, 200, 0.5),
                    0 0 140px rgba(0, 80, 180, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.35),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.4)
                  `;
                  e.currentTarget.style.background = 'linear-gradient(135deg, #002266 0%, #0044aa 25%, #0066dd 50%, #0044aa 75%, #002266 100%)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `
                  0 0 25px rgba(0, 212, 255, 0.8),
                  0 0 50px rgba(0, 150, 255, 0.5),
                  0 0 75px rgba(0, 100, 200, 0.3),
                  0 0 100px rgba(0, 80, 180, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.25),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.4)
                `;
                e.currentTarget.style.background = 'linear-gradient(135deg, #00154d 0%, #003399 25%, #0055cc 50%, #003399 75%, #00154d 100%)';
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
