-- Phase 1 core schemas (platform & tenant_data)
-- Note: apply via Supabase migration tool or psql; add RLS policies separately.

create schema if not exists platform;
create schema if not exists tenant_data;

-- Tenants and reseller/branding
create table if not exists platform.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  country_code text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists platform.resellers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier text not null check (tier in ('tier_1','tier_2','tier_3')),
  commission_rate numeric(5,2) not null,
  status text default 'active',
  created_at timestamptz default now()
);

create table if not exists platform.brands (
  id uuid primary key default gen_random_uuid(),
  reseller_id uuid references platform.resellers(id),
  tenant_id uuid references platform.tenants(id),
  display_name text,
  logo_url text,
  theme jsonb default '{}'::jsonb,
  domain text,
  created_at timestamptz default now()
);

-- Campus hierarchy (per tenant)
create table if not exists tenant_data.campuses (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id),
  campus_name text not null,
  campus_code text,
  campus_type text check (campus_type in ('main','branch','specialized','virtual')),
  parent_campus_id uuid references tenant_data.campuses(id),
  address jsonb,
  status text default 'active',
  created_at timestamptz default now()
);

-- IAM (minimal skeleton)
create table if not exists platform.users (
  id uuid primary key,
  email text unique,
  full_name text,
  created_at timestamptz default now()
);

create table if not exists tenant_data.role_bindings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id),
  user_id uuid not null references platform.users(id),
  role text not null, -- e.g., super_admin, school_admin, teacher, parent, student
  campus_id uuid references tenant_data.campuses(id),
  department_id uuid,
  created_at timestamptz default now()
);

-- Curriculum frameworks (platform-wide) per master doc
create table if not exists platform.curriculum_frameworks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country_code text,
  framework_type text,
  version text,
  grade_structure jsonb not null,
  subject_definitions jsonb not null,
  assessment_methods jsonb not null,
  progression_rules jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists tenant_data.school_curriculum_adoption (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id),
  campus_id uuid references tenant_data.campuses(id),
  curriculum_framework_id uuid references platform.curriculum_frameworks(id),
  grade_levels text[] not null,
  customizations jsonb default '{}'::jsonb,
  implementation_date date not null,
  status text default 'active' check (status in ('planning','active','phasing_out','discontinued')),
  created_at timestamptz default now()
);

-- Students/Staff (minimal; extend in later migrations)
create table if not exists tenant_data.students (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id),
  campus_id uuid references tenant_data.campuses(id),
  first_name text not null,
  last_name text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists tenant_data.staff (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id),
  campus_id uuid references tenant_data.campuses(id),
  first_name text not null,
  last_name text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Outbox for events
create table if not exists tenant_data.event_outbox (
  id bigserial primary key,
  tenant_id uuid,
  event_type text not null,
  payload jsonb not null,
  created_at timestamptz default now(),
  dispatched_at timestamptz
);

-- Indexes
create index if not exists idx_campuses_tenant on tenant_data.campuses(tenant_id);
create index if not exists idx_students_tenant on tenant_data.students(tenant_id);
create index if not exists idx_staff_tenant on tenant_data.staff(tenant_id);
create index if not exists idx_outbox_created on tenant_data.event_outbox(created_at);
