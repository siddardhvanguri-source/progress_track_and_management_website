'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { TaskStatus, Priority } from '@/lib/types';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import {
  CheckSquare,
  AlertOctagon,
  Calendar,
  User,
  FolderKanban,
  Clock,
  MessageSquare,
  CheckCircle2,
  Plus,
  ArrowRight,
} from 'lucide-react';

export function TaskDetailModal() {
  const { selectedTask, setSelectedTask, updateTaskStatus, blockers } = useStore();
  const [commentText, setCommentText] = useState('');

  if (!selectedTask) return null;

  const task = selectedTask;
  const taskBlockers = blockers.filter((b) => b.taskId === task.id && b.status !== 'RESOLVED');

  const statuses: TaskStatus[] = ['BACKLOG', 'PLANNED', 'IN_PROGRESS', 'BLOCKED', 'REVIEW', 'COMPLETED'];

  const handleToggleSubtask = (subId: string) => {
    const updatedSubtasks = task.subtasks.map((s) => (s.id === subId ? { ...s, isCompleted: !s.isCompleted } : s));
    const completedCount = updatedSubtasks.filter((s) => s.isCompleted).length;
    const progress = Math.round((completedCount / updatedSubtasks.length) * 100);
    const newStatus: TaskStatus = progress === 100 ? 'COMPLETED' : task.status === 'COMPLETED' ? 'IN_PROGRESS' : task.status;

    selectedTask.subtasks = updatedSubtasks;
    updateTaskStatus(task.id, newStatus, progress);
  };

  const handleStatusChange = (status: TaskStatus) => {
    updateTaskStatus(task.id, status);
  };

  return (
    <Modal
      isOpen={!!selectedTask}
      onClose={() => setSelectedTask(null)}
      maxWidth="2xl"
      className="p-0"
    >
      {/* Header */}
      <div className="border-b border-border/80 bg-muted/20 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <FolderKanban className="h-4 w-4" />
            <span>{task.projectName}</span>
            {task.milestoneName && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{task.milestoneName}</span>
              </>
            )}
          </div>
          <Badge
            variant={
              task.priority === 'CRITICAL'
                ? 'danger'
                : task.priority === 'HIGH'
                ? 'warning'
                : 'secondary'
            }
          >
            {task.priority} Priority
          </Badge>
        </div>

        <h2 className="text-lg font-bold text-foreground leading-snug">{task.title}</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">{task.description}</p>

        {/* Status Selector Ribbon */}
        <div className="pt-2">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
            Status
          </label>
          <div className="flex flex-wrap gap-1.5">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  task.status === st
                    ? st === 'BLOCKED'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : st === 'COMPLETED'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-primary text-white shadow-xs'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent border border-border/50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Active Blockers Alert on Task */}
        {taskBlockers.length > 0 && (
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
              <AlertOctagon className="h-4 w-4" />
              <span>Active Blocker on this Task</span>
            </div>
            {taskBlockers.map((blk) => (
              <div key={blk.id} className="text-xs space-y-1">
                <p className="font-semibold text-foreground">{blk.title}</p>
                <p className="text-muted-foreground">{blk.description}</p>
                <p className="text-[11px] text-muted-foreground">
                  Dependency: <span className="font-medium text-foreground">{blk.dependencyOwnerName || 'Unassigned'}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-border/60 bg-muted/20 space-y-1">
            <span className="text-[11px] text-muted-foreground">Assignee</span>
            <div className="flex items-center gap-2">
              <Avatar name={task.assigneeName} src={task.assigneeAvatar} size="xs" />
              <span className="text-xs font-semibold text-foreground truncate">{task.assigneeName}</span>
            </div>
          </div>
          <div className="p-3 rounded-xl border border-border/60 bg-muted/20 space-y-1">
            <span className="text-[11px] text-muted-foreground">Due Date</span>
            <p className="text-xs font-semibold text-foreground">{formatDate(task.dueDate)}</p>
          </div>
          <div className="p-3 rounded-xl border border-border/60 bg-muted/20 space-y-1">
            <span className="text-[11px] text-muted-foreground">Hours Logged</span>
            <p className="text-xs font-semibold text-foreground">
              {task.loggedHours}h <span className="text-muted-foreground font-normal">/ {task.estimatedHours}h est</span>
            </p>
          </div>
          <div className="p-3 rounded-xl border border-border/60 bg-muted/20 space-y-1">
            <span className="text-[11px] text-muted-foreground">Progress</span>
            <p className="text-xs font-semibold text-foreground">{task.progress}%</p>
          </div>
        </div>

        {/* Subtasks Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Subtasks Checklist ({task.subtasks.filter((s) => s.isCompleted).length}/{task.subtasks.length})
            </h4>
            <span className="text-xs font-semibold text-foreground">{task.progress}%</span>
          </div>

          <Progress value={task.progress} size="md" />

          <div className="space-y-1.5 pt-1">
            {task.subtasks.map((sub) => (
              <div
                key={sub.id}
                onClick={() => handleToggleSubtask(sub.id)}
                className="flex items-center gap-3 p-2.5 rounded-lg border border-border/60 bg-card hover:bg-accent/30 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={sub.isCompleted}
                  onChange={() => {}}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                />
                <span
                  className={`text-xs font-medium ${
                    sub.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}
                >
                  {sub.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Stream */}
        <div className="space-y-3 pt-2 border-t border-border/60">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            Comments & Discussion ({task.comments.length})
          </h4>

          <div className="space-y-2">
            {task.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3 p-3 rounded-xl border border-border/50 bg-muted/20">
                <Avatar name={comment.authorName} src={comment.authorAvatar} size="xs" />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{comment.authorName}</span>
                    <span className="text-[10px] text-muted-foreground">{formatRelativeTime(comment.createdAt)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
