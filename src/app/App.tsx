import { useState, useEffect, useRef, useCallback } from "react";
import { BananaLeaves } from "./components/BananaLeaves";
import { LandingSection } from "./components/LandingSection";
import { ThankYouSection } from "./components/ThankYouSection";
import { FloatingPetals } from "./components/FloatingPetals";
import type { AttendanceChoice } from "./components/RSVPForm";

type AppPhase = "idle" | "submitting" | "confirmed";

interface RSVPData {
  name: string;
  attendance: AttendanceChoice;
}

/** Simulates a backend RSVP submission. Replace with a real API call. */
async function submitRSVP(name: string, attendance: AttendanceChoice): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 1600));
  // In production, replace with: await fetch('/api/rsvp', { method: 'POST', body: JSON.stringify({ name, attendance }) });
}

/** Scroll threshold (px) above which banana leaves hide. */
const SCROLL_HIDE_THRESHOLD = 80;

export default function App() {
  const [phase, setPhase] = useState<AppPhase>("idle");
  const [rsvpData, setRsvpData] = useState<RSVPData | null>(null);
  const [leavesVisible, setLeavesVisible] = useState(false);

  const thankYouRef = useRef<HTMLDivElement>(null);

  // Animate leaves in on mount
  useEffect(() => {
    const timer = window.setTimeout(() => setLeavesVisible(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  // Hide / show leaves based on scroll position
  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY > SCROLL_HIDE_THRESHOLD;
        setLeavesVisible(!scrolled);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSubmit = useCallback(
    async (name: string, attendance: AttendanceChoice) => {
      setPhase("submitting");
      try {
        await submitRSVP(name, attendance);
        setRsvpData({ name, attendance });
        setPhase("confirmed");

        // Scroll to the thank-you section after a short delay to let it render
        window.setTimeout(() => {
          thankYouRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } catch (err) {
        // In production, surface this error to the user via a toast / alert
        console.error("RSVP submission failed:", err);
        setPhase("idle");
      }
    },
    []
  );

  const handleUpdateResponse = useCallback(() => {
    setPhase("idle");
    setRsvpData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isConfirmed = phase === "confirmed" && rsvpData !== null;

  return (
    <div className="relative" style={{ background: "#F7EDCC" }}>
      {/* Floating petals canvas layer */}
      <FloatingPetals />

      {/* Banana leaf decorative borders */}
      <BananaLeaves visible={leavesVisible} />

      {/* Landing / Invitation section */}
      <LandingSection
        onSubmit={handleSubmit}
        isSubmitting={phase === "submitting"}
      />

      {/* Thank-you section (rendered after submission) */}
      {isConfirmed && (
        <div ref={thankYouRef}>
          <ThankYouSection
            response={rsvpData.attendance}
            guestName={rsvpData.name}
            onUpdateResponse={handleUpdateResponse}
          />
        </div>
      )}
    </div>
  );
}