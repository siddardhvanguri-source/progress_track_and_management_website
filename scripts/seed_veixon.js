const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const VEIXON_USERS = [
  {
    id: 'usr-1',
    name: 'V S Sai Siddardh',
    email: 'siddhardh@veixon.tech',
    password: 'password123',
    role: 'DIRECTOR',
    jobTitle: 'Co-founder & Director',
    departmentName: 'Executive Engineering',
    avatarUrl: 'https://www.veixon.com/team/siddardha.png',
    phone: '+91 96185 87055',
    bio: 'Strategic Architecture, Operations, and AI Systems across VEIXON.Tech.',
    skills: JSON.stringify(['Strategic Architecture', 'Operations', 'Leadership', 'AI Systems', 'Next.js', 'System Design']),
    emergencyContact: 'Executive Office - +91 96185 87055',
    joinedDate: 'January 15, 2023',
    workPreference: 'On-site',
    status: 'WORKING',
  },
  {
    id: 'usr-2',
    name: 'Abhinav Rishi',
    email: 'abhinav@veixon.tech',
    password: 'password123',
    role: 'ADMIN',
    jobTitle: 'Founder & CEO',
    departmentName: 'Executive Leadership',
    avatarUrl: 'https://www.veixon.com/team/Abhinav.png',
    phone: '+91 98000 00001',
    bio: 'Company vision, enterprise partnerships, and operational scaling.',
    skills: JSON.stringify(['Executive Leadership', 'Product Vision', 'Business Scaling', 'Strategic Partnerships']),
    emergencyContact: 'HQ Operations - (555) 019-2834',
    joinedDate: 'January 1, 2023',
    workPreference: 'On-site',
    status: 'WORKING',
  },
  {
    id: 'usr-3',
    name: 'Shlok Karn',
    email: 'shlok@veixon.tech',
    password: 'password123',
    role: 'MANAGER',
    jobTitle: 'Co-founder & CTO',
    departmentName: 'Technology & Architecture',
    avatarUrl: 'https://www.veixon.com/team/shlok.jpeg',
    phone: '+91 98000 00002',
    bio: 'Technology roadmaps, deep engineering standards, and platform infrastructure.',
    skills: JSON.stringify(['Distributed Systems', 'Cloud Infra', 'System Architecture', 'Go', 'PostgreSQL']),
    emergencyContact: 'HQ Operations - (555) 018-9921',
    joinedDate: 'January 1, 2023',
    workPreference: 'On-site',
    status: 'WORKING',
  },
  {
    id: 'usr-4',
    name: 'Suhas',
    email: 'suhas@veixon.tech',
    password: 'password123',
    role: 'MANAGER',
    jobTitle: 'Cloud & Infrastructure Lead',
    departmentName: 'Cloud & DevOps',
    avatarUrl: 'https://www.veixon.com/team/suhas.png',
    phone: '+91 98000 00003',
    bio: 'Kubernetes orchestration, multi-region failover, and CI/CD pipelines.',
    skills: JSON.stringify(['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Security', 'Docker']),
    emergencyContact: 'Ops Emergency - (555) 012-7766',
    joinedDate: 'March 15, 2023',
    workPreference: 'On-site',
    status: 'WORKING',
  },
  {
    id: 'usr-5',
    name: 'Arjun J',
    email: 'arjun@veixon.tech',
    password: 'password123',
    role: 'EMPLOYEE',
    jobTitle: 'Software Engineer',
    departmentName: 'Backend Engineering',
    avatarUrl: 'https://www.veixon.com/team/ARJUN.png',
    phone: '+91 98000 00004',
    bio: 'Building resilient microservices, high-throughput queues, and cache layers.',
    skills: JSON.stringify(['Node.js', 'Go', 'Redis', 'PostgreSQL', 'Microservices', 'GraphQL']),
    emergencyContact: 'Family Contact - (555) 014-8833',
    joinedDate: 'June 1, 2023',
    workPreference: 'On-site',
    status: 'WORKING',
  },
  {
    id: 'usr-6',
    name: 'Shabnam Nisha',
    email: 'shabnam@veixon.tech',
    password: 'password123',
    role: 'EMPLOYEE',
    jobTitle: 'Lead Product Designer',
    departmentName: 'Design Systems',
    avatarUrl: 'https://www.veixon.com/team/Shabnam.jpeg',
    phone: '+91 98000 00005',
    bio: 'Crafting VEIXON Command Center ergonomics, design tokens, and user experience.',
    skills: JSON.stringify(['Figma', 'Design Systems', 'UI/UX', 'Design Tokens', 'Prototyping']),
    emergencyContact: 'Family Contact - (555) 016-5544',
    joinedDate: 'May 1, 2023',
    workPreference: 'On-site',
    status: 'WORKING',
  },
  {
    id: 'usr-7',
    name: 'C. Taran Teja',
    email: 'taran@veixon.tech',
    password: 'password123',
    role: 'EMPLOYEE',
    jobTitle: 'Frontend Engineer',
    departmentName: 'Web & Applications',
    avatarUrl: 'https://www.veixon.com/team/taran.jpeg',
    phone: '+91 98000 00006',
    bio: 'Delivering responsive, high-performance web applications and fluid UI animations.',
    skills: JSON.stringify(['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']),
    emergencyContact: 'Family Contact - (555) 017-3322',
    joinedDate: 'July 1, 2023',
    workPreference: 'On-site',
    status: 'WORKING',
  },
  {
    id: 'usr-8',
    name: 'Navya',
    email: 'navya@veixon.tech',
    password: 'password123',
    role: 'HR',
    jobTitle: 'Head of People & Operations',
    departmentName: 'People & Culture',
    avatarUrl: 'https://www.veixon.com/team/NAVYA.jpeg',
    phone: '+91 98000 00007',
    bio: 'Fostering company culture, managing leaves, on-duty approvals, and team wellness.',
    skills: JSON.stringify(['People Operations', 'HR', 'Talent Management', 'Culture', 'Compliance']),
    emergencyContact: 'Operations - (555) 018-4455',
    joinedDate: 'April 1, 2023',
    workPreference: 'On-site',
    status: 'WORKING',
  },
  {
    id: 'usr-9',
    name: 'Sreeshith',
    email: 'sreeshith@veixon.tech',
    password: 'password123',
    role: 'EMPLOYEE',
    jobTitle: 'Lead DevOps / SRE',
    departmentName: 'Infrastructure & SRE',
    avatarUrl: 'https://www.veixon.com/team/sreeshith.png',
    phone: '+91 98000 00008',
    bio: 'Uptime monitoring, deployment automation, and zero-downtime release pipelines.',
    skills: JSON.stringify(['DevOps', 'Kubernetes', 'Prometheus', 'Grafana', 'Terraform', 'CI/CD']),
    emergencyContact: 'Emergency - (555) 019-5566',
    joinedDate: 'August 1, 2023',
    workPreference: 'On-site',
    status: 'WORKING',
  },
  {
    id: 'usr-10',
    name: 'Shivani',
    email: 'shivani@veixon.tech',
    password: 'password123',
    role: 'EMPLOYEE',
    jobTitle: 'QA & Security Engineer',
    departmentName: 'Quality Assurance',
    avatarUrl: 'https://www.veixon.com/team/shivani.jpeg',
    phone: '+91 98000 00009',
    bio: 'End-to-end test automation, penetration testing, and software quality.',
    skills: JSON.stringify(['QA Automation', 'Playwright', 'Security Testing', 'Jest', 'API Testing']),
    emergencyContact: 'Emergency - (555) 020-6677',
    joinedDate: 'September 1, 2023',
    workPreference: 'On-site',
    status: 'WORKING',
  },
];

const VEIXON_PROJECTS = [
  {
    id: 'proj-1',
    name: 'VEIXON Decisions',
    description: 'Enterprise decision intelligence platform powered by predictive models and automated analytics.',
    color: '#2962FF',
    status: 'ACTIVE',
    managerId: 'usr-1',
  },
  {
    id: 'proj-2',
    name: 'DayZero Foundary',
    description: 'Rapid prototyping and incubation engine for next-generation products across industry verticals.',
    color: '#00E5FF',
    status: 'ACTIVE',
    managerId: 'usr-2',
  },
  {
    id: 'proj-3',
    name: 'Internal Command Center',
    description: 'Central operational nervous system for company-wide progress tracking, people, and telemetry.',
    color: '#7C3AED',
    status: 'ACTIVE',
    managerId: 'usr-1',
  },
  {
    id: 'proj-4',
    name: 'Client Platform Development',
    description: 'High-throughput enterprise SaaS architecture delivering custom cloud microservices.',
    color: '#F59E0B',
    status: 'ACTIVE',
    managerId: 'usr-3',
  },
  {
    id: 'proj-5',
    name: 'VEIXON Website & Brand',
    description: 'Official VEIXON web showcase, interactive experience layers, and company portal.',
    color: '#10B981',
    status: 'ACTIVE',
    managerId: 'usr-6',
  },
  {
    id: 'proj-6',
    name: 'AI Product Development',
    description: 'Autonomous LLM agent integrations, embedding pipelines, and semantic intelligence workflows.',
    color: '#3B82F6',
    status: 'ACTIVE',
    managerId: 'usr-1',
  },
  {
    id: 'proj-7',
    name: 'UI/UX Design Systems',
    description: 'Component architecture, ergonomic tokens, and micro-interactions for modern web platforms.',
    color: '#EC4899',
    status: 'ACTIVE',
    managerId: 'usr-6',
  },
  {
    id: 'proj-8',
    name: 'Infrastructure & Performance',
    description: 'Multi-region Kubernetes clusters, zero-downtime CI/CD, and low-latency database sharding.',
    color: '#EF4444',
    status: 'ACTIVE',
    managerId: 'usr-4',
  },
  {
    id: 'proj-9',
    name: 'System Integration & SecOps',
    description: 'Enterprise IAM policies, audit trails, penetration hardening, and automated compliance.',
    color: '#8B5CF6',
    status: 'ACTIVE',
    managerId: 'usr-10',
  },
  {
    id: 'proj-10',
    name: 'Consulting & Solutions',
    description: 'Strategic technical consulting, architecture audits, and delivery acceleration for partners.',
    color: '#06B6D4',
    status: 'ACTIVE',
    managerId: 'usr-3',
  },
];

const TASK_TEMPLATES = [
  { title: 'Finalize authentication middleware & token refresh', priority: 'HIGH', type: 'Feature', progress: 100, status: 'COMPLETED' },
  { title: 'Review dashboard information architecture', priority: 'MEDIUM', type: 'Review', progress: 100, status: 'COMPLETED' },
  { title: 'Implement project health calculation formula', priority: 'HIGH', type: 'Feature', progress: 85, status: 'IN_PROGRESS' },
  { title: 'Design mobile calendar and week view agenda', priority: 'MEDIUM', type: 'Feature', progress: 90, status: 'REVIEW' },
  { title: 'Fix notification duplication on duty leave requests', priority: 'HIGH', type: 'Bug', progress: 100, status: 'COMPLETED' },
  { title: 'Review API authorization and server-side RBAC', priority: 'CRITICAL', type: 'Review', progress: 75, status: 'IN_PROGRESS' },
  { title: 'Prepare VEIXON Decisions dashboard analytics widget', priority: 'HIGH', type: 'Feature', progress: 60, status: 'IN_PROGRESS' },
  { title: 'Optimize dashboard query and eliminate N+1 latency', priority: 'HIGH', type: 'Feature', progress: 70, status: 'IN_PROGRESS' },
  { title: 'Review landing page animation & prefers-reduced-motion', priority: 'LOW', type: 'Review', progress: 95, status: 'REVIEW' },
  { title: 'Complete UI regression testing across mobile viewports', priority: 'HIGH', type: 'Testing', progress: 80, status: 'IN_PROGRESS' },
  { title: 'Configure AWS KMS IAM decryption policy for Stripe', priority: 'CRITICAL', type: 'Ops', progress: 40, status: 'BLOCKED' },
  { title: 'Audit PostgreSQL connection pooling and connection limits', priority: 'MEDIUM', type: 'Ops', progress: 100, status: 'COMPLETED' },
  { title: 'Implement leave balance calculator and rollover logic', priority: 'MEDIUM', type: 'Feature', progress: 100, status: 'COMPLETED' },
  { title: 'Deploy Prometheus alerts for 5xx error spikes', priority: 'HIGH', type: 'Ops', progress: 65, status: 'IN_PROGRESS' },
  { title: 'Design elevated card tokens in Tailwind configuration', priority: 'LOW', type: 'Feature', progress: 100, status: 'COMPLETED' },
  { title: 'Implement missed meeting explanation modal and triage', priority: 'HIGH', type: 'Feature', progress: 100, status: 'COMPLETED' },
  { title: 'Perform automated accessibility audit and ARIA tag validation', priority: 'MEDIUM', type: 'Testing', progress: 90, status: 'REVIEW' },
  { title: 'Refactor Kanban drag-and-drop state persistence', priority: 'MEDIUM', type: 'Feature', progress: 100, status: 'COMPLETED' },
  { title: 'Configure GitHub Actions CI workflow for Next.js build', priority: 'HIGH', type: 'Ops', progress: 100, status: 'COMPLETED' },
  { title: 'Validate zero-trust header security across all API endpoints', priority: 'CRITICAL', type: 'Testing', progress: 70, status: 'IN_PROGRESS' },
];

async function seed() {
  console.log('Seeding VEIXON Command Center relational database...');

  // 1. Seed Users
  for (const u of VEIXON_USERS) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    });
  }
  console.log('✓ Users seeded:', VEIXON_USERS.length);

  // 2. Seed Projects
  for (const p of VEIXON_PROJECTS) {
    await prisma.project.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }
  console.log('✓ Projects seeded:', VEIXON_PROJECTS.length);

  // 3. Clear existing tasks & create 100+ relational tasks
  await prisma.task.deleteMany({});

  const userIds = VEIXON_USERS.map((u) => u.id);
  const projectIds = VEIXON_PROJECTS.map((p) => p.id);

  let taskCount = 0;
  for (let i = 0; i < 110; i++) {
    const template = TASK_TEMPLATES[i % TASK_TEMPLATES.length];
    const assigneeId = userIds[i % userIds.length];
    const projectId = projectIds[i % projectIds.length];
    const creatorId = userIds[(i + 1) % userIds.length];

    const dueMonth = (i % 3) + 9;
    const dueDay = ((i * 7) % 28) + 1;
    const dueDate = `2026-${dueMonth < 10 ? '0' + dueMonth : dueMonth}-${dueDay < 10 ? '0' + dueDay : dueDay}`;

    await prisma.task.create({
      data: {
        id: `task-${i + 1}`,
        title: `${template.title} #${i + 1}`,
        description: `Operational task assigned for project execution and quality control across VEIXON systems. Ref: WP-ENG-${100 + i}`,
        status: i === 10 || i === 25 || i === 48 ? 'BLOCKED' : template.status,
        priority: template.priority,
        type: template.type,
        progress: i === 10 || i === 25 || i === 48 ? 35 : template.progress,
        dueDate,
        timeline: `Sept 01, 2026 - ${dueDate}`,
        groupName: `Sprint ${Math.floor(i / 10) + 1} Delivery`,
        assigneeId,
        creatorId,
        projectId,
      },
    });
    taskCount++;
  }
  console.log('✓ Tasks seeded:', taskCount);

  // 4. Seed Blockers (15+)
  await prisma.blocker.deleteMany({});
  const blockerData = [
    { id: 'blk-1', title: 'AWS KMS Key Policy permissions blocked', description: 'Stripe webhook signature decryption failing due to missing IAM KMS decrypt role on staging environment.', severity: 'CRITICAL', status: 'OPEN', userId: 'usr-5' },
    { id: 'blk-2', title: 'Enterprise SSO OAuth callback mismatch', description: 'Redirect URI mismatch on staging auth cluster during SAML 2.0 handshake.', severity: 'HIGH', status: 'IN_PROGRESS', userId: 'usr-7' },
    { id: 'blk-3', title: 'Kubernetes ingress cert-manager rate limited', description: 'Let’s Encrypt rate limit encountered on staging subdomains.', severity: 'HIGH', status: 'ACKNOWLEDGED', userId: 'usr-9' },
    { id: 'blk-4', title: 'PostgreSQL connection pool exhaustion during load test', description: 'Prisma Client max connection pool reached under 2500 concurrent synthetic requests.', severity: 'HIGH', status: 'RESOLVED', userId: 'usr-3' },
    { id: 'blk-5', title: 'Figma token export sync mismatch with CSS variables', description: 'Surface border token definitions divergent between Design Systems and Tailwind tokens.', severity: 'MEDIUM', status: 'RESOLVED', userId: 'usr-6' },
    { id: 'blk-6', title: 'Pending executive sign-off on enterprise client contract', description: 'Client Platform deployment waiting on client security review completion.', severity: 'MEDIUM', status: 'OPEN', userId: 'usr-2' },
    { id: 'blk-7', title: 'Redis cluster cache invalidation on user role change', description: 'RBAC session permission cache not clearing on immediate role promotion.', severity: 'CRITICAL', status: 'IN_PROGRESS', userId: 'usr-1' },
    { id: 'blk-8', title: 'Safari mobile backdrop-filter clipping bug', description: 'Command Palette backdrop blur causing visual artifact on iOS 17.5 webkit.', severity: 'LOW', status: 'RESOLVED', userId: 'usr-7' },
    { id: 'blk-9', title: 'Missing QA penetration testing sign-off for v1.2 release', description: 'Automated vulnerability scanner identified outdated minor dependency.', severity: 'HIGH', status: 'OPEN', userId: 'usr-10' },
    { id: 'blk-10', title: 'Duty leave coverage gap for DevOps rotation', description: 'Secondary on-call engineer required during SRE scheduled field duty.', severity: 'MEDIUM', status: 'RESOLVED', userId: 'usr-4' },
    { id: 'blk-11', title: 'Elasticsearch index memory pressure on audit log queries', description: 'Audit log full text search query taking >450ms on unfiltered time ranges.', severity: 'MEDIUM', status: 'IN_PROGRESS', userId: 'usr-5' },
    { id: 'blk-12', title: 'WebRTC screen share renegotiation timeout on Firefox', description: 'Meeting module live room dropping frame during high-resolution display shares.', severity: 'LOW', status: 'OPEN', userId: 'usr-7' },
    { id: 'blk-13', title: 'API rate limiting threshold too aggressive for batch exports', description: 'CSV reports exporter hitting 429 Too Many Requests after 50 pages.', severity: 'MEDIUM', status: 'RESOLVED', userId: 'usr-1' },
    { id: 'blk-14', title: 'Unresolved database migration lock on staging restart', description: 'SQLite dev db locked during parallel test worker launch.', severity: 'HIGH', status: 'RESOLVED', userId: 'usr-9' },
    { id: 'blk-15', title: 'Staging environment SSL certificate expiration in 48 hours', description: 'Automated certbot renewal script failed due to DNS challenge timeout.', severity: 'HIGH', status: 'OPEN', userId: 'usr-4' },
  ];

  for (const b of blockerData) {
    await prisma.blocker.create({ data: b });
  }
  console.log('✓ Blockers seeded:', blockerData.length);

  // 5. Seed Leave Requests (20+)
  await prisma.leaveRequest.deleteMany({});
  const leaveData = [
    { id: 'lev-1', userId: 'usr-7', type: 'CASUAL', startDate: '2026-09-15', endDate: '2026-09-16', daysCount: 2.0, reason: 'Family celebration and personal commitment.', status: 'APPROVED', reviewerName: 'V S Sai Siddardh' },
    { id: 'lev-2', userId: 'usr-5', type: 'WFH', startDate: '2026-09-18', endDate: '2026-09-18', daysCount: 1.0, reason: 'On-site home network maintenance & remote focus.', status: 'APPROVED', reviewerName: 'Shlok Karn' },
    { id: 'lev-3', userId: 'usr-9', type: 'ANNUAL', startDate: '2026-09-22', endDate: '2026-09-25', daysCount: 4.0, reason: 'Annual scheduled vacation.', status: 'PENDING', reviewerName: 'Suhas', handoverNotes: 'Suhas taking over secondary on-call pager rotation.' },
    { id: 'lev-4', userId: 'usr-6', type: 'CASUAL', startDate: '2026-09-14', endDate: '2026-09-14', daysCount: 1.0, reason: 'Medical appointment checkup.', status: 'APPROVED', reviewerName: 'V S Sai Siddardh' },
    { id: 'lev-5', userId: 'usr-10', type: 'SICK', startDate: '2026-09-10', endDate: '2026-09-11', daysCount: 2.0, reason: 'Viral fever recovery.', status: 'APPROVED', reviewerName: 'Navya' },
    { id: 'lev-6', userId: 'usr-4', type: 'WFH', startDate: '2026-09-28', endDate: '2026-09-29', daysCount: 2.0, reason: 'DevOps cloud architecture sprint focus.', status: 'APPROVED', reviewerName: 'Shlok Karn' },
    { id: 'lev-7', userId: 'usr-5', type: 'CASUAL', startDate: '2026-10-02', endDate: '2026-10-02', daysCount: 1.0, reason: 'Festival holiday.', status: 'PENDING', reviewerName: 'Shlok Karn' },
    { id: 'lev-8', userId: 'usr-7', type: 'ANNUAL', startDate: '2026-10-10', endDate: '2026-10-15', daysCount: 5.0, reason: 'Travel and personal wellness.', status: 'PENDING', reviewerName: 'V S Sai Siddardh', handoverNotes: 'Component library tasks assigned to Shabnam.' },
    { id: 'lev-9', userId: 'usr-8', type: 'CASUAL', startDate: '2026-09-16', endDate: '2026-09-16', daysCount: 1.0, reason: 'HR Leadership conference attendance.', status: 'APPROVED', reviewerName: 'Abhinav Rishi' },
    { id: 'lev-10', userId: 'usr-3', type: 'WFH', startDate: '2026-09-17', endDate: '2026-09-17', daysCount: 1.0, reason: 'System architecture deep work session.', status: 'APPROVED', reviewerName: 'V S Sai Siddardh' },
    { id: 'lev-11', userId: 'usr-1', type: 'CASUAL', startDate: '2026-10-20', endDate: '2026-10-21', daysCount: 2.0, reason: 'Strategic partner summit.', status: 'APPROVED', reviewerName: 'Abhinav Rishi' },
    { id: 'lev-12', userId: 'usr-9', type: 'SICK', startDate: '2026-08-20', endDate: '2026-08-21', daysCount: 2.0, reason: 'Dental recovery procedure.', status: 'APPROVED', reviewerName: 'Suhas' },
    { id: 'lev-13', userId: 'usr-10', type: 'WFH', startDate: '2026-10-05', endDate: '2026-10-06', daysCount: 2.0, reason: 'Penetration testing remote cycle.', status: 'PENDING', reviewerName: 'Navya' },
    { id: 'lev-14', userId: 'usr-6', type: 'ANNUAL', startDate: '2026-11-01', endDate: '2026-11-05', daysCount: 5.0, reason: 'Autumn vacation.', status: 'PENDING', reviewerName: 'V S Sai Siddardh' },
    { id: 'lev-15', userId: 'usr-5', type: 'SICK', startDate: '2026-08-11', endDate: '2026-08-11', daysCount: 1.0, reason: 'Migraine recovery.', status: 'APPROVED', reviewerName: 'Shlok Karn' },
    { id: 'lev-16', userId: 'usr-7', type: 'WFH', startDate: '2026-09-30', endDate: '2026-09-30', daysCount: 1.0, reason: 'Remote engineering day.', status: 'APPROVED', reviewerName: 'V S Sai Siddardh' },
    { id: 'lev-17', userId: 'usr-4', type: 'CASUAL', startDate: '2026-10-12', endDate: '2026-10-12', daysCount: 1.0, reason: 'Personal family affair.', status: 'PENDING', reviewerName: 'Shlok Karn' },
    { id: 'lev-18', userId: 'usr-8', type: 'WFH', startDate: '2026-10-18', endDate: '2026-10-19', daysCount: 2.0, reason: 'Quarterly HR policy review.', status: 'APPROVED', reviewerName: 'Abhinav Rishi' },
    { id: 'lev-19', userId: 'usr-9', type: 'CASUAL', startDate: '2026-11-12', endDate: '2026-11-13', daysCount: 2.0, reason: 'Family engagement.', status: 'PENDING', reviewerName: 'Suhas' },
    { id: 'lev-20', userId: 'usr-10', type: 'CASUAL', startDate: '2026-11-20', endDate: '2026-11-20', daysCount: 1.0, reason: 'Personal errand.', status: 'PENDING', reviewerName: 'Navya' },
  ];

  for (const l of leaveData) {
    await prisma.leaveRequest.create({ data: l });
  }
  console.log('✓ Leave requests seeded:', leaveData.length);

  // 6. Seed Goals (20+)
  await prisma.goal.deleteMany({});
  const goalData = [
    { id: 'goal-1', title: 'Launch VEIXON Decisions Platform v1.0', description: 'Full commercial release with enterprise decision graph and analytics.', userId: 'usr-1', departmentName: 'Engineering', progress: 85, status: 'ON_TRACK', targetDate: '2026-10-31' },
    { id: 'goal-2', title: 'Scale DayZero Foundary to 5 Active Incubation Pilots', description: 'Deliver 5 enterprise incubation workflows with high satisfaction.', userId: 'usr-2', departmentName: 'Executive', progress: 60, status: 'ON_TRACK', targetDate: '2026-11-30' },
    { id: 'goal-3', title: 'Achieve 99.99% Core Service Uptime across Multi-Region AWS', description: 'Zero unplanned downtime on production microservices.', userId: 'usr-4', departmentName: 'Cloud & DevOps', progress: 92, status: 'ON_TRACK', targetDate: '2026-12-31' },
    { id: 'goal-4', title: 'Deliver Universal VEIXON Design Tokens across Web & Mobile', description: 'Single unified design system used across 100% of frontends.', userId: 'usr-6', departmentName: 'Design Systems', progress: 78, status: 'ON_TRACK', targetDate: '2026-09-30' },
    { id: 'goal-5', title: 'Zero High-Severity Vulnerabilities in Production Deployments', description: 'Enforce strict SAST, DAST, and container security scans on all PRs.', userId: 'usr-10', departmentName: 'Quality Assurance', progress: 70, status: 'ON_TRACK', targetDate: '2026-10-15' },
    { id: 'goal-6', title: 'Reduce API P99 Latency below 80ms for Command Center', description: 'Implement Redis caching and database index optimizations.', userId: 'usr-5', departmentName: 'Backend', progress: 65, status: 'ON_TRACK', targetDate: '2026-10-15' },
    { id: 'goal-7', title: 'Implement Zero-Trust RBAC Middleware on all Endpoints', description: 'Server-side role verification for Employee, Manager, Director, Admin.', userId: 'usr-3', departmentName: 'Technology', progress: 100, status: 'COMPLETED', targetDate: '2026-09-10' },
    { id: 'goal-8', title: 'Expand VEIXON Team by 5 Strategic Senior Engineers', description: 'Hire elite contributors across distributed systems and design.', userId: 'usr-8', departmentName: 'People & Culture', progress: 40, status: 'AT_RISK', targetDate: '2026-11-15' },
    { id: 'goal-9', title: 'Achieve 95%+ Automated Test Coverage across Core Libraries', description: 'End-to-end integration and hardening suites.', userId: 'usr-10', departmentName: 'Quality Assurance', progress: 88, status: 'ON_TRACK', targetDate: '2026-10-30' },
    { id: 'goal-10', title: 'Launch Interactive Public Brand Experience on veixon.com', description: 'Cinematic hero showcases and interactive product demos.', userId: 'usr-7', departmentName: 'Frontend', progress: 95, status: 'ON_TRACK', targetDate: '2026-09-25' },
  ];

  for (const g of goalData) {
    await prisma.goal.create({ data: g });
  }
  console.log('✓ Goals seeded:', goalData.length);

  // 7. Seed Audit Logs (200+)
  await prisma.auditLog.deleteMany({});
  for (let i = 0; i < 205; i++) {
    const actor = VEIXON_USERS[i % VEIXON_USERS.length];
    const actions = [
      'TASK_STATUS_UPDATED',
      'BLOCKER_REPORTED',
      'LEAVE_REQUEST_SUBMITTED',
      'MEETING_ATTENDANCE_LOGGED',
      'SECURITY_POLICY_CHECKED',
      'PROJECT_MILESTONE_COMPLETED',
      'ROLE_PERMISSION_VERIFIED',
      'CHECKIN_SAVED',
    ];
    const action = actions[i % actions.length];

    await prisma.auditLog.create({
      data: {
        id: `audit-${i + 1}`,
        action,
        actorName: actor.name,
        details: `Action [${action}] executed by ${actor.name} (${actor.jobTitle}) on entity REF-${2000 + i}.`,
      },
    });
  }
  console.log('✓ Audit logs seeded: 205');

  console.log('---------------------------------------------------------');
  console.log('DATABASE SEEDING SUCCESSFUL! VEIXON COMMAND CENTER READY.');
  console.log('---------------------------------------------------------');
}

seed()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
