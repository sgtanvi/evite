import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface BananaLeavesProps {
  visible: boolean;
}

/** A single banana leaf blade as an SVG path.
 *  Drawn in local space: stem at (0,0), blade extends to the RIGHT.
 *  Use a <g transform="rotate(deg, cx, cy) translate(cx, cy)"> wrapper.
 */
function Leaf({
  length = 260,
  halfW = 58,
  fill = "#1E5C34",
  fillLight = "#2E7A48",
  midribColor = "#B8DCA8",
  opacity = 1,
  splits = true,
}: {
  length?: number;
  halfW?: number;
  fill?: string;
  fillLight?: string;
  midribColor?: string;
  opacity?: number;
  splits?: boolean;
}) {
  const L = length;
  const W = halfW;

  // Top edge with 2 splits (cuts toward midrib), blade droops at tip
  const topPath = splits
    ? `M 0,0 C 30,${-W * 0.7} 70,${-W} 105,${-W * 0.97}
       L 112,${-W * 0.55} L 128,${-W * 0.97}
       C 160,${-W * 0.93} 200,${-W * 0.72} 220,${-W * 0.5}
       L 226,${-W * 0.28} L 238,${-W * 0.48}
       C ${L * 0.93},${-W * 0.2} ${L},${W * 0.2} ${L},${W * 0.45}`
    : `M 0,0 C 30,${-W * 0.7} 70,${-W} 120,${-W * 0.97}
       C 175,${-W * 0.9} 225,${-W * 0.55} ${L},${W * 0.45}`;

  // Bottom edge with 2 splits
  const botPath = splits
    ? `${L},${W * 0.45}
       C ${L * 0.95},${W * 0.85} ${L * 0.88},${W * 1.05} ${L * 0.8},${W * 1.08}
       L ${L * 0.76},${W * 0.78} L ${L * 0.7},${W * 1.1}
       C ${L * 0.55},${W * 1.12} ${L * 0.38},${W * 1.08} ${L * 0.28},${W * 0.95}
       L ${L * 0.24},${W * 0.68} L ${L * 0.18},${W * 0.97}
       C 55,${W * 0.82} 18,${W * 0.5} 0,0 Z`
    : `${L},${W * 0.45}
       C ${L * 0.9},${W * 0.95} ${L * 0.65},${W * 1.1} ${L * 0.35},${W * 1.0}
       C 55,${W * 0.82} 18,${W * 0.5} 0,0 Z`;

  // Vein positions (approx x along blade)
  const veinXs = [28, 52, 76, 100, 124, 148, 172, 196, 220, 244];

  return (
    <g opacity={opacity}>
      {/* Shadow side of blade (slightly darker, lower half) */}
      <path
        d={`M 0,0 ${botPath}`}
        fill={fill}
        opacity="0.9"
      />
      {/* Light side of blade (upper half) */}
      <path
        d={`${topPath} ${botPath}`}
        fill={fillLight}
        opacity="0.85"
      />
      {/* Full blade outline for consistent color */}
      <path
        d={`${topPath} ${botPath}`}
        fill={fill}
        opacity="0.6"
        stroke={fill}
        strokeWidth="0.8"
      />
      {/* Lateral veins */}
      {veinXs.map((x, i) => {
        const progress = x / L;
        // Width at this x position (approximate)
        const tW = progress < 0.15
          ? W * (progress / 0.15) * 0.97
          : progress < 0.8
          ? W * (0.97 - (progress - 0.15) * 0.1)
          : W * 0.85 * (1 - (progress - 0.8) / 0.2);
        const droop = progress > 0.5 ? (progress - 0.5) * W * 0.9 : 0;
        return (
          <line
            key={i}
            x1={x} y1={-tW * 0.88}
            x2={x} y2={tW * 1.0 + droop * 0.3}
            stroke="#0F3C20"
            strokeWidth="0.65"
            opacity="0.28"
          />
        );
      })}
      {/* Central midrib */}
      <path
        d={`M 0,0 C 80,${W * 0.08} 160,${W * 0.15} ${L},${W * 0.45}`}
        stroke={midribColor}
        strokeWidth="3.5"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      />
      {/* Midrib bright highlight */}
      <path
        d={`M 0,0 C 80,${W * 0.08} 160,${W * 0.15} ${L},${W * 0.45}`}
        stroke="#E0F0D0"
        strokeWidth="1.2"
        fill="none"
        opacity="0.25"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Marigold flower ornament */
function Marigold({ cx, cy, r = 9, colorA = "#FF7043", colorB = "#FFD700" }: {
  cx: number; cy: number; r?: number; colorA?: string; colorB?: string;
}) {
  return (
    <g>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, j) => (
        <ellipse
          key={j}
          cx={cx + Math.cos((a * Math.PI) / 180) * r}
          cy={cy + Math.sin((a * Math.PI) / 180) * r}
          rx="5" ry="3"
          fill={j % 2 === 0 ? colorA : "#FF9800"}
          opacity="0.92"
          transform={`rotate(${a + 90}, ${cx + Math.cos((a * Math.PI) / 180) * r}, ${cy + Math.sin((a * Math.PI) / 180) * r})`}
        />
      ))}
      <circle cx={cx} cy={cy} r="5.5" fill={colorB} opacity="0.98" />
      <circle cx={cx} cy={cy} r="2.8" fill="#FF9900" />
    </g>
  );
}

/** A complete banana tree, drawn in its own local space.
 *  The base of the trunk is at (0, 0); tree grows upward (negative Y).
 *  crownY is how high the crown sits (negative value, e.g. -580).
 */
function BananaTree({
  crownY = -560,
  trunkColor = "#5A6B30",
  trunkColorDark = "#38451A",
  leafAngles = [-130, -100, -72, -45, -20, 8, 35, 65],
  leafLengths,
  leafColors,
  withFlowers = true,
}: {
  crownY?: number;
  trunkColor?: string;
  trunkColorDark?: string;
  leafAngles?: number[];
  leafLengths?: number[];
  leafColors?: string[];
  withFlowers?: boolean;
}) {
  const cx = 0;
  const cy = crownY;
  const trunkH = Math.abs(crownY);

  const defaultLengths = leafAngles.map(() => 240 + Math.floor(Math.random() * 50));
  const lengths = leafLengths ?? defaultLengths;

  const defaultColors = [
    "#163C22", "#1B4D2C", "#1E5C34", "#22663C",
    "#1B5230", "#163C22", "#1E5C34", "#226040",
  ];
  const colors = leafColors ?? defaultColors;
  const lightColors = colors.map((c) =>
    c === "#163C22" ? "#2A6640"
    : c === "#1B4D2C" ? "#2E7248"
    : c === "#22663C" ? "#348C54"
    : "#2E7A48"
  );

  return (
    <g>
      {/* ── Trunk / pseudostem ── */}
      <defs>
        <linearGradient id={`trunk-${Math.abs(crownY)}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={trunkColorDark} />
          <stop offset="40%" stopColor={trunkColor} />
          <stop offset="70%" stopColor="#7A8C40" />
          <stop offset="100%" stopColor={trunkColorDark} />
        </linearGradient>
      </defs>

      {/* Main trunk body */}
      <path
        d={`M ${cx - 13},0 C ${cx - 14},${crownY * 0.4} ${cx - 11},${crownY * 0.75} ${cx - 9},${cy}
            C ${cx + 9},${cy} ${cx + 11},${crownY * 0.75} ${cx + 14},${crownY * 0.4} C ${cx + 13},0 Z`}
        fill={`url(#trunk-${Math.abs(crownY)})`}
      />

      {/* Leaf scar rings along trunk */}
      {Array.from({ length: Math.floor(trunkH / 80) }).map((_, i) => {
        const ry = crownY * 0.1 + (i * trunkH * 0.85) / Math.floor(trunkH / 80);
        return (
          <ellipse
            key={i}
            cx={cx} cy={ry}
            rx="13" ry="3.5"
            fill="none"
            stroke={trunkColorDark}
            strokeWidth="1.5"
            opacity="0.45"
          />
        );
      })}

      {/* Trunk highlight stripe */}
      <path
        d={`M ${cx - 4},${crownY * 0.08} C ${cx - 5},${crownY * 0.5} ${cx - 4},${crownY * 0.85} ${cx - 3},${cy}`}
        stroke="#A0B860"
        strokeWidth="3"
        fill="none"
        opacity="0.22"
        strokeLinecap="round"
      />

      {/* ── Leaves (back layer first, then front) ── */}
      {leafAngles.map((angle, i) => {
        const isBack = i < leafAngles.length / 2;
        const L = lengths[i] ?? 240;
        const col = colors[i % colors.length];
        const colLight = lightColors[i % lightColors.length];
        return (
          <g
            key={i}
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            opacity={isBack ? 0.82 : 0.95}
          >
            <g transform={`translate(${cx}, ${cy})`}>
              <Leaf
                length={L}
                halfW={isBack ? 54 : 60}
                fill={col}
                fillLight={colLight}
                midribColor="#B0D898"
                opacity={1}
                splits={true}
              />
            </g>
          </g>
        );
      })}

      {/* ── Flower bunch at crown (decorative marigolds) ── */}
      {withFlowers && (
        <>
          <Marigold cx={cx - 18} cy={cy + 30} r={8} colorA="#FF6D3B" colorB="#FFD700" />
          <Marigold cx={cx + 18} cy={cy + 25} r={7} colorA="#E65100" colorB="#FFC107" />
          <Marigold cx={cx}      cy={cy + 40} r={9} colorA="#FF8F00" colorB="#FFD700" />
        </>
      )}
    </g>
  );
}

/** LEFT side banana tree panel */
function LeftTreeSVG() {
  return (
    <svg
      viewBox="0 0 280 1000"
      preserveAspectRatio="xMaxYMax meet"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      {/* Back smaller tree (behind main) */}
      <g transform="translate(55, 1000) scale(0.78)">
        <BananaTree
          crownY={-520}
          trunkColor="#4A5A28"
          trunkColorDark="#2C3812"
          leafAngles={[-135, -105, -75, -50, -20, 12, 42]}
          leafLengths={[200, 220, 230, 215, 205, 195, 185]}
          leafColors={["#0F2E18", "#132E1A", "#163522", "#0F2A18", "#122818", "#163522", "#0F2E18"]}
          withFlowers={false}
        />
      </g>

      {/* Main front tree */}
      <g transform="translate(28, 1000)">
        <BananaTree
          crownY={-590}
          trunkColor="#5A6B30"
          trunkColorDark="#38451A"
          leafAngles={[-140, -112, -80, -52, -24, 6, 34, 64]}
          leafLengths={[220, 250, 265, 255, 248, 238, 225, 210]}
          leafColors={[
            "#163C22", "#1B4D2C", "#1E5C34", "#226040",
            "#1B5230", "#1E5C34", "#163C22", "#226040",
          ]}
          withFlowers={true}
        />
      </g>

      {/* Ground / soil mound at base */}
      <ellipse cx="35" cy="998" rx="48" ry="10" fill="#5C4020" opacity="0.55" />
      <ellipse cx="35" cy="1000" rx="60" ry="8" fill="#7A5828" opacity="0.4" />

      {/* Decorative marigold garland at the base */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Marigold
          key={i}
          cx={10 + i * 18}
          cy={985}
          r={6}
          colorA={i % 2 === 0 ? "#FF6D3B" : "#CC3300"}
          colorB="#FFD700"
        />
      ))}
    </svg>
  );
}

/** RIGHT side banana tree panel (mirrored) */
function RightTreeSVG() {
  return (
    <svg
      viewBox="0 0 280 1000"
      preserveAspectRatio="xMinYMax meet"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ transform: "scaleX(-1)" }}
    >
      {/* Back smaller tree */}
      <g transform="translate(55, 1000) scale(0.78)">
        <BananaTree
          crownY={-520}
          trunkColor="#4A5A28"
          trunkColorDark="#2C3812"
          leafAngles={[-135, -105, -75, -50, -20, 12, 42]}
          leafLengths={[200, 220, 230, 215, 205, 195, 185]}
          leafColors={["#0F2E18", "#132E1A", "#163522", "#0F2A18", "#122818", "#163522", "#0F2E18"]}
          withFlowers={false}
        />
      </g>

      {/* Main front tree */}
      <g transform="translate(28, 1000)">
        <BananaTree
          crownY={-590}
          trunkColor="#5A6B30"
          trunkColorDark="#38451A"
          leafAngles={[-140, -112, -80, -52, -24, 6, 34, 64]}
          leafLengths={[220, 250, 265, 255, 248, 238, 225, 210]}
          leafColors={[
            "#163C22", "#1B4D2C", "#1E5C34", "#226040",
            "#1B5230", "#1E5C34", "#163C22", "#226040",
          ]}
          withFlowers={true}
        />
      </g>

      <ellipse cx="35" cy="998" rx="48" ry="10" fill="#5C4020" opacity="0.55" />
      <ellipse cx="35" cy="1000" rx="60" ry="8" fill="#7A5828" opacity="0.4" />

      {[0, 1, 2, 3, 4].map((i) => (
        <Marigold
          key={i}
          cx={10 + i * 18}
          cy={985}
          r={6}
          colorA={i % 2 === 0 ? "#FF6D3B" : "#CC3300"}
          colorB="#FFD700"
        />
      ))}
    </svg>
  );
}

export function BananaLeaves({ visible }: BananaLeavesProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1280);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const treeWidth = isMobile ? 120 : isTablet ? 220 : 360;
  const hideLeft = -(treeWidth + 10);
  const hideRight = treeWidth + 10;

  return (
    <>
      {/* LEFT banana tree */}
      <motion.div
        className="fixed top-0 left-0 z-20 pointer-events-none"
        style={{ width: treeWidth, height: "100vh" }}
        initial={{ x: hideLeft }}
        animate={{ x: visible ? 0 : hideLeft }}
        transition={{ duration: visible ? 0.75 : 2.8, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <LeftTreeSVG />
      </motion.div>

      {/* RIGHT banana tree */}
      <motion.div
        className="fixed top-0 right-0 z-20 pointer-events-none"
        style={{ width: treeWidth, height: "100vh" }}
        initial={{ x: hideRight }}
        animate={{ x: visible ? 0 : hideRight }}
        transition={{ duration: visible ? 0.75 : 2.8, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <RightTreeSVG />
      </motion.div>
    </>
  );
}