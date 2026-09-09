import { User, Task, Project, Blocker, Meeting, LeaveRequest } from './types';

export interface DepartmentWorkload {
  department: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  blockedTasks: number;
  capacityUtilization: number; // 0-100%
}

export interface AttendanceTrendDay {
  day: string;
  present: number;
  late: number;
  absent: number;
  onLeave: number;
}

export interface BlockerResolutionMetric {
  severity: string;
  avgHoursToResolve: number;
  openCount: number;
  resolvedCount: number;
}

export function calculateDepartmentWorkloads(
  departments: { id: string; name: string }[],
  users: User[],
  tasks: Task[]
): DepartmentWorkload[] {
  return departments.map((dept) => {
    const deptUsers = users.filter((u) => u.departmentId === dept.id);
    const userIds = new Set(deptUsers.map((u) => u.id));
    const deptTasks = tasks.filter((t) => userIds.has(t.assigneeId));

    const total = deptTasks.length;
    const completed = deptTasks.filter((t) => t.status === 'COMPLETED').length;
    const inProgress = deptTasks.filter((t) => t.status === 'IN_PROGRESS' || t.status === 'REVIEW').length;
    const blocked = deptTasks.filter((t) => t.status === 'BLOCKED').length;

    const capacity = deptUsers.length > 0 ? Math.min(100, Math.round((inProgress / (deptUsers.length * 3)) * 100)) : 0;

    return {
      department: dept.name,
      totalTasks: total,
      completedTasks: completed,
      inProgressTasks: inProgress,
      blockedTasks: blocked,
      capacityUtilization: capacity,
    };
  });
}

export function getWeeklyAttendanceTrend(): AttendanceTrendDay[] {
  return [
    { day: 'Mon', present: 28, late: 2, absent: 1, onLeave: 1 },
    { day: 'Tue', present: 29, late: 1, absent: 1, onLeave: 1 },
    { day: 'Wed', present: 27, late: 3, absent: 1, onLeave: 1 },
    { day: 'Thu', present: 30, late: 0, absent: 1, onLeave: 1 },
    { day: 'Fri (Today)', present: 29, late: 1, absent: 1, onLeave: 1 },
  ];
}

export function getBlockerResolutionMetrics(blockers: Blocker[]): BlockerResolutionMetric[] {
  const severities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const;
  return severities.map((sev) => {
    const matching = blockers.filter((b) => b.severity === sev);
    const open = matching.filter((b) => b.status !== 'RESOLVED').length;
    const resolved = matching.filter((b) => b.status === 'RESOLVED').length;
    const avgHours = sev === 'CRITICAL' ? 6 : sev === 'HIGH' ? 18 : sev === 'MEDIUM' ? 36 : 48;

    return {
      severity: sev,
      avgHoursToResolve: avgHours,
      openCount: open,
      resolvedCount: resolved,
    };
  });
}
