'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, CheckSquare, CalendarDays, Target,
  AlertTriangle, BarChart2, Settings, Rocket, Shield, FolderOpen,
  Search, Plus, ChevronLeft, ChevronRight, Zap, MessageSquare, ClipboardCheck,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Avatar } from '@/components/ui/Avatar';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (v: boolean) => void;
}

const nav = [
  { label: 'Dashboard',  href: '/dashboard',  icon: LayoutDashboard },
  { label: 'People',     href: '/people',     icon: Users },
  { label: 'Tasks',      href: '/work',       icon: CheckSquare },
  { label: 'Meetings',   href: '/meetings',   icon: MessageSquare },
  { label: 'Check-ins',  href: '/checkins',   icon: ClipboardCheck },
  { label: 'Calendar',   href: '/calendar',   icon: CalendarDays },
  { label: 'Goals',      href: '/goals',      icon: Target },
];

const bottom = [
  { label: 'Settings',   href: '/settings',   icon: Settings },
  { label: 'Changelog',  href: '/ai',         icon: Rocket },
];

const projects = [
  { name: 'Project Phoenix', color: 'bg-[#2962FF]' },
  { name: 'Project Orion',   color: 'bg-[#00E5FF]' },
  { name: 'Project Nova',    color: 'bg-emerald-500' },
  { name: 'Project Atlas',   color: 'bg-violet-500' },
];

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { currentUser, tasks, leaves } = useStore();

  const pendingLeaves  = leaves.filter(l => l.status === 'PENDING_APPROVAL').length;
  const openTasks      = tasks.filter(t => t.status !== 'COMPLETED').length;

  const badges: Record<string, number | undefined> = {
    '/work':     openTasks      > 0 ? openTasks      : undefined,
    '/calendar': pendingLeaves  > 0 ? pendingLeaves  : undefined,
  };

  return (
    <>
      <aside
        style={{ width: isCollapsed ? 56 : 228 }}
        className="h-full flex flex-col shrink-0 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0D15] transition-all duration-200 select-none overflow-hidden text-slate-800 dark:text-white"
      >
        {/* Org header */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-3 py-3 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#2962FF] to-[#00E5FF] flex items-center justify-center shrink-0 shadow-sm shadow-[#2962FF]/30">
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-black text-slate-900 dark:text-white truncate leading-tight tracking-wider">VEIXON</p>
                <span className="text-[9px] font-mono text-[#2962FF] dark:text-[#00E5FF] font-semibold bg-blue-50 dark:bg-[#00E5FF]/10 px-1 rounded border border-blue-200 dark:border-[#00E5FF]/20">
                  TECH
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-white/50 truncate font-mono">Command Center</p>
            </div>
          )}
          {!isCollapsed && (
            <ChevronRight className="w-3 h-3 text-slate-400 dark:text-white/30 group-hover:text-slate-800 dark:group-hover:text-white" />
          )}
        </Link>

        {/* Divider */}
        <div className="h-px bg-slate-200 dark:bg-[hsl(215_13%_18%)] mx-3" />

        {/* Search */}
        {!isCollapsed && (
          <div className="px-2 pt-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[hsl(215_14%_13%)] border border-slate-200 dark:border-[hsl(215_13%_18%)] text-slate-500 dark:text-[hsl(215_12%_42%)] hover:border-slate-300 dark:hover:border-[hsl(215_13%_28%)] cursor-text transition-colors">
              <Search className="w-3 h-3 shrink-0" />
              <span className="text-[11px] flex-1">Search...</span>
              <kbd className="text-[9px] font-mono bg-white dark:bg-[hsl(215_14%_17%)] text-slate-600 dark:text-slate-300 px-1 py-0.5 rounded border border-slate-200 dark:border-transparent">⌘K</kbd>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {nav.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            const badge  = badges[href];
            return (
              <Link
                key={href}
                href={href}
                title={isCollapsed ? label : undefined}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] font-medium transition-all ${
                  active
                    ? 'bg-blue-50 dark:bg-[hsl(215_14%_17%)] text-[#2962FF] dark:text-[hsl(210_40%_96%)] font-bold'
                    : 'text-slate-600 dark:text-[hsl(215_16%_60%)] hover:bg-slate-100 dark:hover:bg-[hsl(215_14%_13%)] hover:text-slate-900 dark:hover:text-[hsl(210_40%_96%)]'
                }`}
              >
                <Icon className={`w-[15px] h-[15px] shrink-0 ${active ? 'text-[#2962FF] dark:text-[hsl(252_95%_70%)]' : ''}`} />
                {!isCollapsed && <span className="flex-1 truncate">{label}</span>}
                {!isCollapsed && badge !== undefined && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-blue-100 dark:bg-[hsl(252_60%_20%)] text-[#2962FF] dark:text-[hsl(252_95%_75%)]">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Projects section */}
          <div className="pt-3">
            {!isCollapsed && (
              <div className="flex items-center justify-between px-2 pb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-[hsl(215_12%_42%)]">
                  Projects
                </span>
                <button className="text-slate-400 dark:text-[hsl(215_12%_42%)] hover:text-slate-700 dark:hover:text-[hsl(215_16%_60%)] transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
            {projects.map((p, i) => (
              <Link
                key={i}
                href="/projects"
                title={isCollapsed ? p.name : undefined}
                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-600 dark:text-[hsl(215_16%_60%)] hover:bg-slate-100 dark:hover:bg-[hsl(215_14%_13%)] hover:text-slate-900 dark:hover:text-[hsl(210_40%_96%)] transition-all"
              >
                <span className={`w-2 h-2 rounded-full ${p.color} shrink-0`} />
                {!isCollapsed && <span className="truncate">{p.name}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom nav */}
        <div className="px-2 py-2 space-y-0.5 border-t border-slate-200 dark:border-[hsl(215_13%_18%)]">
          {bottom.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              title={isCollapsed ? label : undefined}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] text-slate-600 dark:text-[hsl(215_16%_60%)] hover:bg-slate-100 dark:hover:bg-[hsl(215_14%_13%)] hover:text-slate-900 dark:hover:text-[hsl(210_40%_96%)] transition-all"
            >
              <Icon className="w-[15px] h-[15px] shrink-0" />
              {!isCollapsed && <span className="truncate">{label}</span>}
            </Link>
          ))}

          {/* User avatar */}
          <div className="pt-1 border-t border-slate-200 dark:border-[hsl(215_13%_18%)]">
            <div className="flex items-center gap-2.5 px-2 py-1.5">
              <Avatar name={currentUser.name} src={currentUser.avatarUrl} size="xs" />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-slate-900 dark:text-[hsl(210_40%_96%)] truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-[hsl(215_12%_42%)] truncate">{currentUser.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center h-8 border-t border-slate-200 dark:border-[hsl(215_13%_18%)] text-slate-400 dark:text-[hsl(215_12%_42%)] hover:text-slate-700 dark:hover:text-[hsl(215_16%_60%)] hover:bg-slate-100 dark:hover:bg-[hsl(215_14%_13%)] transition-colors cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </aside>
    </>
  );
}
