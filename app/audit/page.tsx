'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { ShieldCheck, Search, Filter, History, ArrowRight } from 'lucide-react';

export default function AuditPage() {
  const { auditLogs } = useStore();
  const [search, setSearch] = useState('');
  const [selectedAction, setSelectedAction] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchSearch =
      log.actorName.toLowerCase().includes(search.toLowerCase()) ||
      log.entityTitle.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase());
    const matchAction = selectedAction === 'ALL' || log.action === selectedAction;
    return matchSearch && matchAction;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Audit History & Operations Log
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Immutable, tamper-proof record of managerial approvals, status modifications, and attendance triage.
          </p>
        </div>

        <Badge variant="outline" className="text-xs font-semibold px-3 py-1">
          {filteredLogs.length} Logged Events
        </Badge>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card p-3.5 rounded-2xl border border-border/80">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search audit logs by actor, entity, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-muted/30 border border-input rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          className="h-8 px-2.5 text-xs rounded-xl bg-card border border-input text-foreground cursor-pointer"
        >
          <option value="ALL">All Actions</option>
          <option value="LEAVE_APPROVED">Leave Approved</option>
          <option value="BLOCKER_REPORTED">Blocker Reported</option>
          <option value="BLOCKER_RESOLVED">Blocker Resolved</option>
          <option value="TASK_STATUS_CHANGED">Task Status Changed</option>
          <option value="ATTENDANCE_EXCUSED">Attendance Excused</option>
        </select>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/30 text-muted-foreground font-semibold">
                <th className="p-3.5 pl-4">Timestamp</th>
                <th className="p-3.5">Actor</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Entity / Target</th>
                <th className="p-3.5">Change Diff (Before → After)</th>
                <th className="p-3.5 pr-4">Details & Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-accent/40 transition-colors">
                  <td className="p-3.5 pl-4 whitespace-nowrap text-muted-foreground">
                    <span className="font-mono text-[11px] block text-foreground font-semibold">
                      {formatDate(log.timestamp, 'p')}
                    </span>
                    <span className="text-[10px]">{formatDate(log.timestamp, 'MMM dd, yyyy')}</span>
                  </td>

                  <td className="p-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Avatar name={log.actorName} src={log.actorAvatar} size="xs" />
                      <div>
                        <span className="font-bold text-foreground block leading-tight">{log.actorName}</span>
                        <span className="text-[10px] text-muted-foreground">{log.actorRole}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {log.action}
                    </Badge>
                  </td>

                  <td className="p-3.5 max-w-xs">
                    <span className="font-medium text-foreground block truncate">{log.entityTitle}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{log.entityType}</span>
                  </td>

                  <td className="p-3.5 whitespace-nowrap">
                    {log.previousVal && log.newVal ? (
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <span className="text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {log.previousVal}
                        </span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-primary font-bold bg-primary/10 px-1.5 py-0.5 rounded">
                          {log.newVal}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-[10px]">N/A</span>
                    )}
                  </td>

                  <td className="p-3.5 pr-4 max-w-sm">
                    <p className="text-muted-foreground leading-relaxed line-clamp-2">{log.details}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
