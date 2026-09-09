'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  ArrowRight,
  Shield,
  Clock,
  Users,
  CheckSquare,
  AlertTriangle,
  Calendar,
  Layers,
  FolderKanban,
  CheckCircle2,
  AlertOctagon,
  Eye,
  ExternalLink,
  ChevronRight,
  Activity,
  FileText,
  Filter,
  Lock,
  MessageSquare
} from 'lucide-react';

export function LandingPageSections() {
  const [activeTab, setActiveTab] = useState<'all' | 'blockers' | 'leave'>('all');

  return (
    <div className="relative bg-[#06080E] text-white selection:bg-[#2962FF] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 01: HERO
      ─────────────────────────────────────────────────────────────── */}
      <section id="overview" className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient glow and subtle grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-[#2962FF]/15 via-[#00E5FF]/10 to-transparent blur-[140px] rounded-full" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#00E5FF] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            VEIXON COMMAND CENTER
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[1.05]">
            Run VEIXON with{' '}
            <span className="bg-gradient-to-r from-white via-[#00E5FF] to-[#2962FF] bg-clip-text text-transparent">
              clarity.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[hsl(215_16%_65%)] leading-relaxed font-normal">
            One operational view for projects, people, meetings, deadlines and everything that needs your attention.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/login"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-[#2962FF] hover:bg-[#1A4FD9] transition-all shadow-xl shadow-[#2962FF]/30 hover:shadow-[#2962FF]/50 hover:-translate-y-0.5 cursor-pointer"
            >
              Enter Command Center
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#the-problem"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[hsl(215_16%_65%)] bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              See how it works
            </a>
          </div>

          {/* Polished Dashboard Browser Preview Frame */}
          <div className="relative mt-12 pt-6 max-w-4xl mx-auto text-left">
            <div className="rounded-2xl border border-white/15 bg-[#0B0F19] backdrop-blur-2xl shadow-2xl shadow-black/90 overflow-hidden ring-1 ring-white/10">
              {/* Window Frame Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#080B13] border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-3 font-mono text-[10px] text-white/40 tracking-wider">
                    veixon.tech/command-center
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#00E5FF]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-ping" />
                  SYSTEM ACTIVE
                </div>
              </div>

              {/* Inside Mockup Content */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Director Salutation & Today Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Good morning, Siddhardh.
                    </h2>
                    <p className="text-xs text-[hsl(215_16%_60%)]">Here’s what needs your attention across VEIXON right now.</p>
                  </div>
                  <div className="flex items-center gap-2.5 text-[10px] font-mono flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/20">
                      34 Present
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-400/15 text-sky-400 font-semibold border border-sky-400/20">
                      3 On Duty
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 font-semibold border border-rose-500/20">
                      1 Uninformed
                    </span>
                    <span className="px-2 py-0.5 rounded bg-violet-500/15 text-violet-400 font-semibold border border-violet-500/20">
                      4 Deep Work
                    </span>
                  </div>
                </div>

                {/* ATTENTION REQUIRED (2 Exceptions Highlighted) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-white/50">
                    <span className="text-rose-400 flex items-center gap-1.5">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      ATTENTION REQUIRED (2 ISSUES)
                    </span>
                    <span>PROACTIVELY SURFACE ROADBLOCKS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Exception Card 1 */}
                    <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-white">Rahul Sharma</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold uppercase">
                          HIGH PRIORITY
                        </span>
                      </div>
                      <p className="text-white/80 leading-snug">Missed Engineering Daily Standup without leave submission.</p>
                      <div className="text-[11px] text-white/50 pt-1 border-t border-rose-500/20 flex items-center justify-between">
                        <span>Action: Review explanation or excuse</span>
                        <Link href="/login" className="text-rose-300 font-bold hover:underline">
                          Review →
                        </Link>
                      </div>
                    </div>

                    {/* Exception Card 2 */}
                    <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-white">Project Phoenix</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">
                          BLOCKED (52H)
                        </span>
                      </div>
                      <p className="text-white/80 leading-snug">AWS KMS Key Access Policy Mismatch on payment services.</p>
                      <div className="text-[11px] text-white/50 pt-1 border-t border-amber-500/20 flex items-center justify-between">
                        <span>Action: Coordinate with David Chen</span>
                        <Link href="/login" className="text-amber-300 font-bold hover:underline">
                          Triage →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Snapshot Bar */}
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 font-mono uppercase text-[10px]">PROJECT HEALTH:</span>
                    <span className="font-bold text-white">Project Phoenix</span>
                    <span className="text-[#00E5FF] font-bold">74%</span>
                    <span className="text-white/30">·</span>
                    <span className="text-emerald-400 font-medium">On Track</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/50">Deadline: Sep 18</span>
                  </div>
                  <div className="text-white/40 text-[11px]">2 Meetings Today · 7 Tasks Due</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02: THE PROBLEM
      ─────────────────────────────────────────────────────────────── */}
      <section id="the-problem" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#080B13]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
            THE REALITY
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Too much is happening across too many places.
          </h2>
          <p className="text-base sm:text-lg text-[hsl(215_16%_65%)] leading-relaxed">
            The problem is not lack of information. <span className="text-white font-semibold">The problem is lack of clarity.</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-left">
            {[
              { title: 'Projects', desc: 'Silos in tickets' },
              { title: 'Tasks', desc: 'Scattered ownership' },
              { title: 'Meetings', desc: 'Unclear attendance' },
              { title: 'Leave', desc: 'Overlapping absences' },
              { title: 'Deadlines', desc: 'Hidden slippages' },
              { title: 'Blockers', desc: 'Delayed escalation' },
              { title: 'People', desc: 'Disconnected updates' },
              { title: 'Decisions', desc: 'Waiting on answers' },
            ].map((silo) => (
              <div key={silo.title} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1">
                <p className="text-xs font-bold text-white">{silo.title}</p>
                <p className="text-[11px] text-white/50">{silo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03: THE COMMAND CENTER
      ─────────────────────────────────────────────────────────────── */}
      <section id="capabilities" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#06080E]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
              THE COMMAND CENTER
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              See what needs your attention first.
            </h2>
            <p className="text-sm sm:text-base text-[hsl(215_16%_65%)] max-w-xl mx-auto">
              Everything important. Nothing unnecessary. No endless graphs. No 20 KPI widgets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-5 rounded-2xl border border-white/10 bg-[#0B0F19] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Attention Required</h3>
              <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
                Exceptions, overdue tasks, unexcused absences, and blocked dependencies are surfaced immediately for action.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-[#0B0F19] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#2962FF]/20 text-[#00E5FF] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">What Changed</h3>
              <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
                Know what moved while you were away. Velocity changes, reported blockers, and newly completed tasks in one timeline.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-[#0B0F19] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Live Operations Pulse</h3>
              <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
                Quiet visibility into team presence: Green (Present), Light Blue (Duty Leave), Red (Uninformed Absence), Purple (Deep Work).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04: WHAT THE SYSTEM CONNECTS
      ─────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#080B13]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
            OPERATIONAL GRAPH
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Connected operational intelligence.
          </h2>
          <p className="text-base text-[hsl(215_16%_65%)]">
            These aren’t isolated databases. They represent a single, continuous stream of operational context:
          </p>

          {/* Visual flow */}
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0A0D15] flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
            <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white">PEOPLE</span>
            <span className="text-white/30">→</span>
            <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white">PROJECTS</span>
            <span className="text-white/30">→</span>
            <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white">TASKS</span>
            <span className="text-white/30">→</span>
            <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white">MEETINGS</span>
            <span className="text-white/30">→</span>
            <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white">DEADLINES</span>
            <span className="text-white/30">→</span>
            <span className="px-3 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">BLOCKERS</span>
            <span className="text-[#00E5FF]">→</span>
            <span className="px-4 py-2 rounded-xl bg-[#2962FF] text-white font-extrabold shadow-lg shadow-[#2962FF]/40">
              DECISIONS
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05: PROJECTS (LINEAR-STYLE PHILOSOPHY)
      ─────────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#06080E]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
              PROJECT INTELLIGENCE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Outcome-oriented project velocity.
            </h2>
            <p className="text-sm sm:text-base text-[hsl(215_16%_65%)] max-w-xl mx-auto">
              Progress, milestones, deadlines, and dependencies in one unified view.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#0B0F19] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-[#00E5FF] uppercase font-bold">PROJECT PHOENIX</span>
                <h3 className="text-xl font-bold text-white">Core Cloud Platform & Payment Infrastructure</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-white/50">Progress</span>
                  <div className="text-xl font-black text-white">74%</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                  ON TRACK
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-[10px] text-white/40 uppercase">Active Milestone</span>
                <p className="font-bold text-white">API Integration</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-[10px] text-white/40 uppercase">Target Deadline</span>
                <p className="font-bold text-white">18 September</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-[10px] text-white/40 uppercase">Project Owner</span>
                <p className="font-bold text-white">Rahul Sharma</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-[10px] text-white/40 uppercase">Task Breakdown</span>
                <p className="font-bold text-white">24 total · 17 done · 2 blocked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 06 & 07: PEOPLE & MEETINGS
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#080B13]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* People Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0D15] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="text-base font-bold text-white">Team Transparency</h3>
              </div>
              <span className="text-xs text-white/40 font-mono">32 Members</span>
            </div>
            <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
              Work context without surveillance. Understand active projects, current sprint tasks, and availability without keystroke logging.
            </p>
            <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Arjun J</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Present
                </span>
              </div>
              <p className="text-white/60">Software Engineer · Project Phoenix</p>
              <div className="pt-1 text-[11px] text-[#00E5FF]">Active: Stripe Webhook Decoupling (82% done)</div>
            </div>
          </div>

          {/* Meetings Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0D15] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#2962FF]" />
                <h3 className="text-base font-bold text-white">Meeting Intelligence</h3>
              </div>
              <span className="text-xs text-white/40 font-mono">Today's Schedule</span>
            </div>
            <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
              Meeting attendance provides operational context, not punishment. Understand who attended, who is on duty, and who missed.
            </p>
            <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">09:30 AM · Engineering Standup</span>
                <span className="text-white/50">12 Participants</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] pt-1">
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">10 Present</span>
                <span className="px-2 py-0.5 rounded bg-sky-400/15 text-sky-400 font-bold">1 On Duty</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 font-bold">1 Absent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 08 & 09: CALENDAR CONFLICTS & BLOCKERS
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#06080E]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-400" />
              <h3 className="text-base font-bold text-white">Calendar & Conflict Detection</h3>
            </div>
            <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
              Meetings, leave, deadlines, and milestones highlighted with automatic clash alerts.
            </p>
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-amber-300 font-bold">
                <span>Scheduling Conflict Warning</span>
                <span className="text-[10px] font-mono">ALERT</span>
              </div>
              <p className="text-white/80">
                Priya Patel is on leave (Sep 17–18), which overlaps with the Project Phoenix delivery deadline on Sep 18.
              </p>
            </div>
          </div>

          {/* Blockers Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-bold text-white">When Work Gets Stuck, Know Why</h3>
            </div>
            <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
              Blockers aren’t hidden in chat threads. Immediate root-cause clarity and cross-team dependencies.
            </p>
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">AWS KMS Key Access Policy</span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                  BLOCKED 52H
                </span>
              </div>
              <p className="text-white/70">Project: Phoenix · Owner: Priya Patel · Dependency: Security / DevOps</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 10 & 11: WHAT CHANGED & SIMPLE MANAGEMENT
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#080B13]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
            LEADERSHIP CLARITY
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            You shouldn’t have to live inside a management tool.
          </h2>
          <p className="text-base text-[hsl(215_16%_65%)] max-w-xl mx-auto">
            Open the Command Center. Understand what changed. Handle exceptions. Make decisions. Leave.
          </p>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0A0D15] grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-left">
            <div className="space-y-1">
              <span className="text-[10px] text-[#00E5FF] font-mono font-bold">12 MIN AGO</span>
              <p className="font-bold text-white">Project Phoenix 68% → 74%</p>
              <p className="text-[11px] text-white/50">Merged staging release v2.4</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-rose-400 font-mono font-bold">32 MIN AGO</span>
              <p className="font-bold text-white">Priya reported blocker</p>
              <p className="text-[11px] text-white/50">AWS KMS IAM policy</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-sky-400 font-mono font-bold">2H AGO</span>
              <p className="font-bold text-white">Ananya requested leave</p>
              <p className="text-[11px] text-white/50">Client field deployment</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-400 font-mono font-bold">1H AGO</span>
              <p className="font-bold text-white">4 tasks completed</p>
              <p className="text-[11px] text-white/50">Frontend Core squad</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 12: FINAL CTA
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#05070B] text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
          VEIXON.TECH
        </div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Run VEIXON with clarity.
        </h2>
        <p className="text-sm sm:text-base text-[hsl(215_16%_65%)] max-w-md mx-auto">
          Projects, people, meetings and progress — connected in one calm operational view.
        </p>
        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#2962FF] hover:bg-[#1A4FD9] transition-all shadow-xl shadow-[#2962FF]/35 hover:shadow-[#2962FF]/55 hover:-translate-y-0.5 cursor-pointer"
          >
            Enter Command Center
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 13: FOOTER
      ─────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#030509] py-12 px-4 sm:px-6 lg:px-8 text-xs text-white/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#2962FF] to-[#00E5FF] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-bold text-white">VEIXON Command Center</span>
            <span className="text-white/30">·</span>
            <span>Private Internal Operations</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/work" className="hover:text-white transition-colors">
              Projects & Work
            </Link>
            <Link href="/people" className="hover:text-white transition-colors">
              People
            </Link>
            <Link href="/calendar" className="hover:text-white transition-colors">
              Calendar
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
          </div>

          <div className="font-mono text-[11px] text-white/40">
            © {new Date().getFullYear()} VEIXON.Tech. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
