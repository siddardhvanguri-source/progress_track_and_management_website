# VEIXON Command Center ⚡
### Enterprise Internal Operations, Engineering Execution & Team Pulse Platform

<p align="left">
  <img src="https://img.shields.io/badge/Framework-Next.js%2014-black?style=flat-square&logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Database-SQLite%20via%20Prisma-indigo?style=flat-square&logo=prisma" alt="Prisma SQLite" />
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Brand-VEIXON.Tech-00E5FF?style=flat-square" alt="VEIXON.Tech" />
  <img src="https://img.shields.io/badge/Tests-23%20Passing-emerald?style=flat-square" alt="Tests 23 Passing" />
</p>

---

## 📌 Overview

**VEIXON Command Center** is a private, internal operations and engineering intelligence portal built for **VEIXON.Tech**. It is designed specifically for the **Director / Co-founder** and leadership team to maintain total operational visibility across ongoing projects, team attendance, blocker escalations, and sprint progress without manually micromanaging engineers.

Inspired by the visual design language of [VEIXON.com](https://www.veixon.com/), the Command Center combines a futuristic aesthetic with high ergonomics, offering **Daylight (clean slate & white)** and **Night (deep navy & cyan glow)** themes.

---

## 🚀 Core Philosophy & Principles

1. **Reduce Cognitive Overload**: Executive view answers three questions in under 30 seconds:
   - *What is happening right now?*
   - *Why is it happening?*
   - *What action is required from leadership?*
2. **Server-Enforced Role Security**: Authentication originates from verified server sessions. There is no insecure client-side role switching.
3. **Official Team Roster**: Pre-configured with the official leadership and engineering team from [veixon.com/team](https://www.veixon.com/team/).
4. **Real-World Execution Speed**: Every page and API interaction loads in **< 120ms** (well below the 2-second user tolerance threshold).

---

## ⚡ Feature Matrix

| Module | Route | Capabilities |
|---|---|---|
| **Public Landing** | `/` | SaaS & agency presentation (inspired by modern web layouts), hero preview, feature tour, and direct portal access. |
| **Authentication** | `/login` | Secure session issuance with 1-click profiles for VEIXON Leadership (Director, CEO, CTO, Leads). |
| **Command Center** | `/dashboard` | Attention-required triage, blocker escalation, live team attendance pulse, today's schedule, and system metrics. |
| **Kanban & Tasks** | `/work` | Horizontally scrollable Kanban tracks (320px column width), task creation, subtask tracking, and assignee filters. |
| **Project Portfolio** | `/projects` | Project delivery tracking (Phoenix, Orion, Nova, Atlas), progress calculations, risk alerts, and deadline schedules. |
| **Team Directory** | `/people` | Real-time presence indicators (Present, Leave on Duty, Uninformed Absence, Deep Work) with complaint workflows. |
| **Profiles & Logs** | `/profile`, `/profile/[id]` | Historical monthly performance logs stored in SQLite, hours logged, rating, punctuality, and emergency contacts. |
| **Calendar** | `/calendar` | Scheduled meetings, company milestones, client deliverables, and approved employee leaves. |
| **Meetings** | `/meetings` | Engineering standups, architecture syncs, attendance records, and missed-meeting justification triage. |
| **Global Palette** | `⌘K` | Command Palette for instant keyboard navigation, quick search across projects, and rapid action execution. |

---

## 👥 Official Team Profiles (veixon.com)

The application comes populated with the verified VEIXON leadership and engineering roster:

| Name | Role | Department | Official Profile Photo |
|---|---|---|---|
| **V S Sai Siddardh** | Director | Executive Engineering | `https://www.veixon.com/team/siddardha.png` |
| **Abhinav Rishi** | Founder & CEO | Executive Leadership | `https://www.veixon.com/team/Abhinav.png` |
| **Shlok Karn** | Co-founder & CTO | Technology & Architecture | `https://www.veixon.com/team/shlok.jpeg` |
| **Suhas** | Manager | Cloud & Infrastructure | `https://www.veixon.com/team/suhas.png` |
| **Arjun J** | Employee | Backend Engineering | `https://www.veixon.com/team/ARJUN.png` |
| **Shabnam Nisha** | Employee | Lead Product Designer | `https://www.veixon.com/team/Shabnam.jpeg` |
| **C. Taran Teja** | Employee | Frontend Engineer | `https://www.veixon.com/team/taran.jpeg` |
| **Navya** | HR | People & Operations | `https://www.veixon.com/team/NAVYA.jpeg` |
| **Sreeshith** | Employee | DevOps & SRE Lead | `https://www.veixon.com/team/sreeshith.png` |
| **Shivani** | Employee | QA & Security Engineer | `https://www.veixon.com/team/shivani.jpeg` |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) with embedded [SQLite](https://www.sqlite.org/) (`prisma/dev.db`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom VEIXON dark/light design system
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Testing**: Node.js Built-in Test Runner (`node:test`, `node:assert`)

---

## 🚦 Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or later
- **npm**: `v9.0.0` or later

### 1. Clone the Repository
```bash
git clone https://github.com/siddardhvanguri-source/progress_track_and_management_website.git
cd progress_track_and_management_website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize & Seed Database
```bash
# Push Prisma schema to SQLite
npx prisma db push

# Seed official VEIXON team roster and records
node scripts/seed_veixon.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Running Automated Tests

The repository includes a comprehensive 23-test QA and hardening suite covering authentication, permissions, task lifecycles, blocker alerts, XSS sanitization, and live E2E route latency assertions.

```bash
npm test
```

### Test Output Sample:
```bash
▶ VEIXON Command Center — Comprehensive End-to-End Scenarios
  ✔ Scenario 1: Public landing page loads with HTTP 200 within 2000ms (108.5ms)
  ✔ Scenario 2: Login portal loads with HTTP 200 within 2000ms (14.6ms)
  ✔ Scenario 3: Director (V S Sai Siddardh) authenticates and receives session cookie (19.1ms)
  ✔ Scenario 4: Session identity endpoint verifies active Director profile (14.6ms)
  ✔ Scenario 5: Fetching tasks returns populated list with projects and assignees (13.0ms)
  ✔ Scenario 6: Employee creates new high-priority engineering task (30.7ms)
  ✔ Scenario 7: Leave requests endpoint returns valid schedules (13.8ms)
  ✔ Scenario 8: User directory returns VEIXON team with proper department mappings (33.5ms)
  ✔ Scenario 9: Route /dashboard renders with HTTP 200 within 2000ms (27.9ms)
  ✔ Scenario 9: Route /work renders with HTTP 200 within 2000ms (20.3ms)
  ✔ Scenario 9: Route /projects renders with HTTP 200 within 2000ms (30.5ms)
  ✔ Scenario 9: Route /people renders with HTTP 200 within 2000ms (26.3ms)
  ✔ Scenario 9: Route /calendar renders with HTTP 200 within 2000ms (12.6ms)
  ✔ Scenario 9: Route /profile renders with HTTP 200 within 2000ms (7.8ms)
  ✔ Scenario 10: Sign out successfully clears session cookie (6.4ms)
✔ VEIXON Command Center — Comprehensive End-to-End Scenarios (383.5ms)

▶ VEIXON Command Center — Hardening & Business Logic Suite
  ✔ Authorization & Permissions (3.6ms)
  ✔ Task Lifecycle & State Transitions (0.7ms)
  ✔ Blocker Triage & Executive Alerting (0.4ms)
  ✔ Security & XSS Resistance (0.4ms)
  ✔ Live Attendance & Pulse Calculations (0.4ms)
✔ VEIXON Command Center — Hardening & Business Logic Suite (6.4ms)

ℹ tests 23 | pass 23 | fail 0 | duration_ms ~2400ms
```

---

## 🏗️ Production Build

To test and build the production-ready application bundle:

```bash
npm run build
npm start
```

All 31 static and dynamic routes compile cleanly with zero SSR hydration warnings.

---

## 📂 Project Structure

```
├── app/                      # Next.js 14 App Router
│   ├── (app)/               # Internal authenticated layouts
│   ├── api/                 # Secure API Route Handlers (auth, tasks, users, leave)
│   ├── calendar/            # Calendar & schedule views
│   ├── dashboard/           # Executive operations command center
│   ├── login/               # Authentication portal
│   ├── meetings/            # Attendance & standup reviews
│   ├── people/              # Live team directory
│   ├── profile/             # Profile & historical DB performance logs
│   ├── projects/            # Project delivery health
│   ├── work/                # Horizontal scroll Kanban board
│   ├── globals.css          # Design tokens (Daylight & Night palettes)
│   ├── layout.tsx           # Global HTML wrapper
│   └── page.tsx             # Public landing page
├── components/              # Modular UI components
│   ├── dashboard/           # Executive pulse widgets, metrics & alerts
│   ├── landing/             # Public landing sections & hero components
│   ├── layout/              # Sidebar, Topbar, AppShell, CommandPalette
│   ├── leave/               # Leave request & approval dialogs
│   ├── meetings/            # Meeting triage modals
│   ├── ui/                  # Reusable atomic elements (Avatar, Button, Card, etc.)
│   └── work/                # Task creation & detail modals
├── lib/                     # Utilities & Core Logic
│   ├── mockData.ts          # Seed datasets & fallback records
│   ├── permissions.ts       # Role-based access control (DIRECTOR, ADMIN, etc.)
│   ├── prisma.ts            # Prisma Client singleton
│   ├── store.tsx            # Global application state store
│   ├── types.ts             # TypeScript domain interfaces
│   └── utils.ts             # Formatting & helper utilities
├── prisma/                  # Database schema & migrations
│   ├── schema.prisma        # Database models (User, Task, Project, Leave, etc.)
│   └── seed.ts              # Database seeding script
├── scripts/                 # Operational automation scripts
│   └── seed_veixon.js       # Official VEIXON team database seeder
├── tests/                   # Automated QA test suites
│   ├── e2e_scenarios.test.js# Live scenario tests (< 2s latency rule)
│   └── hardening.test.js    # Security & permission assertions
├── API_TEST_MATRIX.md       # API endpoint specification & security matrix
├── QA_BASELINE.md           # Baseline application assessment
├── QA_FINAL_REPORT.md       # Formal QA audit report
└── README.md                # Project documentation
```

---

## 🔐 Security & Governance

- **Session Security**: Session tokens are scoped with `SameSite=Lax` and secure cookie flags.
- **SQL Injection Prevention**: All queries utilize parameterized statements through Prisma ORM.
- **XSS Sanitization**: User inputs are escaped and protected from script injection.
- **Role Scoping**: Executive capabilities (approving leaves, managing blockers, system settings) are strictly restricted by server-side permission checks.

---

## 📄 License & Attribution

Internal proprietary software developed for **VEIXON.Tech**.  
Co-founder & Director: **V S Sai Siddardh**.