'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Textarea } from '@/components/ui/Input';
import { LeaveRequest } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FolderKanban,
  UserCheck,
  ShieldCheck,
  Sparkles,
  Activity,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeaveApprovalModalProps {
  leave: LeaveRequest | null;
  onClose: () => void;
}

export function LeaveApprovalModal({ leave, onClose }: LeaveApprovalModalProps) {
  const { approveLeave, rejectLeave, tasks, projects, currentRole } = useStore();
  const [decisionNotes, setDecisionNotes] = useState('');

  if (!leave) return null;

  // Workload intelligence calculations
  const requesterTasks = tasks.filter((t) => t.assigneeId === leave.userId);
  const tasksDueDuringLeave = requesterTasks.filter((t) => {
    const due = new Date(t.dueDate).getTime();
    const start = new Date(leave.startDate).getTime();
    const end = new Date(leave.endDate).getTime();
    return due >= start && due <= end && t.status !== 'COMPLETED';
  });

  const avgProgress =
    requesterTasks.length > 0
      ? Math.round(requesterTasks.reduce((acc, t) => acc + t.progress, 0) / requesterTasks.length)
      : 0;

  const handleApprove = () => {
    approveLeave(leave.id, decisionNotes || 'Approved with backup coverage.');
    try {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } catch {}
    onClose();
  };

  const handleReject = () => {
    rejectLeave(leave.id, decisionNotes || 'Declined due to critical milestone deadline.');
    onClose();
  };

  const isHR = currentRole === 'HR' || currentRole === 'ADMIN';

  return (
    <Modal
      isOpen={!!leave}
      onClose={onClose}
      maxWidth="2xl"
      className="p-0"
    >
      {/* Header */}
      <div className="border-b border-border/80 bg-gradient-to-r from-purple-500/10 via-background to-blue-500/10 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="purple" className="text-xs">
            {leave.leaveType} Leave Request
          </Badge>
          <span className="text-xs font-semibold text-muted-foreground">
            {leave.totalDays} {leave.totalDays === 1 ? 'Day' : 'Days'} Total
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          <Avatar name={leave.userName} src={leave.userAvatar} size="lg" />
          <div>
            <h3 className="text-lg font-bold text-foreground">{leave.userName}</h3>
            <p className="text-xs text-muted-foreground">
              {leave.userJobTitle} • {leave.departmentName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-background/60 p-2.5 rounded-xl border border-border/60">
          <Calendar className="h-4 w-4 text-purple-500" />
          <span>
            {formatDate(leave.startDate)} → {formatDate(leave.endDate)}
          </span>
        </div>
      </div>

      {/* Body: Workload Intelligence */}
      <div className="p-6 space-y-6">
        {/* Intelligence Banner */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Workload & Capacity Intelligence</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-2.5 rounded-xl bg-card border border-border/60">
              <span className="text-[10px] text-muted-foreground">Active Work Progress</span>
              <p className="text-base font-bold text-foreground">{avgProgress}%</p>
              <Progress value={avgProgress} size="sm" />
            </div>

            <div className="p-2.5 rounded-xl bg-card border border-border/60">
              <span className="text-[10px] text-muted-foreground">Tasks Due During Leave</span>
              <p className={`text-base font-bold ${tasksDueDuringLeave.length > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                {tasksDueDuringLeave.length} Tasks
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-card border border-border/60">
              <span className="text-[10px] text-muted-foreground">Handover Status</span>
              <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Ready
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-card border border-border/60">
              <span className="text-[10px] text-muted-foreground">Team Capacity Impact</span>
              <p className="text-base font-bold text-blue-600 dark:text-blue-400">84%</p>
            </div>
          </div>

          {/* At-risk tasks warning if any */}
          {tasksDueDuringLeave.length > 0 && (
            <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                <span>Upcoming Tasks requiring backup handover:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                {tasksDueDuringLeave.map((t) => (
                  <li key={t.id}>
                    <span className="font-medium text-foreground">{t.title}</span> (Due {formatDate(t.dueDate)})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Handover & Backup Teammate */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Handover Plan & Designated Backup
          </h4>
          <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Designated Backup:</span>
              <span className="font-bold text-primary flex items-center gap-1.5">
                <UserCheck className="h-4 w-4" />
                {leave.backupUserName || 'Assigned Lead'}
              </span>
            </div>
            <div>
              <span className="font-semibold text-muted-foreground">Handover Checklist:</span>
              <p className="mt-1 text-foreground leading-relaxed bg-background/60 p-2.5 rounded-lg border border-border/50">
                {leave.handoverNotes || 'No specific handover checklist attached.'}
              </p>
            </div>
          </div>
        </div>

        {/* Sensitive Notes Privacy Check */}
        {leave.privateNotes && isHR && (
          <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Confidential Medical Context (HR Protected View):
            </span>
            <p className="text-foreground">{leave.privateNotes}</p>
          </div>
        )}

        {/* Decision notes input */}
        <Textarea
          label="Approval / Decision Feedback (Optional)"
          placeholder="e.g. Approved. Thanks for having all PRs merged and checking in with Siddharth."
          rows={2}
          value={decisionNotes}
          onChange={(e) => setDecisionNotes(e.target.value)}
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="danger" size="sm" onClick={handleReject} className="gap-1.5">
            <XCircle className="h-4 w-4" />
            Decline
          </Button>
          <Button type="button" variant="success" size="sm" onClick={handleApprove} className="gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            Approve Leave
          </Button>
        </div>
      </div>
    </Modal>
  );
}
