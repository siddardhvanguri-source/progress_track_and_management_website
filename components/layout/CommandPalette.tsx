'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User as UserIcon,
  FolderKanban,
  CheckSquare,
  AlertOctagon,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  FileText,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

export function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    users,
    projects,
    tasks,
    blockers,
    setSelectedEmployee,
    setSelectedTask,
  } = useStore();
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredUsers = query
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
          u.departmentName.toLowerCase().includes(query.toLowerCase())
      )
    : users.slice(0, 4);

  const filteredProjects = query
    ? projects.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.code.toLowerCase().includes(query.toLowerCase())
      )
    : projects.slice(0, 3);

  const filteredTasks = query
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.assigneeName.toLowerCase().includes(query.toLowerCase())
      )
    : tasks.slice(0, 4);

  const filteredBlockers = query
    ? blockers.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.reporterName.toLowerCase().includes(query.toLowerCase())
      )
    : blockers.slice(0, 2);

  const handleNavigate = (path: string) => {
    router.push(path);
    setCommandPaletteOpen(false);
  };

  const handleSelectUser = (user: (typeof users)[0]) => {
    setSelectedEmployee(user);
    setCommandPaletteOpen(false);
  };

  const handleSelectTask = (task: (typeof tasks)[0]) => {
    setSelectedTask(task);
    setCommandPaletteOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandPaletteOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Command Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: 'spring', damping: 28, stiffness: 400 }}
          className="relative w-full max-w-2xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/80 bg-muted/20">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Type a command, search employee, task, project, or blocker..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block rounded border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-muted">
              ESC
            </kbd>
          </div>

          {/* Results list */}
          <div className="p-3 overflow-y-auto space-y-4">
            {/* Quick Navigation Commands */}
            <div>
              <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Quick Navigation
              </p>
              <div className="grid grid-cols-2 gap-1 mt-1">
                <button
                  onClick={() => handleNavigate('/')}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-accent hover:text-accent-foreground text-left transition-colors"
                >
                  <Layers className="h-4 w-4 text-primary" />
                  <span>Dashboard (Command Center)</span>
                </button>
                <button
                  onClick={() => handleNavigate('/blockers')}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-accent hover:text-accent-foreground text-left transition-colors"
                >
                  <AlertOctagon className="h-4 w-4 text-rose-500" />
                  <span>Blocked Work Command Center</span>
                </button>
                <button
                  onClick={() => handleNavigate('/people')}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-accent hover:text-accent-foreground text-left transition-colors"
                >
                  <UserIcon className="h-4 w-4 text-blue-500" />
                  <span>People & Operations Directory</span>
                </button>
                <button
                  onClick={() => handleNavigate('/work')}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-accent hover:text-accent-foreground text-left transition-colors"
                >
                  <FolderKanban className="h-4 w-4 text-amber-500" />
                  <span>Projects & Task Board</span>
                </button>
                <button
                  onClick={() => handleNavigate('/leave')}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-accent hover:text-accent-foreground text-left transition-colors"
                >
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span>Leave & Workload Intelligence</span>
                </button>
                <button
                  onClick={() => handleNavigate('/ai')}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg hover:bg-accent hover:text-accent-foreground text-left transition-colors"
                >
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  <span>WorkPulse AI Assistant</span>
                </button>
              </div>
            </div>

            {/* People */}
            {filteredUsers.length > 0 && (
              <div>
                <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Employees ({filteredUsers.length})
                </p>
                <div className="space-y-1 mt-1">
                  {filteredUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleSelectUser(u)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-accent text-left transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Avatar name={u.name} src={u.avatarUrl} size="sm" status={u.attendanceStatus} />
                        <div>
                          <p className="font-medium text-foreground">{u.name}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {u.jobTitle} • {u.departmentName}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {u.attendanceStatus}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks */}
            {filteredTasks.length > 0 && (
              <div>
                <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Tasks ({filteredTasks.length})
                </p>
                <div className="space-y-1 mt-1">
                  {filteredTasks.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTask(t)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-accent text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{t.title}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {t.projectName} • Assigned to {t.assigneeName}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          t.status === 'BLOCKED'
                            ? 'danger'
                            : t.status === 'COMPLETED'
                            ? 'success'
                            : 'secondary'
                        }
                        className="text-[10px]"
                      >
                        {t.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Blockers */}
            {filteredBlockers.length > 0 && (
              <div>
                <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Active Blockers
                </p>
                <div className="space-y-1 mt-1">
                  {filteredBlockers.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleNavigate('/blockers')}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-accent text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <AlertOctagon className="h-4 w-4 text-rose-500" />
                        <div>
                          <p className="font-medium text-foreground">{b.title}</p>
                          <p className="text-[11px] text-muted-foreground">
                            Reported by {b.reporterName} • Task: {b.taskTitle}
                          </p>
                        </div>
                      </div>
                      <Badge variant="danger" className="text-[10px]">
                        {b.severity}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-border/60 bg-muted/40 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Navigation: ↑ ↓ arrows to browse</span>
            <span className="flex items-center gap-1 font-mono">
              <kbd className="rounded border px-1 bg-background">↵</kbd> Select
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
