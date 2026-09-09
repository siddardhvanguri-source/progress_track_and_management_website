'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import {
  formatDate,
  formatRelativeTime,
  getStatusColor,
  getPriorityColor,
} from '@/lib/utils';
import {
  Mail,
  MapPin,
  Clock,
  Briefcase,
  AlertOctagon,
  Calendar,
  CheckCircle2,
  FolderKanban,
  Target,
  Shield,
  Layers,
} from 'lucide-react';

export function EmployeeProfileModal() {
  const {
    selectedEmployee,
    setSelectedEmployee,
    tasks,
    blockers,
    meetings,
    leaves,
    checkins,
    goals,
    auditLogs,
    currentRole,
    setSelectedTask,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'work' | 'goals' | 'meetings' | 'attendance' | 'leave' | 'checkins' | 'activity'
  >('overview');

  if (!selectedEmployee) return null;

  const emp = selectedEmployee;
  const empTasks = tasks.filter((t) => t.assigneeId === emp.id);
  const empBlockers = blockers.filter((b) => b.reporterId === emp.id);
  const empLeaves = leaves.filter((l) => l.userId === emp.id);
  const empCheckins = checkins.filter((c) => c.userId === emp.id);
  const empGoals = goals.filter((g) => g.ownerId === emp.id);
  const empAudits = auditLogs.filter(
    (a) => a.actorId === emp.id || a.entityTitle.includes(emp.name)
  );

  // Meeting attendances
  const empAttendances = meetings.flatMap((m) =>
    m.attendances
      .filter((a) => a.userId === emp.id)
      .map((a) => ({ ...a, meetingTitle: m.title, meetingDate: m.scheduledAt }))
  );

  const completedTasks = empTasks.filter((t) => t.status === 'COMPLETED').length;
  const inProgressTasks = empTasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const blockedTasks = empTasks.filter((t) => t.status === 'BLOCKED').length;
  const avgProgress =
    empTasks.length > 0
      ? Math.round(empTasks.reduce((acc, t) => acc + t.progress, 0) / empTasks.length)
      : 0;

  return (
    <Modal
      isOpen={!!selectedEmployee}
      onClose={() => setSelectedEmployee(null)}
      maxWidth="3xl"
      className="p-0"
    >
      {/* Profile Header */}
      <div className="relative border-b border-border bg-gradient-to-r from-primary/10 via-background to-accent/30 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              name={emp.name}
              src={emp.avatarUrl}
              size="xl"
              status={emp.attendanceStatus}
              className="ring-4 ring-card"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{emp.name}</h2>
                <Badge variant={emp.attendanceStatus === 'WORKING' ? 'success' : 'warning'}>
                  {emp.attendanceStatus}
                </Badge>
                <Badge variant="outline" className="text-[10px] uppercase">
                  {emp.role}
                </Badge>
              </div>
              <p className="text-sm font-medium text-muted-foreground">{emp.jobTitle}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-primary" />
                  {emp.departmentName} ({emp.teamName})
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {emp.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Active {formatRelativeTime(emp.lastActiveAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 w-full sm:w-auto">
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-muted-foreground">Manager</span>
              <p className="text-xs font-semibold text-foreground">{emp.managerName || 'Sarah Jenkins'}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-muted-foreground">Joined</span>
              <p className="text-xs font-medium text-foreground">{formatDate(emp.joinedAt)}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex overflow-x-auto pb-1 scrollbar-none">
          <TabsList className="bg-background/80 border border-border/80 p-1">
            <TabsTrigger active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
              Overview
            </TabsTrigger>
            <TabsTrigger active={activeTab === 'work'} onClick={() => setActiveTab('work')}>
              Work & Tasks ({empTasks.length})
            </TabsTrigger>
            <TabsTrigger active={activeTab === 'goals'} onClick={() => setActiveTab('goals')}>
              Goals & OKRs ({empGoals.length})
            </TabsTrigger>
            <TabsTrigger active={activeTab === 'meetings'} onClick={() => setActiveTab('meetings')}>
              Meetings ({empAttendances.length})
            </TabsTrigger>
            <TabsTrigger active={activeTab === 'leave'} onClick={() => setActiveTab('leave')}>
              Leave & Balance
            </TabsTrigger>
            <TabsTrigger active={activeTab === 'checkins'} onClick={() => setActiveTab('checkins')}>
              Check-ins ({empCheckins.length})
            </TabsTrigger>
            <TabsTrigger active={activeTab === 'activity'} onClick={() => setActiveTab('activity')}>
              Audit Activity
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      {/* Tab Content Body */}
      <div className="p-6 space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground">Overall Progress</span>
                <p className="text-xl font-bold text-foreground">{avgProgress}%</p>
                <Progress value={avgProgress} size="sm" />
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground">Active Tasks</span>
                <p className="text-xl font-bold text-foreground">
                  {inProgressTasks}{' '}
                  <span className="text-xs font-normal text-muted-foreground">/ {empTasks.length} total</span>
                </p>
                <p className="text-[10px] text-emerald-500 font-medium">{completedTasks} completed</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground">Active Blockers</span>
                <p className="text-xl font-bold text-rose-500">{blockedTasks}</p>
                <p className="text-[10px] text-muted-foreground">{empBlockers.length} reported total</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground">Available Leave</span>
                <p className="text-xl font-bold text-purple-500">
                  {emp.leaveBalance.casualTotal +
                    emp.leaveBalance.annualTotal -
                    emp.leaveBalance.casualUsed -
                    emp.leaveBalance.annualUsed}
                  d
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {emp.leaveBalance.casualUsed + emp.leaveBalance.annualUsed}d used this year
                </p>
              </div>
            </div>

            {/* Current Priorities & Active Tasks */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span>Current Priorities & Tasks</span>
                <span className="text-primary hover:underline cursor-pointer" onClick={() => setActiveTab('work')}>
                  View all ({empTasks.length}) →
                </span>
              </h4>
              <div className="space-y-2">
                {empTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-card hover:bg-accent/40 transition-colors cursor-pointer group"
                  >
                    <div className="space-y-1 max-w-[70%]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                          {task.title}
                        </span>
                        <Badge variant={task.status === 'BLOCKED' ? 'danger' : 'secondary'} className="text-[10px]">
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {task.projectName} • Due {formatDate(task.dueDate)}
                      </p>
                    </div>
                    <div className="w-24 text-right space-y-1">
                      <span className="text-xs font-semibold text-foreground">{task.progress}%</span>
                      <Progress value={task.progress} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Capabilities */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Skills & Domain Expertise
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {emp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium border border-border/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WORK & TASKS TAB */}
        {activeTab === 'work' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                All Assigned Tasks ({empTasks.length})
              </h4>
            </div>
            <div className="space-y-2">
              {empTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="p-3.5 rounded-xl border border-border/70 bg-card hover:bg-accent/40 transition-colors cursor-pointer space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-foreground hover:text-primary">{task.title}</h5>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{task.description}</p>
                    </div>
                    <Badge variant={task.status === 'BLOCKED' ? 'danger' : 'secondary'}>{task.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-border/40 text-muted-foreground">
                    <span>
                      {task.subtasks.filter((s) => s.isCompleted).length}/{task.subtasks.length} subtasks completed
                    </span>
                    <span className="font-semibold text-foreground">{task.progress}% progress</span>
                  </div>
                  <Progress value={task.progress} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GOALS TAB */}
        {activeTab === 'goals' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Objectives & Key Results
            </h4>
            {empGoals.length === 0 ? (
              <p className="text-xs text-muted-foreground py-6 text-center">No individual goals assigned yet.</p>
            ) : (
              empGoals.map((goal) => (
                <div key={goal.id} className="p-4 rounded-xl border border-border/70 bg-card space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-foreground">{goal.title}</h5>
                      <p className="text-xs text-muted-foreground">{goal.description}</p>
                    </div>
                    <Badge variant="success">{goal.status}</Badge>
                  </div>
                  <Progress value={goal.progress} size="md" showLabel />
                  <div className="space-y-2 pt-2">
                    {goal.keyResults.map((kr) => (
                      <div key={kr.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-muted/20">
                        <span className="font-medium text-foreground">{kr.title}</span>
                        <span className="font-mono text-muted-foreground">
                          {kr.currentValue} / {kr.targetValue} {kr.metricUnit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* MEETINGS TAB */}
        {activeTab === 'meetings' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Meeting Attendance History
            </h4>
            <div className="space-y-2">
              {empAttendances.map((att, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-border/70 bg-card flex items-center justify-between">
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-foreground">{att.meetingTitle}</h5>
                    <p className="text-[11px] text-muted-foreground">{formatDate(att.meetingDate, 'PPP p')}</p>
                    {att.explanationNote && (
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md inline-block">
                        Note: {att.explanationNote}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={
                      att.status === 'PRESENT'
                        ? 'success'
                        : att.status === 'EXCUSED'
                        ? 'purple'
                        : att.status === 'LATE'
                        ? 'warning'
                        : 'danger'
                    }
                  >
                    {att.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEAVE TAB */}
        {activeTab === 'leave' && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                <span className="text-[11px] text-muted-foreground">Casual Leave</span>
                <p className="text-lg font-bold text-foreground">
                  {emp.leaveBalance.casualTotal - emp.leaveBalance.casualUsed}{' '}
                  <span className="text-xs font-normal text-muted-foreground">/ {emp.leaveBalance.casualTotal}</span>
                </p>
                <Progress
                  value={((emp.leaveBalance.casualTotal - emp.leaveBalance.casualUsed) / emp.leaveBalance.casualTotal) * 100}
                  size="sm"
                />
              </div>
              <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                <span className="text-[11px] text-muted-foreground">Annual Vacation</span>
                <p className="text-lg font-bold text-foreground">
                  {emp.leaveBalance.annualTotal - emp.leaveBalance.annualUsed}{' '}
                  <span className="text-xs font-normal text-muted-foreground">/ {emp.leaveBalance.annualTotal}</span>
                </p>
                <Progress
                  value={((emp.leaveBalance.annualTotal - emp.leaveBalance.annualUsed) / emp.leaveBalance.annualTotal) * 100}
                  size="sm"
                />
              </div>
              <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                <span className="text-[11px] text-muted-foreground">Sick Leave</span>
                <p className="text-lg font-bold text-foreground">
                  {emp.leaveBalance.sickTotal - emp.leaveBalance.sickUsed}{' '}
                  <span className="text-xs font-normal text-muted-foreground">/ {emp.leaveBalance.sickTotal}</span>
                </p>
                <Progress
                  value={((emp.leaveBalance.sickTotal - emp.leaveBalance.sickUsed) / emp.leaveBalance.sickTotal) * 100}
                  size="sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Leave Requests</h4>
              {empLeaves.map((lev) => (
                <div key={lev.id} className="p-3.5 rounded-xl border border-border/70 bg-card flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-foreground">
                      {lev.leaveType} Leave ({lev.totalDays} days)
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      {formatDate(lev.startDate)} - {formatDate(lev.endDate)}
                    </p>
                    <p className="text-[11px] text-muted-foreground italic mt-0.5">{lev.reason}</p>
                  </div>
                  <Badge variant={lev.status === 'APPROVED' ? 'success' : 'warning'}>{lev.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHECK-INS TAB */}
        {activeTab === 'checkins' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Weekly Check-ins</h4>
            {empCheckins.map((chk) => (
              <div key={chk.id} className="p-4 rounded-xl border border-border/70 bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    Week {chk.weekNumber}, {chk.year}
                  </span>
                  <Badge variant={chk.confidence === 'HIGH' ? 'success' : 'warning'}>
                    Confidence: {chk.confidence}
                  </Badge>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-muted-foreground">Completed:</span>
                    <p className="text-foreground">{chk.completedHighlights}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">Working on Next:</span>
                    <p className="text-foreground">{chk.upcomingPriorities}</p>
                  </div>
                  {chk.activeBlockers && (
                    <div>
                      <span className="font-semibold text-rose-500">Blockers:</span>
                      <p className="text-foreground">{chk.activeBlockers}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AUDIT ACTIVITY TAB */}
        {activeTab === 'activity' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Audit Logs & Action History
            </h4>
            <div className="space-y-2">
              {empAudits.map((log) => (
                <div key={log.id} className="p-3 rounded-xl border border-border/60 bg-muted/10 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">{log.action}</span>
                    <span className="text-[10px] text-muted-foreground">{formatDate(log.timestamp, 'PPP p')}</span>
                  </div>
                  <p className="text-muted-foreground">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
