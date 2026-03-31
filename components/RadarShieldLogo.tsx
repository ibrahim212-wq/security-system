// ─────────────────────────────────────────────
// RadarShieldLogo — Shared inline SVG logo
//
// Hexagonal shield with a radar/sonar design inside.
// Matches the teal-on-blue logo visible in the mobile mockup.
// Used on both the Login and Signup pages.
// ─────────────────────────────────────────────

interface RadarShieldLogoProps {
  size?: number;
}

export default function RadarShieldLogo({ size = 120 }: RadarShieldLogoProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Security System Logo"
    >
      {/* Outer hexagon body */}
      <polygon
        points="60,4 110,32 110,88 60,116 10,88 10,32"
        fill="#0d2d6b"
        stroke="#1e90ff"
        strokeWidth="3"
      />
      {/* Subtle inner glow ring */}
      <polygon
        points="60,4 110,32 110,88 60,116 10,88 10,32"
        fill="none"
        stroke="#00cfff"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Radar concentric circles */}
      <circle cx="60" cy="62" r="34" fill="none" stroke="#00cfff" strokeWidth="1.2" opacity="0.5" />
      <circle cx="60" cy="62" r="24" fill="none" stroke="#00cfff" strokeWidth="1.2" opacity="0.6" />
      <circle cx="60" cy="62" r="14" fill="none" stroke="#00cfff" strokeWidth="1.2" opacity="0.7" />
      <circle cx="60" cy="62" r="5"  fill="#00cfff" opacity="0.9" />

      {/* Radar sweep lines */}
      <line x1="60" y1="62" x2="60" y2="28"  stroke="#00cfff" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="62" x2="89" y2="79"  stroke="#00cfff" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="62" x2="31" y2="79"  stroke="#00cfff" strokeWidth="1" opacity="0.5" />

      {/* Filled sweep wedge */}
      <path
        d="M60,62 L60,28 A34,34 0 0,1 89,79 Z"
        fill="#00cfff"
        opacity="0.12"
      />

      {/* Target blip dot on outer ring */}
      <circle cx="82" cy="45" r="3" fill="#00cfff" opacity="0.9" />

      {/* Top shield notch */}
      <polygon
        points="60,4 75,14 60,24 45,14"
        fill="#1a4fbb"
        stroke="#1e90ff"
        strokeWidth="1.5"
      />
    </svg>
  );
}
