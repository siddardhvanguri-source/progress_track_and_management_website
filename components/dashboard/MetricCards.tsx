'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import {
  Users,
  Calendar,
  AlertOctagon,
  Clock,
  AlertTriangle,
  FolderKanban,
  CalendarCheck,
  CalendarDays,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

export function MetricCards() {
  const { metrics, users } = useStore();

  const totalEmployees = users.length;
  const attendanceRate = Math.round(((metrics.workingCount + metrics.onLeaveCount) / totalEmployees) * 100);

  const cards = [
    {
      title: 'Employees Working',
      value: metrics.workingCount,
      total: `${totalEmployees} Total`,
      subtext: `${attendanceRate}% active presence today`,
      icon: Users,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      href: '/people',
      pulse: true,
    },
    {
      title: 'On Leave',
      value: metrics.onLeaveCount,
      total: `${metrics.pendingLeavesCount} pending`,
      subtext: 'Approved time off & WFH',
      icon: Calendar,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10 border-purple-500/20',
      href: '/leave',
    },
    {
      title: 'Absent / Unexcused',
      value: metrics.absentCount,
      total: `${metrics.lateCount} marked late`,
      subtext: 'Requires attendance triage',
      icon: Clock,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10 border-rose-500/20',
      href: '/meetings',
    },
    {
      title: 'Blocked Tasks',
      value: metrics.blockedTasksCount,
      total: 'Active Roadblocks',
      subtext: 'Impacting sprint velocity',
      icon: AlertOctagon,
      color: 'text-rose-500',
      bg: 'bg-rose-500/15 border-rose-500/30',
      href: '/blockers',
      highlight: true,
    },
    {
      title: 'Tasks At Risk',
      value: metrics.tasksAtRisk,
      total: 'Critical Priority',
      subtext: 'Approaching milestone SLA',
      icon: AlertTriangle,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10 border-amber-500/20',
      href: '/work',
    },
    {
      title: 'Pending Leave Approvals',
      value: metrics.pendingLeavesCount,
      total: 'Action required',
      subtext: 'Workload coverage mapped',
      icon: CalendarCheck,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 border-blue-500/20',
      href: '/leave',
    },
    {
      title: 'Upcoming Meetings',
      value: metrics.upcomingMeetingsCount,
      total: 'Today',
      subtext: 'Standups & design reviews',
      icon: CalendarDays,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      href: '/meetings',
    },
    {
      title: 'Pending Check-in Reviews',
      value: metrics.unreviewedCheckinsCount,
      total: 'Week 36',
      subtext: 'Weekly team reflections',
      icon: FolderKanban,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      href: '/checkins',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Link
            key={idx}
            href={card.href}
            className={`group relative rounded-2xl border p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01] bg-card text-card-foreground ${
              card.highlight ? 'border-rose-500/40 shadow-xs' : 'border-border/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">{card.title}</span>
              <div className={`p-2 rounded-xl border ${card.bg}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-foreground">{card.value}</span>
                {card.pulse && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
              <span className="text-[11px] font-medium text-muted-foreground">{card.total}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground/90 border-t border-border/40 pt-2">
              <span className="truncate">{card.subtext}</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary flex-shrink-0" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
