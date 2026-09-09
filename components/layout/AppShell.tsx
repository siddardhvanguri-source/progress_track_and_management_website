'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';
import { EmployeeProfileModal } from '@/components/employees/EmployeeProfileModal';
import { TaskDetailModal } from '@/components/work/TaskDetailModal';
import { ReportBlockerModal } from '@/components/blockers/ReportBlockerModal';
import { LeaveRequestModal } from '@/components/leave/LeaveRequestModal';
import { LeaveApprovalModal } from '@/components/leave/LeaveApprovalModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { selectedLeave, setSelectedLeave } = useStore();
  const [isCollapsed,   setIsCollapsed]   = useState(false);
  const [isMobileOpen,  setIsMobileOpen]  = useState(false);
  const [isBlockerOpen, setIsBlockerOpen] = useState(false);
  const [isLeaveOpen,   setIsLeaveOpen]   = useState(false);

  // If on public landing page or login page, render children directly without app sidebar/topbar
  if (pathname === '/' || pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#080b11] text-slate-900 dark:text-slate-100">
      {/* ── Sidebar ─────────────────── */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* ── Main area ───────────────── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <Topbar
          isSidebarCollapsed={isCollapsed}
          onMobileMenuToggle={() => setIsMobileOpen(!isMobileOpen)}
          onOpenReportBlocker={() => setIsBlockerOpen(true)}
          onOpenRequestLeave={() => setIsLeaveOpen(true)}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* ── Global modals ───────────── */}
      <CommandPalette />
      <EmployeeProfileModal />
      <TaskDetailModal />
      <ReportBlockerModal isOpen={isBlockerOpen} onClose={() => setIsBlockerOpen(false)} />
      <LeaveRequestModal  isOpen={isLeaveOpen}   onClose={() => setIsLeaveOpen(false)} />
      <LeaveApprovalModal leave={selectedLeave}   onClose={() => setSelectedLeave(null)} />
    </div>
  );
}
