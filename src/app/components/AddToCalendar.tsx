import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, ExternalLink } from "lucide-react";

/** Event details used to generate calendar links. */
const EVENT = {
  title: "Srinivas Kalyanam – The Divine Wedding of Lord Srinivasa",
  description:
    "The Guttula Family cordially invites you to the sacred Srinivas Kalyanam (Lord Srinivasa's Divine Wedding Ceremony). Please join us to witness this auspicious celebration.",
  location: "Kedarnath Hall, Shiva-Vishnu Temple, 1232 Arrowhead Ave, Livermore, CA 94551",
  startDatetime: "20260327T103000",
  endDatetime: "20260327T160000",
  startDatetimeLocal: "2026-03-27T10:30:00",
  endDatetimeLocal: "2026-03-27T16:00:00",
} as const;

function encodeParam(value: string) {
  return encodeURIComponent(value);
}

function buildGoogleCalendarUrl(): string {
  const base = "https://www.google.com/calendar/render?action=TEMPLATE";
  return (
    `${base}` +
    `&text=${encodeParam(EVENT.title)}` +
    `&dates=${EVENT.startDatetime}/${EVENT.endDatetime}` +
    `&details=${encodeParam(EVENT.description)}` +
    `&location=${encodeParam(EVENT.location)}` +
    `&sf=true&output=xml`
  );
}

function buildOutlookUrl(): string {
  const base = "https://outlook.live.com/calendar/0/deeplink/compose";
  return (
    `${base}?path=/calendar/action/compose` +
    `&rru=addevent` +
    `&startdt=${encodeParam(EVENT.startDatetimeLocal)}` +
    `&enddt=${encodeParam(EVENT.endDatetimeLocal)}` +
    `&subject=${encodeParam(EVENT.title)}` +
    `&body=${encodeParam(EVENT.description)}` +
    `&location=${encodeParam(EVENT.location)}`
  );
}

function generateICSContent(): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Srinivas Kalyanam//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${EVENT.startDatetime}`,
    `DTEND:${EVENT.endDatetime}`,
    `SUMMARY:${EVENT.title}`,
    `DESCRIPTION:${EVENT.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${EVENT.location.replace(/,/g, "\\,")}`,
    "STATUS:CONFIRMED",
    `UID:srinivas-kalyanam-2026@guttulafamily`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS() {
  const content = generateICSContent();
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "srinivas-kalyanam-2026.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

interface CalendarOption {
  label: string;
  icon: string;
  action: () => void;
}

const CALENDAR_OPTIONS: CalendarOption[] = [
  {
    label: "Google Calendar",
    icon: "🗓️",
    action: () => window.open(buildGoogleCalendarUrl(), "_blank", "noopener,noreferrer"),
  },
  {
    label: "Apple Calendar",
    icon: "🍎",
    action: downloadICS,
  },
  {
    label: "Outlook Calendar",
    icon: "📧",
    action: () => window.open(buildOutlookUrl(), "_blank", "noopener,noreferrer"),
  },
  {
    label: "Download .ics File",
    icon: "⬇️",
    action: downloadICS,
  },
];

export function AddToCalendar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-6 py-3 rounded-sm transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2"
        style={{
          background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8960C 100%)",
          color: "#3d1a00",
          border: "2px solid #B8960C",
          boxShadow: "0 4px 15px rgba(212,175,55,0.4)",
          fontFamily: "'Cinzel', serif",
          fontSize: 14,
          letterSpacing: "0.05em",
          focusVisibleRingColor: "#D4AF37",
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Calendar size={18} aria-hidden="true" />
        <span>Add to Calendar</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Calendar options"
          className="absolute left-1/2 mt-2 py-1 rounded-sm overflow-hidden z-50"
          style={{
            transform: "translateX(-50%)",
            minWidth: 220,
            background: "#FFF8DC",
            border: "1px solid #D4AF37",
            boxShadow: "0 8px 30px rgba(212,175,55,0.25), 0 2px 8px rgba(0,0,0,0.15)",
            top: "100%",
          }}
        >
          {CALENDAR_OPTIONS.map((option) => (
            <button
              key={option.label}
              role="option"
              aria-selected={false}
              onClick={() => {
                option.action();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 flex items-center gap-3 transition-colors duration-150 cursor-pointer focus:outline-none"
              style={{
                fontFamily: "'Lora', serif",
                fontSize: 14,
                color: "#3d1a00",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <span aria-hidden="true">{option.icon}</span>
              <span>{option.label}</span>
              <ExternalLink size={12} style={{ marginLeft: "auto", opacity: 0.5 }} aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
