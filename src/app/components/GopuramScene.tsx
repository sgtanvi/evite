/** Gopuram scene — flat illustrated style:
 *  cream/beige pyramid tiers, terracotta panels, banana trees, birds.
 *  Replaces the old GopuramSilhouette from DecorativeElements.tsx
 */
export function GopuramSilhouette() {
  // ── Tier data: [x, y, w, h] centered at x=600 ──────────────────────────
  const mainTiers: [number, number, number, number][] = [
    [430, 220, 340, 40],
    [454, 183, 292, 38],
    [476, 150, 248, 34],
    [496, 121, 208, 30],
    [514,  96, 172, 26],
    [530,  75, 140, 22],
    [544,  58, 112, 18],
    [556,  44,  88, 15],
    [565,  33,  70, 12],
    [572,  24,  56, 10],
    [578,  16,  44,  9],
    [583,   9,  34,  8],
    [587,   3,  26,  7],
  ];

  const sideTierL: [number, number, number, number][] = [
    [230, 234, 160, 26],
    [246, 212, 128, 23],
    [260, 193, 100, 20],
    [272, 177,  76, 17],
    [282, 163,  56, 15],
    [290, 151,  40, 13],
    [296, 141,  28, 11],
    [301, 133,  18,  9],
    [305, 126,  10,  8],
  ];
  const sideTierR: [number, number, number, number][] = sideTierL.map(
    ([x, y, w, h]) => [1200 - x - w, y, w, h]
  );

  // ── Banana tree trunk ──────────────────────────────────────��─────────────
  const BTrunk = ({ x, h, w = 13 }: { x: number; h: number; w?: number }) => (
    <g>
      {/* Main body */}
      <path
        d={`M${x - w / 2},300 C${x - w / 2},${300 - h * 0.5} ${x - w / 2 + 3},${300 - h * 0.82} ${x - w / 2 + 1},${300 - h}`}
        stroke="#5C6E30"
        strokeWidth={w}
        fill="none"
        strokeLinecap="round"
        opacity="0.92"
      />
      {/* Dark shading stripe */}
      <path
        d={`M${x - w / 2 - 2},300 C${x - w / 2 - 2},${300 - h * 0.5} ${x - w / 2},${300 - h * 0.82} ${x - w / 2 - 1},${300 - h}`}
        stroke="#36421A"
        strokeWidth={w * 0.35}
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Leaf-scar rings */}
      {[0.27, 0.48, 0.68, 0.85].map((t, i) => (
        <ellipse
          key={i}
          cx={x - w / 2 + 1}
          cy={300 - h * t}
          rx={w * 0.68}
          ry={2.0}
          fill="none"
          stroke="#2C3812"
          strokeWidth="0.9"
          opacity="0.35"
        />
      ))}
    </g>
  );

  // ── One banana leaf in the scene ─────────────────────────────────────────
  const BLeaf = ({
    cx,
    cy,
    angle,
    len = 72,
    halfW = 19,
    col = "#1B5230",
  }: {
    cx: number;
    cy: number;
    angle: number;
    len?: number;
    halfW?: number;
    col?: string;
  }) => {
    const rad = (angle * Math.PI) / 180;
    // Tip droops slightly
    const tipX = cx + Math.cos(rad) * len;
    const tipY = cy + Math.sin(rad) * len + len * 0.16;
    const px = -Math.sin(rad) * halfW;
    const py =  Math.cos(rad) * halfW;
    const mx = cx + Math.cos(rad) * len * 0.48;
    const my = cy + Math.sin(rad) * len * 0.48 + len * 0.07;
    // 1 split on each edge
    const s1x = cx + Math.cos(rad) * len * 0.32 + px * 0.4;
    const s1y = cy + Math.sin(rad) * len * 0.32 + py * 0.4;
    const s2x = cx + Math.cos(rad) * len * 0.32 - px * 0.4;
    const s2y = cy + Math.sin(rad) * len * 0.32 - py * 0.4;

    return (
      <g>
        <path
          d={`M${cx},${cy}
              C${cx + Math.cos(rad)*len*0.25 + px*0.85},${cy + Math.sin(rad)*len*0.25 + py*0.85}
               ${mx + px*0.9},${my + py*0.9}
               ${tipX},${tipY}
              C${mx - px*0.9},${my - py*0.9}
               ${cx + Math.cos(rad)*len*0.25 - px*0.85},${cy + Math.sin(rad)*len*0.25 - py*0.85}
               ${cx},${cy}Z`}
          fill={col}
          opacity="0.88"
        />
        {/* midrib */}
        <path
          d={`M${cx},${cy} Q${mx},${my} ${tipX},${tipY}`}
          stroke="#A8D888"
          strokeWidth="1.1"
          fill="none"
          opacity="0.45"
          strokeLinecap="round"
        />
      </g>
    );
  };

  // ── Full banana tree ─────────────────────────────────────────────────────
  const SceneBananaTree = ({
    tx,
    leafAngles,
    trunkH,
    leafLen = 72,
    leafHW = 19,
    trunkW = 13,
  }: {
    tx: number;
    leafAngles: number[];
    trunkH: number;
    leafLen?: number;
    leafHW?: number;
    trunkW?: number;
  }) => {
    const crownY = 300 - trunkH;
    const cols = [
      "#163C22", "#1B5230", "#1E5C34",
      "#22663C", "#163C22", "#1A4D2C",
      "#226040", "#1B4D2C", "#186030",
    ];
    return (
      <g>
        <BTrunk x={tx} h={trunkH} w={trunkW} />
        {leafAngles.map((a, i) => (
          <BLeaf
            key={i}
            cx={tx - trunkW / 2 + 1}
            cy={crownY}
            angle={a}
            len={leafLen}
            halfW={leafHW}
            col={cols[i % cols.length]}
          />
        ))}
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 1200 300"
      aria-label="Hindu temple gopuram with banana trees"
      role="img"
      style={{ width: "100%", height: "auto", maxHeight: 260, display: "block" }}
    >
      <defs>
        <linearGradient id="gSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#FBF5E0" stopOpacity="0" />
          <stop offset="55%"  stopColor="#F7EDCC" stopOpacity="0" />
          <stop offset="100%" stopColor="#F7EDCC" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="gWall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#FEF2D8" />
          <stop offset="50%"  stopColor="#F5E4B0" />
          <stop offset="100%" stopColor="#ECD898" />
        </linearGradient>
        <linearGradient id="gWallAlt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#F8E8C0" />
          <stop offset="100%" stopColor="#EDD098" />
        </linearGradient>
        <linearGradient id="gTerra" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#D97848" />
          <stop offset="100%" stopColor="#AA5528" />
        </linearGradient>
        <linearGradient id="gStep" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#8EB4BE" />
          <stop offset="100%" stopColor="#5A8898" />
        </linearGradient>
        <linearGradient id="gGoldF" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#FFE566" />
          <stop offset="50%"  stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8960C" />
        </linearGradient>
        <linearGradient id="gGround" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#849855" />
          <stop offset="100%" stopColor="#4E6628" />
        </linearGradient>
      </defs>

      {/* ── GROUND ─────────────────────────────────────────────────────── */}
      <rect x="0"   y="278" width="1200" height="22" fill="url(#gGround)" opacity="0.65" />
      <rect x="0"   y="275" width="1200" height="4"  fill="#5A7038" opacity="0.55" />

      {/* ── BASE PLATFORM ──────────────────────────────────────────────── */}
      <rect x="185" y="258" width="830" height="18" fill="#EDD898" rx="1" />
      <rect x="185" y="258" width="830" height="2.5"  fill="#C8A840" opacity="0.5" />
      {/* Pilaster marks on base wall */}
      <rect x="195" y="238" width="810" height="21" fill="url(#gWall)" />
      <rect x="195" y="238" width="810" height="2"  fill="#C8A840" opacity="0.45" />
      {[210,255,300,355,410,470,530,580,625,670,725,780,840,895,940,990,1000].map((px, i) => (
        <rect key={i} x={px} y={238} width={7} height={21} fill="#D4AF37" opacity="0.1" />
      ))}

      {/* ── STEPS (blue-gray, centered) ────────────────────────────────── */}
      {[
        [513, 270, 174, 7],
        [526, 263, 148, 7],
        [538, 256, 124, 7],
      ].map(([sx, sy, sw, sh], i) => (
        <g key={i}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="url(#gStep)" rx="1" />
          <rect x={sx} y={sy} width={sw} height={1.5} fill="#A8C8D0" opacity="0.6" />
        </g>
      ))}

      {/* ── MAIN DOORWAY ───────────────────────────────────────────────── */}
      <path d="M554,276 L554,242 Q600,220 646,242 L646,276Z" fill="#2A1608" opacity="0.88" />
      <path d="M562,276 L562,245 Q600,226 638,245 L638,276Z" fill="#18080A" opacity="0.7" />
      {/* Gold arch trim */}
      <path d="M554,244 Q600,220 646,244" stroke="#D4AF37" strokeWidth="2" fill="none" opacity="0.75" />
      {/* Door side pilasters */}
      <rect x="548" y="243" width="8" height="34" fill="#C8A048" opacity="0.5" rx="1" />
      <rect x="644" y="243" width="8" height="34" fill="#C8A048" opacity="0.5" rx="1" />

      {/* ── LEFT SIDE TOWER ────────────────────────────────────────────── */}
      {sideTierL.map(([x, y, w, h], i) => {
        const nPanels = Math.max(1, Math.floor(w / 22));
        const pW = Math.min(11, w / nPanels - 5);
        return (
          <g key={`stL-${i}`}>
            <rect x={x} y={y} width={w} height={h} fill={i % 2 ? "url(#gWallAlt)" : "url(#gWall)"} />
            <rect x={x} y={y} width={w} height={2} fill="#C8A840" opacity="0.6" />
            <rect x={x} y={y + h - 3} width={w} height={3} fill="#A07830" opacity="0.3" />
            {pW >= 4 && Array.from({ length: nPanels }).map((_, j) => (
              <rect key={j} x={x + 4 + j * (w / nPanels)} y={y + 4}
                width={pW} height={h - 8} fill="url(#gTerra)" rx="1" opacity={i < 3 ? 0.8 : 0.65} />
            ))}
          </g>
        );
      })}
      {/* Left side tower finial */}
      <rect  x={306}  y={118} width={9}  height={9}  fill="#B09040" />
      <ellipse cx={310} cy={117} rx={8}   ry={5}    fill="url(#gGoldF)" />
      <ellipse cx={310} cy={112} rx={5}   ry={3.5}  fill="#FFE566" />
      <circle  cx={310} cy={109} r={3.2}            fill="url(#gGoldF)" />
      <circle  cx={310} cy={106} r={1.8}            fill="#FFD700" />
      {/* Left side door */}
      <path d="M281,276 L281,250 Q310,238 339,250 L339,276Z" fill="#2A1608" opacity="0.82" />
      <path d="M287,276 L287,252 Q310,243 333,252 L333,276Z" fill="#18080A" opacity="0.65" />
      <path d="M281,251 Q310,238 339,251" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.65" />

      {/* ── RIGHT SIDE TOWER ───────────────────────────────────────────── */}
      {sideTierR.map(([x, y, w, h], i) => {
        const nPanels = Math.max(1, Math.floor(w / 22));
        const pW = Math.min(11, w / nPanels - 5);
        return (
          <g key={`stR-${i}`}>
            <rect x={x} y={y} width={w} height={h} fill={i % 2 ? "url(#gWallAlt)" : "url(#gWall)"} />
            <rect x={x} y={y} width={w} height={2} fill="#C8A840" opacity="0.6" />
            <rect x={x} y={y + h - 3} width={w} height={3} fill="#A07830" opacity="0.3" />
            {pW >= 4 && Array.from({ length: nPanels }).map((_, j) => (
              <rect key={j} x={x + 4 + j * (w / nPanels)} y={y + 4}
                width={pW} height={h - 8} fill="url(#gTerra)" rx="1" opacity={i < 3 ? 0.8 : 0.65} />
            ))}
          </g>
        );
      })}
      {/* Right side tower finial */}
      <rect  x={885}  y={118} width={9}  height={9}  fill="#B09040" />
      <ellipse cx={890} cy={117} rx={8}   ry={5}    fill="url(#gGoldF)" />
      <ellipse cx={890} cy={112} rx={5}   ry={3.5}  fill="#FFE566" />
      <circle  cx={890} cy={109} r={3.2}            fill="url(#gGoldF)" />
      <circle  cx={890} cy={106} r={1.8}            fill="#FFD700" />
      {/* Right side door */}
      <path d="M861,276 L861,250 Q890,238 919,250 L919,276Z" fill="#2A1608" opacity="0.82" />
      <path d="M867,276 L867,252 Q890,243 913,252 L913,276Z" fill="#18080A" opacity="0.65" />
      <path d="M861,251 Q890,238 919,251" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.65" />

      {/* ── MAIN CENTRAL TOWER TIERS ───────────────────────────────────── */}
      {mainTiers.map(([x, y, w, h], i) => {
        const nPanels = Math.max(1, Math.floor(w / 30));
        const pW = Math.min(14, w / nPanels - 7);
        const pH = Math.max(4, h - 8);
        const isAlt = i % 2 === 1;
        return (
          <g key={`mt-${i}`}>
            <rect x={x} y={y} width={w} height={h} fill={isAlt ? "url(#gWallAlt)" : "url(#gWall)"} />
            {/* Top cornice line */}
            <rect x={x} y={y} width={w} height={2.2} fill="#C8A840" opacity="0.65" />
            {/* Bottom ledge shadow */}
            <rect x={x} y={y + h - 3} width={w} height={3} fill="#A07830" opacity="0.28" />
            {/* Terracotta panels */}
            {pW >= 4 && Array.from({ length: nPanels }).map((_, j) => {
              const panX = x + 5 + j * (w / nPanels);
              return (
                <rect key={j} x={panX} y={y + 4} width={pW} height={pH}
                  fill="url(#gTerra)" rx="1.5" opacity={isAlt ? 0.6 : 0.78} />
              );
            })}
            {/* Gold edge lines */}
            <line x1={x}     y1={y} x2={x}     y2={y + h} stroke="#D4AF37" strokeWidth="0.8" opacity="0.22" />
            <line x1={x + w} y1={y} x2={x + w} y2={y + h} stroke="#D4AF37" strokeWidth="0.8" opacity="0.22" />
          </g>
        );
      })}

      {/* ── MAIN TOWER FINIAL (kalasa) ─────────────────────────────────── */}
      <rect   x={597}  y={2}    width={7}  height={2}  fill="#B09040" />
      <ellipse cx={600} cy={4}   rx={11}    ry={6}      fill="url(#gGoldF)" />
      <ellipse cx={600} cy={0}   rx={7}     ry={4.5}    fill="#FFE566" />
      <circle  cx={600} cy={-4}  r={4.5}               fill="url(#gGoldF)" />
      <circle  cx={600} cy={-8}  r={2.5}               fill="#FFD700" />
      <circle  cx={600} cy={-11} r={1.5}               fill="#FFF0A0" />

      {/* ── BANANA TREES flanking the temple ───────────────────────────── */}
      {/* Far left background */}
      <SceneBananaTree
        tx={52} trunkH={78} trunkW={10}
        leafAngles={[-145, -115, -82, -50, -18, 14]}
        leafLen={54} leafHW={14}
      />
      {/* Near left back */}
      <SceneBananaTree
        tx={112} trunkH={105} trunkW={12}
        leafAngles={[-148, -118, -88, -58, -28, 4, 36]}
        leafLen={65} leafHW={17}
      />
      {/* Near left front */}
      <SceneBananaTree
        tx={162} trunkH={135} trunkW={14}
        leafAngles={[-155, -125, -95, -65, -35, -4, 28, 58]}
        leafLen={80} leafHW={21}
      />
      {/* Far right background */}
      <SceneBananaTree
        tx={1148} trunkH={78} trunkW={10}
        leafAngles={[-145, -115, -82, -50, -18, 14]}
        leafLen={54} leafHW={14}
      />
      {/* Near right back */}
      <SceneBananaTree
        tx={1088} trunkH={105} trunkW={12}
        leafAngles={[-148, -118, -88, -58, -28, 4, 36]}
        leafLen={65} leafHW={17}
      />
      {/* Near right front */}
      <SceneBananaTree
        tx={1038} trunkH={135} trunkW={14}
        leafAngles={[-155, -125, -95, -65, -35, -4, 28, 58]}
        leafLen={80} leafHW={21}
      />

      {/* ── BIRDS ──────────────────────────────────────────────────────── */}
      {[
        [310, 55, 1.9], [352, 40, 1.7], [390, 62, 1.6],
        [438, 34, 1.8], [472, 55, 1.5], [502, 25, 1.6],
        [698, 28, 1.6], [728, 48, 1.5], [762, 38, 1.8],
        [808, 58, 1.7], [848, 36, 1.6], [890, 50, 1.8],
        [238, 75, 1.4], [955, 68, 1.4],
      ].map(([bx, by, sw], i) => (
        <g key={`bird-${i}`}>
          <path
            d={`M${bx},${by} Q${bx + 10},${by - 8} ${bx + 20},${by}`}
            stroke="#3A2808" strokeWidth={sw} fill="none" strokeLinecap="round"
          />
          <path
            d={`M${bx + 20},${by} Q${bx + 30},${by - 7} ${bx + 40},${by}`}
            stroke="#3A2808" strokeWidth={sw} fill="none" strokeLinecap="round"
          />
        </g>
      ))}

      {/* ── BOTTOM FADE to page background ─────────────────────────────── */}
      <rect x="0" y="0" width="1200" height="300" fill="url(#gSky)" />
    </svg>
  );
}
