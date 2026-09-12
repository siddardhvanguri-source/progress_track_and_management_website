'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Activity,
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Target
} from 'lucide-react';
import Link from 'next/link';

interface DashboardAnalyticsDeckProps {
  activeHorizon: 'OPERATIONAL' | 'ANALYTICAL' | 'STRATEGIC' | 'ALL';
  setActiveHorizon: (horizon: 'OPERATIONAL' | 'ANALYTICAL' | 'STRATEGIC' | 'ALL') => void;
}

export function DashboardAnalyticsDeck({ activeHorizon, setActiveHorizon }: DashboardAnalyticsDeckProps) {
  const { tasks, projects, users, goals } = useStore();
  const [timeRange, setTimeRange] = useState<'WEEK' | 'SPRINT' | 'QUARTER'>('SPRINT');

  // 1. Sprint Velocity Data (Dynamic + Trend Projections)
  const completedTasksCount = tasks.filter((t) => t.status === 'COMPLETED').length;
  const inProgressCount = tasks.filter((t) => t.status === 'IN_PROGRESS').length;

  const velocityData = [
    { sprint: 'Sprint 34', completed: 14, planned: 18, velocity: 78 },
    { sprint: 'Sprint 35', completed: 18, planned: 20, velocity: 90 },
    { sprint: 'Sprint 36', completed: 22, planned: 24, velocity: 92 },
    { sprint: 'Sprint 37', completed: 28, planned: 30, velocity: 93 },
    { sprint: 'Sprint 38 (Current)', completed: completedTasksCount + 16, planned: tasks.length + 18, velocity: 88 },
  ];

  // 2. Project Health & Milestone Comparison Data
  const projectComparisonData = projects.map((p) => {
    const projTasks = tasks.filter((t) => t.projectId === p.id);
    return {
      name: p.name.replace('VEIXON ', ''),
      fullName: p.name,
      progress: p.progress,
      tasks: projTasks.length || 2,
      health: p.health,
      color: p.health === 'On Track' ? '#2962FF' : '#F59E0B',
    };
  });

  // 3. Team Attendance Distribution Donut Data
  const workingCount = users.filter((u) => u.attendanceStatus === 'WORKING' || u.attendanceStatus === 'REMOTE').length;
  const deepWorkCount = users.filter((u) => u.attendanceStatus === 'DEEP_WORK').length;
  const dutyLeaveCount = users.filter((u) => u.attendanceStatus === 'LEAVE_ON_DUTY' || u.attendanceStatus === 'ON_LEAVE').length;
  const absentCount = users.filter((u) => u.attendanceStatus === 'UNINFORMED_ABSENCE' || u.attendanceStatus === 'ABSENT').length;

  const attendanceDonutData = [
    { name: 'Present & Working', value: workingCount || 6, color: '#10B981' },
    { name: 'Deep Focus Mode', value: deepWorkCount || 2, color: '#8B5CF6' },
    { name: 'Duty Leave (On-Site)', value: dutyLeaveCount || 1, color: '#38BDF8' },
    { name: 'Uninformed Absence', value: absentCount || 1, color: '#F43F5E' },
  ];

  const totalPresence = Math.round(((workingCount + deepWorkCount + dutyLeaveCount) / (users.length || 10)) * 100);

  // Custom Chart Tooltip for Obsidian Theme
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-white/15 bg-[#0B0F19]/95 p-3 shadow-2xl backdrop-blur-md text-xs space-y-1">
          <p className="font-mono font-bold text-white mb-1">{label}</p>
          {payload.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-white/60">{item.name}:</span>
              <span className="font-mono font-bold text-white">{item.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* ─── CONTROLS: HORIZON SELECTOR & TIMEFRAME ────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl border border-white/10 bg-[#0B0F19]/80 backdrop-blur-md">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/5 overflow-x-auto">
          {(['ALL', 'OPERATIONAL', 'ANALYTICAL', 'STRATEGIC'] as const).map((horizon) => (
            <button
              key={horizon}
              onClick={() => setActiveHorizon(horizon)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeHorizon === horizon
                  ? 'bg-gradient-to-r from-[#2962FF] to-[#1E40AF] text-white shadow-md shadow-[#2962FF]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {horizon === 'ALL' ? '✦ ALL HORIZONS' : horizon}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-[11px] font-mono text-white/40">TIMEFRAME:</span>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/5 text-xs font-mono">
            {(['WEEK', 'SPRINT', 'QUARTER'] as const).map((tr) => (
              <button
                key={tr}
                onClick={() => setTimeRange(tr)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  timeRange === tr
                    ? 'bg-[#00E5FF]/20 text-[#00E5FF] font-bold border border-[#00E5FF]/30'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── VISUALIZATION GRID: ANALYTICAL & STRATEGIC INSIGHTS ─────── */}
      {(activeHorizon === 'ALL' || activeHorizon === 'ANALYTICAL' || activeHorizon === 'STRATEGIC') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chart 1: Sprint Velocity Area Trend (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-3 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#2962FF]/15 text-[#00E5FF] border border-[#2962FF]/25">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Sprint Velocity & Task Delivery Trend</h3>
                </div>
                <p className="text-xs text-[hsl(215_16%_65%)]">
                  Completed deliveries vs planned capacity over active 2-week sprint windows.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-mono font-black text-emerald-400">+18.4%</span>
                <p className="text-[10px] text-white/40 font-mono">Velocity acceleration</p>
              </div>
            </div>

            <div className="h-[220px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2962FF" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2962FF" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="plannedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="sprint" stroke="#64748B" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    name="Completed Tasks"
                    stroke="#2962FF"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#velocityGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="planned"
                    name="Planned Tasks"
                    stroke="#00E5FF"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#plannedGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Attendance & Presence Donut Gauge (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-3 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    <PieIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Squad Presence & Capacity</h3>
                </div>
                <p className="text-xs text-[hsl(215_16%_65%)]">Operational availability across 10 engineers.</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                {totalPresence}% Capacity
              </span>
            </div>

            <div className="h-[180px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {attendanceDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#0B0F19" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Donut Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-mono font-black text-white">{totalPresence}%</span>
                <span className="text-[10px] uppercase font-mono text-white/40">On Deck</span>
              </div>
            </div>

            {/* Micro Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-white/5">
              {attendanceDonutData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-white/60 truncate">{item.name}</span>
                  <span className="font-mono font-bold text-white ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chart 3: Project Progress Comparison (Shown in Analytical or Strategic) */}
      {(activeHorizon === 'ALL' || activeHorizon === 'ANALYTICAL' || activeHorizon === 'STRATEGIC') && (
        <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/25">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Flagship Initiatives Progress & Health Matrix</h3>
                <p className="text-xs text-[hsl(215_16%_65%)]">Direct comparison of completion ratios across key engineering programs.</p>
              </div>
            </div>
            <Link href="/projects" className="text-xs font-semibold text-[#00E5FF] hover:underline flex items-center gap-1">
              All Initiatives <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-[180px] w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#64748B" fontSize={10} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="progress" name="Progress %" radius={[6, 6, 0, 0]}>
                  {projectComparisonData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
