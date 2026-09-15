import { sparklePath } from "./decorPaths";

// Họa tiết trang trí vẽ bằng SVG inline (không dùng file ảnh), đều aria-hidden.

export function CrescentMoon({ className = "", flip = false }) {
  return (
    <svg
      className={`decor-moon${flip ? " is-flipped" : ""} ${className}`}
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <path d="M26 3a17 17 0 1 0 0 34a19 19 0 0 1 0-34Z" fill="currentColor" />
    </svg>
  );
}

export function Ornament({ className = "" }) {
  return (
    <svg className={`decor-ornament ${className}`} viewBox="0 0 240 24" fill="none" aria-hidden="true">
      <path d="M0 12h96M144 12h96" stroke="currentColor" strokeOpacity=".55" />
      <circle cx="104" cy="12" r="1.8" fill="currentColor" />
      <circle cx="136" cy="12" r="1.8" fill="currentColor" />
      <path d="M123 4a8 8 0 1 0 0 16a9 9 0 0 1 0-16Z" fill="currentColor" />
    </svg>
  );
}

export function MoonPhases({ className = "" }) {
  return (
    <svg className={`decor-moon-phases ${className}`} viewBox="0 0 120 20" fill="none" aria-hidden="true">
      <path d="M12 3a8 8 0 0 0 0 14M108 3a8 8 0 0 1 0 14" stroke="currentColor" strokeWidth="1.2" />
      <path d="M32 4a6 6 0 0 0 0 12a7 7 0 0 1 0-12ZM88 4a6 6 0 0 1 0 12a7 7 0 0 0 0-12Z" fill="currentColor" />
      <circle cx="60" cy="10" r="6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

const FAR_RANGE =
  "M0 250L90 200L150 222L240 150L310 196L380 170L460 228L540 205L620 240L720 222L820 238L900 200L980 226L1060 160L1130 205L1210 135L1290 190L1360 172L1440 210V270H0Z";
const NEAR_LEFT = "M0 212L60 180L110 205L170 120L220 170L260 150L330 230L420 262L420 270H0Z";
const NEAR_RIGHT = "M1440 200L1380 150L1330 180L1260 96L1200 160L1150 146L1090 228L1000 262L1000 270H1440Z";

export function MysticLandscape({ className = "", idPrefix = "land" }) {
  const id = (name) => `${idPrefix}-${name}`;
  const shimmer = [
    [640, 284, 160],
    [670, 298, 100],
    [690, 312, 60],
    [705, 326, 30],
  ];

  return (
    <svg
      className={`decor-landscape ${className}`}
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id("far")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b2566" />
          <stop offset="1" stopColor="#1c1033" />
        </linearGradient>
        <linearGradient id={id("near")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#170c2a" />
          <stop offset="1" stopColor="#08040f" />
        </linearGradient>
        <linearGradient id={id("lake")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24153f" />
          <stop offset="1" stopColor="#10091f" />
        </linearGradient>
        <linearGradient id={id("fade")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#10091f" stopOpacity="0" />
          <stop offset="1" stopColor="#10091f" />
        </linearGradient>
        <radialGradient id={id("glow")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d7c2ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c4a8ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="720" cy="262" rx="600" ry="64" fill={`url(#${id("glow")})`} />
      <path d={FAR_RANGE} fill={`url(#${id("far")})`} />
      <path d={NEAR_LEFT} fill={`url(#${id("near")})`} />
      <path d={NEAR_RIGHT} fill={`url(#${id("near")})`} />
      <rect y="266" width="1440" height="94" fill={`url(#${id("lake")})`} />
      <g transform="translate(0 532) scale(1 -1)" opacity="0.35">
        <path d={FAR_RANGE} fill={`url(#${id("far")})`} />
        <path d={NEAR_LEFT} fill={`url(#${id("near")})`} />
        <path d={NEAR_RIGHT} fill={`url(#${id("near")})`} />
      </g>
      <ellipse cx="720" cy="270" rx="260" ry="4" fill="#efe4ff" opacity="0.28" />
      {shimmer.map(([x, y, width]) => (
        <rect key={y} x={x} y={y} width={width} height="1.5" rx="1" fill="#efe4ff" opacity="0.3" />
      ))}
      <rect width="1440" height="360" fill={`url(#${id("fade")})`} />
    </svg>
  );
}

const RING_DOTS = [
  [-120, 5],
  [-38, 4],
  [32, 6],
  [148, 3.5],
];

export function LifePathRing({ className = "" }) {
  return (
    <svg className={`decor-ring ${className}`} viewBox="0 0 240 240" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ring-glow" r="0.5">
          <stop offset="0" stopColor="#7b4ae8" stopOpacity="0.45" />
          <stop offset="0.7" stopColor="#7b4ae8" stopOpacity="0.12" />
          <stop offset="1" stopColor="#7b4ae8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="120" r="118" fill="url(#ring-glow)" />
      <circle cx="120" cy="120" r="112" stroke="currentColor" strokeOpacity="0.45" />
      <circle cx="120" cy="120" r="96" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="120" cy="120" r="84" stroke="currentColor" strokeOpacity="0.35" />
      {RING_DOTS.map(([angle, size]) => {
        const rad = (angle * Math.PI) / 180;
        const x = 120 + 112 * Math.cos(rad);
        const y = 120 + 112 * Math.sin(rad);
        return (
          <g key={angle}>
            <circle cx={x} cy={y} r={size + 4} fill="currentColor" opacity="0.18" />
            <circle cx={x} cy={y} r={size} fill="currentColor" />
          </g>
        );
      })}
      <g stroke="currentColor" strokeWidth="1.2" fill="#1d1030">
        <path d="M120 224c-12 0-24-4-32-12c10-2 22 2 32 12Z" />
        <path d="M120 224c12 0 24-4 32-12c-10-2-22 2-32 12Z" />
        <path d="M120 224c-8-6-14-16-14-26c8 4 13 14 14 26Z" />
        <path d="M120 224c8-6 14-16 14-26c-8 4-13 14-14 26Z" />
        <path d="M120 224c-6-8-6-22 0-32c6 10 6 24 0 32Z" />
      </g>
    </svg>
  );
}

export function StarEmblem({ className = "" }) {
  return (
    <svg className={`decor-star-emblem ${className}`} viewBox="0 0 120 160" fill="none" aria-hidden="true">
      <defs>
        <filter id="emblem-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <path d="M60 0v160M14 80h92" stroke="currentColor" strokeOpacity="0.3" />
      <circle cx="60" cy="80" r="34" stroke="currentColor" strokeOpacity="0.4" />
      <path d={sparklePath(60, 80, 44, 0.16)} fill="currentColor" opacity="0.5" filter="url(#emblem-blur)" />
      <path d={sparklePath(60, 80, 44, 0.16)} fill="currentColor" />
    </svg>
  );
}
