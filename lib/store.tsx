'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  User,
  Role,
  Department,
  Team,
  Project,
  Task,
  TaskStatus,
  Blocker,
  BlockerStatus,
  Meeting,
  MissedMeetingReason,
  LeaveRequest,
  WeeklyCheckin,
  Goal,
  AuditLog,
  NotificationItem,
  AttentionItem,
  InsightCard,
} from './types';
import {
  INITIAL_USERS,
  INITIAL_DEPARTMENTS,
  INITIAL_TEAMS,
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_BLOCKERS,
  INITIAL_MEETINGS,
  INITIAL_LEAVES,
  INITIAL_CHECKINS,
  INITIAL_GOALS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  PROACTIVE_INSIGHTS,
} from './mockData';
import { formatDate } from './utils';

interface StoreContextType {
  // Current user & role
  currentUser: User;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  setCurrentUser: (user: User) => void;

  // Organization
  currentOrg: string;
  setCurrentOrg: (org: string) => void;

  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Search & Command palette
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Data states
  users: User[];
  departments: Department[];
  teams: Team[];
  projects: Project[];
  tasks: Task[];
  blockers: Blocker[];
  meetings: Meeting[];
  leaves: LeaveRequest[];
  checkins: WeeklyCheckin[];
  goals: Goal[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  insights: InsightCard[];
  attentionItems: AttentionItem[];

  // Dynamic Metrics
  metrics: {
    workingCount: number;
    onLeaveCount: number;
    absentCount: number;
    lateCount: number;
    tasksAtRisk: number;
    blockedTasksCount: number;
    pendingLeavesCount: number;
    upcomingMeetingsCount: number;
    unreviewedCheckinsCount: number;
  };

  // Selected entities for modals
  selectedEmployee: User | null;
  setSelectedEmployee: (user: User | null) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  selectedLeave: LeaveRequest | null;
  setSelectedLeave: (leave: LeaveRequest | null) => void;
  selectedMeeting: Meeting | null;
  setSelectedMeeting: (meeting: Meeting | null) => void;

  // Actions
  updateTaskStatus: (taskId: string, status: TaskStatus, progress?: number) => void;
  createTask: (task: Partial<Task>) => void;
  reportBlocker: (data: {
    taskId: string;
    title: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    dependencyOwnerId?: string;
    expectedResolution?: string;
  }) => void;
  resolveBlocker: (blockerId: string, notes: string) => void;
  acknowledgeBlocker: (blockerId: string) => void;
  submitMissedMeetingExplanation: (
    meetingId: string,
    userId: string,
    reason: MissedMeetingReason,
    note: string
  ) => void;
  triageMissedMeeting: (
    meetingId: string,
    userId: string,
    action: 'Accept' | 'Clarification' | 'Excuse' | 'Schedule 1:1',
    isExcused: boolean,
    feedback?: string
  ) => void;
  requestLeave: (data: {
    userId: string;
    leaveType: any;
    startDate: string;
    endDate: string;
    isHalfDay: boolean;
    reason: string;
    privateNotes?: string;
    handoverNotes: string;
    backupUserId: string;
  }) => void;
  approveLeave: (leaveId: string, decisionNotes?: string) => void;
  rejectLeave: (leaveId: string, decisionNotes?: string) => void;
  submitWeeklyCheckin: (data: {
    userId: string;
    completedHighlights: string;
    upcomingPriorities: string;
    activeBlockers: string;
    supportNeeded: string;
    confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  }) => void;
  reviewWeeklyCheckin: (checkinId: string, notes: string) => void;
  updateGoalProgress: (goalId: string, keyResultId: string, newValue: number) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetToInitialData: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEY = 'veixon_command_center_state_v3';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [teams] = useState<Team[]>(INITIAL_TEAMS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [blockers, setBlockers] = useState<Blocker[]>(INITIAL_BLOCKERS);
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [checkins, setCheckins] = useState<WeeklyCheckin[]>(INITIAL_CHECKINS);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [insights] = useState<InsightCard[]>(PROACTIVE_INSIGHTS);

  // App state — Primary Director: V S Sai Siddardh
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [currentRole, setCurrentRoleState] = useState<Role>('DIRECTOR');
  const [currentOrg, setCurrentOrg] = useState<string>('VEIXON');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.users) setUsers(parsed.users);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.blockers) setBlockers(parsed.blockers);
        if (parsed.meetings) setMeetings(parsed.meetings);
        if (parsed.leaves) setLeaves(parsed.leaves);
        if (parsed.checkins) setCheckins(parsed.checkins);
        if (parsed.goals) setGoals(parsed.goals);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
        if (parsed.notifications) setNotifications(parsed.notifications);
      }
      const darkPref = localStorage.getItem('veixon_theme');
      if (darkPref !== null) {
        setIsDarkMode(darkPref === 'dark');
      }
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          users,
          projects,
          tasks,
          blockers,
          meetings,
          leaves,
          checkins,
          goals,
          auditLogs,
          notifications,
        })
      );
    } catch {
      // ignore
    }
  }, [users, projects, tasks, blockers, meetings, leaves, checkins, goals, auditLogs, notifications]);

  // Apply dark mode class to html document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('veixon_theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('veixon_theme', 'light');
      } catch {}
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setCurrentRole = (role: Role) => {
    setCurrentRoleState(role);
    if (role === 'DIRECTOR') {
      const u = users.find((x) => x.id === 'usr-1') || users[0];
      setCurrentUser(u);
    } else if (role === 'ADMIN') {
      const u = users.find((x) => x.id === 'usr-2') || users[1];
      setCurrentUser(u);
    } else if (role === 'MANAGER') {
      const u = users.find((x) => x.id === 'usr-3') || users[2];
      setCurrentUser(u);
    } else if (role === 'HR') {
      const u = users.find((x) => x.id === 'usr-8') || users[7];
      setCurrentUser(u);
    } else {
      const u = users.find((x) => x.id === 'usr-7') || users[6];
      setCurrentUser(u);
    }
  };

  const logAudit = (
    action: string,
    entityType: string,
    entityId: string,
    entityTitle: string,
    previousVal?: string,
    newVal?: string,
    details: string = ''
  ) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorAvatar: currentUser.avatarUrl,
      actorRole: currentRole,
      action,
      entityType,
      entityId,
      entityTitle,
      previousVal,
      newVal,
      details,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Dynamic Attention Items calculation
  const attentionItems = useMemo((): AttentionItem[] => {
    const items: AttentionItem[] = [];

    // 1. Unexcused missed meetings
    meetings.forEach((mtg) => {
      mtg.attendances.forEach((att) => {
        if (att.status === 'ABSENT' && !att.isManagerExcused) {
          items.push({
            id: `att-mtg-${mtg.id}-${att.userId}`,
            category: 'MISSED_MEETING',
            title: `${att.userName} missed ${mtg.title}`,
            subjectName: att.userName,
            subjectAvatar: att.userAvatar,
            issue: att.missedReason
              ? `Explanation submitted: ${att.missedReason.replace('_', ' ')}`
              : 'Absence not yet explained.',
            rootCause: att.explanationNote || 'Waiting for employee response.',
            severity: 'HIGH',
            timestamp: att.updatedAt,
            recommendedAction: 'Review employee explanation, excuse or schedule 1:1 sync.',
            actionLabel: 'Review Explanation',
            actionType: 'REVIEW_MEETING',
            entityId: mtg.id,
            relatedData: { meeting: mtg, attendance: att },
          });
        }
      });
    });

    // 2. Open / in-progress blockers
    blockers.forEach((blk) => {
      if (blk.status !== 'RESOLVED') {
        const hoursOpen = Math.round(
          (Date.now() - new Date(blk.reportedAt).getTime()) / (1000 * 60 * 60)
        );
        items.push({
          id: `att-blk-${blk.id}`,
          category: 'BLOCKED_TASK',
          title: `${blk.reporterName} blocked: "${blk.title}"`,
          subjectName: blk.reporterName,
          subjectAvatar: blk.reporterAvatar,
          issue: `Task "${blk.taskTitle}" blocked for ${hoursOpen}h`,
          rootCause: blk.description,
          severity: blk.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
          timestamp: blk.reportedAt,
          recommendedAction: blk.dependencyOwnerName
            ? `Coordinate with ${blk.dependencyOwnerName} to unblock.`
            : 'Acknowledge blocker and reassign dependency.',
          actionLabel: 'Triage Blocker',
          actionType: 'RESOLVE_BLOCKER',
          entityId: blk.id,
          relatedData: { blocker: blk },
        });
      }
    });

    // 3. Pending leave requests
    leaves.forEach((lev) => {
      if (lev.status === 'PENDING_APPROVAL') {
        items.push({
          id: `att-lev-${lev.id}`,
          category: 'LEAVE_APPROVAL',
          title: `Leave request from ${lev.userName} (${lev.totalDays} days)`,
          subjectName: lev.userName,
          subjectAvatar: lev.userAvatar,
          issue: `${lev.leaveType} Leave (${formatDate(lev.startDate, 'MMM d')} - ${formatDate(lev.endDate, 'MMM d')})`,
          rootCause: lev.reason,
          severity: 'MEDIUM',
          timestamp: lev.createdAt,
          recommendedAction: `Inspect workload intelligence and handover with ${
            lev.backupUserName || 'backup'
          }.`,
          actionLabel: 'Review Workload',
          actionType: 'REVIEW_LEAVE',
          entityId: lev.id,
          relatedData: { leave: lev },
        });
      }
    });

    // 4. Overdue or high risk tasks
    tasks.forEach((tsk) => {
      if (tsk.status !== 'COMPLETED') {
        const dueTime = new Date(tsk.dueDate).getTime();
        const now = Date.now();
        if (dueTime < now) {
          items.push({
            id: `att-tsk-overdue-${tsk.id}`,
            category: 'DEADLINE_RISK',
            title: `Task overdue: "${tsk.title}"`,
            subjectName: tsk.assigneeName,
            subjectAvatar: tsk.assigneeAvatar,
            issue: `Due date passed on ${new Date(tsk.dueDate).toLocaleDateString()} (${tsk.progress}% done)`,
            rootCause: `High priority task in ${tsk.projectName} has pending subtasks.`,
            severity: 'HIGH',
            timestamp: tsk.updatedAt,
            recommendedAction: 'Check in with assignee or rebalance subtasks.',
            actionLabel: 'Inspect Task',
            actionType: 'INSPECT_TASK',
            entityId: tsk.id,
            relatedData: { task: tsk },
          });
        }
      }
    });

    return items;
  }, [meetings, blockers, leaves, tasks]);

  // Real-time Dynamic Metrics
  const metrics = useMemo(() => {
    const workingCount = users.filter((u) => u.attendanceStatus === 'WORKING').length;
    const onLeaveCount = users.filter((u) => u.attendanceStatus === 'ON_LEAVE').length;
    const absentCount = users.filter((u) => u.attendanceStatus === 'ABSENT').length;
    const lateCount = users.filter((u) => u.attendanceStatus === 'LATE').length;
    const tasksAtRisk = tasks.filter((t) => t.priority === 'CRITICAL' && t.status !== 'COMPLETED').length;
    const blockedTasksCount = tasks.filter((t) => t.status === 'BLOCKED').length;
    const pendingLeavesCount = leaves.filter((l) => l.status === 'PENDING_APPROVAL').length;
    const upcomingMeetingsCount = meetings.filter((m) => m.status === 'Scheduled').length;
    const unreviewedCheckinsCount = checkins.filter((c) => !c.isReviewed).length;

    return {
      workingCount,
      onLeaveCount,
      absentCount,
      lateCount,
      tasksAtRisk,
      blockedTasksCount,
      pendingLeavesCount,
      upcomingMeetingsCount,
      unreviewedCheckinsCount,
    };
  }, [users, tasks, leaves, meetings, checkins]);

  // Mutations
  const updateTaskStatus = (taskId: string, status: TaskStatus, progress?: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const prevStatus = t.status;
          const newProgress =
            progress !== undefined ? progress : status === 'COMPLETED' ? 100 : t.progress;
          logAudit(
            'TASK_STATUS_CHANGED',
            'Task',
            t.id,
            t.title,
            prevStatus,
            status,
            `Progress set to ${newProgress}%`
          );
          return {
            ...t,
            status,
            progress: newProgress,
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );
  };

  const createTask = (taskData: Partial<Task>) => {
    const project = projects.find((p) => p.id === taskData.projectId) || projects[0];
    const assignee = users.find((u) => u.id === taskData.assigneeId) || currentUser;

    const newTask: Task = {
      id: `tsk-${Date.now()}`,
      title: taskData.title || 'New Task',
      description: taskData.description || '',
      projectId: project.id,
      projectName: project.name,
      milestoneId: taskData.milestoneId,
      assigneeId: assignee.id,
      assigneeName: assignee.name,
      assigneeAvatar: assignee.avatarUrl,
      creatorId: currentUser.id,
      status: taskData.status || 'PLANNED',
      priority: taskData.priority || 'MEDIUM',
      progress: taskData.progress || 0,
      dueDate: taskData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: taskData.estimatedHours || 8,
      loggedHours: 0,
      subtasks: taskData.subtasks || [],
      blockerIds: [],
      comments: [],
      tags: taskData.tags || ['WorkPulse'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    logAudit('TASK_CREATED', 'Task', newTask.id, newTask.title, 'NONE', 'PLANNED', `Assigned to ${assignee.name}`);
  };

  const reportBlocker = (data: {
    taskId: string;
    title: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    dependencyOwnerId?: string;
    expectedResolution?: string;
  }) => {
    const task = tasks.find((t) => t.id === data.taskId);
    const depOwner = users.find((u) => u.id === data.dependencyOwnerId);

    const newBlocker: Blocker = {
      id: `blk-${Date.now()}`,
      title: data.title,
      description: data.description,
      severity: data.severity,
      status: 'OPEN',
      taskId: data.taskId,
      taskTitle: task ? task.title : 'Task',
      projectId: task ? task.projectId : 'proj-1',
      projectName: task ? task.projectName : 'Project',
      reporterId: currentUser.id,
      reporterName: currentUser.name,
      reporterAvatar: currentUser.avatarUrl,
      dependencyOwnerId: depOwner ? depOwner.id : undefined,
      dependencyOwnerName: depOwner ? depOwner.name : undefined,
      reportedAt: new Date().toISOString(),
      expectedResolution: data.expectedResolution,
    };

    setBlockers((prev) => [newBlocker, ...prev]);

    // Update task status to blocked
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === data.taskId) {
          return {
            ...t,
            status: 'BLOCKED',
            blockerIds: [...t.blockerIds, newBlocker.id],
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );

    logAudit(
      'BLOCKER_REPORTED',
      'Blocker',
      newBlocker.id,
      newBlocker.title,
      'NONE',
      'OPEN',
      `Reported by ${currentUser.name} on "${task?.title || 'task'}". Severity: ${data.severity}`
    );
  };

  const resolveBlocker = (blockerId: string, notes: string) => {
    setBlockers((prev) =>
      prev.map((b) => {
        if (b.id === blockerId) {
          logAudit(
            'BLOCKER_RESOLVED',
            'Blocker',
            b.id,
            b.title,
            b.status,
            'RESOLVED',
            `Resolved by ${currentUser.name}. Notes: ${notes}`
          );
          return {
            ...b,
            status: 'RESOLVED',
            resolverId: currentUser.id,
            resolverName: currentUser.name,
            resolvedAt: new Date().toISOString(),
            resolutionNotes: notes,
          };
        }
        return b;
      })
    );

    // Unblock the task if no other open blockers
    const blocker = blockers.find((b) => b.id === blockerId);
    if (blocker) {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === blocker.taskId) {
            const otherActive = blockers.some(
              (other) => other.id !== blockerId && other.taskId === t.id && other.status !== 'RESOLVED'
            );
            return {
              ...t,
              status: otherActive ? 'BLOCKED' : 'IN_PROGRESS',
              updatedAt: new Date().toISOString(),
            };
          }
          return t;
        })
      );
    }
  };

  const acknowledgeBlocker = (blockerId: string) => {
    setBlockers((prev) =>
      prev.map((b) => {
        if (b.id === blockerId) {
          logAudit('BLOCKER_ACKNOWLEDGED', 'Blocker', b.id, b.title, b.status, 'ACKNOWLEDGED', `Acknowledged by ${currentUser.name}`);
          return { ...b, status: 'ACKNOWLEDGED' };
        }
        return b;
      })
    );
  };

  const submitMissedMeetingExplanation = (
    meetingId: string,
    userId: string,
    reason: MissedMeetingReason,
    note: string
  ) => {
    setMeetings((prev) =>
      prev.map((m) => {
        if (m.id === meetingId) {
          return {
            ...m,
            attendances: m.attendances.map((att) => {
              if (att.userId === userId) {
                return {
                  ...att,
                  missedReason: reason,
                  explanationNote: note,
                  updatedAt: new Date().toISOString(),
                };
              }
              return att;
            }),
          };
        }
        return m;
      })
    );

    logAudit(
      'MISSED_MEETING_EXPLAINED',
      'MeetingAttendance',
      meetingId,
      `Meeting ${meetingId}`,
      'ABSENT (Unexplained)',
      `ABSENT (${reason})`,
      `Explanation: ${note}`
    );
  };

  const triageMissedMeeting = (
    meetingId: string,
    userId: string,
    action: 'Accept' | 'Clarification' | 'Excuse' | 'Schedule 1:1',
    isExcused: boolean,
    feedback?: string
  ) => {
    setMeetings((prev) =>
      prev.map((m) => {
        if (m.id === meetingId) {
          return {
            ...m,
            attendances: m.attendances.map((att) => {
              if (att.userId === userId) {
                return {
                  ...att,
                  isManagerExcused: isExcused,
                  status: isExcused ? 'EXCUSED' : att.status,
                  managerFeedback: feedback,
                  actionTaken: action,
                  updatedAt: new Date().toISOString(),
                };
              }
              return att;
            }),
          };
        }
        return m;
      })
    );

    logAudit(
      'MEETING_ATTENDANCE_TRIAGED',
      'MeetingAttendance',
      meetingId,
      `Meeting ${meetingId}`,
      'ABSENT',
      isExcused ? 'EXCUSED' : 'PENDING_ACTION',
      `Manager action: ${action}. Feedback: ${feedback || 'None'}`
    );
  };

  const requestLeave = (data: {
    userId: string;
    leaveType: any;
    startDate: string;
    endDate: string;
    isHalfDay: boolean;
    reason: string;
    privateNotes?: string;
    handoverNotes: string;
    backupUserId: string;
  }) => {
    const user = users.find((u) => u.id === data.userId) || currentUser;
    const backup = users.find((u) => u.id === data.backupUserId);

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = data.isHalfDay ? 0.5 : Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newLeave: LeaveRequest = {
      id: `lev-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatarUrl,
      userJobTitle: user.jobTitle,
      departmentName: user.departmentName,
      leaveType: data.leaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      isHalfDay: data.isHalfDay,
      totalDays,
      reason: data.reason,
      privateNotes: data.privateNotes,
      handoverCompleted: true,
      handoverNotes: data.handoverNotes,
      backupUserId: backup?.id,
      backupUserName: backup?.name,
      status: 'PENDING_APPROVAL',
      createdAt: new Date().toISOString(),
    };

    setLeaves((prev) => [newLeave, ...prev]);
    logAudit(
      'LEAVE_REQUESTED',
      'LeaveRequest',
      newLeave.id,
      `${user.name} - ${totalDays}d ${data.leaveType}`,
      'NONE',
      'PENDING_APPROVAL',
      `Backup: ${backup?.name || 'None'}. Reason: ${data.reason}`
    );
  };

  const approveLeave = (leaveId: string, decisionNotes?: string) => {
    setLeaves((prev) =>
      prev.map((l) => {
        if (l.id === leaveId) {
          logAudit(
            'LEAVE_APPROVED',
            'LeaveRequest',
            l.id,
            `${l.userName} - ${l.totalDays}d ${l.leaveType}`,
            'PENDING_APPROVAL',
            'APPROVED',
            `Approved by ${currentUser.name}. Notes: ${decisionNotes || 'Approved'}`
          );
          return {
            ...l,
            status: 'APPROVED',
            approverId: currentUser.id,
            approverName: currentUser.name,
            decisionNotes,
            decisionAt: new Date().toISOString(),
          };
        }
        return l;
      })
    );
  };

  const rejectLeave = (leaveId: string, decisionNotes?: string) => {
    setLeaves((prev) =>
      prev.map((l) => {
        if (l.id === leaveId) {
          logAudit(
            'LEAVE_REJECTED',
            'LeaveRequest',
            l.id,
            `${l.userName} - ${l.totalDays}d ${l.leaveType}`,
            'PENDING_APPROVAL',
            'REJECTED',
            `Rejected by ${currentUser.name}. Notes: ${decisionNotes || 'Declined'}`
          );
          return {
            ...l,
            status: 'REJECTED',
            approverId: currentUser.id,
            approverName: currentUser.name,
            decisionNotes,
            decisionAt: new Date().toISOString(),
          };
        }
        return l;
      })
    );
  };

  const submitWeeklyCheckin = (data: {
    userId: string;
    completedHighlights: string;
    upcomingPriorities: string;
    activeBlockers: string;
    supportNeeded: string;
    confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  }) => {
    const user = users.find((u) => u.id === data.userId) || currentUser;
    const newCheckin: WeeklyCheckin = {
      id: `chk-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatarUrl,
      userJobTitle: user.jobTitle,
      departmentName: user.departmentName,
      weekNumber: 36,
      year: 2026,
      completedHighlights: data.completedHighlights,
      upcomingPriorities: data.upcomingPriorities,
      activeBlockers: data.activeBlockers,
      supportNeeded: data.supportNeeded,
      confidence: data.confidence,
      isReviewed: false,
      submittedAt: new Date().toISOString(),
    };

    setCheckins((prev) => [newCheckin, ...prev]);
    logAudit(
      'CHECKIN_SUBMITTED',
      'WeeklyCheckin',
      newCheckin.id,
      `${user.name} - Week 36 Checkin`,
      'NONE',
      'SUBMITTED',
      `Confidence: ${data.confidence}`
    );
  };

  const reviewWeeklyCheckin = (checkinId: string, notes: string) => {
    setCheckins((prev) =>
      prev.map((c) => {
        if (c.id === checkinId) {
          logAudit('CHECKIN_REVIEWED', 'WeeklyCheckin', c.id, `${c.userName} Checkin`, 'UNREVIEWED', 'REVIEWED', notes);
          return {
            ...c,
            isReviewed: true,
            managerNotes: notes,
          };
        }
        return c;
      })
    );
  };

  const updateGoalProgress = (goalId: string, keyResultId: string, newValue: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const updatedKRs = g.keyResults.map((kr) => {
            if (kr.id === keyResultId) {
              const prog = Math.min(100, Math.round((newValue / kr.targetValue) * 100));
              return { ...kr, currentValue: newValue, progress: prog };
            }
            return kr;
          });
          const avgProg = Math.round(
            updatedKRs.reduce((acc, kr) => acc + kr.progress, 0) / updatedKRs.length
          );
          const newStatus = avgProg >= 80 ? 'ON_TRACK' : avgProg >= 50 ? 'AT_RISK' : 'BEHIND';
          logAudit('GOAL_PROGRESS_UPDATED', 'Goal', g.id, g.title, `${g.progress}%`, `${avgProg}%`, `Key Result updated to ${newValue}`);
          return {
            ...g,
            keyResults: updatedKRs,
            progress: avgProg,
            status: newStatus,
          };
        }
        return g;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const resetToInitialData = () => {
    setUsers(INITIAL_USERS);
    setProjects(INITIAL_PROJECTS);
    setTasks(INITIAL_TASKS);
    setBlockers(INITIAL_BLOCKERS);
    setMeetings(INITIAL_MEETINGS);
    setLeaves(INITIAL_LEAVES);
    setCheckins(INITIAL_CHECKINS);
    setGoals(INITIAL_GOALS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentRole,
        setCurrentUser,
        currentOrg,
        setCurrentOrg,
        isDarkMode,
        toggleDarkMode,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        searchQuery,
        setSearchQuery,
        users,
        departments,
        teams,
        projects,
        tasks,
        blockers,
        meetings,
        leaves,
        checkins,
        goals,
        auditLogs,
        notifications,
        insights,
        attentionItems,
        metrics,
        selectedEmployee,
        setSelectedEmployee,
        selectedTask,
        setSelectedTask,
        selectedLeave,
        setSelectedLeave,
        selectedMeeting,
        setSelectedMeeting,
        updateTaskStatus,
        createTask,
        reportBlocker,
        resolveBlocker,
        acknowledgeBlocker,
        submitMissedMeetingExplanation,
        triageMissedMeeting,
        requestLeave,
        approveLeave,
        rejectLeave,
        submitWeeklyCheckin,
        reviewWeeklyCheckin,
        updateGoalProgress,
        markNotificationRead,
        markAllNotificationsRead,
        resetToInitialData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
