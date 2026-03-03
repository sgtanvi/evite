-- Run this once in Supabase Dashboard → SQL Editor (New query → paste → Run)

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 500),
  attendance text not null check (attendance in ('yes', 'no')),
  created_at timestamptz default now()
);

-- Allow anonymous inserts (e.g. from your frontend). Tighten with RLS if needed.
alter table public.rsvps enable row level security;

create policy "Allow anonymous insert"
  on public.rsvps
  for insert
  to anon
  with check (true);

-- Optional: allow read for authenticated users only (e.g. admin)
-- create policy "Allow authenticated read"
--   on public.rsvps for select to authenticated using (true);
