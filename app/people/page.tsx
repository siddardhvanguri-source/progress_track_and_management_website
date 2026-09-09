'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Progress } from '@/components/ui/Progress';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import {
  Users,
  Search,
  Filter,
  LayoutGrid,
  List,
  AlertOctagon,
  Calendar,
  Briefcase,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

import { RaiseComplaintModal } from '@/components/dashboard/RaiseComplaintModal';

export default function PeoplePage() {
  const { users, departments, tasks, blockers, setSelectedEmployee } = useStore();

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [complaintTarget, setComplaintTarget] = useState<(typeof users)[0] | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'WORKING':
      case 'PRESENT':
        return { variant: 'success' as const, label: 'Present' };
      case 'ON_LEAVE':
      case 'LEAVE_ON_DUTY':
        return { variant: 'duty' as const, label: 'Leave on Duty' };
      case 'ABSENT':
      case 'UNINFORMED_ABSENCE':
        return { variant: 'danger' as const, label: 'Uninformed Leave' };
      case 'REMOTE':
      case 'DEEP_WORK':
        return { variant: 'purple' as const, label: 'Deep Work' };
      case 'LATE':
        return { variant: 'warning' as const, label: 'Late' };
      default:
        return { variant: 'secondary' as const, label: status };
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        u.departmentName.toLowerCase().includes(search.toLowerCase());
      const matchDept = selectedDept === 'ALL' || u.departmentId === selectedDept;
      const matchStatus = selectedStatus === 'ALL' || u.attendanceStatus === selectedStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [users, search, selectedDept, selectedStatus]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Users className="h-6 w-6 text-primary" />
            People & Operations Directory
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time team presence, progress tracking, current priorities, and blocker status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold px-3 py-1">
            {filteredUsers.length} Employees
          </Badge>
          <div className="flex items-center rounded-lg border border-border/70 p-0.5 bg-card">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card p-3.5 rounded-2xl border border-border/80">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, role, department, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-muted/30 border border-input rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="h-8 px-2.5 text-xs rounded-xl bg-card border border-input text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="ALL">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-8 px-2.5 text-xs rounded-xl bg-card border border-input text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="WORKING">Working (Present)</option>
            <option value="ON_LEAVE">On Leave</option>
            <option value="LATE">Late</option>
            <option value="ABSENT">Absent</option>
          </select>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredUsers.map((emp) => {
            const empTasks = tasks.filter((t) => t.assigneeId === emp.id);
            const activeTask = empTasks.find((t) => t.status === 'IN_PROGRESS' || t.status === 'BLOCKED') || empTasks[0];
            const empBlockers = blockers.filter((b) => b.reporterId === emp.id && b.status !== 'RESOLVED');
            const avgProgress =
              empTasks.length > 0
                ? Math.round(empTasks.reduce((acc, t) => acc + t.progress, 0) / empTasks.length)
                : 0;

            return (
              <div
                key={emp.id}
                onClick={() => setSelectedEmployee(emp)}
                className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-200 cursor-pointer space-y-4 flex flex-col justify-between group"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={emp.name}
                      src={emp.avatarUrl}
                      size="md"
                      status={emp.attendanceStatus}
                    />
                    <div>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {emp.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground">{emp.jobTitle}</p>
                      <p className="text-[10px] text-muted-foreground/80 font-medium">
                        {emp.departmentName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Badge variant={getStatusBadge(emp.attendanceStatus).variant} className="text-[10px]">
                      {getStatusBadge(emp.attendanceStatus).label}
                    </Badge>
                    {(emp.attendanceStatus === 'ABSENT' || emp.attendanceStatus === 'UNINFORMED_ABSENCE') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setComplaintTarget(emp);
                        }}
                        className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer shadow-sm"
                      >
                        Raise Complaint
                      </button>
                    )}
                  </div>
                </div>

                {/* Current Project & Progress */}
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Current Work Progress
                    </span>
                    <span className="font-bold text-foreground">{avgProgress}%</span>
                  </div>
                  <Progress value={avgProgress} size="sm" />

                  {activeTask ? (
                    <div className="pt-1 space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">Active Task:</span>
                      <p className="font-semibold text-foreground text-xs line-clamp-1">{activeTask.title}</p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-muted-foreground italic pt-1">No active assigned task</p>
                  )}
                </div>

                {/* Footer Tag Ribbon */}
                <div className="flex items-center justify-between pt-1 border-t border-border/40 text-xs">
                  {empBlockers.length > 0 ? (
                    <Badge variant="danger" className="text-[10px] gap-1">
                      <AlertOctagon className="h-3 w-3" />
                      {empBlockers.length} Blocker Active
                    </Badge>
                  ) : (
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      {empTasks.filter((t) => t.status === 'COMPLETED').length} done
                    </span>
                  )}

                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatRelativeTime(emp.lastActiveAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/80 bg-muted/30 text-muted-foreground font-semibold">
                  <th className="p-3.5 pl-4">Employee</th>
                  <th className="p-3.5">Department & Team</th>
                  <th className="p-3.5">Attendance</th>
                  <th className="p-3.5">Current Project & Task</th>
                  <th className="p-3.5">Progress</th>
                  <th className="p-3.5">Blockers</th>
                  <th className="p-3.5 pr-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredUsers.map((emp) => {
                  const empTasks = tasks.filter((t) => t.assigneeId === emp.id);
                  const activeTask = empTasks.find((t) => t.status === 'IN_PROGRESS' || t.status === 'BLOCKED') || empTasks[0];
                  const empBlockers = blockers.filter((b) => b.reporterId === emp.id && b.status !== 'RESOLVED');
                  const avgProgress =
                    empTasks.length > 0
                      ? Math.round(empTasks.reduce((acc, t) => acc + t.progress, 0) / empTasks.length)
                      : 0;

                  return (
                    <tr
                      key={emp.id}
                      onClick={() => setSelectedEmployee(emp)}
                      className="hover:bg-accent/40 transition-colors cursor-pointer"
                    >
                      <td className="p-3.5 pl-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={emp.name} src={emp.avatarUrl} size="sm" status={emp.attendanceStatus} />
                          <div>
                            <p className="font-bold text-foreground">{emp.name}</p>
                            <p className="text-[11px] text-muted-foreground">{emp.jobTitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        {emp.departmentName}
                        <span className="block text-[10px] opacity-75">{emp.teamName}</span>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <Badge variant={getStatusBadge(emp.attendanceStatus).variant} className="text-[10px]">
                            {getStatusBadge(emp.attendanceStatus).label}
                          </Badge>
                          {(emp.attendanceStatus === 'ABSENT' || emp.attendanceStatus === 'UNINFORMED_ABSENCE') && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setComplaintTarget(emp);
                              }}
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
                            >
                              Complaint
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        {activeTask ? (
                          <div>
                            <p className="font-medium text-foreground truncate">{activeTask.title}</p>
                            <p className="text-[10px] text-muted-foreground">{activeTask.projectName}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic">No active task</span>
                        )}
                      </td>
                      <td className="p-3.5 w-32">
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-foreground">{avgProgress}%</span>
                          <Progress value={avgProgress} size="sm" />
                        </div>
                      </td>
                      <td className="p-3.5">
                        {empBlockers.length > 0 ? (
                          <Badge variant="danger" className="text-[10px]">
                            {empBlockers.length} Blocked
                          </Badge>
                        ) : (
                          <span className="text-[11px] text-emerald-500 font-medium">None</span>
                        )}
                      </td>
                      <td className="p-3.5 pr-4 text-right">
                        <Button size="sm" variant="ghost" className="h-7 text-xs">
                          View Profile →
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {complaintTarget && (
        <RaiseComplaintModal
          isOpen={!!complaintTarget}
          onClose={() => setComplaintTarget(null)}
          employeeName={complaintTarget.name}
          employeeId={complaintTarget.id}
        />
      )}
    </div>
  );
}
