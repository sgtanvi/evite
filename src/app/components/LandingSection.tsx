import { motion } from "motion/react";
import {
  OmSymbol,
  LotusFlower,
  GoldDivider,
  StarDivider,
  DiamondDivider,
  MandalaBg,
  TempleGoldBorder,
} from "./DecorativeElements";
import { GopuramSilhouette } from "./GopuramScene";
import { RSVPForm, type AttendanceChoice } from "./RSVPForm";

/** Static event details for the Kalyanam ceremony. */
const EVENT_DETAILS = {
  dayName: "Saturday",
  date: "March 21, 2026",
  time: "11:00 AM",
  venue: "Kedarnath Hall",
  venueSub: "Shiva-Vishnu Temple",
  address: "1232 Arrowhead Ave,\nLivermore, CA 94551",
} as const;

interface LandingSectionProps {
  onSubmit: (name: string, attendance: AttendanceChoice) => Promise<void>;
  isSubmitting: boolean;
}

export function LandingSection({ onSubmit, isSubmitting }: LandingSectionProps) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden"
      style={{
        background:
          "linear-gradient(170deg, #FBF5E0 0%, #F7EDCC 30%, #F2E0A8 60%, #F8EDD4 80%, #FBF5E0 100%)",
      }}
      aria-label="Srinivas Kalyanam Invitation"
    >
      {/* Paper texture overlay */}
      <PaperTexture />

      {/* Subtle background mandala watermark */}
      <MandalaBg />

      {/* Rangoli dot pattern */}
      <RangoliPattern />

      {/* Gold top border line */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 3, background: "linear-gradient(to right, transparent, #C9A32A 20%, #FFD700 50%, #C9A32A 80%, transparent)" }}
        aria-hidden="true"
      />

      {/* Gold bottom border line */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 3, background: "linear-gradient(to right, transparent, #C9A32A 20%, #FFD700 50%, #C9A32A 80%, transparent)" }}
        aria-hidden="true"
      />

      {/* Gopuram silhouette at top */}
      <motion.div
        className="w-full flex justify-center pt-6 pb-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
        aria-hidden="true"
      >
        <GopuramSilhouette />
      </motion.div>

      {/* Content container */}
      <div
        className="relative z-10 w-full flex flex-col items-center px-6 pb-14"
        style={{ maxWidth: 860 }}
      >
        {/* Om Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="mb-3 flex flex-col items-center"
        >
          <OmSymbol size={68} color="#B8960C" />
          <div
            className="mt-2"
            style={{
              width: 100,
              height: 1.5,
              background: "linear-gradient(to right, transparent, #D4AF37, transparent)",
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Family name */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(11px, 2.2vw, 14px)",
            color: "#7A5C14",
            letterSpacing: "0.22em",
            marginBottom: 4,
          }}
        >
          ✦ THE GUTTULA FAMILY ✦
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.78, ease: "easeOut" }}
          style={{
            fontFamily: "'Lora', serif",
            fontStyle: "italic",
            fontSize: "clamp(13px, 2.3vw, 16px)",
            color: "#6B4A18",
            marginBottom: 18,
          }}
        >
          cordially invites you to the sacred celebration of
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.88, ease: "easeOut" }}
          className="flex justify-center mb-5"
        >
          <GoldDivider width={360} />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.98, ease: "easeOut" }}
          className="text-center mb-1"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(22px, 5.5vw, 54px)",
            background: "linear-gradient(135deg, #8B0000 0%, #C0392B 30%, #8B0000 60%, #6B0000 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.2,
            letterSpacing: "0.05em",
            textShadow: "none",
            filter: "drop-shadow(0 2px 6px rgba(139,0,0,0.2))",
          }}
        >
          SRINIVAS KALYANAM
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mb-5"
        >
          <StarDivider />
        </motion.div>

        {/* Lotus emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 1.18, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          <LotusFlower size={96} color="#E8A0BF" innerColor="#C2185B" />
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.26, ease: "easeOut" }}
          className="text-center mb-1"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(13px, 2.8vw, 19px)",
            color: "#4B0082",
            letterSpacing: "0.07em",
            marginTop: "-18px",
            marginBottom: "28px",
          }}
        >
          Balaji Pooja: The Divine Wedding of Lord Srinivasa
        </motion.h2>

        {/* Event Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 1.42, ease: "easeOut" }}
          className="relative w-full mb-10"
          style={{ maxWidth: 580 }}
        >
          <div
            className="relative px-8 py-9"
            style={{
              background: "rgba(251,245,224,0.92)",
              border: "1px solid rgba(212,175,55,0.55)",
              boxShadow:
                "0 8px 40px rgba(180,130,20,0.12), 0 2px 8px rgba(0,0,0,0.05), inset 0 0 60px rgba(255,215,0,0.04)",
            }}
          >
            <TempleGoldBorder />

            <div className="relative z-10 flex flex-col items-center gap-5">
              {/* Date */}
              <EventDetailRow icon="📅" label="Date">
                <span style={{ color: "#5c0000" }}>
                  {EVENT_DETAILS.dayName},{" "}
                  <strong>{EVENT_DETAILS.date}</strong>
                </span>
              </EventDetailRow>

              <DiamondDivider />

              {/* Time */}
              <EventDetailRow icon="🕙" label="Muhurtham">
                <span style={{ color: "#5c0000" }}>
                  Commences at{" "}
                  <strong>{EVENT_DETAILS.time}</strong>
                </span>
              </EventDetailRow>

              <DiamondDivider />

              {/* Venue */}
              <EventDetailRow icon="🛕" label="Venue">
                <div className="text-center">
                  <div style={{ color: "#4B0082" }}>
                    <strong>{EVENT_DETAILS.venue}</strong>
                  </div>
                  <div style={{ color: "#4B0082", fontSize: "0.9em" }}>
                    {EVENT_DETAILS.venueSub}
                  </div>
                  <div
                    style={{
                      color: "#6b4c1a",
                      fontSize: "0.875em",
                      marginTop: 3,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {EVENT_DETAILS.address}
                  </div>
                </div>
              </EventDetailRow>
            </div>
          </div>
        </motion.div>

        {/* RSVP Form */}
        <div className="w-full">
          <RSVPForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          className="mt-8 text-center"
          style={{
            fontFamily: "'Lora', serif",
            fontStyle: "italic",
            fontSize: 13,
            color: "#9A7B2A",
          }}
        >
          Kindly RSVP by March 15, 2026
        </motion.p>
      </div>
    </section>
  );
}

function EventDetailRow({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "#B8960C",
        }}
      >
        {icon} {label.toUpperCase()}
      </span>
      <div
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "clamp(14px, 2.5vw, 16px)",
          color: "#3d1a00",
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function RangoliPattern() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ opacity: 0.055 }}
    >
      <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <pattern id="rangoli" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Center large dot */}
            <circle cx="40" cy="40" r="2.5" fill="#B8960C" />
            {/* Corner dots */}
            <circle cx="0" cy="0" r="1.8" fill="#B8960C" />
            <circle cx="80" cy="0" r="1.8" fill="#B8960C" />
            <circle cx="0" cy="80" r="1.8" fill="#B8960C" />
            <circle cx="80" cy="80" r="1.8" fill="#B8960C" />
            {/* Mid-edge dots */}
            <circle cx="40" cy="0" r="1.2" fill="#B8960C" />
            <circle cx="40" cy="80" r="1.2" fill="#B8960C" />
            <circle cx="0" cy="40" r="1.2" fill="#B8960C" />
            <circle cx="80" cy="40" r="1.2" fill="#B8960C" />
            {/* Small inner diamond ring */}
            <circle cx="52" cy="40" r="0.8" fill="#B8960C" />
            <circle cx="28" cy="40" r="0.8" fill="#B8960C" />
            <circle cx="40" cy="52" r="0.8" fill="#B8960C" />
            <circle cx="40" cy="28" r="0.8" fill="#B8960C" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rangoli)" />
      </svg>
    </div>
  );
}

function PaperTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.025 }}>
        <defs>
          <filter id="paperNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#paperNoise)" />
      </svg>
    </div>
  );
}