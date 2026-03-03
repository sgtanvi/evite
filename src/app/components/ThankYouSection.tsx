import { motion } from "motion/react";
import { LotusFlower, GoldDivider, DiamondDivider, MandalaBg } from "./DecorativeElements";
import { AddToCalendar } from "./AddToCalendar";

interface ThankYouSectionProps {
  response: "yes" | "no";
  guestName: string;
  onUpdateResponse: () => void;
}

export function ThankYouSection({ response, guestName, onUpdateResponse }: ThankYouSectionProps) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 px-6"
      style={{
        background:
          response === "yes"
            ? "linear-gradient(160deg, #5c0000 0%, #8B0000 30%, #6A0DAD 70%, #3d0060 100%)"
            : "linear-gradient(160deg, #FFF8DC 0%, #FFF0C8 40%, #F5E6A0 100%)",
      }}
      aria-label={response === "yes" ? "Thank you for attending" : "Thank you for your response"}
    >
      {/* Mandala background */}
      <div style={{ opacity: response === "yes" ? 0.12 : 0.06 }}>
        <MandalaBg />
      </div>

      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(to right, transparent, #D4AF37, #FFD700, #D4AF37, transparent)" }}
        aria-hidden="true"
      />

      {response === "yes" ? (
        <YesResponse guestName={guestName} />
      ) : (
        <NoResponse guestName={guestName} onUpdateResponse={onUpdateResponse} />
      )}

      {/* Decorative bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(to right, transparent, #D4AF37, #FFD700, #D4AF37, transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}

function YesResponse({ guestName }: { guestName: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center text-center"
      style={{ maxWidth: 680 }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Gold frame */}
      <div
        className="relative p-10 md:p-14 rounded-sm w-full"
        style={{
          border: "1.5px solid rgba(212,175,55,0.5)",
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 0 60px rgba(212,175,55,0.05)",
        }}
      >
        {/* Corner accents */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
          <GoldCorner key={pos} position={pos as any} />
        ))}

        {/* Pranams */}
        <motion.div variants={itemVariants} style={{ fontSize: 40, marginBottom: 8 }}>
          🙏
        </motion.div>

        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(22px, 4vw, 34px)",
            color: "#FFD700",
            letterSpacing: "0.06em",
            marginBottom: 6,
          }}
        >
          Dhanyavaadamulu
        </motion.h2>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Lora', serif",
            fontSize: 14,
            color: "rgba(255,220,150,0.85)",
            fontStyle: "italic",
            marginBottom: 24,
          }}
        >
          (Thank You)
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <GoldDivider width={280} />
        </motion.div>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "clamp(15px, 2.5vw, 18px)",
            color: "rgba(255,240,200,0.95)",
            lineHeight: 1.7,
            marginBottom: 6,
          }}
        >
          Dear {guestName || "Honored Guest"},
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "clamp(15px, 2.5vw, 18px)",
            color: "rgba(255,240,200,0.95)",
            lineHeight: 1.7,
            marginBottom: 28,
          }}
        >
          Your presence will grace this sacred occasion.
          <br />
          <span style={{ color: "#FFD700" }}>See you at the Kalyanam!</span>
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center mb-10">
          <LotusFlower size={70} color="#E8A0BF" innerColor="#C2185B" />
        </motion.div>

        {/* Calendar section */}
        <motion.div variants={itemVariants}>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 13,
              color: "rgba(255,220,150,0.8)",
              letterSpacing: "0.08em",
              marginBottom: 14,
            }}
          >
            SAVE THIS SACRED DATE
          </p>
          <AddToCalendar />
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center mt-10 mb-6">
          <DiamondDivider />
        </motion.div>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Lora', serif",
            fontStyle: "italic",
            fontSize: 14,
            color: "rgba(255,220,150,0.75)",
          }}
        >
          May Lord Venkateswara bless you and your family abundantly
        </motion.p>

        <motion.div variants={itemVariants} style={{ marginTop: 20 }}>
        </motion.div>
      </div>
    </motion.div>
  );
}

function NoResponse({
  guestName,
  onUpdateResponse,
}: {
  guestName: string;
  onUpdateResponse: () => void;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center text-center"
      style={{ maxWidth: 640 }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        className="relative p-10 md:p-14 rounded-sm w-full"
        style={{
          border: "1.5px solid rgba(212,175,55,0.6)",
          background: "rgba(255,252,240,0.92)",
          boxShadow: "0 12px 50px rgba(212,175,55,0.2), 0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Corner accents */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
          <GoldCorner key={pos} position={pos as any} dark />
        ))}

        <motion.div variants={itemVariants} style={{ fontSize: 36, marginBottom: 8 }}>
          🙏
        </motion.div>

        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(18px, 3.5vw, 28px)",
            color: "#8B0000",
            letterSpacing: "0.06em",
            lineHeight: 1.3,
            marginBottom: 16,
          }}
        >
          Thank You for Your Response
        </motion.h2>

        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <GoldDivider width={240} />
        </motion.div>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "clamp(15px, 2.5vw, 17px)",
            color: "#5c3d00",
            lineHeight: 1.8,
            marginBottom: 8,
          }}
        >
          Dear {guestName || "Honored Guest"},
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "clamp(15px, 2.5vw, 17px)",
            color: "#5c3d00",
            lineHeight: 1.8,
            marginBottom: 20,
          }}
        >
          We understand and sincerely appreciate your honesty.
          <br />
          You will be in our prayers on this auspicious day.
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <DiamondDivider />
        </motion.div>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Lora', serif",
            fontStyle: "italic",
            fontSize: "clamp(14px, 2vw, 16px)",
            color: "#6b4c1a",
            lineHeight: 1.8,
            marginBottom: 28,
          }}
        >
          If your plans change, please let us know.
          <br />
          We would be truly blessed to have you join us.
        </motion.p>

        <motion.div variants={itemVariants}>
          <button
            onClick={onUpdateResponse}
            className="px-6 py-3 rounded-sm transition-all duration-200 focus:outline-none focus-visible:ring-2"
            style={{
              background: "transparent",
              border: "1.5px solid #D4AF37",
              color: "#8B6914",
              fontFamily: "'Cinzel', serif",
              fontSize: 13,
              letterSpacing: "0.06em",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Update My Response
          </button>
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginTop: 32 }}>
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontStyle: "italic",
              fontSize: 14,
              color: "#8B6914",
              marginBottom: 12,
            }}
          >
            May you be showered with Lord Venkateswara's blessings
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function GoldCorner({
  position,
  dark = false,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  dark?: boolean;
}) {
  const baseColor = dark ? "#D4AF37" : "rgba(212,175,55,0.7)";
  const style: React.CSSProperties = {
    position: "absolute",
    width: 32,
    height: 32,
    ...(position.includes("top") ? { top: 0 } : { bottom: 0 }),
    ...(position.includes("left") ? { left: 0 } : { right: 0 }),
  };

  const transforms: Record<string, string> = {
    "top-left": "none",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1,-1)",
  };

  return (
    <div style={style} aria-hidden="true">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        style={{ transform: transforms[position] }}
      >
        <path d="M0,0 L32,0 L32,4 L4,4 L4,32 L0,32 Z" fill={baseColor} />
        <circle cx="8" cy="8" r="3" fill={baseColor} />
      </svg>
    </div>
  );
}