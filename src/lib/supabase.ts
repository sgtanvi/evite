import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase env missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env"
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

export type AttendanceChoice = "yes" | "no";

export interface RSVPRow {
  id?: string;
  name: string;
  attendance: AttendanceChoice;
  num_guests?: number;
  created_at?: string;
}

export const RSVP_TABLE = "rsvps";
