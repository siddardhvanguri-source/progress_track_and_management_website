'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { LeaveRequest } from '@/lib/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { formatDate } from '@/lib/utils';
import {
  CalendarCheck,
  Plus,
  Calendar,
  CheckCircle2,
  XCircle,
  Sparkles,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { LeaveRequestModal } from '@/components/leave/LeaveRequestModal';
import { LeaveApprovalModal } from '@/components/leave/LeaveApprovalModal';

export default function LeavePage() {
  const { leaves, currentUser, setSelectedLeave, selectedLeave } = useStore();

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredLeaves = leaves.filter((l) =>
    filterStatus === 'ALL' ? true : l.status === filterStatus
  );

  const pendingCount = leaves.filter((l) => l.status === 'PENDING_APPROVAL').length;
  const approvedCount = leaves.filter((l) => l.status === 'APPROVED').length;

  const userBalance = currentUser.leaveBalance;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <CalendarCheck className="h-6 w-6 text-purple-500" />
            Leave Management & Workload Intelligence
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Approvals are empowered with real-time sprint progress, task deadlines, and team capacity coverage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsRequestModalOpen(true)}
            className="gap-1.5 text-xs font-semibold"
          >
            <Plus className="h-4 w-4" />
            Request Leave
          </Button>
        </div>
      </div>

      {/* Leave Balance Overview Ribbon */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          My Leave Balance & Allowances ({currentUser.name})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">Casual Leave</span>
              <span className="font-bold text-primary">
                {userBalance.casualTotal - userBalance.casualUsed} Days Left
              </span>
            </div>
            <Progress
              value={((userBalance.casualTotal - userBalance.casualUsed) / userBalance.casualTotal) * 100}
              size="md"
            />
            <p className="text-[10px] text-muted-foreground">
              {userBalance.casualUsed} of {userBalance.casualTotal} days used this year
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">Annual Vacation</span>
              <span className="font-bold text-purple-500">
                {userBalance.annualTotal - userBalance.annualUsed} Days Left
              </span>
            </div>
            <Progress
              value={((userBalance.annualTotal - userBalance.annualUsed) / userBalance.annualTotal) * 100}
              size="md"
            />
            <p className="text-[10px] text-muted-foreground">
              {userBalance.annualUsed} of {userBalance.annualTotal} days used this year
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">Sick Leave</span>
              <span className="font-bold text-emerald-500">
                {userBalance.sickTotal - userBalance.sickUsed} Days Left
              </span>
            </div>
            <Progress
              value={((userBalance.sickTotal - userBalance.sickUsed) / userBalance.sickTotal) * 100}
              size="md"
            />
            <p className="text-[10px] text-muted-foreground">
              {userBalance.sickUsed} of {userBalance.sickTotal} days used this year
            </p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center justify-between gap-3 bg-card p-3.5 rounded-2xl border border-border/80">
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-8 px-2.5 text-xs rounded-xl bg-card border border-input text-foreground cursor-pointer"
          >
            <option value="ALL">All Leave Requests ({leaves.length})</option>
            <option value="PENDING_APPROVAL">Pending Approval ({pendingCount})</option>
            <option value="APPROVED">Approved ({approvedCount})</option>
            <option value="REJECTED">Declined</option>
          </select>
        </div>

        <Badge variant="outline" className="text-xs">
          Showing {filteredLeaves.length} Requests
        </Badge>
      </div>

      {/* Leave Requests Feed with Workload Intelligence Button */}
      <div className="space-y-3.5">
        {filteredLeaves.map((lev) => {
          const isPending = lev.status === 'PENDING_APPROVAL';

          return (
            <div
              key={lev.id}
              className={`rounded-2xl border p-5 shadow-xs transition-all space-y-3.5 bg-card ${
                isPending ? 'border-purple-500/40 bg-purple-500/[0.02]' : 'border-border/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex items-center gap-3">
                  <Avatar name={lev.userName} src={lev.userAvatar} size="sm" />
                  <div>
                    <h3 className="text-xs font-bold text-foreground">{lev.userName}</h3>
                    <p className="text-[11px] text-muted-foreground">
                      {lev.userJobTitle} • {lev.departmentName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={lev.status === 'APPROVED' ? 'success' : isPending ? 'purple' : 'danger'}>
                    {lev.status}
                  </Badge>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {lev.totalDays} {lev.totalDays === 1 ? 'Day' : 'Days'} ({lev.leaveType})
                  </span>
                </div>
              </div>

              {/* Dates & Reason */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-purple-500" />
                    Requested Dates
                  </span>
                  <p className="font-semibold text-foreground">
                    {formatDate(lev.startDate)} → {formatDate(lev.endDate)}
                  </p>
                  <p className="text-muted-foreground italic">Reason: {lev.reason}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5 text-primary" />
                    Handover & Backup Coverage
                  </span>
                  <p className="font-semibold text-foreground">
                    Backup Person: {lev.backupUserName || 'Designated Lead'}
                  </p>
                  <p className="text-muted-foreground line-clamp-2">{lev.handoverNotes}</p>
                </div>
              </div>

              {/* Workload Intelligence Trigger */}
              <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Workload impact: 84% team capacity remaining</span>
                </div>

                {isPending ? (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setSelectedLeave(lev)}
                    className="gap-1.5 text-xs font-semibold"
                  >
                    <span>Review Workload Intelligence & Triage</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                ) : (
                  <span className="text-muted-foreground text-[11px]">
                    Decision: {lev.decisionNotes || lev.status}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <LeaveRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
      <LeaveApprovalModal
        leave={selectedLeave}
        onClose={() => setSelectedLeave(null)}
      />
    </div>
  );
}
