'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import {
  calculateDepartmentWorkloads,
  getWeeklyAttendanceTrend,
  getBlockerResolutionMetrics,
} from '@/lib/analytics';
import { exportToCSV } from '@/lib/csvExport';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  BarChart3,
  Download,
  Calendar,
  Users,
  AlertOctagon,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

export default function ReportsPage() {
  const { departments, users, tasks, blockers, meetings, leaves } = useStore();

  const [dateRange, setDateRange] = useState('Sprint 6 (Current)');

  const deptWorkloads = calculateDepartmentWorkloads(departments, users, tasks);
  const attendanceTrend = getWeeklyAttendanceTrend();
  const blockerMetrics = getBlockerResolutionMetrics(blockers);

  // CSV Exporters
  const handleExportEmployees = () => {
    const data = users.map((u) => ({
      ID: u.id,
      Name: u.name,
      Email: u.email,
      Role: u.role,
      Department: u.departmentName,
      Team: u.teamName,
      JobTitle: u.jobTitle,
      Status: u.attendanceStatus,
      Location: u.location,
      Joined: u.joinedAt,
    }));
    exportToCSV('WorkPulse_Employees', data);
  };

  const handleExportTasks = () => {
    const data = tasks.map((t) => ({
      TaskID: t.id,
      Title: t.title,
      Project: t.projectName,
      Assignee: t.assigneeName,
      Status: t.status,
      Priority: t.priority,
      Progress: `${t.progress}%`,
      DueDate: t.dueDate,
      LoggedHours: t.loggedHours,
      EstimatedHours: t.estimatedHours,
    }));
    exportToCSV('WorkPulse_Tasks', data);
  };

  const handleExportLeaves = () => {
    const data = leaves.map((l) => ({
      LeaveID: l.id,
      Employee: l.userName,
      Type: l.leaveType,
      StartDate: l.startDate,
      EndDate: l.endDate,
      Days: l.totalDays,
      Status: l.status,
      Reason: l.reason,
      Backup: l.backupUserName || 'None',
    }));
    exportToCSV('WorkPulse_Leaves', data);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <BarChart3 className="h-6 w-6 text-primary" />
            Operations Reports & Analytics
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Department workload capacity, weekly attendance trends, and blocker resolution velocity.
          </p>
        </div>

        {/* CSV Export Dropdown / Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportEmployees}
            className="gap-1.5 text-xs font-semibold"
          >
            <Download className="h-3.5 w-3.5" />
            Export Employees CSV
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleExportTasks}
            className="gap-1.5 text-xs font-semibold"
          >
            <Download className="h-3.5 w-3.5" />
            Export Tasks CSV
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={handleExportLeaves}
            className="gap-1.5 text-xs font-semibold"
          >
            <FileSpreadsheet className="h-3.5 w-3.5" />
            Export Leaves CSV
          </Button>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Trends Chart */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-foreground">Weekly Attendance Telemetry</h3>
              <p className="text-xs text-muted-foreground">Present vs Late vs Absent vs Leave breakdown</p>
            </div>
            <Badge variant="outline">Mon - Fri</Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', fontSize: '11px', border: '1px solid #27272a' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="present" fill="#10b981" name="Present" stackId="a" />
                <Bar dataKey="late" fill="#f59e0b" name="Late" stackId="a" />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" stackId="a" />
                <Bar dataKey="onLeave" fill="#8b5cf6" name="On Leave" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Workload & Capacity Utilization Chart */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-foreground">Department Workload Distribution</h3>
              <p className="text-xs text-muted-foreground">Completed vs in-progress vs blocked tasks</p>
            </div>
            <Badge variant="outline">All 5 Departments</Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptWorkloads} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="department" fontSize={10} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', fontSize: '11px', border: '1px solid #27272a' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="completedTasks" fill="#10b981" name="Completed" />
                <Bar dataKey="inProgressTasks" fill="#3b82f6" name="In Progress" />
                <Bar dataKey="blockedTasks" fill="#ef4444" name="Blocked" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Blocker Resolution & SLA Metrics Table */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <AlertOctagon className="h-4 w-4 text-rose-500" />
              Blocker Resolution Velocity by Severity Tier
            </h3>
            <p className="text-xs text-muted-foreground">Mean Time to Resolution (MTTR) across team bottlenecks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
          {blockerMetrics.map((bm, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1 text-xs">
              <span className="font-bold text-foreground">{bm.severity} SEVERITY</span>
              <p className="text-xl font-black text-primary">{bm.avgHoursToResolve}h avg</p>
              <div className="flex justify-between text-muted-foreground pt-1 border-t border-border/40 text-[11px]">
                <span>{bm.openCount} Open</span>
                <span>{bm.resolvedCount} Resolved</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
