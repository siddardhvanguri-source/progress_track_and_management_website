'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { LiveTeamPulse } from '@/components/dashboard/LiveTeamPulse';
import { AttentionRequired } from '@/components/dashboard/AttentionRequired';
import { ProjectHealthWidget } from '@/components/dashboard/ProjectHealthWidget';
import { CalendarPreviewWidget } from '@/components/dashboard/CalendarPreviewWidget';
import { RecentActivityWidget } from '@/components/dashboard/RecentActivityWidget';
import { RaiseComplaintModal } from '@/components/dashboard/RaiseComplaintModal';
import { NewTaskModal } from '@/components/work/NewTaskModal';
import { LeaveRequestModal } from '@/components/leave/LeaveRequestModal';
import {
  Plus,
  Calendar,
  CheckSquare,
  ArrowRight,
  Activity,
  Users,
  Clock,
  Zap,
  ChevronRight,
  AlertOctagon,
  CheckCircle2,
  Send,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Layers,
  Sparkles,
  ExternalLink,
  Flame,
  Radio
} from 'lucide-react';

export default function DashboardPage() {
  const { currentUser, currentRole, users, tasks, projects, meetings, leaves, blockers, auditLogs } = useStore();
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [complaintTarget, setComplaintTarget] = useState('Shivani');
  const [currentTime, setCurrentTime] = useState('10:00 AM');
  const [currentDate, setCurrentDate] = useState('Wednesday, September 12');

  // 1-minute employee daily checkin state
  const [employeeTaskProgress, setEmployeeTaskProgress] = useState(72);
  const [employeeIsBlocked, setEmployeeIsBlocked] = useState(false);
  const [employeeHelpNote, setEmployeeHelpNote] = useState('');
  const [checkinSaved, setCheckinSaved] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const isEmployee = currentRole === 'EMPLOYEE';
  const displayName = currentUser.name.toLowerCase().includes('siddardh') || currentUser.name.toLowerCase().includes('sai')
    ? 'Siddardh'
    : (currentUser.name.split(' ')[0] || 'Siddardh');

  const handleEmployeeCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckinSaved(true);
    setTimeout(() => setCheckinSaved(false), 3000);
  };

  const activeTasks = tasks.filter((t) => t.status !== 'COMPLETED');
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED');
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 100;
  const activeBlockersCount = blockers.filter((b) => b.status === 'OPEN' || b.status === 'IN_PROGRESS' || b.status === 'ACKNOWLEDGED').length;
  const onlineUsersCount = users.filter((u) => u.attendanceStatus === 'WORKING' || u.attendanceStatus === 'DEEP_WORK' || u.attendanceStatus === 'REMOTE').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto text-white">
      {/* ─── 1. TOP COMMAND HEADER ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#0B0F19] via-[#0E1424] to-[#0B0F19] p-6 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2962FF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#00E5FF]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2962FF]/15 border border-[#2962FF]/30 text-[#00E5FF]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">
                  VEIXON // {isEmployee ? 'OPERATIONS PORTAL' : 'CORE COMMAND OS'}
                </span>
              </div>
              <span className="text-xs font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                {currentDate} · {currentTime}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> 99.98% Systems SLA
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Good morning, {displayName}.
            </h1>
            <p className="text-xs sm:text-sm text-[hsl(215_16%_65%)] max-w-2xl">
              {isEmployee
                ? 'Your active sprint sprint tasks, upcoming engineering syncs, and 1-minute daily progress report.'
                : 'Executive telemetry, mission-critical initiatives, team presence matrix, and escalation overrides.'}
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            {!isEmployee && (
              <button
                onClick={() => {
                  setComplaintTarget(users.find((u) => u.attendanceStatus === 'UNINFORMED_ABSENCE' || u.attendanceStatus === 'ABSENT')?.name || 'Shivani');
                  setIsComplaintOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              >
                <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                Raise Escalation
              </button>
            )}
            <button
              onClick={() => setIsLeaveOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-white/90 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              Duty Leave
            </button>
            <button
              onClick={() => setIsNewTaskOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#2962FF] to-[#1E40AF] hover:from-[#1A4FD9] hover:to-[#172554] transition-all shadow-lg shadow-[#2962FF]/25 cursor-pointer hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* ─── 2. EXECUTIVE METRIC HUD (TOP ROW) ──────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Tasks & Sprint Velocity */}
        <Link
          href="/work"
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19]/90 hover:bg-[#0E1424] hover:border-[#2962FF]/50 p-4 sm:p-5 transition-all duration-200 block shadow-lg hover:shadow-[#2962FF]/10"
        >
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px] group-hover:text-white">Active Tasks</span>
            <div className="p-2 rounded-xl bg-[#2962FF]/10 border border-[#2962FF]/20 text-[#00E5FF] group-hover:scale-110 transition-transform">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{activeTasks.length}</span>
            <span className="text-xs text-white/50">/ {tasks.length} total</span>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] text-white/50 mb-1">
              <span>Velocity</span>
              <span className="font-mono font-bold text-emerald-400">{completionRate}% Completed</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#2962FF] to-emerald-400 rounded-full" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
        </Link>

        {/* Metric 2: Engineering Squad Presence */}
        <Link
          href="/people"
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19]/90 hover:bg-[#0E1424] hover:border-emerald-500/50 p-4 sm:p-5 transition-all duration-200 block shadow-lg hover:shadow-emerald-500/10"
        >
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px] group-hover:text-white">Team On Deck</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{onlineUsersCount}</span>
            <span className="text-xs text-white/50">/ {users.length} engineers</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {onlineUsersCount} Online
            </span>
            <span className="text-white/30">·</span>
            <span className="text-sky-400 font-medium">
              {users.filter(u => u.attendanceStatus === 'LEAVE_ON_DUTY').length} Duty
            </span>
            {users.filter(u => u.attendanceStatus === 'UNINFORMED_ABSENCE' || u.attendanceStatus === 'ABSENT').length > 0 && (
              <>
                <span className="text-white/30">·</span>
                <span className="text-rose-400 font-bold">
                  {users.filter(u => u.attendanceStatus === 'UNINFORMED_ABSENCE' || u.attendanceStatus === 'ABSENT').length} Away
                </span>
              </>
            )}
          </div>
        </Link>

        {/* Metric 3: Flagship Initiatives */}
        <Link
          href="/projects"
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19]/90 hover:bg-[#0E1424] hover:border-purple-500/50 p-4 sm:p-5 transition-all duration-200 block shadow-lg hover:shadow-purple-500/10"
        >
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px] group-hover:text-white">Active Projects</span>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{projects.length}</span>
            <span className="text-xs text-emerald-400 font-medium">
              {projects.filter(p => p.health === 'On Track').length} On Track
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-white/50">
            <span>Critical Blockers</span>
            <span className={`font-mono font-bold ${activeBlockersCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {activeBlockersCount > 0 ? `${activeBlockersCount} Active` : '0 Nominal'}
            </span>
          </div>
        </Link>

        {/* Metric 4: Operational Rhythm & Syncs */}
        <Link
          href="/meetings"
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19]/90 hover:bg-[#0E1424] hover:border-sky-500/50 p-4 sm:p-5 transition-all duration-200 block shadow-lg hover:shadow-sky-500/10"
        >
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px] group-hover:text-white">Standups & Syncs</span>
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
              <Radio className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{meetings.length}</span>
            <span className="text-xs text-white/50">Scheduled today</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-white/50">Next Meeting</span>
            <span className="text-[#00E5FF] font-semibold truncate max-w-[130px]">10:00 AM Sync</span>
          </div>
        </Link>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          EMPLOYEE SELF-SERVICE VIEW (IF LOGGED IN AS EMPLOYEE)
      ─────────────────────────────────────────────────────────────── */}
      {isEmployee ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#00E5FF] uppercase font-semibold">
                  1-MINUTE DAILY UPDATE
                </span>
                <h3 className="text-base font-bold text-white">Daily Progress Check-in</h3>
                <p className="text-xs text-[hsl(215_16%_65%)]">
                  Keep management informed in under 60 seconds without extra meetings.
                </p>
              </div>
              {checkinSaved && (
                <span className="text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved & Dispatched
                </span>
              )}
            </div>

            <form onSubmit={handleEmployeeCheckin} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-semibold text-white/70">What are you working on?</label>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium">
                  Stripe KMS Signing & Decision Engine v1.0 (VEIXON Decisions)
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-white/70">Progress</label>
                  <span className="font-mono text-[#00E5FF] font-bold">{employeeTaskProgress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={employeeTaskProgress}
                  onChange={(e) => setEmployeeTaskProgress(Number(e.target.value))}
                  className="w-full accent-[#2962FF] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-white/70">Blocked?</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEmployeeIsBlocked(true)}
                    className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                      employeeIsBlocked
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-white/5 text-white/50 border border-white/10'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmployeeIsBlocked(false)}
                    className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                      !employeeIsBlocked
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/5 text-white/50 border border-white/10'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <label className="font-semibold text-white/70">Blocker Reason or Need Help? (Optional)</label>
                <input
                  type="text"
                  value={employeeHelpNote}
                  onChange={(e) => setEmployeeHelpNote(e.target.value)}
                  placeholder="e.g. Waiting on AWS KMS IAM policy permissions"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#2962FF]"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#2962FF] hover:bg-[#1A4FD9] text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#2962FF]/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Save Daily Update
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────
            DIRECTOR / EXECUTIVE SPLIT COMMAND GRID (8 COLS / 4 COLS)
        ─────────────────────────────────────────────────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ═════════════════════════════════════════════════════════
              LEFT COLUMN: COMMAND STAGE (8 COLS)
          ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. ATTENTION & EXECUTIVE ACTION ITEMS */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    EXECUTIVE ATTENTION & OVERRIDES
                  </h2>
                </div>
                <span className="text-[11px] text-white/40 font-mono">Real-time anomaly triage</span>
              </div>
              <AttentionRequired />
            </section>

            {/* 2. LIVE TEAM PRESENCE & WORK SPECTRUM */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    LIVE TEAM OPERATIONS MATRIX
                  </h2>
                </div>
                <Link href="/people" className="text-xs font-semibold text-[#00E5FF] hover:underline flex items-center gap-1">
                  Directory ({users.length}) <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <LiveTeamPulse />
            </section>

            {/* 3. FLAGSHIP INITIATIVES & PROJECT HEALTH */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    PROJECT EXECUTION & HEALTH
                  </h2>
                </div>
                <Link href="/projects" className="text-xs font-semibold text-[#00E5FF] hover:underline flex items-center gap-1">
                  All Projects ({projects.length}) <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <ProjectHealthWidget />
            </section>
          </div>

          {/* ═════════════════════════════════════════════════════════
              RIGHT COLUMN: OPERATIONS RAIL (4 COLS)
          ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. EXECUTIVE QUICK LAUNCH HUB */}
            <section className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                  EXECUTIVE QUICK LAUNCH
                </h3>
                <span className="text-[10px] text-white/40 font-mono">Shortcuts</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/work"
                  className="p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#2962FF]/40 transition-all block group"
                >
                  <div className="text-[10px] font-mono text-[#00E5FF] mb-0.5">KANBAN</div>
                  <div className="font-bold text-white group-hover:text-[#00E5FF] transition-colors flex items-center justify-between">
                    <span>Work Board</span>
                    <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>

                <Link
                  href="/blockers"
                  className="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 hover:border-rose-500/40 transition-all block group"
                >
                  <div className="text-[10px] font-mono text-rose-400 mb-0.5">ESCALATIONS</div>
                  <div className="font-bold text-white group-hover:text-rose-300 transition-colors flex items-center justify-between">
                    <span>Blockers</span>
                    <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>

                <Link
                  href="/calendar"
                  className="p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-sky-500/40 transition-all block group"
                >
                  <div className="text-[10px] font-mono text-sky-400 mb-0.5">TIMELINE</div>
                  <div className="font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between">
                    <span>Calendar</span>
                    <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>

                <Link
                  href="/leave"
                  className="p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-emerald-500/40 transition-all block group"
                >
                  <div className="text-[10px] font-mono text-emerald-400 mb-0.5">APPROVALS</div>
                  <div className="font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                    <span>Duty Leaves</span>
                    <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              </div>
            </section>

            {/* 2. TODAY'S SCHEDULE & CALENDAR TIMELINE */}
            <section className="space-y-3">
              <CalendarPreviewWidget />
            </section>

            {/* 3. LIVE SYSTEM TELEMETRY & AUDIT STREAM */}
            <section className="space-y-3">
              <RecentActivityWidget />
            </section>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <NewTaskModal isOpen={isNewTaskOpen} onClose={() => setIsNewTaskOpen(false)} />
      <LeaveRequestModal isOpen={isLeaveOpen} onClose={() => setIsLeaveOpen(false)} />
      <RaiseComplaintModal
        isOpen={isComplaintOpen}
        onClose={() => setIsComplaintOpen(false)}
        employeeName={complaintTarget}
      />
    </div>
  );
}
