-- Contact form submissions for cev.studio
-- Run this in the Supabase SQL editor (or via a migration).

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now(),

  -- Content constraints, mirroring the API route's validation. supabase-js/
  -- PostgREST parameterizes all queries, so these guard content, not SQL.
  constraint contact_messages_email_format
    check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  constraint contact_messages_name_no_control_chars
    check (name !~ '[[:cntrl:]]'),
  constraint contact_messages_email_no_control_chars
    check (email !~ '[[:cntrl:]]'),
  constraint contact_messages_message_no_control_chars
    check (message !~ '[\x01-\x08\x0b\x0c\x0e-\x1f\x7f]')
);

alter table public.contact_messages enable row level security;

-- The site may only submit messages. There is intentionally no select/update/
-- delete policy: submissions are write-only from the public API key, readable
-- only via the secret key. This backs the /privacy page claims.
create policy "anyone can submit a message"
  on public.contact_messages
  for insert
  to anon
  with check (true);

-- Least privilege: the public API key may only insert the three form fields
-- (it cannot set id/created_at, and cannot select/update/delete at all).
revoke all on table public.contact_messages from anon, authenticated;
grant insert (name, email, message) on public.contact_messages to anon;

-- Newest-first pagination in /admin and the throttle window scan.
create index contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- Hard backstop against flood spam: at most 5 submissions per minute,
-- site-wide. Deliberately IP-free — the privacy page promises no tracking.
-- SECURITY DEFINER because anon has no select privilege on the table.
create function public.contact_messages_throttle()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (
    select count(*)
    from public.contact_messages
    where created_at > now() - interval '1 minute'
  ) >= 5 then
    raise exception 'rate limit exceeded';
  end if;
  return new;
end;
$$;

-- Trigger use only; never callable through the API.
revoke execute on function public.contact_messages_throttle()
  from public, anon, authenticated;

create trigger contact_messages_throttle
  before insert on public.contact_messages
  for each row
  execute function public.contact_messages_throttle();
