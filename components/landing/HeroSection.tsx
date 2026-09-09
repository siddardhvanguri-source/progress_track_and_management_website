'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  Users,
  CheckSquare,
  Calendar,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Clock,
  Shield,
  MessageSquare,
  CheckCircle2,
  AlertOctagon,
  Eye,
  FileText,
  UserCheck,
  Building2,
  Search
} from 'lucide-react';

export function HeroSection() {
  const [selectedMeetingTab, setSelectedMeetingTab] = useState<'details' | 'complaint'>('details');
  const [complaintRaised, setComplaintRaised] = useState(false);

  return (
    <div className="relative overflow-hidden bg-[#06080E] text-white">
      {/* ── 1. HERO SECTION ───────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Subtle VEIXON Ambient Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#2962FF]/15 via-[#00E5FF]/10 to-transparent blur-[140px] rounded-full" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#00E5FF] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            VEIXON.TECH // INTERNAL COMMAND CENTER
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            One view of everything moving inside{' '}
            <span className="bg-gradient-to-r from-white via-[#00E5FF] to-[#2962FF] bg-clip-text text-transparent">
              VEIXON.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[hsl(215_16%_65%)] leading-relaxed font-normal">
            Projects, people, meetings and progress — organized into one calm command center.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/login"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-[#2962FF] hover:bg-[#1A4FD9] transition-all shadow-xl shadow-[#2962FF]/30 hover:shadow-[#2962FF]/50 hover:-translate-y-0.5"
            >
              Enter Portal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#why-it-exists"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[hsl(215_16%_65%)] bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
            >
              See how it works
            </a>
          </div>

          {/* Floating Miniature Command Center Mockup */}
          <div className="relative mt-12 pt-6 max-w-4xl mx-auto text-left">
            <div className="rounded-2xl border border-white/15 bg-[#0A0D15]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-white/10">
              {/* Window Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-2 font-mono text-[10px] text-white/40 tracking-wider">
                    VEIXON // COMMAND-CENTER // DIRECTOR-VIEW
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#00E5FF]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-ping" />
                  SYSTEM ACTIVE
                </div>
              </div>

              {/* Inside Mockup */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Director Salutation & Calm Headline */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Good morning, Siddhardh.</h2>
                    <p className="text-xs text-[hsl(215_16%_60%)]">Here is what needs your attention right now.</p>
                  </div>
                  {/* Semantic Color Legend */}
                  <div className="flex items-center gap-3 text-[10px] font-medium flex-wrap">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> 34 Present
                    </span>
                    <span className="flex items-center gap-1 text-sky-400">
                      <span className="w-2 h-2 rounded-full bg-sky-400" /> 3 Leave on Duty
                    </span>
                    <span className="flex items-center gap-1 text-rose-400">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> 1 Uninformed Absence
                    </span>
                    <span className="flex items-center gap-1 text-violet-400">
                      <span className="w-2 h-2 rounded-full bg-violet-500" /> 4 Deep Work
                    </span>
                  </div>
                </div>

                {/* WHAT NEEDS ATTENTION (Exception First) */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono tracking-wider text-rose-400 uppercase font-semibold flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    ATTENTION REQUIRED (2 EXCEPTIONS)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Exception 1: Red Uninformed Absence */}
                    <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                          <span className="text-xs font-bold text-rose-300">Rahul Sharma</span>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold uppercase">
                          Uninformed Absence
                        </span>
                      </div>
                      <p className="text-[11px] text-white/80 leading-relaxed">
                        Missed Engineering Standup (10:00 AM) without submission.
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-rose-400/80">Can raise formal complaint</span>
                        <Link
                          href="/login"
                          className="text-[10px] font-bold text-rose-200 hover:text-white bg-rose-500/25 hover:bg-rose-500/40 px-2 py-1 rounded transition-colors"
                        >
                          Raise Complaint →
                        </Link>
                      </div>
                    </div>

                    {/* Exception 2: Amber Blocker */}
                    <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-400" />
                          <span className="text-xs font-bold text-amber-300">Project Phoenix</span>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase">
                          Blocked Task
                        </span>
                      </div>
                      <p className="text-[11px] text-white/80 leading-relaxed">
                        Payment Gateway API integration blocked: Waiting on AWS KMS policy.
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-amber-400/80">Owner: Rahul (72% progress)</span>
                        <Link
                          href="/login"
                          className="text-[10px] font-bold text-amber-200 hover:text-white bg-amber-500/25 hover:bg-amber-500/40 px-2 py-1 rounded transition-colors"
                        >
                          View Why Blocked →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TODAY SNAPSHOT */}
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white/50 uppercase font-semibold">TODAY AT VEIXON:</span>
                    <span className="font-bold text-white">34 Present</span>
                    <span className="text-white/20">·</span>
                    <span className="font-bold text-sky-400">3 Leave on Duty</span>
                    <span className="text-white/20">·</span>
                    <span className="font-bold text-white">2 Meetings</span>
                    <span className="text-white/20">·</span>
                    <span className="font-bold text-white">7 Tasks Due</span>
                  </div>
                  <div className="text-[11px] text-[#00E5FF] font-medium flex items-center gap-1">
                    Project Phoenix: 74% Complete
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SECTION: WHY IT EXISTS ─────────────────────────────── */}
      <section id="why-it-exists" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#080B13]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
            WHY IT EXISTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Know what’s moving. Before you have to ask.
          </h2>
          <p className="text-base sm:text-lg text-[hsl(215_16%_65%)] leading-relaxed">
            Eliminates the endless daily chasing questions that drain leadership and management hours:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left">
            {[
              '“What are you working on?”',
              '“When will it be done?”',
              '“Why is this task delayed?”',
              '“Are you on leave today?”',
              '“Did you attend the standup?”',
              '“Who is available for deployment?”'
            ].map((question) => (
              <div
                key={question}
                className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white/70 italic line-through decoration-rose-500/80 decoration-2"
              >
                {question}
              </div>
            ))}
          </div>

          {/* Visual Progression */}
          <div className="mt-12 p-6 rounded-2xl border border-white/10 bg-[#0B0F1A] text-center space-y-4">
            <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
              OPERATIONAL PROGRESSION TO ONE COGNITIVE VIEW
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">Employee Updates</span>
              <span className="text-white/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">Projects</span>
              <span className="text-white/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">Tasks</span>
              <span className="text-white/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">Meetings</span>
              <span className="text-white/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">Calendar</span>
              <span className="text-[#00E5FF]">→</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-[#2962FF] text-white font-bold shadow-lg shadow-[#2962FF]/40">
                One Clear Command Center
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SECTION: THE COMMAND CENTER ────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#06080E]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
              THE COMMAND CENTER
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Everything important. Nothing unnecessary.
            </h2>
            <p className="text-sm sm:text-base text-[hsl(215_16%_65%)] max-w-xl mx-auto">
              No 20 confusing graphs. No noisy analytics. Normal operations remain quiet. Problems and decisions are surfaced instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Present (Green)</span>
              </div>
              <div className="text-2xl font-black text-white">34 Working</div>
              <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
                Active in workspace, engineering sprints, or review meetings. Normal status stays quiet.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-sky-400/30 bg-sky-400/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">Leave on Duty (Light Blue)</span>
              </div>
              <div className="text-2xl font-black text-white">3 On Duty</div>
              <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
                Client on-site or pre-informed field duty with verified task handover notes.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">Uninformed (Red)</span>
              </div>
              <div className="text-2xl font-black text-rose-300">1 Absent</div>
              <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
                Missed standup or shift without informing. Actionable: Director can immediately raise complaint.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-violet-500/20 bg-violet-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                <span className="text-[10px] font-mono uppercase text-violet-400 font-bold">Deep Work (Purple)</span>
              </div>
              <div className="text-2xl font-black text-white">4 Focus Mode</div>
              <p className="text-xs text-[hsl(215_16%_65%)] leading-relaxed">
                Deep architectural coding or security testing with distraction-free shield.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SECTION: WORK & BLOCKER DRILL-DOWN ─────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#080B13]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
              WORK INTELLIGENCE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Instant “Why?” drill-downs.
            </h2>
            <p className="text-sm sm:text-base text-[hsl(215_16%_65%)] max-w-xl mx-auto">
              Never guess why a deadline is at risk. Click any item to understand the exact root blocker and unblock your team immediately.
            </p>
          </div>

          {/* Interactive Card Demonstration */}
          <div className="rounded-2xl border border-white/15 bg-[#0B0F1A] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-[#00E5FF] uppercase font-semibold">PROJECT PHOENIX</span>
                <h3 className="text-xl font-bold text-white">Payment Integration & Microservices</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-white/50">Progress</span>
                  <div className="text-base font-black text-white">72%</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase">
                  BLOCKED
                </span>
              </div>
            </div>

            {/* Drilldown Drawer Simulation */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Why is this blocked?
                </span>
                <span className="text-white/40 font-mono">TASK-302</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] text-white/40 block uppercase">Task Owner</span>
                  <span className="font-bold text-white">Rahul Sharma</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] text-white/40 block uppercase">Root Blocker</span>
                  <span className="font-bold text-amber-300">AWS KMS Policy Credentials</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] text-white/40 block uppercase">Director Action</span>
                  <span className="font-bold text-[#00E5FF]">One-click approval</span>
                </div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                “Waiting for SecOps to generate IAM role and AWS KMS decryption key for testing Stripe webhooks on staging.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SECTION: MEETINGS ATTENDANCE & TRIAGE ──────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#06080E]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
              MEETINGS & ATTENDANCE TRIAGE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Respectful accountability without micromanagement.
            </h2>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#0B0F1A] p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2962FF]/20 border border-[#2962FF]/30 flex items-center justify-center text-[#00E5FF]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Engineering Standup</h3>
                  <p className="text-xs text-white/50">Today at 10:00 AM · 12 Participants</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">10 Attended</span>
                <span className="px-2 py-0.5 rounded bg-sky-400/20 text-sky-400 font-bold">1 On Duty</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">1 Absent</span>
              </div>
            </div>

            {/* The Absent Case */}
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                  <div>
                    <span className="text-sm font-bold text-white">Rahul Sharma</span>
                    <span className="text-xs text-rose-300 ml-2 font-mono">[UNEXCUSED ABSENCE]</span>
                  </div>
                </div>
                {complaintRaised ? (
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Complaint Logged to HR
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setComplaintRaised(true)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/30"
                    >
                      Raise Complaint
                    </button>
                    <Link
                      href="/login"
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
                    >
                      Request Explanation
                    </Link>
                  </div>
                )}
              </div>
              <p className="text-xs text-white/70">
                Status is highlighted in red because no prior duty leave was filed. The director can directly request an explanation or log a formal HR notice in one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FINAL MINIMAL CTA ──────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#05070B] text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
          VEIXON.TECH
        </div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Run VEIXON with clarity.
        </h2>
        <p className="text-sm sm:text-base text-[hsl(215_16%_65%)] max-w-md mx-auto">
          One calm command center for directors, managers, and engineers.
        </p>
        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#2962FF] hover:bg-[#1A4FD9] transition-all shadow-xl shadow-[#2962FF]/35 hover:shadow-[#2962FF]/55 hover:-translate-y-0.5"
          >
            Enter Portal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// Re-export FeaturesSection as an empty placeholder so any old imports won't break
export function FeaturesSection() {
  return null;
}
