# VEIXON Command Center — Data Architecture & Entity Specification

## 1. Overview
The VEIXON Command Center data model is structured around real operational relationships within VEIXON.Tech. Every metric displayed across the Director Command Center, Kanban boards, and People directory is strictly relational and computed from active database entities.

---

## 2. Core Entities & Relationships

### 1. `User`
- **Fields**: `id`, `name`, `email`, `password` (bcrypt hash), `role` (`DIRECTOR`, `ADMIN`, `MANAGER`, `EMPLOYEE`), `jobTitle`, `departmentName`, `avatarUrl`, `phone`, `bio`, `skills` (JSON), `emergencyContact`, `joinedDate`, `workPreference`, `status` (`WORKING`, `ON_LEAVE`, `ABSENT`, `REMOTE`, `DEEP_WORK`), `createdAt`, `updatedAt`
- **Relations**:
  - `tasks`: Assigned tasks (`Task[]`)
  - `createdTasks`: Tasks authored by the user (`Task[]`)
  - `leaveRequests`: Leave submissions (`LeaveRequest[]`)
  - `attendanceLogs`: Daily attendance records (`Attendance[]`)
  - `checkIns`: Weekly/daily status check-ins (`CheckIn[]`)
  - `monthlyLogs`: Monthly historical aggregates (`MonthlyLog[]`)
  - `managedProjects`: Projects owned/managed by user (`Project[]`)
  - `goals`: Assigned strategic OKRs (`Goal[]`)
  - `blockersReported`: Blockers logged by user (`Blocker[]`)

### 2. `Project`
- **Fields**: `id`, `name`, `description`, `color`, `status` (`ACTIVE`, `PLANNING`, `COMPLETED`, `ON_HOLD`, `AT_RISK`), `managerId`, `createdAt`, `updatedAt`
- **Relations**: `manager` (`User`), `tasks` (`Task[]`), `milestones` (`Milestone[]`)

### 3. `Task`
- **Fields**: `id`, `title`, `description`, `status` (`BACKLOG`, `PLANNED`, `IN_PROGRESS`, `BLOCKED`, `REVIEW`, `COMPLETED`), `priority` (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), `type` (`Feature`, `Bug`, `Review`, `Testing`, `Ops`), `progress` (0–100), `dueDate`, `timeline`, `groupName`, `assigneeId`, `creatorId`, `projectId`, `createdAt`, `updatedAt`
- **Relations**: `assignee` (`User`), `creator` (`User`), `project` (`Project`), `blocker` (`Blocker?`)

### 4. `Blocker`
- **Fields**: `id`, `title`, `description`, `severity` (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), `status` (`OPEN`, `ACKNOWLEDGED`, `IN_PROGRESS`, `RESOLVED`), `userId`, `taskId`, `expectedResolution`, `createdAt`, `updatedAt`
- **Relations**: `user` (`User`), `task` (`Task?`)

### 5. `Meeting` & `Attendance`
- **Meeting Fields**: `id`, `title`, `description`, `date`, `time`, `durationMinutes`, `location`, `status` (`UPCOMING`, `LIVE`, `COMPLETED`, `CANCELLED`), `organizerId`, `createdAt`
- **Attendance Fields**: `id`, `meetingId`, `userId`, `status` (`PRESENT`, `LATE`, `ABSENT`, `EXCUSED`), `checkInTime`, `hoursWorked`, `note`, `excusedReason`

### 6. `LeaveRequest` & `LeaveBalance`
- **Fields**: `id`, `userId`, `type` (`CASUAL`, `SICK`, `ANNUAL`, `DUTY`, `WFH`), `startDate`, `endDate`, `daysCount`, `reason`, `status` (`PENDING`, `APPROVED`, `REJECTED`, `CANCELLED`), `reviewerName`, `handoverNotes`, `backupUserId`

### 7. `Goal` / OKR
- **Fields**: `id`, `title`, `description`, `userId`, `departmentName`, `progress` (0–100), `status` (`ON_TRACK`, `AT_RISK`, `BEHIND`, `COMPLETED`), `targetDate`

### 8. `AuditLog` & `ActivityEvent`
- **Fields**: `id`, `action`, `actorName`, `actorAvatar`, `entityType`, `entityId`, `details`, `createdAt`

---

## 3. Official VEIXON Team Registry

| Name | Official Title | Server-Side Role | Primary Domain | Public Reference |
| :--- | :--- | :--- | :--- | :--- |
| **V S Sai Siddardh** | Co-founder & Director | `DIRECTOR` | Strategic Architecture, Operations, AI Systems | [veixon.com/team/siddardha.png](https://www.veixon.com/team/siddardha.png) |
| **Abhinav Rishi** | Founder & CEO | `ADMIN` | Executive Leadership & Partnerships | [veixon.com/team/Abhinav.png](https://www.veixon.com/team/Abhinav.png) |
| **Shlok Karn** | Co-founder & CTO | `MANAGER` | Technology Architecture & Distributed Systems | [veixon.com/team/shlok.jpeg](https://www.veixon.com/team/shlok.jpeg) |
| **Suhas** | Cloud & Infrastructure Lead | `MANAGER` | Cloud, Kubernetes, AWS & DevOps | [veixon.com/team/suhas.png](https://www.veixon.com/team/suhas.png) |
| **Arjun J** | Software Engineer | `EMPLOYEE` | Backend Platform & Microservices | [veixon.com/team/ARJUN.png](https://www.veixon.com/team/ARJUN.png) |
| **Shabnam Nisha** | Lead Product Designer | `EMPLOYEE` | UI/UX Systems & Design Tokens | [veixon.com/team/Shabnam.jpeg](https://www.veixon.com/team/Shabnam.jpeg) |
| **C. Taran Teja** | Frontend Engineer | `EMPLOYEE` | Web Applications & Motion | [veixon.com/team/taran.jpeg](https://www.veixon.com/team/taran.jpeg) |
| **Navya** | Head of People & Operations | `HR` / `MANAGER` | People, Culture & Operations | [veixon.com/team/NAVYA.jpeg](https://www.veixon.com/team/NAVYA.jpeg) |
| **Sreeshith** | Lead DevOps / SRE | `EMPLOYEE` | SRE, Prometheus & Uptime Automation | [veixon.com/team/sreeshith.png](https://www.veixon.com/team/sreeshith.png) |
| **Shivani** | QA & Security Engineer | `EMPLOYEE` | Quality Assurance & Hardening | [veixon.com/team/shivani.jpeg](https://www.veixon.com/team/shivani.jpeg) |

---

## 4. Official Realistic Projects Registry

1. **VEIXON Decisions**: Enterprise decision intelligence platform powered by predictive models.
2. **DayZero Foundary**: Rapid prototyping and incubation engine for next-generation products.
3. **Internal Command Center**: Central nervous system for company-wide operations, telemetry, and work management.
4. **Client Platform Development**: Multi-tenant cloud application suite for enterprise clients.
5. **VEIXON Website & Brand**: Public website, interactive web showcases, and design system.
6. **AI Product Development**: Agentic LLM integrations and domain-specific AI workflows.
7. **UI/UX Design Systems**: Reusable component architecture, ergonomic tokens, and micro-interactions.
8. **Infrastructure & Performance**: Multi-region Kubernetes clusters, zero-downtime CI/CD, and latency optimization.
9. **System Integration & SecOps**: Security compliance, IAM policies, and API gateway orchestration.
10. **Consulting & Solutions**: Bespoke technical consulting and architecture reviews for partners.
