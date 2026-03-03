
  # Implement Best Coding Practices

  This is a code bundle for Implement Best Coding Practices. The original project is available at https://www.figma.com/design/iRhoMvgtQQY7WpeLgm04LV/Implement-Best-Coding-Practices.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Supabase

RSVPs are stored in Supabase. To finish setup:

1. Copy `.env.example` to `.env` and set `VITE_SUPABASE_ANON_KEY` (get it from Supabase Dashboard → Project Settings → API).
2. In the Supabase SQL Editor, run the script in `supabase/migrations/001_create_rsvps.sql` to create the `rsvps` table.
  