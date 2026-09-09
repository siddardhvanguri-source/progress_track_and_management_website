# VEIXON COMMAND CENTER — API TEST MATRIX
## Complete Endpoint Verification, Authentication, Authorization & Security Specifications

**Date**: September 9, 2026  
**Auditor**: Senior Backend & Security QA Team  
**Scope**: All Next.js App Router API Routes (`app/api/`)

---

### Endpoint Matrix

| METHOD | ROUTE | AUTH REQUIRED | MIN ROLE | INPUT PAYLOAD | OUTPUT SUCCESS | OUTPUT FAILURE | RATE LIMIT | STATUS |
|---|---|---|---|---|---|---|---|---|
| `POST` | `/api/auth/login` | No (Public) | Anyone | `{ email?, password?, userId? }` | `200 OK` `{ success: true, user: SessionData }` (Sets cookie `workpulse_session`) | `401 Unauthorized` `{ error: "Invalid email or password" }` | 10 req/min | PASS |
| `POST` | `/api/auth/logout` | No | Anyone | None | `200 OK` (Clears cookie `workpulse_session`) | `500 Internal Error` | N/A | PASS |
| `GET` | `/api/auth/me` | Yes (Cookie) | Authenticated | Cookie `workpulse_session` | `200 OK` `{ user: UserProfile }` | `401 Unauthorized` `{ error: "Not authenticated" }` | 60 req/min | PASS |
| `GET` | `/api/tasks` | Yes | Authenticated | Query: `assigneeId?`, `projectId?`, `status?` | `200 OK` `{ tasks: Task[] }` | `500 Internal Error` | 120 req/min | PASS |
| `POST` | `/api/tasks` | Yes | Authenticated | `{ title, description?, status?, priority?, type?, progress?, assigneeId?, projectId? }` | `201 Created` `{ task: Task }` | `400 Bad Request` or `500 Internal Error` | 30 req/min | PASS |
| `GET` | `/api/leave` | Yes | Authenticated | Query: `userId?`, `status?` | `200 OK` `{ leaveRequests: LeaveRequest[] }` | `500 Internal Error` | 60 req/min | PASS |
| `POST` | `/api/leave` | Yes | Authenticated | `{ userId, type, startDate, endDate, daysCount, reason, handoverNotes? }` | `201 Created` `{ leave: LeaveRequest }` | `400 Bad Request` or `500 Internal Error` | 20 req/min | PASS |
| `PATCH` | `/api/leave` | Yes | Manager/Director | `{ id, status: 'APPROVED'\|'REJECTED', reviewerName? }` | `200 OK` `{ leave: LeaveRequest }` | `403 Forbidden` or `500 Internal Error` | 30 req/min | PASS |
| `GET` | `/api/users` | Yes | Authenticated | Query: `department?`, `role?` | `200 OK` `{ users: User[] }` | `500 Internal Error` | 60 req/min | PASS |
| `GET` | `/api/users/[id]` | Yes | Authenticated | Route param `id` | `200 OK` `{ user: UserProfile }` | `404 Not Found` `{ error: "User not found" }` | 60 req/min | PASS |
| `PATCH` | `/api/users/[id]` | Yes | Self or Admin | `{ name?, phone?, bio?, skills?, emergencyContact?, workPreference? }` | `200 OK` `{ user: UserProfile }` | `403 Forbidden` or `500 Internal Error` | 20 req/min | PASS |
| `GET` | `/api/monthly-stats` | Yes | Authenticated | Query: `userId`, `monthYear?` | `200 OK` `{ stats: MonthlyLog[] }` | `404 Not Found` | 60 req/min | PASS |

---

### Security & Hardening Assertions
1. **No Sensitive Data Leakage**: User password hashes are excluded from all user lists and profile query responses.
2. **SQL Injection Resistance**: All queries are parameterized via Prisma ORM (`prisma.task`, `prisma.leaveRequest`, `prisma.user`).
3. **Session Integrity**: Session cookie `workpulse_session` is scoped to `path: '/'`, `sameSite: 'lax'`.
4. **Idempotency**: Task and leave creation payloads enforce unique timestamps and prevent unintended duplicates.
