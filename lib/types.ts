// Core TypeScript definitions for WorkPulse

export type Role = 'DIRECTOR' | 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';

export type AttendanceStatus = 'WORKING' | 'ON_LEAVE' | 'ABSENT' | 'LATE' | 'REMOTE' | 'LEAVE_ON_DUTY' | 'UNINFORMED_ABSENCE' | 'DEEP_WORK';

export type MeetingAttendanceStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'EXCUSED';

export type MissedMeetingReason =
  | 'SICK'
  | 'EMERGENCY'
  | 'WORK_CONFLICT'
  | 'TECHNICAL_ISSUE'
  | 'APPROVED_LEAVE'
  | 'CLIENT_COMMITMENT'
  | 'FORGOT'
  | 'OTHER';

export type TaskStatus = 'BACKLOG' | 'PLANNED' | 'IN_PROGRESS' | 'BLOCKED' | 'REVIEW' | 'COMPLETED';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type BlockerSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type BlockerStatus = 'OPEN' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED';

export type LeaveType =
  | 'CASUAL'
  | 'SICK'
  | 'ANNUAL'
  | 'PERSONAL'
  | 'WORK_FROM_HOME'
  | 'MATERNITY_PATERNITY'
  | 'BEREAVEMENT';

export type LeaveStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED';

export type GoalStatus = 'ON_TRACK' | 'AT_RISK' | 'BEHIND' | 'COMPLETED';

export type GoalTier = 'COMPANY' | 'DEPARTMENT' | 'TEAM' | 'INDIVIDUAL';

export type ConfidenceLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  jobTitle: string;
  role: Role;
  departmentId: string;
  departmentName: string;
  teamId: string;
  teamName: string;
  managerId?: string;
  managerName?: string;
  attendanceStatus: AttendanceStatus;
  lastActiveAt: string;
  joinedAt: string;
  location: string;
  timezone: string;
  skills: string[];
  leaveBalance: {
    casualTotal: number;
    casualUsed: number;
    sickTotal: number;
    sickUsed: number;
    annualTotal: number;
    annualUsed: number;
  };
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headName: string;
  memberCount: number;
}

export interface Team {
  id: string;
  name: string;
  departmentId: string;
  leadName: string;
  memberCount: number;
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface TaskComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  milestoneId?: string;
  milestoneName?: string;
  assigneeId: string;
  assigneeName: string;
  assigneeAvatar: string;
  creatorId: string;
  status: TaskStatus;
  priority: Priority;
  progress: number; // 0 to 100
  dueDate: string;
  estimatedHours: number;
  loggedHours: number;
  subtasks: Subtask[];
  blockerIds: string[];
  comments: TaskComment[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  projectId: string;
  dueDate: string;
  isCompleted: boolean;
  progress: number;
  taskCount: number;
  completedTaskCount: number;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'Active' | 'On Hold' | 'Completed';
  health: 'On Track' | 'At Risk' | 'Critical';
  progress: number;
  departmentId: string;
  teamId: string;
  leadId: string;
  leadName: string;
  startDate: string;
  targetDate: string;
  totalTasks: number;
  completedTasks: number;
  blockedTasks: number;
  inProgressTasks: number;
  milestones: Milestone[];
}

export interface Blocker {
  id: string;
  title: string;
  description: string;
  severity: BlockerSeverity;
  status: BlockerStatus;
  taskId: string;
  taskTitle: string;
  projectId: string;
  projectName: string;
  reporterId: string;
  reporterName: string;
  reporterAvatar: string;
  dependencyOwnerId?: string;
  dependencyOwnerName?: string;
  resolverId?: string;
  resolverName?: string;
  reportedAt: string;
  expectedResolution?: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

export interface MeetingAttendance {
  id: string;
  meetingId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  status: MeetingAttendanceStatus;
  joinedAt?: string;
  leftAt?: string;
  missedReason?: MissedMeetingReason;
  explanationNote?: string;
  isManagerExcused: boolean;
  managerFeedback?: string;
  actionTaken?: string;
  updatedAt: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  agenda: string;
  meetingUrl: string;
  scheduledAt: string;
  durationMins: number;
  organizerId: string;
  organizerName: string;
  departmentId?: string;
  teamId?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  attendances: MeetingAttendance[];
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userJobTitle: string;
  departmentName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  isHalfDay: boolean;
  halfDaySession?: 'Morning' | 'Afternoon';
  totalDays: number;
  reason: string;
  privateNotes?: string;
  handoverCompleted: boolean;
  handoverNotes?: string;
  backupUserId?: string;
  backupUserName?: string;
  status: LeaveStatus;
  approverId?: string;
  approverName?: string;
  decisionNotes?: string;
  decisionAt?: string;
  createdAt: string;
}

export interface WorkloadIntelligence {
  employeeId: string;
  employeeName: string;
  currentProjectProgress: number;
  tasksDueDuringLeave: number;
  dueTasksList: { id: string; title: string; dueDate: string; priority: Priority }[];
  handoverCompleted: boolean;
  backupPersonName: string;
  teamCapacityBefore: number; // percentage
  teamCapacityAfter: number; // percentage
  isCriticalPathAffected: boolean;
  riskSummary: string;
}

export interface WeeklyCheckin {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userJobTitle: string;
  departmentName: string;
  weekNumber: number;
  year: number;
  completedHighlights: string;
  upcomingPriorities: string;
  activeBlockers: string;
  supportNeeded: string;
  confidence: ConfidenceLevel;
  managerNotes?: string;
  isReviewed: boolean;
  submittedAt: string;
}

export interface KeyResult {
  id: string;
  goalId?: string;
  title: string;
  currentValue: number;
  targetValue: number;
  metricUnit: string;
  progress: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  tier: GoalTier;
  status: GoalStatus;
  progress: number;
  targetDate: string;
  ownerId?: string;
  ownerName?: string;
  ownerAvatar?: string;
  departmentId?: string;
  departmentName?: string;
  teamId?: string;
  parentId?: string;
  keyResults: KeyResult[];
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorAvatar: string;
  actorRole: Role;
  action: string;
  entityType: string;
  entityId: string;
  entityTitle: string;
  previousVal?: string;
  newVal?: string;
  details: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'MISSED_MEETING' | 'LEAVE_REQUEST' | 'BLOCKER' | 'DEADLINE' | 'CHECKIN' | 'APPROVAL';
  link?: string;
  severity: 'info' | 'warning' | 'danger' | 'success';
  isRead: boolean;
  createdAt: string;
}

export interface AttentionItem {
  id: string;
  category: 'MISSED_MEETING' | 'BLOCKED_TASK' | 'DEADLINE_RISK' | 'LEAVE_APPROVAL' | 'STAGNANT_TASK' | 'CHECKIN_MISSING';
  title: string;
  subjectName: string;
  subjectAvatar?: string;
  issue: string;
  rootCause: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  recommendedAction: string;
  actionLabel: string;
  actionType: string;
  entityId: string;
  relatedData?: any;
}

export interface InsightCard {
  id: string;
  title: string;
  description: string;
  category: 'velocity' | 'blockers' | 'leave' | 'checkins' | 'workload';
  severity: 'critical' | 'warning' | 'info' | 'positive';
  evidenceCitations: { label: string; entityType: string; entityId: string }[];
  suggestedAction: string;
  actionLabel: string;
}
