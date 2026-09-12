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
    bio: 'Obsidian design systems, interaction tokens, and aesthetic ergonomics.',
    skills: JSON.stringify(['Figma', 'Design Systems', 'UI/UX', 'Design Tokens', 'Ergonomics']),
    emergencyContact: 'Family Contact - (555) 015-7722',
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
    departmentName: 'Frontend Systems',
    avatarUrl: 'https://www.veixon.com/team/taran.jpeg',
    phone: '+91 98000 00006',
    bio: 'High-performance React interfaces, state machines, and web accessibility.',
    skills: JSON.stringify(['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']),
    emergencyContact: 'Family Contact - (555) 016-1199',
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
    departmentName: 'People & Operations',
    avatarUrl: 'https://www.veixon.com/team/NAVYA.jpeg',
    phone: '+91 98000 00007',
    bio: 'Talent cultivation, team alignment, and operational wellness.',
    skills: JSON.stringify(['People Operations', 'HR', 'Talent Management', 'Culture', 'Compliance']),
    emergencyContact: 'Family Contact - (555) 017-3344',
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
    departmentName: 'Cloud & Infrastructure',
    avatarUrl: 'https://www.veixon.com/team/sreeshith.png',
    phone: '+91 98000 00008',
    bio: 'Infrastructure automation, observability pipelines, and disaster recovery.',
    skills: JSON.stringify(['DevOps', 'Kubernetes', 'Prometheus', 'Grafana', 'Terraform', 'CI/CD']),
    emergencyContact: 'Family Contact - (555) 018-2233',
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
    departmentName: 'Quality & Security',
    avatarUrl: 'https://www.veixon.com/team/shivani.jpeg',
    phone: '+91 98000 00009',
    bio: 'Automated test matrices, penetration testing, and security hardening.',
    skills: JSON.stringify(['QA Automation', 'Playwright', 'Security Testing', 'Jest', 'API Testing']),
    emergencyContact: 'Family Contact - (555) 019-9988',
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
    status: 'ACTIVE',
    color: '#2962FF',
    managerId: 'usr-1',
  },
  {
    id: 'proj-2',
    name: 'DayZero Foundary',
    description: 'Rapid prototyping and incubation engine for next-generation products across industry verticals.',
    status: 'ACTIVE',
    color: '#8B5CF6',
    managerId: 'usr-2',
  },
  {
    id: 'proj-3',
    name: 'VEIXON Core Infrastructure',
    description: 'Zero-trust multi-region Kubernetes cluster, edge caching mesh, and automated CI/CD pipeline.',
    status: 'ACTIVE',
    color: '#00E5FF',
    managerId: 'usr-4',
  },
  {
    id: 'proj-4',
    name: 'Design System & Ergonomics',
    description: 'Unified obsidian tokens, glassmorphic UI components, accessibility compliance, and micro-interactions.',
    status: 'ACTIVE',
    color: '#10B981',
    managerId: 'usr-6',
  },
  {
    id: 'proj-5',
    name: 'Enterprise Security & QA',
    description: 'Automated end-to-end regression testing, penetration scanning, and SOC2 compliance monitoring.',
    status: 'ACTIVE',
    color: '#F59E0B',
    managerId: 'usr-10',
  },
];

const VEIXON_TASKS = [
  {
    id: 'task-1',
    title: 'Finalize Decision Graph Engine core algorithm & memory profiling',
    description: 'Benchmark tree evaluation cycles and optimize AST caching for high-concurrency decision pipelines.',
    projectId: 'proj-1',
    assigneeId: 'usr-1',
    creatorId: 'usr-1',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    type: 'Feature',
    dueDate: '2026-09-18',
  },
  {
    id: 'task-2',
    title: 'Configure Stripe Billing webhook handler and AWS KMS signing',
    description: 'Implement secure cryptographic verification for incoming Stripe webhook payloads using AWS KMS key.',
    projectId: 'proj-1',
    assigneeId: 'usr-5',
    creatorId: 'usr-1',
    status: 'BLOCKED',
    priority: 'CRITICAL',
    type: 'Feature',
    dueDate: '2026-09-20',
  },
  {
    id: 'task-3',
    title: 'Setup DayZero incubation intake pipeline and candidate ranking model',
    description: 'Build automated screening logic and valuation metrics for inbound incubator applications.',
    projectId: 'proj-2',
    assigneeId: 'usr-2',
    creatorId: 'usr-2',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    type: 'Feature',
    dueDate: '2026-09-25',
  },
  {
    id: 'task-4',
    title: 'Deploy Kubernetes ingress controller with Cloudflare SSL termination',
    description: 'Provision HA ingress controllers across Hyderabad and Mumbai AWS regions with automated SSL failover.',
    projectId: 'proj-3',
    assigneeId: 'usr-4',
    creatorId: 'usr-4',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    type: 'Feature',
    dueDate: '2026-09-22',
  },
  {
    id: 'task-5',
    title: 'Publish unified Design Token Library and Framer Motion micro-interactions',
    description: 'Export CSS variables and Tailwind tokens for Obsidian palette and micro-interaction hooks.',
    projectId: 'proj-4',
    assigneeId: 'usr-6',
    creatorId: 'usr-1',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    type: 'Feature',
    dueDate: '2026-09-12',
  },
  {
    id: 'task-6',
    title: 'Integrate dynamic responsive navigation and active route indicators',
    description: 'Build fluid top navigation tabs with glassmorphism backdrop and zero-lag transition states.',
    projectId: 'proj-4',
    assigneeId: 'usr-7',
    creatorId: 'usr-6',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    type: 'Feature',
    dueDate: '2026-09-21',
  },
  {
    id: 'task-7',
    title: 'Implement automated Playwright regression suite for authentication flow',
    description: 'Create multi-role end-to-end browser tests verifying session persistence and role routing.',
    projectId: 'proj-5',
    assigneeId: 'usr-10',
    creatorId: 'usr-1',
    status: 'BLOCKED',
    priority: 'HIGH',
    type: 'Bug',
    dueDate: '2026-09-23',
  },
];

async function seed() {
  console.log('⚡ Starting clean VEIXON database seed...');

  // 1. Clean existing records in foreign key order
  await prisma.auditLog.deleteMany({});
  await prisma.blocker.deleteMany({});
  await prisma.checkIn.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.leaveRequest.deleteMany({});
  await prisma.monthlyLog.deleteMany({});
  await prisma.goal.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('✔ Cleaned all previous records.');

  // 2. Insert Users
  for (const u of VEIXON_USERS) {
    await prisma.user.create({
      data: u,
    });
  }
  console.log(`✔ Seeded ${VEIXON_USERS.length} official VEIXON team members.`);

  // 3. Insert Projects
  for (const p of VEIXON_PROJECTS) {
    await prisma.project.create({
      data: p,
    });
  }
  console.log(`✔ Seeded ${VEIXON_PROJECTS.length} VEIXON projects.`);

  // 4. Insert Tasks
  for (const t of VEIXON_TASKS) {
    await prisma.task.create({
      data: t,
    });
  }
  console.log(`✔ Seeded ${VEIXON_TASKS.length} clean template tasks.`);

  // 5. Insert Blockers
  await prisma.blocker.create({
    data: {
      id: 'blk-1',
      title: 'AWS KMS Key IAM decryption policy for Stripe webhooks',
      description: 'Arjun J requires IAM permission updates on the KMS encryption key to decode Stripe event payloads in staging.',
      severity: 'CRITICAL',
      status: 'OPEN',
      userId: 'usr-5',
    },
  });
  await prisma.blocker.create({
    data: {
      id: 'blk-2',
      title: 'Staging Database connection timeout during load testing',
      description: 'PostgreSQL connection pool exhaustion occurs during concurrent Playwright test executions.',
      severity: 'HIGH',
      status: 'OPEN',
      userId: 'usr-10',
    },
  });
  console.log('✔ Seeded 2 active blockers.');

  // 6. Insert Clean Audit Log
  await prisma.auditLog.create({
    data: {
      id: 'audit-1',
      action: 'SYSTEM_INITIALIZED',
      actorName: 'V S Sai Siddardh',
      details: 'VEIXON Command Center initialized with clean enterprise template and telemetry logging.',
    },
  });
  console.log('✔ Seeded initial audit log.');

  console.log('🎉 Clean VEIXON database seeding complete!');
}

seed()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
