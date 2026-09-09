'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Progress } from '@/components/ui/Progress';
import { formatDate } from '@/lib/utils';
import {
  FolderKanban,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  AlertOctagon,
  Sparkles,
  Layers,
  Users,
  Search,
  ChevronRight,
  CheckSquare,
} from 'lucide-react';
import { NewTaskModal } from '@/components/work/NewTaskModal';

export default function ProjectsAndTasksPage() {
  const {
    projects,
    tasks,
    users,
    setSelectedTask,
    updateTaskStatus,
  } = useStore();

  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('ALL');
  const [selectedTeam, setSelectedTeam] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'by_project' | 'by_team'>('by_project');

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const assignee = users.find((u) => u.id === task.assigneeId);
    const taskDept = assignee?.departmentName || 'Engineering';

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assigneeName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProject = selectedProjectId === 'ALL' || task.projectId === selectedProjectId;
    const matchesTeam = selectedTeam === 'ALL' || taskDept.toLowerCase().includes(selectedTeam.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || task.status === selectedStatus;

    return matchesSearch && matchesProject && matchesTeam && matchesStatus;
  });

  const teams = [
    { label: 'All Teams', value: 'ALL' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Product', value: 'Product' },
    { label: 'Design', value: 'Design' },
    { label: 'Operations', value: 'Operations' },
  ];

  const statuses = [
    { label: 'All Statuses', value: 'ALL' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Backlog / Planned', value: 'PLANNED' },
    { label: 'Blocked', value: 'BLOCKED' },
    { label: 'Completed', value: 'COMPLETED' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 py-2">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-2">
            <FolderKanban className="h-3.5 w-3.5" />
            <span>Projects & Operations Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Projects & Task Workload
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organized by team squads, milestone deliverables, subtasks, and real-time completion health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="md"
            variant="primary"
            onClick={() => setIsNewTaskOpen(true)}
            className="gap-2 text-xs font-bold shadow-saas rounded-xl"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Task</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">Active Projects</span>
          <p className="text-2xl font-black text-foreground mt-1">{projects.length}</p>
          <span className="text-[11px] text-muted-foreground">Engineering & product</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">Total Tasks</span>
          <p className="text-2xl font-black text-primary mt-1">{tasks.length}</p>
          <span className="text-[11px] text-muted-foreground">Across all squads</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">In Flight</span>
          <p className="text-2xl font-black text-blue-500 mt-1">
            {tasks.filter((t) => t.status === 'IN_PROGRESS').length}
          </p>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">Under active development</span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">Completed</span>
          <p className="text-2xl font-black text-emerald-500 mt-1">
            {tasks.filter((t) => t.status === 'COMPLETED').length}
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Shipped & verified</span>
        </div>
      </div>

      {/* 3. Filter & Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-card">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks, descriptions, or assignees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border/80 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            aria-label="Filter by Project"
            className="px-3 py-2 text-xs font-medium rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="ALL">All Projects ({projects.length})</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} - {p.name}
              </option>
            ))}
          </select>

          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            aria-label="Filter by Team"
            className="px-3 py-2 text-xs font-medium rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {teams.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter by Status"
            className="px-3 py-2 text-xs font-medium rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* View Toggles */}
          <div className="flex items-center rounded-xl border border-border/70 p-1 bg-muted/20">
            <button
              onClick={() => setViewMode('by_project')}
              className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                viewMode === 'by_project'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              By Project
            </button>
            <button
              onClick={() => setViewMode('by_team')}
              className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                viewMode === 'by_team'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              By Team
            </button>
          </div>
        </div>
      </div>

      {/* 4. WORKSPACE VIEW (GROUPED BY PROJECT) */}
      {viewMode === 'by_project' && (
        <div className="space-y-6">
          {projects
            .filter((p) => selectedProjectId === 'ALL' || p.id === selectedProjectId)
            .map((proj) => {
              const projectTasks = filteredTasks.filter((t) => t.projectId === proj.id);
              if (projectTasks.length === 0 && selectedProjectId !== 'ALL') return null;

              const completedCount = projectTasks.filter((t) => t.status === 'COMPLETED').length;
              const progressPct =
                projectTasks.length > 0
                  ? Math.round((completedCount / projectTasks.length) * 100)
                  : proj.progress;

              return (
                <div
                  key={proj.id}
                  className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-card"
                >
                  {/* Project Banner Header */}
                  <div className="p-6 border-b border-border/80 bg-muted/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                          {proj.code}
                        </span>
                        <h2 className="text-lg font-extrabold text-foreground">{proj.name}</h2>
                        <Badge variant={proj.health === 'On Track' ? 'success' : 'warning'}>
                          {proj.health}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground max-w-2xl">{proj.description}</p>
                    </div>

                    <div className="flex items-center gap-4 min-w-[200px]">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-bold text-foreground">{progressPct}%</span>
                        </div>
                        <Progress value={progressPct} size="sm" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        {completedCount}/{projectTasks.length} Done
                      </span>
                    </div>
                  </div>

                  {/* Tasks List within Project */}
                  {projectTasks.length === 0 ? (
                    <div className="p-8 text-center text-xs text-muted-foreground">
                      No tasks matching current filters in this project.
                    </div>
                  ) : (
                    <div className="divide-y divide-border/60">
                      {projectTasks.map((task) => {
                        const isDone = task.status === 'COMPLETED';
                        const isBlocked = task.status === 'BLOCKED';

                        return (
                          <div
                            key={task.id}
                            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-accent/20 transition-colors"
                          >
                            <div className="flex items-start gap-3.5 flex-1">
                              {/* Quick status check box */}
                              <button
                                onClick={() =>
                                  updateTaskStatus(
                                    task.id,
                                    isDone ? 'IN_PROGRESS' : 'COMPLETED'
                                  )
                                }
                                className={`mt-0.5 h-5 w-5 rounded-lg border flex items-center justify-center transition-all ${
                                  isDone
                                    ? 'bg-emerald-500 border-emerald-600 text-white'
                                    : 'border-border hover:border-primary text-transparent'
                                }`}
                                title={isDone ? 'Mark in progress' : 'Mark complete'}
                              >
                                <CheckSquare className="h-3.5 w-3.5" />
                              </button>

                              <div className="space-y-1.5 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3
                                    onClick={() => setSelectedTask(task)}
                                    className={`text-sm font-bold cursor-pointer hover:text-primary transition-colors ${
                                      isDone ? 'line-through text-muted-foreground' : 'text-foreground'
                                    }`}
                                  >
                                    {task.title}
                                  </h3>

                                  {isBlocked && (
                                    <Badge variant="danger" className="gap-1 text-[10px]">
                                      <AlertOctagon className="h-2.5 w-2.5" />
                                      Blocked
                                    </Badge>
                                  )}

                                  <Badge
                                    variant={
                                      task.priority === 'CRITICAL'
                                        ? 'danger'
                                        : task.priority === 'HIGH'
                                        ? 'warning'
                                        : 'outline'
                                    }
                                    className="text-[10px]"
                                  >
                                    {task.priority}
                                  </Badge>
                                </div>

                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {task.description}
                                </p>

                                {/* Subtasks snippet if present */}
                                {task.subtasks && task.subtasks.length > 0 && (
                                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-1">
                                    <span>
                                      Subtasks:{' '}
                                      {task.subtasks.filter((s) => s.isCompleted).length}/
                                      {task.subtasks.length}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Assignee & Actions */}
                            <div className="flex items-center gap-3 self-end sm:self-auto">
                              <div className="flex items-center gap-2">
                                <Avatar name={task.assigneeName} src={task.assigneeAvatar} size="xs" />
                                <span className="text-xs font-medium text-foreground">
                                  {task.assigneeName.split(' ')[0]}
                                </span>
                              </div>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedTask(task)}
                                className="text-xs font-semibold"
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* 5. WORKSPACE VIEW (GROUPED BY TEAM) */}
      {viewMode === 'by_team' && (
        <div className="space-y-6">
          {['Engineering', 'Product', 'Design', 'Operations'].map((teamName) => {
            const teamTasks = filteredTasks.filter((t) => {
              const assignee = users.find((u) => u.id === t.assigneeId);
              return assignee?.departmentName.toLowerCase().includes(teamName.toLowerCase());
            });
            if (teamTasks.length === 0 && selectedTeam !== 'ALL') return null;

            return (
              <div
                key={teamName}
                className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-card"
              >
                <div className="p-5 border-b border-border/80 bg-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <h2 className="text-base font-extrabold text-foreground">{teamName} Squad</h2>
                    <Badge variant="purple">{teamTasks.length} Tasks</Badge>
                  </div>
                </div>

                <div className="divide-y divide-border/60">
                  {teamTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 flex items-center justify-between gap-4 hover:bg-accent/20 transition-colors"
                    >
                      <div className="space-y-1">
                        <h3
                          onClick={() => setSelectedTask(task)}
                          className="text-sm font-bold text-foreground cursor-pointer hover:text-primary"
                        >
                          {task.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">{task.projectName}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant={task.status === 'COMPLETED' ? 'success' : 'outline'}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedTask(task)}
                          className="text-xs"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Task Modal */}
      <NewTaskModal isOpen={isNewTaskOpen} onClose={() => setIsNewTaskOpen(false)} />
    </div>
  );
}
