'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar as CalendarIcon, Clock, AlertTriangle, ArrowRight, Video, Flag } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';

export function CalendarPreviewWidget() {
  const { meetings, projects, leaves } = useStore();

  const activeMeetings = meetings.slice(0, 4).map((m) => ({
    id: m.id,
    time: new Date(m.scheduledAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    title: m.title,
    type: 'MEETING' as const,
    participants: `${m.organizerName} & ${m.attendances.length} attendees`,
    conflict: undefined,
  }));

  const upcomingMilestones = projects.slice(0, 2).map((p) => {
    const milestone = p.milestones[0];
    const leaveOverlap = leaves.find((l) => l.status === 'APPROVED');
    return {
      id: `ms-${p.id}`,
      time: formatDate(milestone?.dueDate || p.targetDate, 'EEEE, MMM d'),
      title: `${p.name}: ${milestone?.title || 'Milestone Delivery'}`,
      type: 'MILESTONE' as const,
      participants: `Project Lead: ${p.leadName}`,
      conflict: p.health === 'At Risk' ? `Project flagged At Risk. Requires architectural review prior to release.` : undefined,
    };
  });

  const combinedEvents = [...activeMeetings, ...upcomingMilestones].slice(0, 6);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#00E5FF]" />
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            UPCOMING SCHEDULE & DEADLINES
          </h3>
          <span className="text-xs text-[hsl(215_16%_60%)] hidden sm:inline">
            Active operational commitments & milestone targets
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
        {combinedEvents.map((ev) => (
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
