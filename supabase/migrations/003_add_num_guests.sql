-- Add number of guests (for existing DBs that ran 001 without this column)
alter table public.rsvps
  add column if not exists num_guests integer not null default 1
  check (num_guests >= 0 and num_guests <= 50);
