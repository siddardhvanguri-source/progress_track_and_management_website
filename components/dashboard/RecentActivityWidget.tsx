'use client';

import React from 'react';
import { Activity, CheckCircle2, AlertOctagon, GitCommit, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { formatRelativeTime } from '@/lib/utils';

export function RecentActivityWidget() {
  const { auditLogs } = useStore();

  const getActionIcon = (action: string) => {
    if (action.includes('BLOCKER')) {
      return { icon: AlertOctagon, color: 'text-rose-400', badge: 'BLOCKER' };
    }
    if (action.includes('STATUS') || action.includes('COMPLETED')) {
      return { icon: CheckCircle2, color: 'text-emerald-400', badge: 'PROGRESS' };
    }
    if (action.includes('LEAVE')) {
      return { icon: FileText, color: 'text-sky-400', badge: 'DUTY / LEAVE' };
    }
    return { icon: GitCommit, color: 'text-[#00E5FF]', badge: 'OPERATION' };
  };

  const displayLogs = auditLogs.slice(0, 6);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00E5FF]" />
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            MEANINGFUL RECENT ACTIVITY
          </h3>
          <span className="text-xs text-[hsl(215_16%_60%)] hidden sm:inline">
            Real-time operational state updates
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
        {displayLogs.map((log) => {
          const { icon: Icon, color, badge } = getActionIcon(log.action);
          return (
            <div key={log.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 mt-0.5 flex-shrink-0">
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[hsl(215_16%_80%)] leading-snug">
                    <strong className="text-white font-semibold">{log.actorName}</strong>{' '}
                    <span>{log.details.replace(log.actorName, '').trim()}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 text-[10px] font-mono">
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                  {badge}
                </span>
                <span className="text-white/40">{formatRelativeTime(log.timestamp)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
