'use client';

import React from 'react';
import { Activity, CheckCircle2, AlertOctagon, UserPlus, GitCommit, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ActivityItem {
  id: string;
  timeAgo: string;
  actor: string;
  action: string;
  target: string;
  icon: React.ElementType;
  iconColor: string;
  badge?: string;
}

const recentActivities: ActivityItem[] = [
  {
    id: 'act-1',
    timeAgo: '12 min ago',
    actor: 'Rahul Sharma',
    action: 'merged PR #142 into staging, advancing',
    target: 'Project Phoenix to 74%',
    icon: GitCommit,
    iconColor: 'text-[#00E5FF]',
    badge: 'PHOENIX',
  },
  {
    id: 'act-2',
    timeAgo: '32 min ago',
    actor: 'Priya Patel',
    action: 'flagged dependency blocker',
    target: 'AWS KMS Key Access Policy Mismatch',
    icon: AlertOctagon,
    iconColor: 'text-rose-400',
    badge: 'CRITICAL',
  },
  {
    id: 'act-3',
    timeAgo: '1 hour ago',
    actor: 'Engineering Squad',
    action: 'closed 4 sprint tasks for sprint',
    target: 'Milestone: Core Authentication & Token Dispatch',
    icon: CheckCircle2,
    iconColor: 'text-emerald-400',
    badge: 'COMPLETED',
  },
  {
    id: 'act-4',
    timeAgo: '2 hours ago',
    actor: 'Ananya Iyer',
    action: 'submitted client on-site duty leave for',
    target: 'Design review with Enterprise Partner in Bangalore',
    icon: FileText,
    iconColor: 'text-sky-400',
    badge: 'DUTY LEAVE',
  },
  {
    id: 'act-5',
    timeAgo: 'Yesterday',
    actor: 'Sarah Jenkins',
    action: 'rescheduled project target date by 2 days for',
    target: 'Project Atlas Beta Release (to Sep 21)',
    icon: Activity,
    iconColor: 'text-amber-400',
    badge: 'SCHEDULE',
  },
];

export function RecentActivityWidget() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00E5FF]" />
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            MEANINGFUL RECENT ACTIVITY
          </h3>
          <span className="text-xs text-[hsl(215_16%_60%)] hidden sm:inline">
            Filtered operational state changes only
          </span>
        </div>
        <Link
          href="/audit"
          className="text-xs font-semibold text-[#00E5FF] hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          Audit Log <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-white/5">
        {recentActivities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 mt-0.5 flex-shrink-0">
                  <Icon className={`w-3.5 h-3.5 ${act.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[hsl(215_16%_80%)] leading-snug">
                    <strong className="text-white font-semibold">{act.actor}</strong>{' '}
                    <span>{act.action}</span>{' '}
                    <span className="text-[#00E5FF] font-medium">{act.target}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 text-[10px] font-mono">
                {act.badge && (
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                    {act.badge}
                  </span>
                )}
                <span className="text-white/40">{act.timeAgo}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
