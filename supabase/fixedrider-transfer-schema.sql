-- FixedRider transfer persistence. Apply only to the dedicated FixedRider Supabase project.
create table if not exists public.transfer_bookings (
 id text primary key,
 from_text text not null,
 to_text text not null,
 travel_date date not null,
 pickup_time time not null,
 passengers integer not null check (passengers between 1 and 20),
 customer_name text not null,
 customer_contact text not null,
 quote jsonb,
 status text not null default 'requested' check (status in ('requested','offered','assigned','completed','cancelled','no_show')),
 payment_mode text not null default 'pay_driver' check (payment_mode in ('pay_driver')),
 assigned_driver_id text,
 created_at timestamptz not null default now()
);
alter table public.transfer_bookings enable row level security;
revoke all on public.transfer_bookings from anon, authenticated;
comment on table public.transfer_bookings is 'Server-only FixedRider transfer requests; not exposed to browser clients.';