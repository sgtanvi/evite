-- Enforce max name length in DB (defense in depth)
alter table public.rsvps
  add constraint rsvps_name_length check (char_length(name) <= 500);
