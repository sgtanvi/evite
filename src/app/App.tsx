import { useState, useEffect, useRef, useCallback } from "react";
import { BananaLeaves } from "./components/BananaLeaves";
import { LandingSection } from "./components/LandingSection";
import { ThankYouSection } from "./components/ThankYouSection";
import { FloatingPetals } from "./components/FloatingPetals";
import type { AttendanceChoice } from "./components/RSVPForm";
import { supabase, RSVP_TABLE } from "@/lib/supabase";

type AppPhase = "idle" | "submitting" | "confirmed";

interface RSVPData {
  name: string;
  attendance: AttendanceChoice;
  numGuests: number;
}

const MAX_NAME_LENGTH = 200;
const RSVP_COOLDOWN_MS = 15_000; // 15 seconds between submissions per browser
const RSVP_STORAGE_KEY = "evite_rsvp_last_submit";

function isRateLimited(): boolean {
  try {
    const raw = sessionStorage.getItem(RSVP_STORAGE_KEY);
    if (!raw) return false;
    const last = parseInt(raw, 10);
    return Date.now() - last < RSVP_COOLDOWN_MS;
  } catch {
    return false;
  }
}

function recordSubmission(): void {
  try {
    sessionStorage.setItem(RSVP_STORAGE_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

function validateInput(name: string, attendance: AttendanceChoice, numGuests: number): void {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Name is required.");
  if (trimmed.length > MAX_NAME_LENGTH) throw new Error("Name is too long.");
  if (attendance !== "yes" && attendance !== "no") throw new Error("Invalid attendance.");
  if (numGuests < 0 || numGuests > 50 || !Number.isInteger(numGuests)) throw new Error("Invalid number of guests.");
}

async function submitRSVP(name: string, attendance: AttendanceChoice, numGuests: number): Promise<void> {
  validateInput(name, attendance, numGuests);
  if (isRateLimited()) throw new Error("Please wait a moment before submitting again.");
  const trimmed = name.trim().slice(0, MAX_NAME_LENGTH);
  const { error } = await supabase.from(RSVP_TABLE).insert({
    name: trimmed,
    attendance,
    num_guests: numGuests,
  });
  if (error) throw error;
  recordSubmission();
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
    async (name: string, attendance: AttendanceChoice, numGuests: number) => {
      setPhase("submitting");
      try {
        await submitRSVP(name, attendance, numGuests);
        setRsvpData({ name, attendance, numGuests });
        setPhase("confirmed");

        // Scroll to the thank-you section after a short delay to let it render
        window.setTimeout(() => {
          thankYouRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } catch (err) {
        console.error("RSVP submission failed:", err);
        const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        alert(message);
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