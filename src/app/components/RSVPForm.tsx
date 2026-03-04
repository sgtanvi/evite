import { useState } from "react";
import { motion } from "motion/react";
import { TempleGoldBorder } from "./DecorativeElements";

export type AttendanceChoice = "yes" | "no";

const MAX_NAME_LENGTH = 200;
const MIN_GUESTS = 1;
const MAX_GUESTS = 50;

interface RSVPFormProps {
  onSubmit: (name: string, attendance: AttendanceChoice, numGuests: number) => Promise<void>;
  isSubmitting: boolean;
}

export function RSVPForm({ onSubmit, isSubmitting }: RSVPFormProps) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceChoice | null>(null);
  const [numGuests, setNumGuests] = useState(1);
  const [nameError, setNameError] = useState("");
  const [attendanceError, setAttendanceError] = useState("");
  const [guestsError, setGuestsError] = useState("");

  function validate(): boolean {
    let valid = true;
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError("Please enter your full name.");
      valid = false;
    } else if (trimmed.length > MAX_NAME_LENGTH) {
      setNameError(`Name must be ${MAX_NAME_LENGTH} characters or less.`);
      valid = false;
    } else {
      setNameError("");
    }
    if (!attendance) {
      setAttendanceError("Please select your attendance.");
      valid = false;
    } else {
      setAttendanceError("");
    }
    if (attendance === "yes") {
      const n = numGuests;
      if (n < MIN_GUESTS || n > MAX_GUESTS || !Number.isInteger(n)) {
        setGuestsError(`Please enter a number between ${MIN_GUESTS} and ${MAX_GUESTS}.`);
        valid = false;
      } else {
        setGuestsError("");
      }
    } else {
      setGuestsError("");
    }
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || isSubmitting) return;
    const trimmed = name.trim();
    if (trimmed.length > MAX_NAME_LENGTH) return;
    if (attendance !== "yes" && attendance !== "no") return;
    const guests = attendance === "yes" ? Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, Math.floor(numGuests))) : 0;
    await onSubmit(trimmed, attendance, guests);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
      className="relative mx-auto w-full"
      style={{ maxWidth: 480 }}
    >
      {/* Card */}
      <div
        className="relative p-8 rounded-sm"
        style={{
          background: "rgba(255,252,240,0.96)",
          border: "1.5px solid #D4AF37",
          boxShadow: "0 8px 40px rgba(212,175,55,0.18), 0 2px 12px rgba(0,0,0,0.10)",
        }}
      >
        <TempleGoldBorder />

        {/* Form heading */}
        <h3
          className="text-center mb-6"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 16,
            color: "#8B0000",
            letterSpacing: "0.08em",
          }}
        >
          Your Sacred RSVP
        </h3>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name field */}
          <div className="mb-5">
            <label
              htmlFor="rsvp-name"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 13,
                color: "#5c3d00",
                letterSpacing: "0.06em",
                display: "block",
                marginBottom: 8,
              }}
            >
              Your Name
            </label>
            <input
              id="rsvp-name"
              type="text"
              value={name}
              maxLength={MAX_NAME_LENGTH}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              placeholder="Enter your full name"
              disabled={isSubmitting}
              autoComplete="name"
              className="w-full px-4 py-3 rounded-sm transition-all duration-200 focus:outline-none"
              style={{
                background: "#FFFEF5",
                border: `1.5px solid ${nameError ? "#DC143C" : "#D4AF37"}`,
                fontFamily: "'Lora', serif",
                fontSize: 15,
                color: "#2c1810",
                boxShadow: "inset 0 1px 4px rgba(0,0,0,0.06)",
              }}
              onFocus={(e) => {
                if (!nameError) {
                  e.currentTarget.style.borderColor = "#FFD700";
                  e.currentTarget.style.boxShadow =
                    "inset 0 1px 4px rgba(0,0,0,0.06), 0 0 0 3px rgba(212,175,55,0.2)";
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = nameError ? "#DC143C" : "#D4AF37";
                e.currentTarget.style.boxShadow = "inset 0 1px 4px rgba(0,0,0,0.06)";
              }}
              aria-invalid={!!nameError}
              aria-describedby={nameError ? "name-error" : undefined}
            />
            {nameError && (
              <p id="name-error" role="alert" style={{ color: "#DC143C", fontSize: 12, marginTop: 4, fontFamily: "'Lora', serif" }}>
                {nameError}
              </p>
            )}
          </div>

          {/* Attendance selection */}
          <div className="mb-6">
            <fieldset>
              <legend
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 13,
                  color: "#5c3d00",
                  letterSpacing: "0.06em",
                  marginBottom: 12,
                  display: "block",
                  width: "100%",
                }}
              >
                Will you be able to attend?
              </legend>

              <div className="flex gap-3">
                {/* Yes option */}
                <label
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 cursor-pointer rounded-sm transition-all duration-200 select-none"
                  style={{
                    border: `1.5px solid ${attendance === "yes" ? "#138808" : "#D4AF37"}`,
                    background: attendance === "yes" ? "rgba(19,136,8,0.08)" : "rgba(255,248,220,0.5)",
                    boxShadow: attendance === "yes" ? "0 0 0 2px rgba(19,136,8,0.2)" : "none",
                  }}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={attendance === "yes"}
                    onChange={() => {
                      setAttendance("yes");
                      if (attendanceError) setAttendanceError("");
                    }}
                    disabled={isSubmitting}
                    className="sr-only"
                    aria-label="Yes, I will be there"
                  />
                  <span
                    style={{
                      color: attendance === "yes" ? "#138808" : "#8B6914",
                      fontFamily: "'Cinzel', serif",
                      fontSize: 13,
                      letterSpacing: "0.04em",
                    }}
                  >
                    ✓ Yes, I will be there
                  </span>
                </label>

                {/* No option */}
                <label
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 cursor-pointer rounded-sm transition-all duration-200 select-none"
                  style={{
                    border: `1.5px solid ${attendance === "no" ? "#8B0000" : "#D4AF37"}`,
                    background: attendance === "no" ? "rgba(139,0,0,0.06)" : "rgba(255,248,220,0.5)",
                    boxShadow: attendance === "no" ? "0 0 0 2px rgba(139,0,0,0.15)" : "none",
                  }}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={attendance === "no"}
                    onChange={() => {
                      setAttendance("no");
                      if (attendanceError) setAttendanceError("");
                    }}
                    disabled={isSubmitting}
                    className="sr-only"
                    aria-label="Unable to attend"
                  />
                  <span
                    style={{
                      color: attendance === "no" ? "#8B0000" : "#8B6914",
                      fontFamily: "'Cinzel', serif",
                      fontSize: 13,
                      letterSpacing: "0.04em",
                    }}
                  >
                    ✗ Unable to attend
                  </span>
                </label>
              </div>

              {attendanceError && (
                <p role="alert" style={{ color: "#DC143C", fontSize: 12, marginTop: 6, fontFamily: "'Lora', serif" }}>
                  {attendanceError}
                </p>
              )}
            </fieldset>
          </div>

          {/* Number of guests (when attending) */}
          {attendance === "yes" && (
            <div className="mb-6">
              <label
                htmlFor="rsvp-guests"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 13,
                  color: "#5c3d00",
                  letterSpacing: "0.06em",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Number of guests (including you)
              </label>
              <input
                id="rsvp-guests"
                type="number"
                min={MIN_GUESTS}
                max={MAX_GUESTS}
                value={numGuests}
                onChange={(e) => {
                  const v = e.target.valueAsNumber;
                  if (!Number.isNaN(v)) setNumGuests(Math.max(MIN_GUESTS, Math.min(MAX_GUESTS, Math.floor(v))));
                  if (guestsError) setGuestsError("");
                }}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-sm transition-all duration-200 focus:outline-none"
                style={{
                  background: "#FFFEF5",
                  border: `1.5px solid ${guestsError ? "#DC143C" : "#D4AF37"}`,
                  fontFamily: "'Lora', serif",
                  fontSize: 15,
                  color: "#2c1810",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.06)",
                }}
                aria-invalid={!!guestsError}
                aria-describedby={guestsError ? "guests-error" : undefined}
              />
              {guestsError && (
                <p id="guests-error" role="alert" style={{ color: "#DC143C", fontSize: 12, marginTop: 4, fontFamily: "'Lora', serif" }}>
                  {guestsError}
                </p>
              )}
            </div>
          )}

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full py-3 px-6 rounded-sm transition-all duration-200 relative overflow-hidden focus:outline-none focus-visible:ring-2"
            style={{
              background: isSubmitting
                ? "linear-gradient(135deg, #b89830 0%, #c8a820 100%)"
                : "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8960C 100%)",
              color: "#3d1a00",
              border: "2px solid #B8960C",
              boxShadow: "0 4px 20px rgba(212,175,55,0.35)",
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 13,
              letterSpacing: "0.08em",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
            aria-label={isSubmitting ? "Submitting your RSVP" : "Submit your RSVP"}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner />
                Submitting...
              </span>
            ) : (
              "Submit Response"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}