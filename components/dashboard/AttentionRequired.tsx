'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { AttentionItem } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import {
  AlertOctagon,
  AlertTriangle,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { BlockerResolveModal } from '@/components/blockers/BlockerResolveModal';
import { MeetingTriageModal } from '@/components/meetings/MeetingTriageModal';
import { RaiseComplaintModal } from './RaiseComplaintModal';

export function AttentionRequired() {
  const {
    attentionItems,
    setSelectedTask,
    setSelectedLeave,
    setSelectedEmployee,
    tasks,
    leaves,
    blockers,
  } = useStore();

  const [triageBlocker, setTriageBlocker] = useState<(typeof blockers)[0] | null>(null);
  const [triageMeetingAttendance, setTriageMeetingAttendance] = useState<any | null>(null);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [complaintTarget, setComplaintTarget] = useState('Rahul Sharma');

  const handleAction = (item: AttentionItem) => {
    switch (item.actionType) {
      case 'RESOLVE_BLOCKER': {
        const blk = blockers.find((b) => b.id === item.entityId);
        if (blk) setTriageBlocker(blk);
        break;
      }
      case 'REVIEW_MEETING': {
        if (item.issue.toLowerCase().includes('absent') || item.title.toLowerCase().includes('standup')) {
          setComplaintTarget(item.subjectName || 'Rahul Sharma');
          setIsComplaintOpen(true);
        } else if (item.relatedData?.attendance) {
          setTriageMeetingAttendance({
            ...item.relatedData.attendance,
            meetingTitle: item.relatedData.meeting?.title,
          });
        }
        break;
      }
      case 'REVIEW_LEAVE': {
        const lev = leaves.find((l) => l.id === item.entityId);
        if (lev) setSelectedLeave(lev);
        break;
      }
      case 'INSPECT_TASK': {
        const tsk = tasks.find((t) => t.id === item.entityId);
        if (tsk) setSelectedTask(tsk);
        break;
      }
      default:
        break;
    }
  };

  const getSeverityBadge = (sev: AttentionItem['severity']) => {
    switch (sev) {
      case 'CRITICAL':
        return (
          <Badge variant="danger" dot>
            CRITICAL SEVERITY
          </Badge>
        );
      case 'HIGH':
        return (
          <Badge variant="warning" dot>
            HIGH PRIORITY
          </Badge>
        );
      case 'MEDIUM':
        return (
          <Badge variant="info" dot>
            ATTENTION NEEDED
          </Badge>
        );
      default:
        return <Badge variant="secondary">INFORMATIONAL</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
          <h3 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
            ATTENTION REQUIRED
            <Badge variant="danger" className="text-[10px] px-2 py-0">
              {attentionItems.length} Issues
            </Badge>
          </h3>
        </div>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          Proactively triage operational roadblocks & absence escalations
        </span>
      </div>

      {/* Action Cards Grid */}
      {attentionItems.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-8 text-center space-y-2">
          <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
          <h4 className="font-bold text-sm text-white">Everything looks on track.</h4>
          <p className="text-xs text-[hsl(215_16%_65%)]">
            No unresolved blockers, unexcused absences, or critical deadline exceptions requiring Director attention right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attentionItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border bg-card p-5 shadow-xs transition-all duration-200 hover:shadow-md flex flex-col justify-between space-y-4 ${
                item.severity === 'CRITICAL'
                  ? 'border-rose-500/40 glow-border-red bg-rose-500/[0.02]'
                  : item.severity === 'HIGH'
                  ? 'border-amber-500/40 bg-amber-500/[0.02]'
                  : 'border-border/80'
              }`}
            >
              {/* Top metadata */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {item.subjectAvatar && (
                      <Avatar name={item.subjectName} src={item.subjectAvatar} size="xs" />
                    )}
                    <span className="text-xs font-bold text-foreground">{item.subjectName}</span>
                  </div>
                  {getSeverityBadge(item.severity)}
                </div>

                <h4 className="text-sm font-bold text-foreground leading-snug">{item.title}</h4>
              </div>

              {/* 3 Core Philosophical Questions: WHAT -> WHY -> ACTION */}
              <div className="space-y-2 rounded-xl border border-border/60 bg-muted/20 p-3 text-xs">
                {/* 1. What is happening? */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    1. What is happening?
                  </span>
                  <p className="font-medium text-foreground">{item.issue}</p>
                </div>

                {/* 2. Why is it happening? */}
                <div className="space-y-0.5 border-t border-border/40 pt-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    2. Why is it happening?
                  </span>
                  <p className="text-muted-foreground leading-relaxed">{item.rootCause}</p>
                </div>

                {/* 3. Recommended action */}
                <div className="space-y-0.5 border-t border-border/40 pt-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-mono">
                    3. Recommended Next Action:
                  </span>
                  <p className="font-semibold text-foreground">{item.recommendedAction}</p>
                </div>
              </div>

              {/* Card Footer with One-Click Action Button */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-muted-foreground">
                  Flagged {formatRelativeTime(item.timestamp)}
                </span>
                <Button
                  size="sm"
                  variant={item.severity === 'CRITICAL' ? 'danger' : 'primary'}
                  onClick={() => handleAction(item)}
                  className="gap-1.5 text-xs font-semibold"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals for Attention Actions */}
      <BlockerResolveModal
        blocker={triageBlocker}
        onClose={() => setTriageBlocker(null)}
      />
      <MeetingTriageModal
        attendance={triageMeetingAttendance}
        onClose={() => setTriageMeetingAttendance(null)}
      />
      <RaiseComplaintModal
        isOpen={isComplaintOpen}
        onClose={() => setIsComplaintOpen(false)}
        employeeName={complaintTarget}
      />
    </div>
  );
}
