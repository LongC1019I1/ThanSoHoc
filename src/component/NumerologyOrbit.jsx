import { sparklePath } from "./decorPaths";

// Thứ tự theo ảnh thiết kế: 9 ở đỉnh, theo chiều kim đồng hồ 2 → 8, rồi 1.
const ORDER = [9, 2, 3, 4, 5, 6, 7, 8, 1];
const C = 210;

const polar = (radius, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180;
  return [C + radius * Math.cos(rad), C + radius * Math.sin(rad)];
};

const triangle = (radius, startDeg) =>
  [0, 120, 240]
    .map((step, index) => {
      const [x, y] = polar(radius, startDeg + step);
      return `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join("") + "Z";

const SPARKLES = [
  [64, 92, 5],
  [358, 108, 6],
  [52, 330, 4],
  [362, 336, 5],
];

export default function NumerologyOrbit() {
  const nodes = ORDER.map((number, index) => {
    const angle = index * 40 - 90;
    return { number, angle, position: polar(160, angle) };
  });

  return (
    <svg className="numerology-orbit" viewBox="0 0 420 420" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="orbit-glow" r="0.5">
          <stop offset="0" stopColor="#9b6dff" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#7b4ae8" stopOpacity="0.16" />
          <stop offset="1" stopColor="#7b4ae8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gem-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5edff" />
          <stop offset="1" stopColor="#b48cff" />
        </linearGradient>
        <linearGradient id="gem-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#caa9ff" />
          <stop offset="1" stopColor="#6b3fd0" />
        </linearGradient>
        <linearGradient id="gem-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a5ce8" />
          <stop offset="1" stopColor="#35196f" />
        </linearGradient>
        <filter id="orbit-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <circle cx={C} cy={C} r="206" fill="url(#orbit-glow)" />

      <g stroke="currentColor">
        <circle cx={C} cy={C} r="200" strokeOpacity="0.35" />
        <circle cx={C} cy={C} r="188" strokeDasharray="1 7" strokeOpacity="0.7" />
        <circle cx={C} cy={C} r="160" strokeOpacity="0.6" />
        <circle cx={C} cy={C} r="122" strokeOpacity="0.45" />
        <circle cx={C} cy={C} r="62" strokeOpacity="0.4" />
        <path d={triangle(122, -90)} strokeOpacity="0.5" />
        <path d={triangle(122, 90)} strokeOpacity="0.5" />
        <path d="M210 0v14M210 406v14M0 210h14M406 210h14" strokeOpacity="0.5" />
        {nodes.map(({ angle }) => {
          const [x1, y1] = polar(62, angle);
          const [x2, y2] = polar(134, angle);
          return <path key={angle} d={`M${x1} ${y1}L${x2} ${y2}`} strokeOpacity="0.22" />;
        })}
      </g>

      <ellipse cx={C} cy={C} rx="44" ry="82" fill="#b48cff" opacity="0.5" filter="url(#orbit-soft)" />
      <g stroke="#f5edff" strokeOpacity="0.45" strokeWidth="0.8">
        <path d="M210 112L176 196L210 200Z" fill="url(#gem-mid)" />
        <path d="M210 112L210 200L244 196Z" fill="url(#gem-light)" />
        <path d="M176 196L210 306L210 200Z" fill="url(#gem-dark)" />
        <path d="M210 200L210 306L244 196Z" fill="url(#gem-mid)" />
      </g>
      <path d={sparklePath(210, 112, 12)} fill="#ffffff" opacity="0.9" />

      {nodes.map(({ number, position: [x, y] }) => (
        <g key={number}>
          <circle cx={x} cy={y} r="34" stroke="currentColor" strokeOpacity="0.3" />
          <circle cx={x} cy={y} r="29" className="orbit-node" />
          <text x={x} y={y} className="orbit-number" textAnchor="middle" dominantBaseline="central">
            {number}
          </text>
        </g>
      ))}

      <path d={sparklePath(210, 20, 16, 0.18)} fill="currentColor" />
      {SPARKLES.map(([x, y, r]) => (
        <path key={`${x}-${y}`} d={sparklePath(x, y, r)} fill="#ffffff" opacity="0.7" />
      ))}
    </svg>
  );
}
