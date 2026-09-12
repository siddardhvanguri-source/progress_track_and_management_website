'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { Activity, Users, ArrowRight, CheckCircle2, AlertOctagon, ShieldAlert, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { RaiseComplaintModal } from './RaiseComplaintModal';

export function LiveTeamPulse() {
  const { users, setSelectedEmployee } = useStore();
  const [complaintTarget, setComplaintTarget] = useState<(typeof users)[0] | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'WORKING':
      case 'PRESENT':
        return { variant: 'success' as const, label: 'Present', dotClass: 'bg-emerald-500' };
      case 'ON_LEAVE':
      case 'LEAVE_ON_DUTY':
        return { variant: 'duty' as const, label: 'Leave on Duty', dotClass: 'bg-sky-400' };
      case 'ABSENT':
      case 'UNINFORMED_ABSENCE':
        return { variant: 'danger' as const, label: 'Uninformed Leave', dotClass: 'bg-rose-500 animate-pulse' };
      case 'REMOTE':
      case 'DEEP_WORK':
        return { variant: 'purple' as const, label: 'Deep Work', dotClass: 'bg-violet-500' };
      case 'LATE':
        return { variant: 'warning' as const, label: 'Late', dotClass: 'bg-amber-400' };
      default:
        return { variant: 'secondary' as const, label: status, dotClass: 'bg-gray-400' };
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Presence & Operational Pulse
            </h3>
            <p className="text-xs text-[hsl(215_16%_60%)]">
              Real-time telemetry across engineering, leadership, design, and infrastructure squads.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/50">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Present</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-400" /> Duty</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500" /> Deep Work</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
          {users.map((u) => {
            const badgeInfo = getStatusBadge(u.attendanceStatus);
            const isUninformed = u.attendanceStatus === 'ABSENT' || u.attendanceStatus === 'UNINFORMED_ABSENCE';

            return (
              <div
                key={u.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-150 ${
                  isUninformed
                    ? 'border-rose-500/40 bg-rose-500/[0.08] hover:bg-rose-500/[0.12]'
                    : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06]'
                }`}
              >
                <div
                  onClick={() => setSelectedEmployee(u)}
                  className="flex items-center gap-3 min-w-0 cursor-pointer flex-1 mr-2"
                >
                  <Avatar name={u.name} src={u.avatarUrl} size="sm" status={u.attendanceStatus} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white hover:text-[#00E5FF] transition-colors truncate">
                      {u.name}
                    </p>
                    <p className="text-[11px] text-white/50 truncate">{u.jobTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {isUninformed ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setComplaintTarget(u);
                      }}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition-all cursor-pointer shadow-sm flex items-center gap-1"
                      title="Raise attendance escalation"
                    >
                      <AlertOctagon className="w-3 h-3" />
                      <span>Escalate</span>
                    </button>
                  ) : (
                    <Badge variant={badgeInfo.variant} className="text-[10px] font-semibold">
                      {badgeInfo.label}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {complaintTarget && (
        <RaiseComplaintModal
          isOpen={!!complaintTarget}
          onClose={() => setComplaintTarget(null)}
          employeeName={complaintTarget.name}
          employeeId={complaintTarget.id}
        />
      )}
    </>
  );
}
