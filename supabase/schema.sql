-- Contact form submissions for cev.studio
-- Run this in the Supabase SQL editor (or via a migration).

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- The site may only submit messages. There is intentionally no select/update/
-- delete policy: submissions are write-only from the public API key, readable
-- only via the Supabase dashboard. This backs the /privacy page claims.
create policy "anyone can submit a message"
  on public.contact_messages
  for insert
  to anon
  with check (true);
