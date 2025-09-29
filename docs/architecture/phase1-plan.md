# Phase 1 – Foundation & Core (Months 1–6)

## Scope
- Multi-tenant foundation: tenants, campuses, departments; RLS policies.
- IAM: Auth, RBAC, role bindings, context (campus/department).
- Academic core: students, guardians, staff, classes, attendance, assessments (basic).
- Finance MVP: invoices, payments, M-Pesa STK/callback ingestion.
- Cross-cutting: Ticketing (MVP), Comms (SMS/Email), Notifications (MVP), Gamification (points/badges MVP), Knowledge Hub (MVP).
- AI scaffold: Prompt routing + event subscribers for summaries/suggestions.
- Event backbone: Outbox + dispatcher; key events emitted by core flows.
- i18n (en/sw), KDPA baseline, observability baseline.

## Milestones (bi-weekly)
- M1: Tenants + Auth + RBAC + RLS tests; Outbox dispatcher.
- M2: Students/Staff/Classes; Attendance + events; SMS/email plumbing.
- M3: Assessments (basic); Ticketing MVP; Notifications digests.
- M4: Finance MVP (M-Pesa); Gamification points; Knowledge Hub MVP.
- M5: AI scaffold consumers; i18n (Swahili), KDPA baseline.
- M6: Pilot readiness: docs, training, 10 schools onboarded.

## Deliverables
- SQL schemas and RLS policies under `sql/phase1/`.
- CI (lint, typecheck, build, test) and sample tests.
- Architecture docs and diagrams.
- Integration stubs and webhook handlers for M-Pesa.

## Acceptance Criteria
- All CI checks green; RLS tests enforce tenant isolation.
- Core entities CRUD and events wired; comms send in sandbox.
- Documentation for pilot onboarding.
