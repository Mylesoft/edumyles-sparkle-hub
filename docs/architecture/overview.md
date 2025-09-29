# EduMyles Architecture Overview

This document summarizes the system architecture aligned to Enhanced Master Document v2.0.

## Context Diagram

```mermaid
C4Context
title EduMyles Context
Person(student, "Student")
Person(teacher, "Teacher")
Person(parent, "Parent/Guardian")
Person(admin, "School Admin")
Person(super, "Super Admin")
System_Boundary(em, "EduMyles Platform"){
  System(web, "Web App (SPA)")
  System(mobile, "Mobile Apps (iOS/Android)")
  System(api, "API Gateway + App Service")
  SystemDb(db, "Postgres (Supabase) + Storage")
  System(queue, "Event Bus")
  System(ai, "Myles AI Layer")
  System(comm, "Comms & Notifications")
  System(ryde, "EduRyde Integration")
  System(zoho, "Zoho One Integrations")
}
System_Ext(mpesa, "M-Pesa (Safaricom)")
System_Ext(sms, "SMS (Safaricom/Africa's Talking)")
System_Ext(email, "Email (SendGrid/-)")
System_Ext(push, "Push (FCM/APNs)")
System_Ext(pay, "Card Payments (Stripe/Flutterwave)")

Rel(student, web, "Use")
Rel(teacher, web, "Use")
Rel(parent, web, "Use")
Rel(admin, web, "Use")
Rel(super, web, "Use")
Rel(web, api, "HTTPS")
Rel(mobile, api, "HTTPS")
Rel(api, db, "SQL/REST")
Rel(api, queue, "Publish/Subscribe")
Rel(queue, ai, "Events")
Rel(api, comm, "Notify")
Rel(api, ryde, "Integrate")
Rel(api, zoho, "Sync")
Rel(comm, sms, "SMS")
Rel(comm, email, "Email")
Rel(comm, push, "Push")
Rel(api, mpesa, "STK Push/Collections")
Rel(api, pay, "Cards")
```

## Tenancy & Data
- Single Postgres per region with schemas: `platform` (global), `tenant_data` (isolated), `analytics` (denormalized).
- Supabase Auth → JWT → Postgres RLS. RBAC + context-aware rules (campus/department).
- White-label and reseller config: branding/themes, domains, commissions.

## Domains (Phase 1 focus)
- Identity/Access, Tenant/Org, Academic Core, Assessment (basic), Attendance, Finance (M-Pesa MVP), Comms (SMS/Email), Notifications (MVP), Ticketing (MVP), Gamification (MVP), Knowledge Hub (MVP).

## Event-Driven Backbone
- Outbox → dispatcher → subscribers (AI, Comms, Analytics, Gamification, Integrations).
- Key events: `student.*`, `academic.*`, `financial.*`, `comms.*`, `ticketing.*`, `gamification.*`.

## Deployment & Ops
- Envs: dev/staging/prod. Cloud Run/Fly/Render. Cloudflare CDN/WAF.
- Observability: OpenTelemetry + Grafana/Prometheus, Sentry, PostHog.
- Security/Compliance: RLS, MFA, audit logs, KDPA/GDPR/FERPA tooling.

## Next Docs
- See `phase1-plan.md` for milestones and `sql/phase1` for schema drafts.
