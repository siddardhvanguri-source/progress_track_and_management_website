'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { Activity, Users, ArrowRight, CheckCircle2, AlertOctagon, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { RaiseComplaintModal } from './RaiseComplaintModal';

export function LiveTeamPulse() {
  const { users, setSelectedEmployee, auditLogs } = useStore();
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Live Presence & Working Employees */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Team Operations Pulse
              </h3>
              <p className="text-xs text-[hsl(215_16%_60%)]">
                Real-time visibility: <span className="text-emerald-400 font-semibold">Green (Present)</span>,{' '}
                <span className="text-sky-400 font-semibold">Light Blue (Leave on Duty)</span>,{' '}
                <span className="text-rose-400 font-semibold">Red (Uninformed Absence)</span>,{' '}
                <span className="text-violet-400 font-semibold">Purple (Deep Work)</span>.
              </p>
            </div>
            <Link href="/people" className="text-xs font-semibold text-[#00E5FF] hover:underline flex items-center gap-1">
              View All ({users.length}) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
            {users.slice(0, 8).map((u) => {
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
                        title="Raise attendance complaint to HR"
                      >
                        <AlertOctagon className="w-3 h-3" />
                        <span>Raise Complaint</span>
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

        {/* Real-time Audit Activity Stream */}
        <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#00E5FF]" />
              Audit & Operation Feed
            </h3>
            <p className="text-xs text-[hsl(215_16%_60%)]">Immutable record of managerial and team actions.</p>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[260px] pr-1">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="p-2.5 rounded-xl border border-white/10 bg-white/5 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#00E5FF] text-[11px] font-mono">{log.action}</span>
                  <span className="text-[10px] text-white/40">{formatRelativeTime(log.timestamp)}</span>
                </div>
                <p className="text-[11px] text-white font-medium">{log.entityTitle}</p>
                <p className="text-[10px] text-[hsl(215_16%_60%)] leading-relaxed">{log.details}</p>
              </div>
            ))}
          </div>

          <Link
            href="/audit"
            className="text-xs font-semibold text-[#00E5FF] hover:underline flex items-center justify-center gap-1 pt-2 border-t border-white/10"
          >
            View Full Audit History <ArrowRight className="h-3.5 w-3.5" />
          </Link>
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
