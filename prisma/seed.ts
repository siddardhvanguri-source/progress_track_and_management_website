import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const USERS = [
  {
    id: 'user-admin',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@walt.com',
    password: 'password123',
    role: 'ADMIN',
    jobTitle: 'VP of Engineering & Product',
    departmentName: 'Engineering',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    phone: '(555) 019-2834',
    bio: 'Overseeing company-wide engineering, system architecture, and strategic product delivery.',
    skills: JSON.stringify(['Engineering Leadership', 'System Architecture', 'Strategy', 'Next.js', 'Postgres']),
    emergencyContact: 'Mark Jenkins (Spouse) - (555) 992-1100',
    joinedDate: 'January 15, 2017',
    workPreference: 'Hybrid',
    status: 'WORKING',
  },
  {
    id: 'user-manager',
    name: 'Alex Rivera',
    email: 'alex.rivera@walt.com',
    password: 'password123',
    role: 'MANAGER',
    jobTitle: 'Engineering Manager',
    departmentName: 'Engineering',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '(555) 018-9921',
    bio: 'Leading the Core Platform and Frontend Infrastructure teams with a focus on developer experience.',
    skills: JSON.stringify(['Agile Management', 'TypeScript', 'Cloud Infra', 'React', 'Team Scaling']),
    emergencyContact: 'Carla Rivera (Sister) - (555) 881-2299',
    joinedDate: 'March 10, 2019',
    workPreference: 'Remote',
    status: 'WORKING',
  },
  {
    id: 'user-hr',
    name: 'Rachel Adams',
    email: 'rachel.adams@walt.com',
    password: 'password123',
    role: 'HR',
    jobTitle: 'Head of People Operations',
    departmentName: 'Human Resources',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    phone: '(555) 012-7766',
    bio: 'Championing inclusive workplace culture, employee wellness, and organizational operations.',
    skills: JSON.stringify(['People Ops', 'Talent Acquisition', 'Compensation & Benefits', 'Conflict Resolution']),
    emergencyContact: 'David Adams (Brother) - (555) 773-1992',
    joinedDate: 'July 1, 2018',
    workPreference: 'Hybrid',
    status: 'WORKING',
  },
  {
    id: 'user-marcus',
    name: 'Marcus Chen',
    email: 'marcus.chen@walt.com',
    password: 'password123',
    role: 'EMPLOYEE',
    jobTitle: 'Senior Full Stack Engineer',
    departmentName: 'Engineering',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phone: '(555) 014-8833',
    bio: 'Passionate about distributed backend systems, real-time messaging, and high-performance databases.',
    skills: JSON.stringify(['Node.js', 'Go', 'GraphQL', 'PostgreSQL', 'Docker', 'Redis']),
    emergencyContact: 'Linda Chen (Mother) - (555) 334-9988',
    joinedDate: 'February 12, 2021',
    workPreference: 'Remote',
    status: 'WORKING',
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    email: 'elena.rostova@walt.com',
    password: 'password123',
    role: 'EMPLOYEE',
    jobTitle: 'Principal Product Designer',
    departmentName: 'Design',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: '(555) 016-5544',
    bio: 'Crafting pixel-perfect design systems, user interactions, and enterprise software aesthetics.',
    skills: JSON.stringify(['Figma', 'Design Systems', 'UX Research', 'Prototyping', 'Design Tokens']),
    emergencyContact: 'Viktor Rostov (Father) - (555) 441-8899',
    joinedDate: 'September 20, 2020',
    workPreference: 'Remote',
    status: 'WORKING',
  },
  {
    id: 'user-esther',
    name: 'Esther Howard',
    email: 'esther.howard@walt.com',
    password: 'password123',
    role: 'EMPLOYEE',
    jobTitle: 'Senior UI/UX Designer',
    departmentName: 'Product',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    phone: '(209) 555-0104',
    bio: 'Specializing in enterprise dashboard ergonomics and micro-interactions.',
    skills: JSON.stringify(['UI Design', 'Wireframing', 'User Interviews', 'Accessibility']),
    emergencyContact: 'John Howard (Spouse) - (209) 555-9081',
    joinedDate: 'February 28, 2018',
    workPreference: 'Remote',
    status: 'REMOTE',
  },
  {
    id: 'user-jacob',
    name: 'Jacob Jones',
    email: 'jacob.jones@walt.com',
    password: 'password123',
    role: 'MANAGER',
    jobTitle: 'Chief Operating Officer',
    departmentName: 'Engineering',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    phone: '(405) 555-0128',
    bio: 'Managing operations workflow and cross-functional project synchronization.',
    skills: JSON.stringify(['Operations', 'Scaling', 'Strategic Planning', 'Resource Allocation']),
    emergencyContact: 'Claire Jones (Spouse) - (405) 555-3344',
    joinedDate: 'December 2, 2018',
    workPreference: 'On-site',
    status: 'WORKING',
  },
  {
    id: 'user-bessie',
    name: 'Bessie Cooper',
    email: 'bessie.cooper@walt.com',
    password: 'password123',
    role: 'EMPLOYEE',
    jobTitle: 'Project Lead',
    departmentName: 'Human Resources',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    phone: '(205) 555-0100',
    bio: 'Guiding cross-departmental HR milestones and operational pipelines.',
    skills: JSON.stringify(['Project Management', 'Scrum', 'Stakeholder Comms', 'Jira']),
    emergencyContact: 'Paul Cooper (Brother) - (205) 555-8812',
    joinedDate: 'May 20, 2015',
    workPreference: 'Part-time',
    status: 'PART_TIME',
  },
  {
    id: 'user-annette',
    name: 'Annette Black',
    email: 'annette.black@walt.com',
    password: 'password123',
    role: 'EMPLOYEE',
    jobTitle: 'Process Manager',
    departmentName: 'Operations',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
    phone: '(671) 555-0110',
    bio: 'Optimizing release cadences and team capacity forecasting.',
    skills: JSON.stringify(['Process Optimization', 'Kanban', 'KPI Analytics', 'Risk Management']),
    emergencyContact: 'Susan Black (Mother) - (671) 555-9011',
    joinedDate: 'October 31, 2017',
    workPreference: 'Remote',
    status: 'REMOTE',
  },
];

const MONTHS_DATA = [
  { monthYear: '2026-01', monthName: 'January 2026', days: 21, hours: 168.0, leave: 0.0, tasks: 14, punct: 99.0, rating: 4.8 },
  { monthYear: '2026-02', monthName: 'February 2026', days: 20, hours: 160.0, leave: 1.0, tasks: 12, punct: 97.5, rating: 4.7 },
  { monthYear: '2026-03', monthName: 'March 2026', days: 22, hours: 176.0, leave: 0.0, tasks: 16, punct: 100.0, rating: 4.9 },
  { monthYear: '2026-04', monthName: 'April 2026', days: 21, hours: 168.0, leave: 2.0, tasks: 15, punct: 98.0, rating: 4.8 },
  { monthYear: '2026-05', monthName: 'May 2026', days: 21, hours: 168.0, leave: 0.0, tasks: 18, punct: 99.5, rating: 5.0 },
  { monthYear: '2026-06', monthName: 'June 2026', days: 22, hours: 176.0, leave: 1.0, tasks: 14, punct: 98.2, rating: 4.8 },
  { monthYear: '2026-07', monthName: 'July 2026', days: 22, hours: 176.0, leave: 3.0, tasks: 13, punct: 96.0, rating: 4.6 },
  { monthYear: '2026-08', monthName: 'August 2026', days: 21, hours: 168.0, leave: 0.0, tasks: 19, punct: 99.0, rating: 4.9 },
  { monthYear: '2026-09', monthName: 'September 2026', days: 7, hours: 56.0, leave: 0.0, tasks: 6, punct: 100.0, rating: 4.9 },
];

const PROJECTS = [
  { id: 'proj-1', name: 'Atlas CRM Revamp', color: '#10b981', status: 'ACTIVE', description: 'Enterprise customer relationship overhaul with modern UI.' },
  { id: 'proj-2', name: 'Nimbus Dashboard', color: '#f59e0b', status: 'ACTIVE', description: 'Next-generation cloud telemetry and analytics console.' },
  { id: 'proj-3', name: 'Orion API Gateway', color: '#3b82f6', status: 'ACTIVE', description: 'High-throughput microservices gateway and token rate limiter.' },
  { id: 'proj-4', name: 'Helio Task System', color: '#ec4899', status: 'PLANNING', description: 'Real-time collaborative task dispatch and automation engine.' },
];

const TASKS = [
  {
    id: 'task-1',
    title: 'Decouple UI from auth logic',
    description: 'Refactor client side auth providers into clean server session hooks.',
    groupName: 'Refactor login flow',
    type: 'Feature',
    priority: 'HIGH',
    progress: 40,
    timeline: 'June 24, 2026 - July 3, 2026',
    status: 'IN_PROGRESS',
    assigneeId: 'user-marcus',
    projectId: 'proj-1',
  },
  {
    id: 'task-2',
    title: 'Migrate to token-based session handling',
    description: 'Upgrade session storage to secure HTTP-only cookies with JWT validation.',
    groupName: 'Refactor login flow',
    type: 'Bug',
    priority: 'HIGH',
    progress: 30,
    timeline: 'June 29, 2026 - July 7, 2026',
    status: 'IN_PROGRESS',
    assigneeId: 'user-admin',
    projectId: 'proj-1',
  },
  {
    id: 'task-3',
    title: 'Implement error handling for failed logins',
    description: 'Add clear error toasts and rate-limiting alerts on login screen.',
    groupName: 'Refactor login flow',
    type: 'Review',
    priority: 'MEDIUM',
    progress: 20,
    timeline: 'July 2, 2026 - July 5, 2026',
    status: 'REVIEW',
    assigneeId: 'user-elena',
    projectId: 'proj-1',
  },
  {
    id: 'task-4',
    title: 'Update unit tests for login module',
    description: 'Write Jest and Playwright e2e test suites for auth routes.',
    groupName: 'Refactor login flow',
    type: 'Testing',
    priority: 'LOW',
    progress: 40,
    timeline: 'July 6, 2026 - July 8, 2026',
    status: 'IN_PROGRESS',
    assigneeId: 'user-marcus',
    projectId: 'proj-1',
  },
  {
    id: 'task-5',
    title: 'Implement virtual scrolling for large lists',
    description: 'Render thousands of attendance logs smoothly without DOM lag.',
    groupName: 'Optimize Task List Performance',
    type: 'Feature',
    priority: 'HIGH',
    progress: 40,
    timeline: 'July 5, 2026 - July 6, 2026',
    status: 'IN_PROGRESS',
    assigneeId: 'user-esther',
    projectId: 'proj-2',
  },
  {
    id: 'task-6',
    title: 'Debounce search and filter input fields',
    description: 'Add 150ms debounce on all table filter search bars.',
    groupName: 'Optimize Task List Performance',
    type: 'Bug',
    priority: 'HIGH',
    progress: 30,
    timeline: 'July 5, 2026 - July 6, 2026',
    status: 'IN_PROGRESS',
    assigneeId: 'user-jacob',
    projectId: 'proj-2',
  },
  {
    id: 'task-7',
    title: 'Lazy-load task metadata (comments, activity)',
    description: 'Fetch sub-details on expand instead of initial payload.',
    groupName: 'Optimize Task List Performance',
    type: 'Review',
    priority: 'MEDIUM',
    progress: 20,
    timeline: 'July 8, 2026 - July 9, 2026',
    status: 'REVIEW',
    assigneeId: 'user-annette',
    projectId: 'proj-2',
  },
];

async function main() {
  console.log('🌱 Seeding WorkPulse SQLite database...');

  // 1. Create Users
  for (const user of USERS) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });

    // 2. Create Monthly Logs for each user
    for (const m of MONTHS_DATA) {
      await prisma.monthlyLog.upsert({
        where: {
          userId_monthYear: {
            userId: user.id,
            monthYear: m.monthYear,
          },
        },
        update: {
          monthName: m.monthName,
          daysWorked: m.days,
          hoursWorked: m.hours,
          leavesTaken: m.leave,
          tasksCompleted: m.tasks,
          punctualityRate: m.punct,
          managerRating: m.rating,
          performanceNotes: `Consistently high impact and great collaboration during ${m.monthName}.`,
        },
        create: {
          userId: user.id,
          monthYear: m.monthYear,
          monthName: m.monthName,
          daysWorked: m.days,
          hoursWorked: m.hours,
          leavesTaken: m.leave,
          tasksCompleted: m.tasks,
          punctualityRate: m.punct,
          managerRating: m.rating,
          performanceNotes: `Consistently high impact and great collaboration during ${m.monthName}.`,
        },
      });
    }

    // 3. Create Sample Leave Requests
    await prisma.leaveRequest.create({
      data: {
        userId: user.id,
        type: 'ANNUAL',
        startDate: '2026-09-15',
        endDate: '2026-09-18',
        daysCount: 4.0,
        reason: 'Annual family vacation and rest.',
        status: 'APPROVED',
        reviewerName: 'Sarah Jenkins',
        handoverNotes: 'Covered by team mates and tasks rescheduled.',
      },
    });
  }

  // 4. Create Projects
  for (const proj of PROJECTS) {
    await prisma.project.upsert({
      where: { id: proj.id },
      update: proj,
      create: proj,
    });
  }

  // 5. Create Tasks
  for (const task of TASKS) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: task,
      create: task,
    });
  }

  console.log('✅ SQLite Database successfully seeded with full historical data!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
