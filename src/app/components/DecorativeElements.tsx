/** Reusable decorative SVG elements inspired by South Indian temple art. */
import type { CSSProperties } from "react";

export function OmSymbol({ size = 64, color = "#D4AF37" }: { size?: number; color?: string }) {
  return (
    <div
      aria-label="Om"
      style={{
        fontSize: size,
        color,
        fontFamily: "serif",
        lineHeight: 1,
        textShadow: `0 0 ${size * 0.3}px ${color}88, 0 0 ${size * 0.6}px ${color}44`,
        userSelect: "none",
      }}
    >
      ॐ
    </div>
  );
}

export function LotusFlower({
  size = 80,
  color = "#D4AF37",
  innerColor = "#FF9933",
}: {
  size?: number;
  color?: string;
  innerColor?: string;
}) {
  // A realistic lotus: upright petals rising from a base, layered from back to front
  const cx = 60;
  const cy = 72;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-label="Lotus flower"
      role="img"
    >
      <defs>
        <radialGradient id="lotusOuter" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id="lotusInner" cx="50%" cy="85%" r="55%">
          <stop offset="0%" stopColor={innerColor} stopOpacity="1" />
          <stop offset="100%" stopColor={innerColor} stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="lotusCenterGrad" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="60%" stopColor={innerColor} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
        <radialGradient id="lotusSepal" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#4A7C59" />
          <stop offset="100%" stopColor="#1B4D2E" />
        </radialGradient>
      </defs>

      {/* ── WATER / BASE ── */}
      <ellipse cx={cx} cy={cy + 8} rx="30" ry="5" fill="#1B4D2E" opacity="0.18" />

      {/* ── STEM ── */}
      <path
        d={`M${cx},${cy + 7} C${cx - 2},${cy + 14} ${cx + 2},${cy + 20} ${cx},${cy + 26}`}
        stroke="#2C6B42"
        strokeWidth="2.5"
        fill="none"
        opacity="0.8"
      />

      {/* ── SEPALS (green base petals) ── */}
      {[-30, 0, 30].map((angle, i) => (
        <path
          key={`sep-${i}`}
          d={`M${cx},${cy} C${cx + Math.sin((angle * Math.PI) / 180) * 18},${cy - 10} ${cx + Math.sin((angle * Math.PI) / 180) * 22},${cy - 22} ${cx + Math.sin((angle * Math.PI) / 180) * 12},${cy - 30}`}
          stroke="#2C6B42"
          strokeWidth="1"
          fill="url(#lotusSepal)"
          opacity="0.55"
        />
      ))}

      {/* ── BACK OUTER PETALS (spread wide, low) ── */}
      {/* Far left */}
      <path
        d={`M${cx},${cy} C${cx - 28},${cy - 8} ${cx - 36},${cy - 30} ${cx - 22},${cy - 48}`}
        fill={color}
        opacity="0.45"
        strokeWidth="0.5"
        stroke={color}
      />
      {/* Far right */}
      <path
        d={`M${cx},${cy} C${cx + 28},${cy - 8} ${cx + 36},${cy - 30} ${cx + 22},${cy - 48}`}
        fill={color}
        opacity="0.45"
        strokeWidth="0.5"
        stroke={color}
      />
      {/* Extra far-left — splayed near base */}
      <path
        d={`M${cx},${cy} C${cx - 38},${cy - 2} ${cx - 50},${cy - 18} ${cx - 40},${cy - 36}`}
        fill={color}
        opacity="0.38"
        strokeWidth="0.5"
        stroke={color}
      />
      {/* Extra far-right — splayed near base */}
      <path
        d={`M${cx},${cy} C${cx + 38},${cy - 2} ${cx + 50},${cy - 18} ${cx + 40},${cy - 36}`}
        fill={color}
        opacity="0.38"
        strokeWidth="0.5"
        stroke={color}
      />
      {/* Low-left horizontal petal */}
      <path
        d={`M${cx},${cy + 2} C${cx - 42},${cy + 4} ${cx - 54},${cy - 8} ${cx - 44},${cy - 22}`}
        fill={color}
        opacity="0.3"
        strokeWidth="0.5"
        stroke={color}
      />
      {/* Low-right horizontal petal */}
      <path
        d={`M${cx},${cy + 2} C${cx + 42},${cy + 4} ${cx + 54},${cy - 8} ${cx + 44},${cy - 22}`}
        fill={color}
        opacity="0.3"
        strokeWidth="0.5"
        stroke={color}
      />
      {/* Mid-left back */}
      <path
        d={`M${cx},${cy} C${cx - 14},${cy - 12} ${cx - 20},${cy - 38} ${cx - 10},${cy - 54}`}
        fill={color}
        opacity="0.55"
        strokeWidth="0.5"
        stroke={color}
      />
      {/* Mid-right back */}
      <path
        d={`M${cx},${cy} C${cx + 14},${cy - 12} ${cx + 20},${cy - 38} ${cx + 10},${cy - 54}`}
        fill={color}
        opacity="0.55"
        strokeWidth="0.5"
        stroke={color}
      />

      {/* ── MIDDLE LAYER PETALS ── */}
      {/* Left */}
      <path
        d={`M${cx},${cy - 2} C${cx - 20},${cy - 14} ${cx - 24},${cy - 44} ${cx - 8},${cy - 60}`}
        fill={color}
        opacity="0.75"
        strokeWidth="0.6"
        stroke={color}
      />
      {/* Right */}
      <path
        d={`M${cx},${cy - 2} C${cx + 20},${cy - 14} ${cx + 24},${cy - 44} ${cx + 8},${cy - 60}`}
        fill={color}
        opacity="0.75"
        strokeWidth="0.6"
        stroke={color}
      />
      {/* Center-left */}
      <path
        d={`M${cx},${cy - 2} C${cx - 9},${cy - 20} ${cx - 10},${cy - 50} ${cx - 3},${cy - 64}`}
        fill={innerColor}
        opacity="0.72"
        strokeWidth="0.6"
        stroke={innerColor}
      />
      {/* Center-right */}
      <path
        d={`M${cx},${cy - 2} C${cx + 9},${cy - 20} ${cx + 10},${cy - 50} ${cx + 3},${cy - 64}`}
        fill={innerColor}
        opacity="0.72"
        strokeWidth="0.6"
        stroke={innerColor}
      />

      {/* ── FRONT INNER PETALS (upright, cupped, prominent) ── */}
      {/* Left inner */}
      <path
        d={`M${cx - 4},${cy} C${cx - 16},${cy - 18} ${cx - 16},${cy - 50} ${cx - 5},${cy - 66}`}
        fill={innerColor}
        opacity="0.62"
        strokeWidth="0.8"
        stroke={innerColor}
      />
      {/* Right inner */}
      <path
        d={`M${cx + 4},${cy} C${cx + 16},${cy - 18} ${cx + 16},${cy - 50} ${cx + 5},${cy - 66}`}
        fill={innerColor}
        opacity="0.9"
        strokeWidth="0.8"
        stroke={innerColor}
      />
      {/* Center upright petal */}
      <path
        d={`M${cx},${cy} C${cx - 5},${cy - 24} ${cx - 4},${cy - 56} ${cx},${cy - 70}`}
        fill="url(#lotusInner)"
        opacity="0.95"
        strokeWidth="0.8"
        stroke={innerColor}
      />

      {/* ── PETAL VEINS (subtle midrib lines) ── */}
      <line x1={cx} y1={cy - 2} x2={cx - 18} y2={cy - 52} stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
      <line x1={cx} y1={cy - 2} x2={cx + 18} y2={cy - 52} stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
      <line x1={cx} y1={cy - 2} x2={cx} y2={cy - 68} stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />

      {/* ── CENTER STAMENS ── */}
      <ellipse cx={cx} cy={cy - 10} rx="7" ry="5" fill="url(#lotusCenterGrad)" opacity="0.95" />
      {/* Stamen dots */}
      {[
        [cx, cy - 14],
        [cx - 4, cy - 12],
        [cx + 4, cy - 12],
        [cx - 5, cy - 9],
        [cx + 5, cy - 9],
      ].map(([sx, sy], i) => (
        <circle key={`stamen-${i}`} cx={sx} cy={sy} r="1.2" fill="#FFF8DC" opacity="0.9" />
      ))}
      <circle cx={cx} cy={cy - 10} r="3.5" fill="#FFF176" opacity="0.85" />
    </svg>
  );
}

export function GoldDivider({ width = 300 }: { width?: number }) {
  return (
    <svg
      width={width}
      height={24}
      viewBox={`0 0 ${width} 24`}
      aria-hidden="true"
      style={{ maxWidth: "100%" }}
    >
      <defs>
        <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="20%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FFD700" stopOpacity="1" />
          <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Main line */}
      <line x1="0" y1="12" x2={width} y2="12" stroke="url(#dividerGrad)" strokeWidth="1.5" />
      {/* Center diamond */}
      <polygon points={`${width / 2},6 ${width / 2 + 6},12 ${width / 2},18 ${width / 2 - 6},12`} fill="#D4AF37" />
      {/* Side dots */}
      {[-40, -20, 20, 40].map((offset, i) => (
        <circle
          key={i}
          cx={width / 2 + offset}
          cy={12}
          r={Math.abs(offset) === 20 ? 3 : 2}
          fill="#D4AF37"
          opacity="0.8"
        />
      ))}
      {/* Small diamonds flanking the center */}
      {[-55, 55].map((offset, i) => (
        <polygon
          key={i}
          points={`${width / 2 + offset},9 ${width / 2 + offset + 3},12 ${width / 2 + offset},15 ${width / 2 + offset - 3},12`}
          fill="#D4AF37"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

export function TempleGoldBorder() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Corner ornaments */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />
    </div>
  );
}

function CornerOrnament({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const transforms: Record<string, string> = {
    "top-left": "none",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1, -1)",
  };

  const positions: Record<string, CSSProperties> = {
    "top-left": { top: 0, left: 0 },
    "top-right": { top: 0, right: 0 },
    "bottom-left": { bottom: 0, left: 0 },
    "bottom-right": { bottom: 0, right: 0 },
  };

  return (
    <div
      className="absolute"
      style={{ ...positions[position], transform: transforms[position] }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
        <path d="M0,0 L60,0 L60,6 L6,6 L6,60 L0,60 Z" fill="#D4AF37" opacity="0.6" />
        <circle cx="12" cy="12" r="5" fill="#D4AF37" opacity="0.8" />
        <circle cx="12" cy="12" r="2.5" fill="#FFD700" />
        <path d="M18,6 L18,18 L6,18" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}

export function MandalaBg() {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(70vw, 600px)",
        height: "min(70vw, 600px)",
        opacity: 0.04,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Concentric rings */}
      {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((r, i) => (
        <circle
          key={i}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="#D4AF37"
          strokeWidth={i % 3 === 0 ? 2 : 1}
        />
      ))}
      {/* Radial lines */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={200 + Math.cos(rad) * 20}
            y1={200 + Math.sin(rad) * 20}
            x2={200 + Math.cos(rad) * 180}
            y2={200 + Math.sin(rad) * 180}
            stroke="#D4AF37"
            strokeWidth="0.5"
            opacity="0.8"
          />
        );
      })}
      {/* Petal shapes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={200 + Math.cos(angle) * 90}
            cy={200 + Math.sin(angle) * 90}
            rx="25"
            ry="50"
            fill="#D4AF37"
            opacity="0.6"
            transform={`rotate(${i * 45}, ${200 + Math.cos(angle) * 90}, ${200 + Math.sin(angle) * 90})`}
          />
        );
      })}
      {/* Center dot */}
      <circle cx="200" cy="200" r="8" fill="#D4AF37" />
    </svg>
  );
}

export function StarDivider() {
  return (
    <div
      className="flex items-center justify-center gap-2"
      aria-hidden="true"
      style={{ color: "#D4AF37" }}
    >
      <span style={{ fontSize: 10 }}>✦</span>
      <span style={{ fontSize: 14 }}>✦</span>
      <span style={{ fontSize: 10 }}>✦</span>
    </div>
  );
}

export function DiamondDivider() {
  return (
    <div className="flex items-center justify-center gap-1" aria-hidden="true">
      <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, #D4AF37)" }} />
      <div style={{ width: 6, height: 6, background: "#D4AF37", transform: "rotate(45deg)" }} />
      <div style={{ width: 8, height: 8, background: "#FFD700", transform: "rotate(45deg)" }} />
      <div style={{ width: 6, height: 6, background: "#D4AF37", transform: "rotate(45deg)" }} />
      <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, #D4AF37)" }} />
    </div>
  );
}
