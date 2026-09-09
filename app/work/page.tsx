'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { Task, TaskStatus, Priority } from '@/lib/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { formatDate } from '@/lib/utils';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  CheckSquare,
  AlertOctagon,
  Clock,
  LayoutGrid,
  List,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { NewTaskModal } from '@/components/work/NewTaskModal';

export default function WorkPage() {
  const { projects, tasks, updateTaskStatus, setSelectedTask } = useStore();

  const [selectedProjectId, setSelectedProjectId] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchProj = selectedProjectId === 'ALL' || t.projectId === selectedProjectId;
      const matchPrio = selectedPriority === 'ALL' || t.priority === selectedPriority;
      const matchSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.assigneeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.projectName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchProj && matchPrio && matchSearch;
    });
  }, [tasks, selectedProjectId, selectedPriority, searchQuery]);

  const kanbanColumns: { status: TaskStatus; label: string; color: string }[] = [
    { status: 'BACKLOG', label: 'Backlog', color: 'border-zinc-500/30 text-zinc-500' },
    { status: 'PLANNED', label: 'Planned', color: 'border-blue-500/30 text-blue-500' },
    { status: 'IN_PROGRESS', label: 'In Progress', color: 'border-amber-500/30 text-amber-500' },
    { status: 'BLOCKED', label: 'Blocked', color: 'border-rose-500/40 text-rose-500' },
    { status: 'REVIEW', label: 'In Review', color: 'border-purple-500/30 text-purple-500' },
    { status: 'COMPLETED', label: 'Completed', color: 'border-emerald-500/30 text-emerald-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <FolderKanban className="h-6 w-6 text-primary" />
            Projects & Work Management
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track milestones, manage subtask completion, and maintain deadline health across teams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border/70 p-0.5 bg-card">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'kanban' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Kanban Board"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <Button size="sm" variant="primary" onClick={() => setIsNewTaskOpen(true)} className="gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            New Task
          </Button>
        </div>
      </div>

      {/* Projects Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {projects.map((proj) => {
          const isSelected = selectedProjectId === proj.id;
          return (
            <div
              key={proj.id}
              onClick={() => setSelectedProjectId(isSelected ? 'ALL' : proj.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 bg-card ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 shadow-md'
                  : 'border-border/80 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-muted text-foreground">
                  {proj.code}
                </span>
                <Badge variant={proj.health === 'On Track' ? 'success' : 'warning'} className="text-[10px]">
                  {proj.health}
                </Badge>
              </div>

              <div>
                <h3 className="text-xs font-bold text-foreground line-clamp-1">{proj.name}</h3>
                <p className="text-[11px] text-muted-foreground line-clamp-1">{proj.description}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-bold text-foreground">{proj.progress}%</span>
                </div>
                <Progress value={proj.progress} size="sm" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card p-3.5 rounded-2xl border border-border/80">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter tasks by title, assignee, or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-muted/30 border border-input rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="h-8 px-2.5 text-xs rounded-xl bg-card border border-input text-foreground cursor-pointer"
          >
            <option value="ALL">All Projects ({tasks.length} tasks)</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="h-8 px-2.5 text-xs rounded-xl bg-card border border-input text-foreground cursor-pointer"
          >
            <option value="ALL">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* KANBAN BOARD (SPACIOUS HORIZONTAL SCROLL TRACK - NOT CRAMPED) */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-1 items-start snap-x scrollbar-thin">
          {kanbanColumns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.status);

            return (
              <div
                key={col.status}
                className="w-80 min-w-[320px] shrink-0 rounded-2xl border border-white/10 bg-[#0B0F19] p-4 space-y-4 flex flex-col snap-start shadow-sm"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      col.status === 'BLOCKED'
                        ? 'bg-rose-500'
                        : col.status === 'COMPLETED'
                        ? 'bg-emerald-500'
                        : col.status === 'IN_PROGRESS'
                        ? 'bg-amber-400'
                        : col.status === 'PLANNED'
                        ? 'bg-[#00E5FF]'
                        : col.status === 'REVIEW'
                        ? 'bg-purple-400'
                        : 'bg-zinc-500'
                    }`} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">{col.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/60">
                      {colTasks.length}
                    </span>
                    <button
                      onClick={() => setIsNewTaskOpen(true)}
                      className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title={`Add task to ${col.label}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Cards in Column */}
                <div className="space-y-3 flex-1 min-h-[350px]">
                  {colTasks.length === 0 ? (
                    <div className="py-14 text-center space-y-2 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                      <p className="text-xs text-white/40 font-medium">No tasks in {col.label}</p>
                      <button
                        onClick={() => setIsNewTaskOpen(true)}
                        className="text-[11px] text-[#00E5FF] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Create task
                      </button>
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className={`rounded-xl border p-4 transition-all duration-200 cursor-pointer space-y-3 group ${
                          task.status === 'BLOCKED'
                            ? 'border-rose-500/40 bg-rose-500/[0.04] hover:bg-rose-500/[0.08]'
                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#2962FF]/50'
                        }`}
                      >
                        {/* Top: Project pill + Priority */}
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono text-[#00E5FF] font-semibold px-2 py-0.5 rounded bg-[#2962FF]/15 border border-[#2962FF]/30">
                            {task.projectName}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                              task.priority === 'CRITICAL'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : task.priority === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-white/5 text-white/60 border border-white/10'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-white leading-snug group-hover:text-[#00E5FF] transition-colors">
                          {task.title}
                        </h4>

                        {/* Subtasks and Progress */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between text-xs text-[hsl(215_16%_60%)]">
                            <span>
                              {task.subtasks.filter((s) => s.isCompleted).length}/{task.subtasks.length} subtasks
                            </span>
                            <span className="font-mono font-bold text-white">{task.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#2962FF] to-[#00E5FF] rounded-full transition-all duration-300"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Assignee and Due Date */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-[hsl(215_16%_60%)]">
                          <div className="flex items-center gap-2">
                            <Avatar name={task.assigneeName} src={task.assigneeAvatar} size="xs" />
                            <span className="text-white/80 font-medium truncate max-w-[120px]">
                              {task.assigneeName}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-white/50">{formatDate(task.dueDate, 'MMM d')}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/30 text-muted-foreground font-semibold">
                <th className="p-3.5 pl-4">Task Title</th>
                <th className="p-3.5">Project</th>
                <th className="p-3.5">Assignee</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Progress</th>
                <th className="p-3.5 pr-4 text-right">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredTasks.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setSelectedTask(t)}
                  className="hover:bg-accent/40 transition-colors cursor-pointer"
                >
                  <td className="p-3.5 pl-4 font-bold text-foreground hover:text-primary">{t.title}</td>
                  <td className="p-3.5 text-muted-foreground">{t.projectName}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={t.assigneeName} src={t.assigneeAvatar} size="xs" />
                      <span>{t.assigneeName}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={t.status === 'BLOCKED' ? 'danger' : t.status === 'COMPLETED' ? 'success' : 'secondary'}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={t.priority === 'CRITICAL' ? 'danger' : t.priority === 'HIGH' ? 'warning' : 'outline'}>
                      {t.priority}
                    </Badge>
                  </td>
                  <td className="p-3.5 w-28">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-foreground">{t.progress}%</span>
                      <Progress value={t.progress} size="sm" />
                    </div>
                  </td>
                  <td className="p-3.5 pr-4 text-right text-muted-foreground">{formatDate(t.dueDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        defaultProjectId={selectedProjectId !== 'ALL' ? selectedProjectId : undefined}
      />
    </div>
  );
}
