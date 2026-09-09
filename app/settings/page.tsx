'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { ROLE_PERMISSIONS } from '@/lib/permissions';
import { Role } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Settings,
  Shield,
  EyeOff,
  CheckCircle2,
  Lock,
  RotateCcw,
  Bell,
  Building2,
  FileText,
  UserCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SettingsPage() {
  const { currentRole, currentUser, currentOrg, resetToInitialData } = useStore();

  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationSlack, setNotificationSlack] = useState(true);
  const [retentionMonths, setRetentionMonths] = useState('12');

  const handleReset = () => {
    if (confirm('Reset all demo data back to clean state?')) {
      resetToInitialData();
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch {}
      alert('Demo data successfully restored!');
    }
  };

  const rolesList: Role[] = ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'];

  const permissionLabels: { key: keyof typeof ROLE_PERMISSIONS['ADMIN']; label: string }[] = [
    { key: 'canViewAllEmployees', label: 'View Employee Directory' },
    { key: 'canEditEmployeeData', label: 'Edit Employee Records' },
    { key: 'canViewSensitiveLeaveReasons', label: 'View Confidential Medical Reasons' },
    { key: 'canApproveLeave', label: 'Approve / Decline Leave' },
    { key: 'canExcuseMissedMeetings', label: 'Excuse Missed Meetings' },
    { key: 'canManageBlockers', label: 'Triage & Resolve Blockers' },
    { key: 'canCreateProjects', label: 'Create Projects & Milestones' },
    { key: 'canEditTasks', label: 'Edit & Reassign Tasks' },
    { key: 'canViewReports', label: 'View Operational Reports' },
    { key: 'canExportData', label: 'Export Data (CSV)' },
    { key: 'canManageOrgSettings', label: 'Manage Organization Settings' },
    { key: 'canViewAuditLogs', label: 'Access Audit Logs' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Settings className="h-6 w-6 text-primary" />
            Settings & Responsible Privacy Controls
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Configure privacy boundaries, role-based access control (RBAC), and data retention policies.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          className="gap-1.5 text-xs text-rose-500 hover:bg-rose-500/10 border-rose-500/30"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Demo Data
        </Button>
      </div>

      {/* PRIVACY CHARTER & RESPONSIBLE EMPLOYEE DATA HANDLING */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.03] p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Shield className="h-5 w-5 text-emerald-500" />
          <div>
            <h2 className="text-sm font-bold text-foreground">WorkPulse Responsible Privacy Charter</h2>
            <p className="text-xs text-muted-foreground">
              WorkPulse is designed for alignment, blocker removal, and operational clarity — never surveillance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-card border border-border/60 space-y-1.5">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              What WorkPulse Tracks (Transparently):
            </span>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>Self-reported work progress and milestone health</li>
              <li>Self-declared blockers and dependency owners</li>
              <li>Standup meeting attendance and employee context</li>
              <li>Leave requests and workload handover plans</li>
              <li>Weekly 5-question reflections</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-card border border-rose-500/30 space-y-1.5">
            <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <EyeOff className="h-4 w-4" />
              Strictly Prohibited & NEVER Tracked:
            </span>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>No keystroke logging or mouse telemetry</li>
              <li>No webcam, screen recording, or background screenshots</li>
              <li>No reading of private messages or personal emails</li>
              <li>No personal browsing tracking or stealth location pings</li>
              <li>No opaque algorithmic productivity scores</li>
            </ul>
          </div>
        </div>
      </div>

      {/* RBAC PERMISSIONS MATRIX */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              Role-Based Access Control (RBAC) Matrix
            </h2>
            <p className="text-xs text-muted-foreground">
              Live permission boundaries enforced across roles. Switch personas in the top bar to preview.
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            Current: {currentRole}
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/30 text-muted-foreground font-semibold">
                <th className="p-3 pl-4">Capability / Permission</th>
                <th className="p-3 text-center">Admin</th>
                <th className="p-3 text-center">HR</th>
                <th className="p-3 text-center">Manager</th>
                <th className="p-3 text-center pr-4">Employee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {permissionLabels.map((perm) => (
                <tr key={perm.key} className="hover:bg-accent/30 transition-colors">
                  <td className="p-3 pl-4 font-medium text-foreground">{perm.label}</td>
                  {rolesList.map((r) => {
                    const isGranted = ROLE_PERMISSIONS[r][perm.key];
                    return (
                      <td key={r} className="p-3 text-center">
                        {isGranted ? (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                            Allowed
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px]">
                            Restricted
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NOTIFICATION PREFERENCES & RETENTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Notification Channels
          </h3>
          <div className="space-y-2.5 text-xs">
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-muted/20 cursor-pointer">
              <span>Email notifications for missed meeting explanations</span>
              <input
                type="checkbox"
                checked={notificationEmail}
                onChange={() => setNotificationEmail(!notificationEmail)}
                className="rounded border-border text-primary focus:ring-primary h-4 w-4"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-muted/20 cursor-pointer">
              <span>Slack alert when blocker is open &gt; 24 hours</span>
              <input
                type="checkbox"
                checked={notificationSlack}
                onChange={() => setNotificationSlack(!notificationSlack)}
                className="rounded border-border text-primary focus:ring-primary h-4 w-4"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Data Retention & Export Governance
          </h3>
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Audit Log Retention Policy</label>
              <select
                value={retentionMonths}
                onChange={(e) => setRetentionMonths(e.target.value)}
                className="w-full h-8 px-2.5 text-xs rounded-xl bg-card border border-input text-foreground"
              >
                <option value="12">12 Months (SOC2 Standard)</option>
                <option value="24">24 Months (Enterprise)</option>
                <option value="36">36 Months</option>
              </select>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              All employee records and attendance history adhere to GDPR and SOC2 compliance guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
