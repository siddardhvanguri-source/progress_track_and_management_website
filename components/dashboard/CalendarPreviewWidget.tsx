'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar as CalendarIcon, Clock, AlertTriangle, ArrowRight, Video, Flag, UserCheck, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface CalendarEventItem {
  id: string;
  time: string;
  title: string;
  type: 'MEETING' | 'LEAVE' | 'DEADLINE' | 'MILESTONE';
  participants?: string;
  conflict?: string;
  status?: string;
}

const upcomingEvents: CalendarEventItem[] = [
  {
    id: 'ev-1',
    time: '09:30 AM',
    title: 'Engineering Daily Standup & Blocker Triage',
    type: 'MEETING',
    participants: 'Engineering Core (14 attendees)',
    status: 'Scheduled',
  },
  {
    id: 'ev-2',
    time: '11:00 AM',
    title: 'Product & Design Spec Review — Release v2.4',
    type: 'MEETING',
    participants: 'Alex Rivera, Siddhardh, Marcus',
    status: 'Confirmed',
  },
  {
    id: 'ev-3',
    time: '02:30 PM',
    title: 'Enterprise Client Architecture Sync',
    type: 'MEETING',
    participants: 'Siddhardh, Vikram, SecOps Lead',
    status: 'External',
  },
  {
    id: 'ev-4',
    time: '04:00 PM',
    title: 'Design System Token Unification Review',
    type: 'MEETING',
    participants: 'Ananya Iyer, Siddharth Rao',
    status: 'Internal',
  },
  {
    id: 'ev-5',
    time: 'Friday, Sep 18',
    title: 'Project Phoenix API Integration Milestone',
    type: 'MILESTONE',
    conflict: 'Priya Patel (SecOps) is on Leave Sep 17–18. Potential scheduling conflict with key decryption handoff.',
  },
  {
    id: 'ev-6',
    time: 'Monday, Sep 21',
    title: 'Project Atlas Beta Candidate Soft-Launch',
    type: 'DEADLINE',
    participants: 'Backend & Platform Squad',
  },
];

export function CalendarPreviewWidget() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#00E5FF]" />
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            UPCOMING SCHEDULE & DEADLINES
          </h3>
          <span className="text-xs text-[hsl(215_16%_60%)] hidden sm:inline">
            Next 5–7 operational commitments
          </span>
        </div>
        <Link
          href="/calendar"
          className="text-xs font-semibold text-[#00E5FF] hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          Open Calendar <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {upcomingEvents.map((ev) => (
          <div
            key={ev.id}
            className={`p-3.5 rounded-xl border transition-all space-y-2.5 ${
              ev.conflict
                ? 'border-amber-500/40 bg-amber-500/[0.04]'
                : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[hsl(215_16%_70%)]">
                <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>{ev.time}</span>
              </div>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                  ev.type === 'MILESTONE'
                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                    : ev.type === 'DEADLINE'
                    ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    : 'bg-[#2962FF]/15 text-[#00E5FF] border border-[#2962FF]/30'
                }`}
              >
                {ev.type}
              </span>
            </div>

            <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
              {ev.title}
            </h4>

            {ev.participants && (
              <p className="text-[11px] text-[hsl(215_16%_60%)] line-clamp-1">
                {ev.participants}
              </p>
            )}

            {ev.conflict && (
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="leading-tight">{ev.conflict}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
