# VEIXON COMMAND CENTER
## Complete Real-World Testing, UI/UX QA, Security, Performance, Backend, Database & Git Hardening Prompt

You are now responsible for performing a complete professional QA, security, UX, UI, backend, database, performance, reliability and real-world usage test of the VEIXON Command Center.

This is NOT a simple test.

Do not just click buttons and report whether they work.

Act as an entire engineering and QA team.

You are simultaneously:

- Senior QA Engineer
- UI/UX QA Engineer
- Frontend Engineer
- Backend Engineer
- Database Engineer
- Security Engineer
- Performance Engineer
- DevOps Engineer
- Accessibility Engineer
- Product Manager
- Director
- Manager
- Employee
- Administrator
- Real end user

Your job is:

> TRY TO BREAK THE APPLICATION SAFELY, FIND THE ROOT CAUSE, FIX IT, RETEST IT, AND PUSH THE IMPROVED VERSION TO THE GIT REPOSITORY.

---

# 1. GITHUB REPOSITORY

The source repository is:

`https://github.com/siddardhvanguri-source/progress_track_and_management_website.git`

First:

1. Inspect the repository.
2. Clone/open the repository if necessary.
3. Inspect all branches.
4. Inspect recent commits.
5. Determine the current working branch.
6. Inspect package configuration.
7. Determine the framework.
8. Inspect frontend.
9. Inspect backend.
10. Inspect database.
11. Inspect authentication.
12. Inspect environment configuration.
13. Inspect existing tests.
14. Inspect current UI.
15. Run the application before modifying anything.

DO NOT blindly rewrite the project.

Understand the current implementation first.

---

# 2. GIT SAFETY

Before making changes:

Check:

- current branch
- uncommitted changes
- remote
- repository status

Do NOT destroy existing user work.

If there are uncommitted changes:

preserve them.

Create a dedicated testing/hardening branch if appropriate, for example:

`qa/hardening`

Do not force-push.

Do not rewrite Git history.

Do not delete branches.

---

# 3. DATABASE SAFETY

Before testing destructive operations:

Determine whether the current database is:

- development
- local
- staging
- production
- shared

NEVER wipe a production/shared database.

If it is a development database:

create a safe clean test state.

If it is shared:

create an isolated test database/schema/tenant.

The test must never destroy real VEIXON data.

---

# 4. REAL VEIXON TEAM DATA

Use the people listed on the public VEIXON website for realistic demo/test data.

Public source:

`https://www.veixon.com/`

Primary director:

**V S Sai Siddardh**  
Co-founder, Director

Other publicly listed team members:

- Abhinav Rishi — Founder, CEO
- Shlok Karn — Co-founder, CTO
- Suhas
- C. Taran Teja
- Shabnam Nisha
- Sreeshith
- Shivani
- Arjun J
- Navya

Do not invent public-facing job titles for people where the website does not specify them.

For testing-only role assignments, clearly mark them as internal test configuration.

---

# 5. TEST ACCOUNTS

Create/use isolated test accounts representing:

- DIRECTOR
- MANAGER
- EMPLOYEE
- ADMIN

Primary director:

**V S Sai Siddardh**

Do NOT implement or use an employee switcher.

Do NOT implement a role switcher.

Roles must come from authenticated server-side identity.

---

# 6. BASELINE THE APPLICATION

Before changing anything:

Run the application.

Open it in the browser.

Inspect every existing page.

Record:

- visual problems
- functional problems
- console errors
- network errors
- API errors
- database errors
- authentication problems
- responsive problems
- accessibility problems
- broken routes
- broken buttons
- missing states
- inconsistent components

Create:

`QA_BASELINE.md`

Record everything discovered before fixing.

---

# 7. UI/UX TESTING IS MANDATORY

Do not test only functionality.

Test whether the application actually LOOKS and FEELS correct.

Treat UI quality as a functional requirement.

For every page inspect:

- layout
- spacing
- alignment
- typography
- hierarchy
- contrast
- consistency
- button placement
- navigation
- cards
- tables
- forms
- icons
- empty states
- loading states
- error states
- modal behavior
- drawer behavior
- hover states
- focus states
- animations
- responsiveness
- accessibility
- readability

If something looks wrong, fix it rather than merely reporting it.

---

# 8. VISUAL TESTING PROCESS

For every major page:

1. Open page.
2. Wait for complete load.
3. Inspect desktop.
4. Inspect tablet.
5. Inspect mobile.
6. Scroll from top to bottom.
7. Test every visible interactive element.
8. Test hover.
9. Test focus.
10. Test keyboard navigation.
11. Check console.
12. Check network.
13. Check visual consistency.

If a visual problem is found:

**FIX IT.**

Do not merely report it.

---

# 9. VISUAL REGRESSION

Capture screenshots of important pages before and after changes where practical.

Pages:

- Landing
- Login
- Dashboard
- People
- Employee detail
- Projects
- Project detail
- Tasks
- Task detail
- Calendar
- Meetings
- Meeting detail
- Leave
- Goals
- Blockers
- Reports
- Settings
- Profile

Compare:

- spacing
- alignment
- typography
- component consistency
- responsive behavior
- colors
- visual hierarchy

Do not allow a fix in one page to silently break another.

---

# 10. LANDING PAGE UI TEST

Open:

`/`

Test:

- Header
- Hero
- Navigation
- Hero animation
- Dashboard preview
- CTA
- Feature sections
- Project section
- People section
- Meeting section
- Calendar section
- Blocker section
- "What changed" section
- Final CTA
- Footer

Test all links.

Test all buttons.

Test scrolling.

Test animations.

Test mobile menu.

Test sticky header.

Test browser refresh.

---

# 11. LANDING PAGE UX TEST

Pretend you have NEVER seen VEIXON Command Center before.

Ask:

- What is this?
- Who is it for?
- What problem does it solve?
- What should I click?
- Can I understand the product within 5–10 seconds?
- Can I find login immediately?
- Does the hero show the actual product?
- Does the page feel like a real SaaS product?

If not:

**IMPROVE IT.**

---

# 12. LANDING PAGE RESPONSIVE TEST

Test:

- 1440px
- 1280px
- 1024px
- 768px
- 430px
- 390px

Check:

- no overflow
- no clipped content
- no broken animation
- no overlapping sections
- no broken menu
- no tiny text
- no inaccessible CTA

---

# 13. LOGIN UI TEST

Open:

`/login`

Test:

- Logo
- Heading
- Description
- Email/User ID
- Password
- Show/hide password
- Remember me
- Forgot password
- Login button
- Loading state
- Error state
- Success state
- Mobile layout
- Desktop layout
- Keyboard navigation
- Focus state

---

# 14. LOGIN FUNCTIONAL TEST

Test:

- valid credentials
- invalid credentials
- empty username
- empty password
- wrong password
- unknown user
- expired session
- logout
- refresh
- multiple tabs
- remember me
- network failure
- slow network

---

# 15. DASHBOARD UI TEST

Open:

`/dashboard`

Test the entire visual hierarchy.

Verify:

- Header
- Sidebar
- Global search
- Notifications
- User menu
- Page heading
- Attention Required
- Today
- What Changed
- Project Health
- Calendar
- Activity

The dashboard must answer:

**WHAT IS HAPPENING?**

**WHY?**

**WHAT SHOULD I DO?**

---

# 16. DASHBOARD DENSITY TEST

Check whether too much information is visible at once.

If the screen becomes visually overwhelming:

reduce density.

Do not remove important information.

Prioritize:

- Attention
- Today
- Changes
- Risk
- Actions

---

# 17. TOP-RIGHT UI TEST

The top-right corner MUST NOT contain:

- Employee Switch
- Role Switch
- View As Employee
- Switch User
- Similar functionality

It should contain:

- Notifications
- Avatar
- User name
- Role
- User menu

The user menu should contain:

- Profile
- Settings
- Keyboard shortcuts if implemented
- Sign out

Test it.

---

# 18. SIDEBAR UI TEST

Test:

- active state
- hover state
- collapse if implemented
- navigation
- icons
- badges
- scrolling
- mobile drawer
- keyboard navigation
- permissions

No dead links.

No duplicated routes.

No inconsistent labels.

---

# 19. EMPLOYEE SCENARIO — CREATE TASK

Login as:

**EMPLOYEE**

Ask:

What do I need to do today?

Open Tasks.

Create:

**Implement authentication validation**

Project:

Phoenix

Priority:

High

Due:

Tomorrow

Save.

Verify:

- task appears
- task owner is correct
- project is correct
- dashboard updates
- activity is created
- notifications work where appropriate
- refresh works
- logout
- login again
- task remains

---

# 20. EMPLOYEE WORKFLOW — UPDATE TASK

Employee changes:

`PLANNED → IN PROGRESS`

Progress:

`25%`

Add update:

"Authentication middleware implementation started."

Verify every dependent view updates.

---

# 21. EMPLOYEE BLOCKER WORKFLOW

Employee creates:

**Authentication API validation issue**

Severity:

High

Related task:

Authentication validation

Related project:

Phoenix

Verify:

- task becomes blocked where appropriate
- project reflects blocker
- dashboard reflects blocker
- director can see it
- employee can see its status

---

# 22. DIRECTOR WORKFLOW

Logout.

Login as:

**V S Sai Siddardh — Co-founder, Director**

Open dashboard.

Verify blocker appears in:

**ATTENTION REQUIRED**

Open it.

Verify:

- employee
- project
- task
- blocker
- severity
- duration
- dependency
- activity
- recommended action

Director resolves blocker.

Verify:

- blocker resolved
- task updated
- project updated
- dashboard updated
- employee sees resolution
- activity created

---

# 23. MANAGER WORKFLOW

Login as:

**MANAGER**

Check:

- team
- tasks
- projects
- blockers
- meetings
- leave
- deadlines

Verify manager can perform appropriate team operations.

Attempt restricted director/admin operations.

Verify rejection.

---

# 24. ADMIN WORKFLOW

Login as:

**ADMIN**

Test:

- users
- permissions
- workspace settings
- audit logs
- system settings

Verify admin does not accidentally gain inappropriate business authority unless explicitly designed.

---

# 25. PROJECT UI TEST

Open Projects.

Test:

- list
- cards
- filters
- search
- status
- progress
- deadline
- owner
- clicking project
- project detail
- tabs
- activity
- team
- tasks
- milestones
- timeline

---

# 26. PROJECT REAL-WORLD TEST

Create:

**Project Phoenix**

Add:

- 10 tasks
- 3 milestones
- 3 team members
- 1 blocker
- 1 deadline

Change project status.

Verify every related page updates.

---

# 27. TASK UI TEST

Test:

- create
- edit
- delete if permitted
- assign
- reassign
- status
- priority
- deadline
- progress
- description
- comments
- activity
- dependencies
- blockers

Test:

- modal
- drawer
- detail page
- mobile
- keyboard
- validation

---

# 28. TASK DOUBLE-SUBMISSION TEST

Double-click:

Create Task.

Verify only one task is created.

Repeat:

- Create Project
- Approve Leave
- Create Meeting
- Resolve Blocker

No accidental duplicates.

---

# 29. CALENDAR UI TEST

Test:

- Month
- Week
- Day
- Agenda
- Previous
- Next
- Today
- Filters
- Meeting
- Leave
- Deadline
- Milestone
- Company event

Test:

- desktop
- tablet
- mobile

Verify events are readable.

No overlapping UI.

---

# 30. CALENDAR REAL-WORLD TEST

Create:

- Meeting
- Leave
- Deadline
- Milestone

Create conflicting events.

Verify the system communicates the conflict clearly.

---

# 31. MEETING TEST

Create:

**Engineering Daily Standup**

Participants:

multiple test users.

Test:

- scheduled
- upcoming
- live
- completed
- cancelled
- attendance
- late
- absent
- excused

---

# 32. ABSENCE SCENARIO

Employee:

Absent

Reason:

Technical issue

Explanation:

Internet connection failed.

Director reviews.

Choose:

**Mark Excused**

Verify:

- attendance updates
- dashboard updates
- activity updates
- employee sees outcome

---

# 33. LEAVE UI TEST

Test:

- request leave
- date selection
- leave type
- reason
- handover
- submit
- pending
- approved
- rejected
- cancelled
- calendar
- history
- notifications

---

# 34. LEAVE CONFLICT TEST

Create:

Leave:

18–19 September

Project deadline:

18 September

Verify director sees:

- affected tasks
- deadline
- project responsibility
- potential conflict
- handover

Then approve.

Verify all related pages update.

---

# 35. BLOCKER UI TEST

Test:

- create
- edit
- assign
- severity
- dependency
- status
- resolve
- filter
- search
- detail
- activity

---

# 36. NOTIFICATION UI TEST

Test:

- unread
- read
- mark read
- mark all read
- deep link
- notification count
- duplicate prevention
- mobile
- desktop

---

# 37. SEARCH TEST

Search:

- Phoenix
- Authentication
- Siddardh
- nonexistent term
- special characters
- partial text

Verify:

- correct results
- no unauthorized records
- no server errors
- proper empty state

---

# 38. COMMAND MENU TEST

Press:

`Ctrl + K`

Test every command.

Verify:

- keyboard
- mouse
- Escape
- search
- navigation
- actions

No dead commands.

---

# 39. EMPTY STATE UI TEST

Test pages with zero data.

Verify proper messages:

- No projects.
- No tasks.
- No meetings.
- No blockers.
- No notifications.
- No leave requests.
- No goals.

Do not show broken empty screens.

---

# 40. LOADING STATE UI TEST

Throttle network.

Test every major page.

Verify skeleton/loading states.

No:

- layout jumps
- blank screen
- broken cards
- frozen interface

---

# 41. ERROR STATE UI TEST

Simulate controlled API failures.

Verify:

- friendly message
- retry
- recovery
- no stack trace
- no SQL error
- no secret leakage

---

# 42. FORM VALIDATION UI TEST

Every form must test:

- empty
- invalid
- too long
- too short
- special characters
- Unicode
- emoji
- invalid dates
- invalid numbers
- duplicate values

Verify errors appear next to the correct field.

---

# 43. FRONTEND SECURITY — XSS RESISTANCE

Use harmless payloads such as:

`<script>alert("XSS")</script>`

inside:

- task
- project
- comment
- meeting
- leave
- profile

Verify it never executes.

Test stored values after page reload.

---

# 44. AUTHORIZATION TEST

As employee:

Attempt:

- director action
- manager action
- admin action
- another employee's data

Attempt through:

- UI
- direct URL
- API request
- manually modified IDs

Every unauthorized operation must fail server-side.

---

# 45. IDOR TEST

If:

User A owns Task A.

Attempt to access:

Task B

by modifying the identifier.

Repeat for:

- projects
- tasks
- meetings
- leave requests
- notifications
- profiles
- blockers

Verify object-level authorization.

---

# 46. API TESTING

Inventory all API endpoints.

Create:

`API_TEST_MATRIX.md`

Columns:

- METHOD
- ROUTE
- AUTH
- ROLE
- INPUT
- OUTPUT
- SUCCESS
- FAILURE
- RATE LIMIT
- AUTHORIZATION

Test:

- GET
- POST
- PATCH
- PUT
- DELETE

where applicable.

---

# 47. DATABASE TESTING

Inspect:

- foreign keys
- indexes
- unique constraints
- relationships
- transactions
- cascade rules
- orphan records
- null handling
- duplicate records
- query performance
- N+1 queries

---

# 48. DATA CONSISTENCY TEST

Create:

- Task
- Assign employee
- Update task
- Create blocker
- Resolve blocker
- Create project
- Update project
- Create meeting
- Mark attendance
- Request leave
- Approve leave

Then inspect:

- dashboard
- employee
- project
- task
- calendar
- meeting
- notifications
- activity

All views must agree.

---

# 49. CONCURRENT EDITING

Open the same task as two users.

User A changes status.

User B changes owner.

Save.

Verify predictable conflict handling.

Do not silently overwrite important data.

---

# 50. MULTI-TAB TEST

Open two browser tabs.

Change data in one.

Inspect the other.

Verify stale information is handled correctly.

---

# 51. NETWORK FAILURE TEST

Use browser network throttling / controlled failure.

Test:

- dashboard
- task creation
- project update
- leave
- meeting
- notifications

Verify:

- no duplicate writes
- clear error
- retry
- recovery

---

# 52. MOBILE UI TEST

Use mobile viewport.

As employee:

- login
- dashboard
- create task
- update task
- create blocker
- calendar
- meeting
- leave
- notifications

Verify complete workflow.

---

# 53. ACCESSIBILITY TEST

Test keyboard only.

Do not use mouse.

Navigate:

- landing
- login
- dashboard
- tasks
- projects
- calendar
- meetings
- leave
- settings

Test:

- Tab
- Shift+Tab
- Enter
- Space
- Escape
- Arrow keys where appropriate

Verify visible focus.

---

# 54. SCREEN READER SEMANTICS

Inspect:

- labels
- buttons
- ARIA
- headings
- landmarks
- form associations
- dialog labels
- icon-only buttons

Tooltips must not be the only way important information is communicated.

---

# 55. COLOR / CONTRAST TEST

Verify:

- text
- buttons
- status badges
- links
- inputs
- disabled states
- focus states

Meet WCAG-oriented contrast expectations where applicable.

Do not rely on color alone.

---

# 56. ANIMATION TEST

Test:

- landing animations
- dashboard transitions
- modals
- drawers
- dropdowns
- loading
- progress
- hover

Verify:

- no excessive animation
- no flicker
- no layout shift
- no performance problems
- reduced motion works

---

# 57. TYPOGRAPHY TEST

Inspect:

- headings
- body text
- labels
- table text
- mobile text
- long names
- long project titles
- long task titles

Verify text doesn't unexpectedly:

- overflow
- clip
- overlap
- destroy layout

---

# 58. LONG-DATA TEST

Create test values containing:

- very long task name
- very long project name
- long employee name
- long description
- large comment
- many tags
- many participants

Verify UI remains usable.

---

# 59. PERFORMANCE TEST

Measure:

- landing load
- login
- dashboard
- projects
- tasks
- calendar
- search
- API latency
- database queries

Record:

- TTFB
- page load
- API response
- p95
- p99
- error rate

---

# 60. CONTROLLED LOAD TEST

ONLY test against:

- local
- isolated development
- staging

NEVER perform uncontrolled load testing against production.

Test progressively:

- 10 concurrent users
- 25
- 50
- 100

Monitor:

- CPU
- memory
- database connections
- latency
- errors
- throughput
- recovery

Do not perform a DDoS.

The objective is resilience testing.

---

# 61. BURST TEST

Simulate a realistic event:

100 users open dashboard.

Then:

100 users refresh.

Then:

100 users search.

Then:

100 users independently create/update tasks.

Measure:

- API
- database
- server
- latency
- errors
- memory
- CPU

---

# 62. DATABASE PERFORMANCE

Find:

- N+1 queries
- unbounded queries
- missing indexes
- large joins
- duplicate queries
- unnecessary fields
- slow dashboard queries

Optimize where required.

---

# 63. RATE LIMITING

Test sensitive endpoints:

- login
- password reset
- search
- task creation
- comments
- notifications
- admin actions

Verify reasonable rate limits exist where appropriate.

Do not generate uncontrolled traffic.

---

# 64. SECURITY HEADERS

Inspect HTTP responses.

Review appropriate:

- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- frame protection
- HSTS in HTTPS environments
- secure cookies
- HttpOnly
- SameSite

Configure intentionally.

Do not blindly add headers that break legitimate functionality.

---

# 65. SECRET AUDIT

Search repository for:

- API keys
- passwords
- tokens
- database credentials
- private keys
- hardcoded secrets
- production credentials

Remove exposed secrets.

Use:

- environment variables
- `.env.example`

Never commit actual credentials.

---

# 66. CLIENT DATA EXPOSURE

Inspect:

- Network
- localStorage
- sessionStorage
- cookies
- browser state
- API responses

Verify sensitive information is not unnecessarily exposed.

---

# 67. FILE UPLOAD TEST

If file upload exists, test:

- valid file
- wrong extension
- wrong MIME
- large file
- empty file
- malicious filename
- double extension
- unauthorized file access

Verify safe handling.

---

# 68. AUDIT LOG TEST

Perform:

- create
- update
- delete
- approve
- reject
- resolve
- assign
- permission-sensitive actions

Verify audit records contain:

- who
- what
- when
- target
- action
- result

Never log:

- passwords
- tokens
- secrets

---

# 69. SERVER FAILURE TEST

In isolated environment, simulate:

- database unavailable
- API timeout
- slow query
- connection failure
- invalid response

Verify:

- friendly error
- recovery
- no corruption
- no secret leakage

---

# 70. BROWSER COMPATIBILITY

Test the application in:

- Chrome
- Edge
- Firefox
- Safari if available

Check:

- layout
- authentication
- animations
- forms
- calendar
- dialogs
- navigation

---

# 71. REAL DIRECTOR DAY

Forget that you are a tester.

Pretend you are:

**V S Sai Siddardh**  
Co-founder, Director

You open Command Center.

You have not opened it for two days.

Ask:

- What changed?
- What is blocked?
- Which projects are at risk?
- Who is away?
- What meetings are today?
- What needs approval?
- What needs my decision?

Can I understand this in 30 seconds?

Can I act within 2 minutes?

If not:

**REDESIGN THE EXPERIENCE.**

---

# 72. REAL EMPLOYEE DAY

Pretend you are an employee.

Ask:

- What am I working on?
- What is due?
- What meeting is next?
- What is blocked?
- What should I update?
- Can I complete common actions quickly?

If not:

**SIMPLIFY.**

---

# 73. REAL MANAGER DAY

Pretend you are a manager.

Ask:

- Who needs help?
- What is blocked?
- What deadlines are at risk?
- What changed?
- Who is absent?
- What needs approval?

If the answers are difficult to find:

**IMPROVE INFORMATION HIERARCHY.**

---

# 74. REAL ADMIN DAY

Test:

- users
- permissions
- settings
- audit
- workspace
- security

Do not allow accidental privilege escalation.

---

# 75. UX COGNITIVE LOAD TEST

For every important page ask:

- Can I understand where I am?
- Can I understand what matters?
- Can I understand what to do?
- Can I recover from mistakes?
- Can I undo where appropriate?
- Can I find information quickly?

If not:

**IMPROVE THE UX.**

---

# 76. DESIGN CONSISTENCY TEST

Compare every page.

Verify consistent:

- buttons
- radius
- spacing
- icons
- colors
- typography
- tables
- forms
- badges
- dialogs
- dropdowns
- empty states
- loading states

Do not allow:

Page A uses one button style.

Page B uses another.

Page C uses another.

Create reusable components where necessary.

---

# 77. RESPONSIVE BREAKPOINT TEST

Explicitly inspect:

- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

Look for:

- overflow
- layout collapse
- navigation failure
- table failure
- modal overflow
- calendar problems
- text clipping

---

# 78. ROUTE TEST

Directly open every route.

Test invalid route.

Verify:

- 404
- protected route
- unauthenticated redirect
- unauthorized response

No accidental internal data exposure.

---

# 79. REFRESH TEST

On every major page:

refresh.

Verify:

- state
- authentication
- URL
- filters where appropriate
- data
- navigation

No broken state.

---

# 80. BACK/FORWARD TEST

Test:

Dashboard
→ Project
→ Task
→ Employee
→ Back
→ Forward

Verify correct browser navigation.

---

# 81. DATE/TIME TESTING

Test:

- today
- tomorrow
- overdue
- future
- month change
- year change
- midnight
- different timezone where supported

Verify:

- calendar
- meetings
- leave
- deadlines
- notifications

all remain consistent.

---

# 82. REALISTIC DATA VOLUME

Test with:

- 30 employees
- 10 projects
- 100+ tasks
- 50 meetings
- 30 leave requests
- 20 blockers
- 30 goals
- hundreds of activity records

Verify application remains usable.

---

# 83. NO FAKE DASHBOARD NUMBERS

Dashboard values must originate from real underlying data.

Do NOT hardcode:

- 74%
- 6 issues
- 7 tasks
- 3 blockers

unless they are generated from actual records.

If task data changes:

dashboard must change.

---

# 84. FIXING RULE

Whenever a problem is found:

Do NOT just write:

"Bug found."

Instead:

1. reproduce
2. isolate
3. identify root cause
4. fix
5. run focused test
6. run regression
7. visually inspect
8. continue

---

# 85. REGRESSION TEST

After every major fix:

Rerun the affected workflow.

Then rerun related workflows.

Example:

Fix task creation.

Retest:

- Task creation
- Task assignment
- Dashboard
- Project progress
- Notifications
- Activity
- Search
- Employee page

---

# 86. DO NOT FIX ONE THING AND BREAK THREE THINGS

Before committing:

Run:

- lint
- type check
- unit tests if present
- integration tests if present
- build
- application startup
- browser smoke tests

---

# 87. AUTOMATED TESTS

Where missing, add appropriate automated tests.

At minimum create tests for:

- authentication
- authorization
- task creation
- task update
- project creation
- blocker creation
- leave request
- leave approval
- meeting attendance
- dashboard calculations
- notification creation
- object-level authorization
- input validation

---

# 88. END-TO-END TESTS

If Playwright or an equivalent framework is appropriate, implement end-to-end scenarios.

Important E2E flows:

- Employee login
- Employee creates task
- Employee updates task
- Employee creates blocker
- Director sees blocker
- Director resolves blocker
- Employee sees resolution
- Employee requests leave
- Director approves leave
- Meeting attendance
- Dashboard update
- Logout
- Unauthorized access

---

# 89. SECURITY TEST AUTOMATION

Add automated regression tests for:

- unauthenticated access
- wrong role
- IDOR
- invalid input
- XSS sanitization/escaping
- session behavior
- permission checks

---

# 90. UI REGRESSION AUTOMATION

Where practical, use screenshot/visual regression tests for critical screens:

- Landing
- Login
- Dashboard
- Projects
- Tasks
- Calendar
- Meetings
- Leave
- Mobile dashboard

This should catch unintended visual changes.

---

# 91. ACCESSIBILITY AUTOMATION

Where practical run automated accessibility checks.

Check:

- missing labels
- invalid ARIA
- contrast issues where tooling supports it
- heading hierarchy
- keyboard accessibility

---

# 92. BUILD TEST

Run the production build.

Fix:

- TypeScript errors
- ESLint errors
- build errors
- missing imports
- missing environment variables
- server/client boundary errors
- hydration problems

---

# 93. CONSOLE TEST

Final application should have:

- no unexpected errors
- no React warnings
- no hydration errors
- no failed assets
- no repeated failed API requests

---

# 94. NETWORK TEST

Inspect:

- API requests
- duplicates
- payload size
- status codes
- sensitive information
- slow calls
- failed calls
- unnecessary calls

---

# 95. FINAL DATABASE TEST

After all scenarios verify:

- no orphan records
- no duplicates
- no invalid foreign keys
- no corrupt relationships
- no unexpected test data outside isolated environment

---

# 96. FINAL SECURITY REVIEW

Inspect:

- authentication
- authorization
- sessions
- cookies
- API
- database
- validation
- uploads
- headers
- secrets
- logging
- audit
- rate limiting
- object-level authorization
- privilege escalation

---

# 97. FINAL UI REVIEW

Open every major page one final time.

Do NOT read the code.

Look at the product as a human.

Ask:

- Does it look professional?
- Does it feel consistent?
- Does anything look broken?
- Is anything too crowded?
- Is anything unnecessarily complicated?
- Are buttons obvious?
- Are statuses understandable?
- Are errors helpful?
- Are animations tasteful?
- Does mobile feel intentional?
- Does the landing page feel premium?
- Does the dashboard feel like VEIXON?

Fix anything that fails this test.

---

# 98. GIT COMMIT STRATEGY

Make clean commits.

Example:

`qa: baseline application testing`

`fix: improve dashboard attention hierarchy`

`fix: remove employee switcher`

`fix: strengthen task authorization`

`fix: improve mobile calendar`

`test: add employee workflow e2e`

`test: add authorization regression tests`

`test: add dashboard visual regression`

Do not make one enormous meaningless commit.

---

# 99. PUSH TO GITHUB

After all changes:

Run:

- `git status`
- `git diff`
- tests
- lint
- typecheck
- build

Then commit.

Push to the repository.

Do NOT force push.

Do NOT overwrite unrelated work.

Use the appropriate branch.

If the project is already configured with the correct remote, use it.

---

# 100. FINAL TEST REPORT

Create:

`QA_FINAL_REPORT.md`

Include:

## Executive Summary

Overall status.

## Environment

Local/staging/test environment.

## Build

Commit hash.

## Test Coverage

Number of scenarios.

## UI Tests

Passed/failed.

## UX Tests

Passed/failed.

## Frontend

Passed/failed.

## Backend

Passed/failed.

## Database

Passed/failed.

## Authentication

Passed/failed.

## Authorization

Passed/failed.

## Security

Passed/failed.

## Performance

Passed/failed.

## Accessibility

Passed/failed.

## Responsive

Passed/failed.

## Browser

Passed/failed.

## Bugs Found

List.

## Bugs Fixed

List.

## Remaining Issues

List.

## Security Findings

List.

## Performance Findings

List.

## Recommendations

List.

---

# 101. BUG SEVERITY

Use:

## P0 — CRITICAL

- authentication bypass
- privilege escalation
- data loss
- database corruption
- critical production failure

## P1 — HIGH

- major workflow broken
- authorization vulnerability
- serious data integrity problem

## P2 — MEDIUM

- important UX/functionality issue
- performance problem

## P3 — LOW

- minor visual issue
- minor interaction issue

---

# 102. EVIDENCE

For every important failure record:

TEST

EXPECTED

ACTUAL

RESULT

ROOT CAUSE

FIX

RETEST

Example:

TEST:
Employee creates task.

EXPECTED:
Task appears under employee.

ACTUAL:
Task saved but dashboard did not update.

RESULT:
FAILED.

ROOT CAUSE:
Stale query cache.

FIX:
Invalidated task query after mutation.

RETEST:
PASSED.

---

# 103. FINAL QUALITY GATE

Do not declare completion until:

- [ ] Landing tested
- [ ] Landing visually inspected
- [ ] Landing responsive
- [ ] Login tested
- [ ] Login visually inspected
- [ ] Authentication tested
- [ ] Logout tested
- [ ] Dashboard tested
- [ ] Dashboard visually inspected
- [ ] Employee workflow tested
- [ ] Manager workflow tested
- [ ] Director workflow tested
- [ ] Admin workflow tested
- [ ] Employee switcher removed
- [ ] Role switcher removed
- [ ] User menu tested
- [ ] Sidebar tested
- [ ] Search tested
- [ ] Command menu tested
- [ ] People tested
- [ ] Projects tested
- [ ] Tasks tested
- [ ] Calendar tested
- [ ] Meetings tested
- [ ] Attendance tested
- [ ] Leave tested
- [ ] Goals tested
- [ ] Blockers tested
- [ ] Reports tested
- [ ] Notifications tested
- [ ] Settings tested
- [ ] Profile tested
- [ ] Empty states tested
- [ ] Loading states tested
- [ ] Error states tested
- [ ] Form validation tested
- [ ] Accessibility tested
- [ ] Keyboard tested
- [ ] Mobile tested
- [ ] Tablet tested
- [ ] Desktop tested
- [ ] Browser compatibility tested
- [ ] API tested
- [ ] Database tested
- [ ] Server tested
- [ ] Authentication security tested
- [ ] Authorization tested
- [ ] IDOR tested
- [ ] XSS resistance tested
- [ ] SQL injection resistance reviewed
- [ ] CSRF protections reviewed
- [ ] Session security tested
- [ ] Rate limiting reviewed
- [ ] Security headers reviewed
- [ ] Secrets audited
- [ ] File uploads tested if applicable
- [ ] Concurrent editing tested
- [ ] Multi-tab tested
- [ ] Network failures tested
- [ ] Database failure tested in isolation
- [ ] Performance tested
- [ ] Controlled load tested
- [ ] No production systems attacked
- [ ] No production database damaged
- [ ] No console errors
- [ ] No hydration errors
- [ ] No broken routes
- [ ] No dead buttons
- [ ] No unauthorized access
- [ ] Dashboard values are data-driven
- [ ] Regression tests passed
- [ ] Production build succeeds
- [ ] Git changes reviewed
- [ ] Changes committed
- [ ] Changes pushed to GitHub
- [ ] QA_FINAL_REPORT.md created

---

# 104. FINAL RULE

Do not stop because:

"the application works."

Do not stop because:

"all pages load."

Do not stop because:

"the tests pass."

Instead ask:

### If VEIXON gave this application to its employees tomorrow, what would go wrong?

Find those problems.

Fix them.

Test again.

Then ask:

### What would annoy an employee after using this for 30 days?

Fix those problems.

Then ask:

### What would confuse the director at 8:30 AM when something important has gone wrong?

Fix those problems.

Then ask:

### What happens if 30 employees use it simultaneously?

Test it.

Then ask:

### What happens if someone maliciously tries to access another user's information?

Test it safely.

Then ask:

### What happens if the database/API/network fails?

Test it.

Then ask:

### What happens on a 390px phone?

Test it.

Then ask:

### Does the UI actually look like a polished product?

Inspect it visually.

Fix it.

---

# FINAL OBJECTIVE

Transform the current repository into a strong, production-quality VEIXON Command Center.

The goal is:

**BUILD → TEST → BREAK SAFELY → FIX → RETEST → REGRESSION → VISUAL QA → PERFORMANCE QA → SECURITY QA → COMMIT → PUSH**

Do not merely produce a testing report.

**Actively improve the application while testing it.**

The final result should be a product that is:

- FAST
- SECURE
- RELIABLE
- RESPONSIVE
- ACCESSIBLE
- VISUALLY POLISHED
- DATA-CONSISTENT
- ROLE-SAFE
- MAINTAINABLE
- READY FOR REAL VEIXON INTERNAL USE

When finished, provide a concise final summary containing:

1. Git branch
2. Final commit
3. Tests performed
4. Number of issues found
5. Number of issues fixed
6. Remaining issues
7. Security findings
8. Performance findings
9. UI/UX improvements
10. Whether production build passes

Do not claim something passed unless you actually tested it.
