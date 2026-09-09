'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Plus,
  AlertTriangle,
  CalendarPlus,
  Menu,
  User,
  Settings,
  Command,
  LogOut,
  FolderPlus,
  Calendar,
  Target,
  CheckSquare
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Avatar } from '@/components/ui/Avatar';
import { NotificationFlyout } from './NotificationFlyout';

interface TopbarProps {
  isSidebarCollapsed: boolean;
  onMobileMenuToggle: () => void;
  onOpenReportBlocker?: () => void;
  onOpenRequestLeave?: () => void;
}

export function Topbar({
  isSidebarCollapsed,
  onMobileMenuToggle,
  onOpenReportBlocker,
  onOpenRequestLeave,
}: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentUser,
    currentRole,
    isDarkMode,
    toggleDarkMode,
    setCommandPaletteOpen,
    notifications,
    setSelectedEmployee,
  } = useStore();

  const pageLabels: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/people': 'People',
    '/work': 'Tasks',
    '/calendar': 'Calendar',
    '/goals': 'Goals',
    '/blockers': 'Blockers',
    '/reports': 'Reports',
    '/meetings': 'Meetings',
    '/checkins': 'Check-ins',
    '/settings': 'Settings',
    '/profile': 'My Profile',
    '/teams': 'Teams',
    '/projects': 'Projects',
    '/audit': 'Audit Log',
    '/insights': 'AI Insights',
    '/ai': 'Changelog',
    '/leave': 'Leave Management',
    '/notifications': 'Notifications',
  };

  const pageLabel =
    pageLabels[pathname] ??
    pageLabels[Object.keys(pageLabels).find((k) => pathname.startsWith(k)) ?? ''] ??
    'Command Center';

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleSignOut = () => {
    document.cookie = 'workpulse_session=; path=/; max-age=0';
    router.push('/login');
  };

  const displayName = currentUser.name.includes('Siddardh') ? 'Siddhardh' : currentUser.name.split(' ')[0];
  const roleDisplay = currentRole === 'DIRECTOR' ? 'Director' : currentRole === 'ADMIN' ? 'Admin' : currentRole === 'MANAGER' ? 'Manager' : 'Employee';

  return (
    <header className="h-12 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0D15] shrink-0 z-40 text-slate-800 dark:text-white select-none">
      {/* Left: mobile menu + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden text-slate-500 dark:text-[hsl(215_16%_60%)] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <Menu className="w-4 h-4" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-1.5 group">
          <span className="text-[12px] font-black text-slate-900 dark:text-white tracking-wider group-hover:text-[#2962FF] dark:group-hover:text-[#00E5FF] transition-colors">
            VEIXON
          </span>
          <span className="text-slate-300 dark:text-white/30 font-mono">/</span>
          <span className="text-[12px] font-semibold text-slate-700 dark:text-white/90">{pageLabel}</span>
        </Link>
      </div>

      {/* Center: global search */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/40 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-700 dark:hover:text-white/70 transition-all text-xs w-72 cursor-pointer"
      >
        <Search className="w-3.5 h-3.5 shrink-0" />
        <span className="flex-1 text-left">Search projects, people, tasks...</span>
        <kbd className="text-[10px] font-mono bg-white dark:bg-white/10 text-slate-600 dark:text-white/60 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/10">
          ⌘K
        </kbd>
      </button>

      {/* Right actions: New, Notifications, Theme, User Profile */}
      <div className="flex items-center gap-2">
        {/* Quick Add Menu */}
        <div className="relative">
          <button
            onClick={() => setIsActionsOpen(!isActionsOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#2962FF] text-white hover:bg-[#1A4FD9] transition-all shadow-md shadow-[#2962FF]/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>
          {isActionsOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in-50 duration-150">
              <Link
                href="/work"
                onClick={() => setIsActionsOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
              >
                <CheckSquare className="w-3.5 h-3.5 text-[#2962FF] dark:text-[#00E5FF]" />
                New Task
              </Link>
              <Link
                href="/projects"
                onClick={() => setIsActionsOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
              >
                <FolderPlus className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                New Project
              </Link>
              <Link
                href="/meetings"
                onClick={() => setIsActionsOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                Schedule Meeting
              </Link>
              {onOpenRequestLeave && (
                <button
                  onClick={() => {
                    setIsActionsOpen(false);
                    onOpenRequestLeave();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors text-left cursor-pointer"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                  Request Leave
                </button>
              )}
              {onOpenReportBlocker && (
                <button
                  onClick={() => {
                    setIsActionsOpen(false);
                    onOpenReportBlocker();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors text-left cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  Report Blocker
                </button>
              )}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2962FF] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#0A0D15]">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <NotificationFlyout isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>

        {/* User Profile Menu (NO EMPLOYEE SWITCH, NO ROLE SWITCH) */}
        <div className="relative ml-1">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
          >
            <Avatar name={currentUser.name} src={currentUser.avatarUrl} size="xs" />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{displayName}</span>
              <span className="text-[10px] text-[#2962FF] dark:text-[#00E5FF] font-mono leading-none">{roleDisplay}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in-50 duration-150">
              <div className="px-3 py-2.5 border-b border-slate-100 dark:border-white/10">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-white/50 truncate">{currentUser.email}</p>
                <div className="mt-1.5 inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-[#2962FF]/20 text-[#2962FF] dark:text-[#00E5FF] border border-blue-200 dark:border-transparent">
                  {roleDisplay} · VEIXON Core
                </div>
              </div>

              <Link
                href="/profile"
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-400 dark:text-white/60" />
                Profile & Presence
              </Link>

              <Link
                href="/settings"
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400 dark:text-white/60" />
                Settings
              </Link>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  setCommandPaletteOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Command className="w-3.5 h-3.5 text-[#2962FF] dark:text-[#00E5FF]" />
                  Command Palette
                </div>
                <kbd className="text-[10px] font-mono bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[#2962FF] dark:text-[#00E5FF] border border-slate-200 dark:border-transparent">⌘K</kbd>
              </button>

              <div className="pt-1 border-t border-slate-100 dark:border-white/10">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out / Switch Account
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-white/30 font-mono">Exit</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
