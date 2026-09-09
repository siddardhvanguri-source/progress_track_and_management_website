'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { formatDate } from '@/lib/utils';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  FolderKanban,
  Sparkles,
  Info,
} from 'lucide-react';
import { LogLeaveModal } from '@/components/saas/LogLeaveModal';

export default function CalendarPage() {
  const { leaves, users, approveLeave, rejectLeave, setSelectedLeave } = useStore();

  const [currentView, setCurrentView] = useState<'month' | 'week' | 'list'>('month');
  const [selectedTeam, setSelectedTeam] = useState<string>('ALL');
  const [selectedLeaveType, setSelectedLeaveType] = useState<string>('ALL');
  const [isLogLeaveOpen, setIsLogLeaveOpen] = useState(false);

  // Filter leaves based on selected team and leave type
  const filteredLeaves = leaves.filter((leave) => {
    const user = users.find((u) => u.id === leave.userId);
    const userDept = user?.departmentName || leave.departmentName;
    const matchesTeam =
      selectedTeam === 'ALL' ||
      userDept.toLowerCase().includes(selectedTeam.toLowerCase());
    const matchesType = selectedLeaveType === 'ALL' || leave.leaveType === selectedLeaveType;
    return matchesTeam && matchesType;
  });

  const pendingLeaves = filteredLeaves.filter((l) => l.status === 'PENDING_APPROVAL');
  const approvedLeaves = filteredLeaves.filter((l) => l.status === 'APPROVED');

  // Days in September 2026 (1 to 30)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  // Departments/Teams for filter
  const teams = [
    { label: 'All Teams', value: 'ALL' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Product', value: 'Product' },
    { label: 'Design', value: 'Design' },
    { label: 'Operations', value: 'Operations' },
  ];

  const leaveTypes = [
    { label: 'All Types', value: 'ALL' },
    { label: 'Annual / Vacation', value: 'ANNUAL' },
    { label: 'Sick Leave', value: 'SICK' },
    { label: 'Casual Off', value: 'CASUAL' },
    { label: 'Remote / WFH', value: 'WORK_FROM_HOME' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 py-2">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>Operations & Team Leave Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Interactive Leave Calendar
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Log time off, inspect team availability, manage backup coverage, and approve pending requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="md"
            variant="primary"
            onClick={() => setIsLogLeaveOpen(true)}
            className="gap-2 text-xs font-bold shadow-saas rounded-xl"
          >
            <Plus className="h-4 w-4" />
            <span>Log Team Leave</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">Total Logged</span>
          <p className="text-2xl font-black text-foreground mt-1">{leaves.length}</p>
          <span className="text-[11px] text-muted-foreground">Requests on record</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">Pending Approval</span>
          <p className="text-2xl font-black text-amber-500 mt-1">{pendingLeaves.length}</p>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Awaiting manager sign-off</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">Approved & Active</span>
          <p className="text-2xl font-black text-purple-500 mt-1">{approvedLeaves.length}</p>
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">Synced with calendar</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">Team Coverage</span>
          <p className="text-2xl font-black text-emerald-500 mt-1">96.4%</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Zero project blockers</span>
        </div>
      </div>

      {/* 3. Filter Bar & View Toggles */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-card">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-bold text-foreground">Filters:</span>
          </div>

          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            aria-label="Filter by Team"
            className="px-3 py-1.5 text-xs font-medium rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {teams.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <select
            value={selectedLeaveType}
            onChange={(e) => setSelectedLeaveType(e.target.value)}
            aria-label="Filter by Leave Type"
            className="px-3 py-1.5 text-xs font-medium rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {leaveTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <div className="flex items-center rounded-xl border border-border/70 p-1 bg-muted/20">
            {(['month', 'week', 'list'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-3 py-1 text-xs rounded-lg uppercase font-bold tracking-wider transition-all ${
                  currentView === view
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Calendar Month / List View */}
      {currentView === 'month' && (
        <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-card">
          {/* Calendar Header Month Title */}
          <div className="p-4 sm:p-6 border-b border-border/80 flex items-center justify-between bg-muted/10">
            <div className="flex items-center gap-3">
              <h2 className="text-lg sm:text-xl font-black text-foreground">September 2026</h2>
              <Badge variant="purple">Q3 Sprint</Badge>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-500" /> Approved
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Pending
              </span>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-border/80 bg-muted/20 text-center text-xs font-bold py-3 text-muted-foreground">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Grid Cells */}
          <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-border/60">
            {/* September 2026 starts on Tuesday (2 empty leading days) */}
            <div className="min-h-[110px] p-2 bg-muted/5 opacity-40" />
            <div className="min-h-[110px] p-2 bg-muted/5 opacity-40" />

            {daysInMonth.map((day) => {
              const isToday = day === 8;

              // Find leaves that fall on this day
              const dayLeaves = filteredLeaves.filter((l) => {
                const s = new Date(l.startDate).getDate();
                const e = new Date(l.endDate).getDate();
                return day >= s && day <= e;
              });

              return (
                <div
                  key={day}
                  className={`min-h-[110px] p-2 transition-colors space-y-1.5 ${
                    isToday ? 'bg-primary/5 ring-2 ring-inset ring-primary/40' : 'hover:bg-accent/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isToday ? 'bg-primary text-white shadow-xs' : 'text-foreground'
                      }`}
                    >
                      {day}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-extrabold text-primary uppercase tracking-wider">
                        Today
                      </span>
                    )}
                  </div>

                  {/* Day Leave Tags */}
                  <div className="space-y-1">
                    {dayLeaves.map((lev) => (
                      <div
                        key={lev.id}
                        onClick={() => setSelectedLeave(lev)}
                        className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold truncate cursor-pointer transition-all ${
                          lev.status === 'APPROVED'
                            ? 'bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/25'
                            : 'bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25'
                        }`}
                        title={`${lev.userName}: ${lev.leaveType} (${lev.reason})`}
                      >
                        {lev.userName.split(' ')[0]}: {lev.leaveType}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List / Request Management View */}
      {(currentView === 'list' || currentView === 'week') && (
        <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <h3 className="text-base font-bold text-foreground">
              All Leave Records & Requests ({filteredLeaves.length})
            </h3>
            <span className="text-xs text-muted-foreground">Click any record to inspect or manage</span>
          </div>

          <div className="divide-y divide-border/60">
            {filteredLeaves.map((lev) => (
              <div
                key={lev.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-accent/20 px-3 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={lev.userName} src={lev.userAvatar} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-foreground">{lev.userName}</h4>
                      <Badge
                        variant={lev.status === 'APPROVED' ? 'success' : 'purple'}
                        className="text-[10px]"
                      >
                        {lev.leaveType}
                      </Badge>
                      <Badge
                        variant={lev.status === 'APPROVED' ? 'outline' : 'warning'}
                        className="text-[10px]"
                      >
                        {lev.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lev.userJobTitle} • {formatDate(lev.startDate)} to {formatDate(lev.endDate)} ({lev.totalDays} days)
                    </p>
                    <p className="text-xs text-foreground/80 mt-1 italic">
                      "{lev.reason}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  {lev.status === 'PENDING_APPROVAL' && (
                    <>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => approveLeave(lev.id)}
                        className="gap-1 text-xs font-bold"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rejectLeave(lev.id)}
                        className="gap-1 text-xs text-destructive hover:bg-destructive/10"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Decline
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedLeave(lev)}
                    className="text-xs"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log Leave Modal */}
      <LogLeaveModal isOpen={isLogLeaveOpen} onClose={() => setIsLogLeaveOpen(false)} />
    </div>
  );
}
