'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { FolderKanban, CheckSquare, AlertOctagon, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ProjectHealthWidget() {
  const { projects, tasks } = useStore();

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <FolderKanban className="h-4 w-4 text-primary" />
            Active Project Health & Explainable Progress
          </h3>
          <p className="text-xs text-muted-foreground">
            Progress is transparently measured through milestones, task completion & blocker counts.
          </p>
        </div>
        <Link href="/work" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
          View all projects <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="space-y-3.5">
        {projects.slice(0, 4).map((proj) => {
          const projTasks = tasks.filter((t) => t.projectId === proj.id);
          const completedCount = projTasks.filter((t) => t.status === 'COMPLETED').length;
          const blockedCount = projTasks.filter((t) => t.status === 'BLOCKED').length;
          const inProgressCount = projTasks.filter((t) => t.status === 'IN_PROGRESS' || t.status === 'REVIEW').length;
          const totalTasks = projTasks.length || proj.totalTasks;

          return (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-border/70 bg-muted/10 hover:bg-muted/20 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{proj.name}</span>
                    <Badge variant={proj.health === 'On Track' ? 'success' : 'warning'} className="text-[10px]">
                      {proj.health}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                    Lead: {proj.leadName} • Target: {formatDate(proj.targetDate)}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-sm font-black text-foreground">{proj.progress}%</span>
                  <span className="text-[10px] text-muted-foreground ml-1">Overall</span>
                </div>
              </div>

              {/* Progress Bar */}
              <Progress value={proj.progress} size="md" />

              {/* Explainable Metrics Breakdown (No simplistic opaque numbers) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs text-muted-foreground border-t border-border/40">
                <div className="flex items-center gap-1.5">
                  <CheckSquare className="h-3.5 w-3.5 text-emerald-500" />
                  <span>
                    <strong className="text-foreground">{completedCount}</strong>/{totalTasks} Tasks Done
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-blue-500" />
                  <span>
                    <strong className="text-foreground">{inProgressCount}</strong> In Progress
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <AlertOctagon className={`h-3.5 w-3.5 ${blockedCount > 0 ? 'text-rose-500' : 'text-zinc-400'}`} />
                  <span className={blockedCount > 0 ? 'text-rose-600 dark:text-rose-400 font-semibold' : ''}>
                    <strong>{blockedCount}</strong> Blocked
                  </span>
                </div>
                <div className="text-right sm:text-right text-[11px]">
                  <span>Milestones: {proj.milestones.filter((m) => m.isCompleted).length}/{proj.milestones.length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
