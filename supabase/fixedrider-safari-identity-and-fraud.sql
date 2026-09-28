-- FixedRider Safari Intelligence identity, retained intelligence and activation controls
create extension if not exists pgcrypto;

create table if not exists public.safari_guides (
 id uuid primary key default gen_random_uuid(),
 auth_user_id uuid unique references auth.users(id) on delete set null,
 public_code text unique not null,
 display_name text not null,
 operator_name text,
 phone text,
 status text not null default 'pending' check(status in ('pending','verified','suspended')),
 trust_score numeric(5,2) not null default 50 check(trust_score between 0 and 100),
 created_at timestamptz not null default now()
);

alter table public.safari_sightings add column if not exists guide_id uuid references public.safari_guides(id);
alter table public.safari_sightings add column if not exists park_code text;
alter table public.safari_sightings add column if not exists confidence_score numeric(5,2) default 50;
alter table public.safari_sightings add column if not exists retained_for_intelligence boolean not null default true;

create table if not exists public.safari_passes (
 id uuid primary key default gen_random_uuid(),
 pass_code text unique not null,
 guide_id uuid references public.safari_guides(id),
 park_code text not null,
 activation_source text not null check(activation_source in ('traveller_direct','operator_digital','cash_manual')),
 passenger_count integer not null check(passenger_count between 1 and 20),
 amount_usd numeric(10,2),
 payment_status text not null check(payment_status in ('paid','cash_declared','waived','pending')),
 device_hash text,
 activated_at timestamptz not null default now(),
 expires_at timestamptz not null,
 risk_score integer not null default 0 check(risk_score between 0 and 100),
 review_status text not null default 'clear' check(review_status in ('clear','review','blocked'))
);

create table if not exists public.safari_pass_events (
 id bigint generated always as identity primary key,
 pass_id uuid not null references public.safari_passes(id) on delete cascade,
 event_type text not null,
 guide_id uuid references public.safari_guides(id),
 device_hash text,
 latitude double precision,
 longitude double precision,
 created_at timestamptz not null default now(),
 metadata jsonb not null default '{}'::jsonb
);

alter table public.safari_guides enable row level security;
alter table public.safari_passes enable row level security;
alter table public.safari_pass_events enable row level security;
revoke all on public.safari_guides,public.safari_passes,public.safari_pass_events from anon,authenticated;

create index if not exists safari_sightings_intel_idx on public.safari_sightings(species,reported_at,latitude,longitude);
create index if not exists safari_passes_guide_time_idx on public.safari_passes(guide_id,activated_at);
create index if not exists safari_pass_events_pass_idx on public.safari_pass_events(pass_id,created_at);

comment on table public.safari_passes is 'Server-only activation ledger. Direct traveller activations are primary billing evidence; cash/manual records are lower-trust and risk-scored.';
comment on column public.safari_sightings.retained_for_intelligence is 'Operational sighting data retained for aggregate/historical wildlife intelligence subject to retention policy.';
