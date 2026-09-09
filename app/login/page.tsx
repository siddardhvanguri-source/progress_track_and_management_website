'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Zap,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronLeft,
  Shield,
  CheckCircle2,
  AlertCircle,
  Building2,
  UserCheck,
  Briefcase
} from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    id: 'usr-1',
    name: 'V S Sai Siddardh',
    email: 'siddhardh@veixon.tech',
    role: 'DIRECTOR',
    jobTitle: 'Co-founder & Director',
    dept: 'Executive Leadership',
    avatarUrl: 'https://www.veixon.com/team/siddardha.png',
    initials: 'VS',
    color: 'bg-[#2962FF]',
    border: 'border-[#2962FF]/40',
    bg: 'bg-[#2962FF]/10',
    badge: 'bg-[#2962FF]/20 text-[#00E5FF]',
    desc: 'Director Operations: Full visibility, exception triage, and cross-team velocity.',
  },
  {
    id: 'usr-2',
    name: 'Abhinav Rishi',
    email: 'abhinav@veixon.tech',
    role: 'ADMIN',
    jobTitle: 'Founder & CEO',
    dept: 'Executive Leadership',
    avatarUrl: 'https://www.veixon.com/team/Abhinav.png',
    initials: 'AR',
    color: 'bg-purple-500',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    badge: 'bg-purple-500/15 text-purple-300',
    desc: 'Executive Admin: Company vision, strategy, and organization governance.',
  },
  {
    id: 'usr-3',
    name: 'Shlok Karn',
    email: 'shlok@veixon.tech',
    role: 'MANAGER',
    jobTitle: 'Co-founder & CTO',
    dept: 'Engineering',
    avatarUrl: 'https://www.veixon.com/team/shlok.jpeg',
    initials: 'SK',
    color: 'bg-amber-500',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    badge: 'bg-amber-500/15 text-amber-300',
    desc: 'Engineering Manager: Team oversight, architecture reviews, and blockers.',
  },
  {
    id: 'usr-5',
    name: 'Arjun J',
    email: 'arjun.j@veixon.tech',
    role: 'EMPLOYEE',
    jobTitle: 'Software Engineer',
    dept: 'Engineering Core',
    avatarUrl: 'https://www.veixon.com/team/ARJUN.png',
    initials: 'AJ',
    color: 'bg-emerald-500',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    badge: 'bg-emerald-500/15 text-emerald-300',
    desc: 'Employee Portal: 1-minute daily sprint updates, active tasks & duty leave.',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('siddhardh@veixon.tech');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [statusText, setStatusText] = useState<string>('Signing in...');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e?: React.FormEvent, customUserId?: string) => {
    if (e) e.preventDefault();
    const loadingKey = customUserId || 'form';
    setLoading(loadingKey);
    setStatusText('Authenticating...');
    setError(null);

    try {
      const payload = customUserId ? { userId: customUserId } : { email, password };
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to sign in');

      setStatusText('Entering VEIXON...');
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 350);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080E] text-white flex">
      {/* Left panel — VEIXON Command Center Brand */}
      <div className="hidden lg:flex lg:w-[460px] xl:w-[520px] flex-col justify-between p-12 bg-[#0A0D15] border-r border-white/10 relative overflow-hidden shrink-0">
        {/* Subtle Brand Glows */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#2962FF]/15 blur-[90px] pointer-events-none" />
        <div className="absolute top-1/4 -right-12 w-64 h-64 rounded-full bg-[#00E5FF]/10 blur-[80px] pointer-events-none" />

        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2962FF] to-[#00E5FF] flex items-center justify-center shadow-lg shadow-[#2962FF]/30 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-white tracking-wider">VEIXON</span>
                <span className="text-[10px] font-mono text-[#00E5FF] font-semibold bg-[#00E5FF]/10 px-1.5 py-0.5 rounded border border-[#00E5FF]/20">
                  TECH
                </span>
              </div>
              <div className="text-[10px] text-[hsl(215_12%_55%)] mt-0.5 font-mono tracking-widest uppercase">
                INTERNAL COMMAND CENTER
              </div>
            </div>
          </Link>
        </div>

        {/* Center content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-white leading-tight tracking-tight">
              Your view of everything moving inside{' '}
              <span className="bg-gradient-to-r from-white via-[#00E5FF] to-[#2962FF] bg-clip-text text-transparent">
                VEIXON.
              </span>
            </h2>
            <p className="text-[hsl(215_16%_65%)] text-sm leading-relaxed">
              Real-time exception alerts, project velocity, and attendance triage without cognitive clutter.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs text-white/80">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Green: Present & Active</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span>Light Blue: Leave on Duty (Informed)</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Red: Leave without Informing (Complaint Actionable)</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              <span>Purple: Deep Work Focus</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-white/40">
          <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
          SECURE · PRIVATE · INTERNAL COMMAND CENTER
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8 self-start">
          <Link href="/" className="flex items-center gap-2 text-[hsl(215_16%_60%)] hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2962FF] to-[#00E5FF] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-sm font-black text-white">VEIXON Command Center</span>
          </Link>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tight">Access Command Center</h1>
            <p className="text-xs sm:text-sm text-[hsl(215_16%_65%)]">
              Enter your VEIXON credentials or select an operational role below.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[hsl(215_16%_75%)]">Work Email / User ID</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="siddhardh@veixon.tech"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#2962FF] focus:ring-1 focus:ring-[#2962FF]/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[hsl(215_16%_75%)]">Password</label>
                <span className="text-[11px] text-white/40">Demo: password123</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#2962FF] focus:ring-1 focus:ring-[#2962FF]/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!!loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#2962FF] hover:bg-[#1A4FD9] disabled:opacity-60 transition-all shadow-lg shadow-[#2962FF]/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading === 'form' ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  {statusText}
                </span>
              ) : (
                <>
                  Sign In to Command Center
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Operational Roles */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                OR 1-CLICK DEMO ACCESS
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-2.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleLogin(undefined, acc.id)}
                  disabled={!!loading}
                  className={`w-full text-left p-3.5 rounded-xl border ${acc.border} ${acc.bg} hover:bg-white/10 transition-all group flex items-center justify-between cursor-pointer`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full ${acc.color} flex items-center justify-center text-xs font-black text-white shrink-0`}
                    >
                      {acc.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors truncate">
                          {acc.name}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold uppercase ${acc.badge}`}>
                          {acc.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/50 truncate mt-0.5">{acc.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
