import { useEffect, useRef } from "react";

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  shape: "lotus" | "marigold" | "leaf";
}

const PETAL_COLORS = ["#FF8C00", "#D4AF37", "#CC3300", "#FF6030", "#FFB347", "#B8960C", "#E85C20"];
const PETAL_SHAPES: Petal["shape"][] = ["lotus", "marigold", "leaf"];

function createPetal(id: number): Petal {
  return {
    id,
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * 100,
    size: 8 + Math.random() * 14,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    speedX: (Math.random() - 0.5) * 0.8,
    speedY: 0.5 + Math.random() * 1.2,
    opacity: 0.4 + Math.random() * 0.4,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    shape: PETAL_SHAPES[Math.floor(Math.random() * PETAL_SHAPES.length)],
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate((petal.rotation * Math.PI) / 180);
  ctx.globalAlpha = petal.opacity;
  ctx.fillStyle = petal.color;

  if (petal.shape === "lotus") {
    // Lotus petal: teardrop shape
    ctx.beginPath();
    ctx.moveTo(0, -petal.size);
    ctx.bezierCurveTo(
      petal.size * 0.6, -petal.size * 0.5,
      petal.size * 0.6, petal.size * 0.5,
      0, petal.size * 0.3
    );
    ctx.bezierCurveTo(
      -petal.size * 0.6, petal.size * 0.5,
      -petal.size * 0.6, -petal.size * 0.5,
      0, -petal.size
    );
    ctx.fill();
  } else if (petal.shape === "marigold") {
    // Marigold petal: rounded rectangle
    const w = petal.size * 0.5;
    const h = petal.size;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, w / 2);
    ctx.fill();
  } else {
    // Leaf shape: small ellipse
    ctx.beginPath();
    ctx.ellipse(0, 0, petal.size * 0.35, petal.size * 0.7, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#2d8b2d";
    ctx.fill();
  }

  ctx.restore();
}

export function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number>(0);
  const nextIdRef = useRef(0);
  const spawnTimerRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initial petals
    for (let i = 0; i < 12; i++) {
      const petal = createPetal(nextIdRef.current++);
      petal.y = Math.random() * window.innerHeight; // spread initially
      petalsRef.current.push(petal);
    }

    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new petals
      if (timestamp - spawnTimerRef.current > 1400) {
        if (petalsRef.current.length < 18) {
          petalsRef.current.push(createPetal(nextIdRef.current++));
        }
        spawnTimerRef.current = timestamp;
      }

      // Update and draw petals
      petalsRef.current = petalsRef.current.filter((petal) => {
        petal.x += petal.speedX;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;

        // Remove if off-screen
        if (petal.y > canvas.height + 30) return false;

        drawPetal(ctx, petal);
        return true;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
      style={{ opacity: 0.6 }}
    />
  );
}