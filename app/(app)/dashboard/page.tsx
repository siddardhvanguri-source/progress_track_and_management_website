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
  AlertTriangle,
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
  FileCheck
} from 'lucide-react';

export default function DashboardPage() {
  const { currentUser, currentRole, users, tasks, projects } = useStore();
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('07:32 PM');

  // 1-minute employee daily checkin state
  const [employeeTaskProgress, setEmployeeTaskProgress] = useState(72);
  const [employeeIsBlocked, setEmployeeIsBlocked] = useState(true);
  const [employeeHelpNote, setEmployeeHelpNote] = useState('Waiting on AWS KMS IAM decryption policy for Stripe webhooks.');
  const [checkinSaved, setCheckinSaved] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const isEmployee = currentRole === 'EMPLOYEE';
  // Personal salutation strictly resolving to Siddhardh for the Director
  const displayName = currentUser.name.toLowerCase().includes('siddardh') || currentUser.name.toLowerCase().includes('sai')
    ? 'Siddhardh'
    : (currentUser.name.split(' ')[0] || 'Siddhardh');

  const handleEmployeeCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckinSaved(true);
    setTimeout(() => setCheckinSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1550px] mx-auto text-white">
      {/* ─── 1. TOP HEADER ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2962FF]/15 border border-[#2962FF]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-[10px] font-mono text-[#00E5FF] tracking-wider uppercase font-semibold">
                VEIXON // {isEmployee ? 'EMPLOYEE PORTAL' : 'COMMAND CENTER'}
              </span>
            </div>
            <span className="text-xs font-mono text-white/40">
              Wednesday, September 9 · {currentTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Good morning, {displayName}.
          </h1>
          <p className="text-xs sm:text-sm text-[hsl(215_16%_65%)]">
            {isEmployee
              ? 'Here is your daily work sprint, upcoming standup, and 1-minute update.'
              : "Here's what needs your attention across VEIXON right now."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {!isEmployee && (
            <button
              onClick={() => setIsComplaintOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/10 border border-rose-500/25 hover:bg-rose-500/20 transition-all cursor-pointer"
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              Raise Complaint
            </button>
          )}
          <button
            onClick={() => setIsLeaveOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            Duty Leave
          </button>
          <button
            onClick={() => setIsNewTaskOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#2962FF] hover:bg-[#1A4FD9] transition-all shadow-md shadow-[#2962FF]/25 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            New Task
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          EMPLOYEE SELF-SERVICE VIEW (IF LOGGED IN AS EMPLOYEE)
      ─────────────────────────────────────────────────────────────── */}
      {isEmployee ? (
        <div className="space-y-6">
          {/* Employee 1-Minute Daily Update Card */}
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
                  Payment API Integration & Stripe Webhooks (Project Phoenix)
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
                    Yes (Blocked)
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
                  placeholder="e.g. Waiting on API credentials or QA sign-off"
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

          {/* Employee Today Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-white/10 bg-[#0B0F19] space-y-2">
              <span className="text-[10px] font-mono uppercase text-white/40 font-semibold">TODAY AT A GLANCE</span>
              <div className="text-xl font-black text-white">Engineering Standup</div>
              <p className="text-xs text-white/60">Scheduled: 10:00 AM · Google Meet</p>
              <div className="pt-2">
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                  Status: Marked Absent (Explanation Needed)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-[#0B0F19] space-y-2">
              <span className="text-[10px] font-mono uppercase text-white/40 font-semibold">MY ACTIVE WORK</span>
              <div className="text-xl font-black text-white">Project Phoenix</div>
              <p className="text-xs text-white/60">3 assigned tasks · 1 blocked</p>
              <Link href="/work" className="text-xs text-[#00E5FF] font-semibold hover:underline inline-flex items-center gap-1 pt-1">
                Open Kanban Board <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-[#0B0F19] space-y-2">
              <span className="text-[10px] font-mono uppercase text-white/40 font-semibold">LEAVE & DUTY</span>
              <div className="text-xl font-black text-white">12 Days Available</div>
              <p className="text-xs text-white/60">Casual & Duty leave balance active</p>
              <button
                onClick={() => setIsLeaveOpen(true)}
                className="text-xs text-sky-400 font-semibold hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
              >
                Log Duty Leave <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ───────────────────────────────────────────────────────────
            DIRECTOR COMMAND CENTER VIEW
            Order per Spec:
            1. ATTENTION REQUIRED
            2. TODAY
            3. WHAT CHANGED
            4. PROJECT / WORK HEALTH
            5. CALENDAR PREVIEW
            6. RECENT ACTIVITY
            7. LIVE OPERATIONS PULSE
        ──────────────────────────────────────────────────────────── */
        <div className="space-y-6">
          {/* ── 1. WHAT NEEDS MY ATTENTION? (Exceptions First) ──────── */}
          <section className="space-y-3">
            <AttentionRequired />
          </section>

          {/* ── 2. TODAY (Clickable Core Overview + Semantic Colors) ── */}
          <section className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#0B0F19] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  TODAY AT VEIXON
                </h3>
              </div>
              <span className="text-xs text-[hsl(215_16%_60%)]">
                Click any metric to drill down
              </span>
            </div>

            {/* Clickable Section 36 Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <Link
                href="/meetings"
                className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#2962FF]/50 transition-all space-y-1 block group"
              >
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-semibold group-hover:text-white">Meetings</span>
                  <Users className="w-3.5 h-3.5 text-[#00E5FF]" />
                </div>
                <div className="text-2xl font-black text-white">4</div>
                <p className="text-[10px] text-white/40">2 upcoming today</p>
              </Link>

              <Link
                href="/work"
                className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-amber-500/50 transition-all space-y-1 block group"
              >
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-semibold group-hover:text-white">Tasks Due</span>
                  <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white">7</div>
                <p className="text-[10px] text-white/40">Before 06:00 PM</p>
              </Link>

              <Link
                href="/calendar"
                className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-purple-500/50 transition-all space-y-1 block group"
              >
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-semibold group-hover:text-white">Deadlines</span>
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="text-2xl font-black text-white">2</div>
                <p className="text-[10px] text-white/40">Milestones this week</p>
              </Link>

              <Link
                href="/people"
                className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-sky-500/50 transition-all space-y-1 block group"
              >
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-semibold group-hover:text-white">People Away</span>
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <div className="text-2xl font-black text-white">2</div>
                <p className="text-[10px] text-white/40">1 Duty / 1 Leave</p>
              </Link>

              <Link
                href="/leave"
                className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-emerald-500/50 transition-all space-y-1 block group col-span-2 sm:col-span-1"
              >
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-semibold group-hover:text-white">Pending Approvals</span>
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white">3</div>
                <p className="text-[10px] text-emerald-400 font-medium">Awaiting your sign-off</p>
              </Link>
            </div>

            {/* Semantic Colors Attendance Strip */}
            <div className="pt-2 border-t border-white/5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Green: Present */}
                <div className="p-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Present
                  </div>
                  <div className="text-xl font-black text-white">34</div>
                  <p className="text-[10px] text-white/50">Active & working</p>
                </div>

                {/* Light Blue: Leave on Duty */}
                <div className="p-3 rounded-xl border border-sky-400/30 bg-sky-400/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-sky-400 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    Leave on Duty
                  </div>
                  <div className="text-xl font-black text-white">3</div>
                  <p className="text-[10px] text-white/50">Informed duty / on-site</p>
                </div>

                {/* Red: Leave without Informing */}
                <div className="p-3 rounded-xl border border-rose-500/40 bg-rose-500/10 space-y-1 relative group">
                  <div className="flex items-center gap-1.5 text-rose-400 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    Uninformed Leave
                  </div>
                  <div className="text-xl font-black text-rose-300">1</div>
                  <button
                    onClick={() => setIsComplaintOpen(true)}
                    className="text-[10px] text-rose-200 font-bold hover:underline block pt-0.5 cursor-pointer"
                  >
                    Raise Complaint →
                  </button>
                </div>

                {/* Purple: Deep Work */}
                <div className="p-3 rounded-xl border border-violet-500/25 bg-violet-500/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-violet-400 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-violet-500" />
                    Deep Work
                  </div>
                  <div className="text-xl font-black text-white">4</div>
                  <p className="text-[10px] text-white/50">Focus sprint mode</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. WHAT CHANGED (Section 37 Timeline) ───────────────── */}
          <section className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#0B0F19] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00E5FF]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  WHAT CHANGED WHILE YOU WERE AWAY
                </h3>
              </div>
              <span className="text-xs text-white/40 font-mono">Last visited: Today, 9:15 AM</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#00E5FF] font-bold">PHOENIX</span>
                  <span className="text-white/40">12m ago</span>
                </div>
                <p className="text-white font-medium">Progress 68% → 74%</p>
                <span className="text-[10px] text-emerald-400">+6% staging release</span>
              </div>

              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-rose-300 font-bold">BLOCKER</span>
                  <span className="text-white/40">32m ago</span>
                </div>
                <p className="text-white font-medium">Rahul reported blocker</p>
                <span className="text-[10px] text-rose-300/80">AWS KMS Key Policy</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-emerald-300 font-bold">TASKS</span>
                  <span className="text-white/40">1h ago</span>
                </div>
                <p className="text-white font-medium">4 tasks completed</p>
                <span className="text-[10px] text-emerald-300/80">Auth & Tokens</span>
              </div>

              <div className="p-3 rounded-xl bg-sky-400/10 border border-sky-400/30 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-sky-300 font-bold">DUTY LEAVE</span>
                  <span className="text-white/40">2h ago</span>
                </div>
                <p className="text-white font-medium">Ananya requested leave</p>
                <span className="text-[10px] text-sky-300/80">Field client duty</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-amber-300 font-bold">DEADLINE</span>
                  <span className="text-white/40">Yesterday</span>
                </div>
                <p className="text-white font-medium">Project deadline moved</p>
                <span className="text-[10px] text-amber-300/80">Atlas moved by +2 days</span>
              </div>
            </div>
          </section>

          {/* ── 4. PROJECT HEALTH & DRILL-DOWN ──────────────────────── */}
          <section className="space-y-3">
            <ProjectHealthWidget />
          </section>

          {/* ── 5. CALENDAR PREVIEW (Section 39) ────────────────────── */}
          <section className="space-y-3">
            <CalendarPreviewWidget />
          </section>

          {/* ── 6. RECENT ACTIVITY (Section 40) ─────────────────────── */}
          <section className="space-y-3">
            <RecentActivityWidget />
          </section>

          {/* ── 7. LIVE TEAM OPERATIONS PULSE ───────────────────────── */}
          <section className="space-y-3">
            <LiveTeamPulse />
          </section>
        </div>
      )}

      {/* Global Modals */}
      <NewTaskModal isOpen={isNewTaskOpen} onClose={() => setIsNewTaskOpen(false)} />
      <LeaveRequestModal isOpen={isLeaveOpen} onClose={() => setIsLeaveOpen(false)} />
      <RaiseComplaintModal
        isOpen={isComplaintOpen}
        onClose={() => setIsComplaintOpen(false)}
        employeeName="Rahul Sharma"
      />
    </div>
  );
}
