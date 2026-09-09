'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Blocker, BlockerSeverity, BlockerStatus } from '@/lib/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatRelativeTime } from '@/lib/utils';
import {
  AlertOctagon,
  Plus,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { ReportBlockerModal } from '@/components/blockers/ReportBlockerModal';
import { BlockerResolveModal } from '@/components/blockers/BlockerResolveModal';

export default function BlockersPage() {
  const { blockers } = useStore();

  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [triageBlocker, setTriageBlocker] = useState<Blocker | null>(null);

  const filteredBlockers = blockers.filter((b) => {
    const matchStatus =
      selectedStatus === 'ALL'
        ? true
        : selectedStatus === 'ACTIVE'
        ? b.status !== 'RESOLVED'
        : b.status === selectedStatus;
    const matchSev = selectedSeverity === 'ALL' || b.severity === selectedSeverity;
    return matchStatus && matchSev;
  });

  const activeCount = blockers.filter((b) => b.status !== 'RESOLVED').length;
  const criticalCount = blockers.filter((b) => b.severity === 'CRITICAL' && b.status !== 'RESOLVED').length;
  const resolvedCount = blockers.filter((b) => b.status === 'RESOLVED').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <AlertOctagon className="h-6 w-6 text-rose-500" />
            Blocked Work Command Center
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time bottleneck telemetry, cross-team dependencies, and SLA escalation tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="danger"
            onClick={() => setIsReportOpen(true)}
            className="gap-1.5 text-xs font-semibold shadow-xs"
          >
            <Plus className="h-4 w-4" />
            Report Blocker
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 space-y-1">
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <AlertOctagon className="h-4 w-4" />
            Active Roadblocks
          </span>
          <p className="text-2xl font-black text-rose-600 dark:text-rose-400">{activeCount}</p>
          <p className="text-[11px] text-muted-foreground">Requiring manager / dependency triage</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
          <span className="text-xs font-semibold text-amber-500 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4" />
            Critical Severity Roadblocks
          </span>
          <p className="text-2xl font-black text-foreground">{criticalCount}</p>
          <p className="text-[11px] text-muted-foreground">Impacts core release milestone</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
          <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            Resolved This Sprint
          </span>
          <p className="text-2xl font-black text-foreground">{resolvedCount}</p>
          <p className="text-[11px] text-muted-foreground">Average resolution time: 14.2 hours</p>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex items-center justify-between gap-3 bg-card p-3.5 rounded-2xl border border-border/80">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-8 px-2.5 text-xs rounded-xl bg-card border border-input text-foreground cursor-pointer"
          >
            <option value="ALL">All Statuses ({blockers.length})</option>
            <option value="ACTIVE">Active Only ({activeCount})</option>
            <option value="OPEN">Open</option>
            <option value="ACKNOWLEDGED">Acknowledged</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="h-8 px-2.5 text-xs rounded-xl bg-card border border-input text-foreground cursor-pointer"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <Badge variant="outline" className="text-xs">
          Showing {filteredBlockers.length} Blockers
        </Badge>
      </div>

      {/* Blockers Cards Feed */}
      <div className="space-y-3.5">
        {filteredBlockers.map((blk) => {
          const hoursOpen = Math.round(
            (Date.now() - new Date(blk.reportedAt).getTime()) / (1000 * 60 * 60)
          );

          return (
            <div
              key={blk.id}
              className={`rounded-2xl border p-5 shadow-xs transition-all space-y-3 bg-card ${
                blk.status === 'RESOLVED'
                  ? 'border-border/60 opacity-80'
                  : blk.severity === 'CRITICAL'
                  ? 'border-rose-500/40 glow-border-red bg-rose-500/[0.02]'
                  : 'border-border/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <Badge variant={blk.severity === 'CRITICAL' ? 'danger' : 'warning'}>
                    {blk.severity} SEVERITY
                  </Badge>
                  <span className="text-xs font-mono font-medium text-muted-foreground">
                    {blk.projectName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    Reported {formatRelativeTime(blk.reportedAt)} ({hoursOpen}h ago)
                  </span>
                  <Badge
                    variant={blk.status === 'RESOLVED' ? 'success' : blk.status === 'OPEN' ? 'danger' : 'secondary'}
                    className="text-[10px]"
                  >
                    {blk.status}
                  </Badge>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground leading-snug">{blk.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{blk.description}</p>
              </div>

              {/* Details & Dependency Owner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl bg-muted/20 border border-border/60 p-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Blocked Task
                  </span>
                  <span className="font-semibold text-foreground">{blk.taskTitle}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Reported By
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Avatar name={blk.reporterName} src={blk.reporterAvatar} size="xs" />
                    <span className="font-semibold text-foreground">{blk.reporterName}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Dependency Owner
                  </span>
                  <span className="font-bold text-primary">
                    {blk.dependencyOwnerName ? blk.dependencyOwnerName : 'Unassigned (Manager Triage)'}
                  </span>
                </div>
              </div>

              {/* Resolution Notes if Resolved */}
              {blk.resolutionNotes && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Resolved by {blk.resolverName}:
                  </span>
                  <p className="text-foreground">{blk.resolutionNotes}</p>
                </div>
              )}

              {/* Footer action */}
              <div className="flex items-center justify-end pt-2">
                {blk.status !== 'RESOLVED' ? (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setTriageBlocker(blk)}
                    className="gap-1.5 text-xs font-semibold"
                  >
                    <span>Triage & Resolve Blocker</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                ) : (
                  <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Blocker Resolved
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <ReportBlockerModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
      <BlockerResolveModal
        blocker={triageBlocker}
        onClose={() => setTriageBlocker(null)}
      />
    </div>
  );
}
