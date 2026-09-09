# VEIXON COMMAND CENTER — QA BASELINE AUDIT
## Baseline Application State, Architecture, Security & UX Assessment

**Date**: September 9, 2026  
**Auditor**: Senior QA & Engineering Team  
**Branch**: `qa/hardening`  
**Target Repository**: `https://github.com/siddardhvanguri-source/progress_track_and_management_website.git`  
**Framework**: Next.js 14.2.15 (App Router, Server Actions, Client Components)  
**Database**: SQLite via Prisma ORM (`prisma/schema.prisma`, `prisma/dev.db`)  
**Styling**: Tailwind CSS + Custom VEIXON Command Center Design Tokens  
**Typography**: Google Font `Plus Jakarta Sans`  

---

### 1. Executive Summary & Architecture Overview

VEIXON Command Center is an internal operations and project intelligence platform designed for VEIXON.Tech executive leadership (Director, CEO, CTO), engineering managers, and team members. 

Key product principles enforced:
1. **Zero Cognitive Overload**: Executive view answers *What is happening?*, *Why?*, and *What should I do?* in under 30 seconds.
2. **Server-Enforced Role Security**: Complete elimination of client-side role/user switchers. Roles (`DIRECTOR`, `ADMIN`, `MANAGER`, `EMPLOYEE`, `HR`) are verified against authenticated sessions and database records.
3. **Official Team Roster**: Seeded with official VEIXON leadership and engineering roster from `veixon.com/team` (V S Sai Siddardh, Abhinav Rishi, Shlok Karn, Suhas, Arjun J, Shabnam Nisha, C. Taran Teja, Navya, Sreeshith, Shivani).
4. **Dual Theme Engine**: Crisp, high-contrast daylight theme (`bg-slate-50`, clean slate borders, deep charcoal text) and sleek futuristic VEIXON dark mode.

---

### 2. Baseline Route Inventory

| Route | Purpose | Access Control | Status |
|---|---|---|---|
| `/` | Public SaaS & Agency Landing Page (Nexora-inspired) | Public | Operational, responsive |
| `/login` | Authentication Portal with 1-Click VEIXON Leadership Profiles | Public | Operational, secure cookie session |
| `/dashboard` | Operational Pulse, Live Team Attendance, Attention Required | Authenticated | Operational, real-time sync |
| `/work` | Horizontal Scroll Kanban Board (Backlog, Planned, In Progress, Review, Completed) | Authenticated | Operational, spacious |
| `/projects` | Project Portfolio Health, Milestones, Sprints | Authenticated | Operational |
| `/people` | Employee Operations Directory & Live Status | Authenticated | Operational |
| `/profile` | Logged-in User Profile, Monthly Database Performance Breakdown | Authenticated | Operational (Single Shell) |
| `/profile/[id]` | Member Profile & Historical Review | Authenticated | Operational |
| `/calendar` | Operational Deadlines, Leave Schedules, Meetings | Authenticated | Operational |
| `/meetings` | Engineering Standup, Architecture Reviews, Attendance Triage | Authenticated | Operational |
| `/settings` | Workspace Configuration, Theme, Notification Preferences | Authenticated | Operational |
| `/changelog` | Product & Engineering System Updates | Authenticated | Operational |

---

### 3. Baseline Defects & Root Cause Analysis (Pre-Hardening)

#### Defect 1: Client-Side Hydration Mismatch (High Severity)
- **Symptom**: Red Next.js error modal on `/work` stating `Text content did not match. Server: "ANNUAL Leave (14/9/2026 - 16/9/2026)" Client: "ANNUAL Leave (9/14/2026 - 9/16/2026)"`.
- **Root Cause**: Reliance on browser locale `toLocaleDateString()` which formatted dates in `en-GB` on server and `en-US` on client.
- **Resolution**: Replaced with deterministic date-fns `format(date, 'dd/MM/yyyy')` in store initializers.

#### Defect 2: Nested AppShell on Profile Pages (Medium Severity)
- **Symptom**: Two sidebars and two topbars simultaneously rendered on `/profile` and `/profile/[id]`.
- **Root Cause**: `app/layout.tsx` already wraps children in `<AppShell>`, but `app/profile/page.tsx` also wrapped its body with `<AppShell>`.
- **Resolution**: Removed internal `<AppShell>` wrappers from profile pages, maintaining a single unified shell.

#### Defect 3: Miniature Tailwind Typography Overrides (UX Severity)
- **Symptom**: Information appeared severely cramped across screens with tiny 10-11px fonts.
- **Root Cause**: `tailwind.config.js` overrode Tailwind's default font scales with sub-standard pixel sizes (`2xs: 10px`, `xs: 11px`, `sm: 12px`, `base: 13px`).
- **Resolution**: Removed artificially small font size overrides and switched to Google Font `Plus Jakarta Sans`.

#### Defect 4: Role Switcher & Insecure Admin Impersonation (Security Severity)
- **Symptom**: Topbar contained a role dropdown letting users switch to any role on the fly.
- **Root Cause**: Client-side demo switcher bypassing server role verification.
- **Resolution**: Replaced with secure "Sign Out / Switch Account" redirecting to `/login`.

#### Defect 5: Missing `DIRECTOR` Role in Permission Map (Type Severity)
- **Symptom**: TypeScript error `Property 'DIRECTOR' is missing in type Record<Role, Permissions>`.
- **Root Cause**: `lib/permissions.ts` only enumerated `ADMIN`, `HR`, `MANAGER`, and `EMPLOYEE`.
- **Resolution**: Added `DIRECTOR` with full supreme executive permissions.
