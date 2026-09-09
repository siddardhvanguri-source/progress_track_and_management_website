'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import {
  Users,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ChevronRight,
  Layers,
  FolderKanban,
  CheckSquare,
  Calendar,
  Grid,
  List,
  Phone,
  Mail,
  UserPlus,
  Clock,
  CheckCircle2,
  Rocket,
  Bug,
  Search as SearchIcon,
  FlaskConical,
  SlidersHorizontal,
  MoreHorizontal,
  CalendarDays,
  FileText,
} from 'lucide-react';
import { NewTaskModal } from '@/components/work/NewTaskModal';
import { LeaveRequestModal } from '@/components/leave/LeaveRequestModal';

export default function TeamsPage() {
  const { users, tasks, projects, setSelectedEmployee, setSelectedTask, updateTaskStatus } = useStore();

  const [activeTab, setActiveTab] = useState<'board' | 'overview' | 'tasks'>('overview');
  const [timelineView, setTimelineView] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  // Filtered members list
  const filteredMembers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === 'ALL' ||
      (selectedStatusFilter === 'WORKING' && u.attendanceStatus === 'WORKING') ||
      (selectedStatusFilter === 'REMOTE' && u.attendanceStatus === 'REMOTE') ||
      (selectedStatusFilter === 'ON_LEAVE' && u.attendanceStatus === 'ON_LEAVE');

    return matchesSearch && matchesStatus;
  });

  // Timeline Gantt rows matching template (Image 1)
  const timelineTracks = [
    {
      title: 'Research',
      bars: [
        { label: 'About 4 hours', start: '10 AM', end: '2 PM', width: '28%', left: '8%', avatars: [users[0], users[1]] },
      ],
    },
    {
      title: 'Wireframe',
      bars: [
        { label: 'About 3 hours', start: '11 AM', end: '2 PM', width: '22%', left: '16%', avatars: [users[2]] },
        { label: 'About 6 hours', start: '3 PM', end: '9 PM', width: '42%', left: '50%', avatars: [users[3], users[4], users[5]] },
      ],
    },
    {
      title: 'UI Design',
      bars: [
        { label: 'About 5 hours', start: '12 PM', end: '5 PM', width: '36%', left: '24%', avatars: [users[0], users[6]] },
      ],
    },
    {
      title: 'Usability Testing',
      bars: [
        { label: 'About 4 hours', start: '1 PM', end: '5 PM', width: '28%', left: '32%', avatars: [users[7], users[8]] },
        { label: 'About 3 hours', start: '7 PM', end: '10 PM', width: '22%', left: '72%', avatars: [users[1]] },
      ],
    },
  ];

  const timeAxis = ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'];

  // Grouped task tables matching reference template (Image 2)
  const taskGroups = [
    {
      id: 'group-1',
      title: 'Refactor login flow',
      badge: 4,
      items: [
        {
          id: 't-1',
          name: 'Decouple UI from auth logic',
          people: [users[0], users[1], users[2], users[3]],
          type: 'Feature',
          typeIcon: Rocket,
          timeline: 'June 24, 2026 - July 3, 2026',
          priority: 'High',
          progress: 40,
          progressColor: 'bg-emerald-500',
        },
        {
          id: 't-2',
          name: 'Migrate to token-based session handling',
          people: [users[4], users[5]],
          type: 'Bug',
          typeIcon: Bug,
          timeline: 'June 29, 2026 - July 7, 2026',
          priority: 'High',
          progress: 30,
          progressColor: 'bg-amber-500',
        },
        {
          id: 't-3',
          name: 'Implement error handling for failed logins',
          people: [users[6], users[7], users[8]],
          type: 'Review',
          typeIcon: SearchIcon,
          timeline: 'July 2, 2026 - July 5, 2026',
          priority: 'Medium',
          progress: 20,
          progressColor: 'bg-rose-500',
        },
        {
          id: 't-4',
          name: 'Update unit tests for login module',
          people: [users[0], users[2]],
          type: 'Testing',
          typeIcon: FlaskConical,
          timeline: 'July 6, 2026 - July 8, 2026',
          priority: 'Low',
          progress: 40,
          progressColor: 'bg-emerald-500',
        },
      ],
    },
    {
      id: 'group-2',
      title: 'Optimize Task List Performance',
      badge: 5,
      items: [
        {
          id: 't-5',
          name: 'Implement virtual scrolling for large lists',
          people: [users[1], users[3], users[5], users[7]],
          type: 'Feature',
          typeIcon: Rocket,
          timeline: 'July 5, 2026 - July 6, 2026',
          priority: 'High',
          progress: 40,
          progressColor: 'bg-emerald-500',
        },
        {
          id: 't-6',
          name: 'Debounce search and filter input fields',
          people: [users[0], users[4]],
          type: 'Bug',
          typeIcon: Bug,
          timeline: 'July 5, 2026 - July 6, 2026',
          priority: 'High',
          progress: 30,
          progressColor: 'bg-amber-500',
        },
        {
          id: 't-7',
          name: 'Lazy-load task metadata (comments, activity)',
          people: [users[2], users[6], users[8]],
          type: 'Review',
          typeIcon: SearchIcon,
          timeline: 'July 8, 2026 - July 9, 2026',
          priority: 'Medium',
          progress: 20,
          progressColor: 'bg-rose-500',
        },
        {
          id: 't-8',
          name: 'Profile and reduce re-renders of task rows',
          people: [users[1], users[5]],
          type: 'Testing',
          typeIcon: FlaskConical,
          timeline: 'July 10, 2026 - July 12, 2026',
          priority: 'Low',
          progress: 40,
          progressColor: 'bg-emerald-500',
        },
        {
          id: 't-9',
          name: 'Create wireframes for updated layout',
          people: [users[0], users[3]],
          type: 'Testing',
          typeIcon: FlaskConical,
          timeline: 'July 6, 2026 - July 8, 2026',
          priority: 'Low',
          progress: 40,
          progressColor: 'bg-emerald-500',
        },
      ],
    },
  ];

  const getStatusBadge = (status: string, idx: number) => {
    if (status === 'ON_LEAVE') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#faf5ff] dark:bg-purple-900/30 text-[#7e22ce] dark:text-purple-300 border border-purple-100 dark:border-purple-800/40">
          On Leave
        </span>
      );
    }
    if (status === 'REMOTE' || idx % 3 === 0) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#fff7ed] dark:bg-amber-900/30 text-[#c2410c] dark:text-amber-300 border border-amber-100 dark:border-amber-800/40">
          Remote
        </span>
      );
    }
    if (idx % 4 === 2) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#eff6ff] dark:bg-blue-900/30 text-[#2563eb] dark:text-blue-300 border border-blue-100 dark:border-blue-800/40">
          Part-time
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#ecfdf5] dark:bg-emerald-900/30 text-[#059669] dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/40">
        Active
      </span>
    );
  };

  const getPriorityBadge = (p: string) => {
    if (p === 'High') {
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400">
          High
        </span>
      );
    }
    if (p === 'Medium') {
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
          Medium
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
        Low
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. TOP HEADER & ACTION BUTTONS */}
      <div className="space-y-4">
        <span className="text-xs font-semibold text-gray-400 block">Teams</span>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Teams
          </h1>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSelectedEmployee(users[0])}
              className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>New Member</span>
            </button>

            <button
              onClick={() => setIsNewTaskOpen(true)}
              className="px-4 py-2 rounded-xl border border-gray-200/90 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all flex items-center gap-2"
            >
              <FolderKanban className="h-3.5 w-3.5" />
              <span>New Project</span>
            </button>

            <button
              onClick={() => setIsNewTaskOpen(true)}
              className="px-4 py-2 rounded-xl border border-gray-200/90 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all flex items-center gap-2"
            >
              <CheckSquare className="h-3.5 w-3.5" />
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Subheader Navigation Tabs matching template */}
        <div className="flex items-center gap-6 border-b border-gray-200/80 dark:border-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 pt-2">
          <button
            id="tab-dept-board"
            onClick={() => setActiveTab('board')}
            className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'board'
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white font-bold'
                : 'hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Department Board</span>
          </button>

          <button
            id="tab-team-overview"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white font-bold'
                : 'hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Team Overview</span>
          </button>

          <button
            id="tab-all-tasks"
            onClick={() => setActiveTab('tasks')}
            className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tasks'
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white font-bold'
                : 'hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" />
            <span>All tasks</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TEAM OVERVIEW VIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Members Bar */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">
                Members
              </h2>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-8 py-1.5 text-xs rounded-xl border border-gray-200/90 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400">
                    ⌘F
                  </span>
                </div>

                <button
                  onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'ALL' ? 'WORKING' : 'ALL')}
                  className="px-3 py-1.5 rounded-xl border border-gray-200/90 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </button>

                <div className="flex items-center rounded-xl border border-gray-200/90 dark:border-gray-800 p-0.5">
                  <button className="p-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                    <Grid className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 rounded-lg text-gray-400 hover:text-gray-700">
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4-Column Member Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredMembers.slice(0, 8).map((member, idx) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedEmployee(member)}
                  className="p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-[#181c28] hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-start justify-between">
                    <Avatar
                      name={member.name}
                      src={member.avatarUrl}
                      size="md"
                      className="ring-2 ring-gray-100 dark:ring-gray-800"
                    />
                    {getStatusBadge(member.attendanceStatus, idx)}
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {member.jobTitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-gray-100 dark:border-gray-800/80">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Department</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 truncate block">
                        {member.departmentName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Joining</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 truncate block">
                        {formatDate(member.joinedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
                    <div className="space-y-0.5 truncate">
                      <p className="truncate hover:underline">{member.email}</p>
                      <p className="text-[10px] text-gray-400">(209) 555-01{idx + 10}</p>
                    </div>
                    <span className="h-6 w-6 rounded-full flex items-center justify-center text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM TIMELINE */}
          <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-[#181c28] p-5 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  December 12, 2026
                </h3>
                <ChevronRight className="h-4 w-4 text-gray-400 cursor-pointer" />
              </div>

              <div className="flex items-center rounded-xl border border-gray-200/90 dark:border-gray-800 p-0.5 text-xs font-semibold">
                {(['day', 'week', 'month', 'year'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setTimelineView(view)}
                    className={`px-3 py-1 rounded-lg uppercase text-[10px] font-bold tracking-wider transition-all ${
                      timelineView === view
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {timelineTracks.map((track, tIdx) => (
                <div key={tIdx} className="grid grid-cols-12 gap-2 items-center text-xs">
                  <span className="col-span-2 font-bold text-gray-700 dark:text-gray-300 text-xs truncate">
                    {track.title}
                  </span>

                  <div className="col-span-10 relative h-10 bg-gray-50/50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-200/70 dark:border-gray-800 flex items-center">
                    {track.bars.map((bar, bIdx) => (
                      <div
                        key={bIdx}
                        style={{ left: bar.left, width: bar.width }}
                        className="absolute h-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/90 dark:border-gray-700 px-3 flex items-center justify-between shadow-xs hover:shadow-sm transition-all"
                      >
                        <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-200 truncate">
                          {bar.label}
                        </span>
                        <div className="flex items-center -space-x-1.5 shrink-0 ml-1">
                          {bar.avatars.map((av, avIdx) => (
                            <Avatar
                              key={avIdx}
                              name={av?.name || 'User'}
                              src={av?.avatarUrl}
                              size="xs"
                              className="ring-1 ring-white dark:ring-gray-800"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-12 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-[10px] font-mono text-gray-400">
                <span className="col-span-2" />
                <div className="col-span-10 flex justify-between px-2">
                  {timeAxis.map((time, idx) => (
                    <span key={idx}>{time}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALL TASKS GROUPED VIEW */}
      {activeTab === 'tasks' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">
              All tasks
            </h2>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-8 py-1.5 text-xs rounded-xl border border-gray-200/90 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400">
                  ⌘F
                </span>
              </div>

              <button className="px-3 py-1.5 rounded-xl border border-gray-200/90 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {taskGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-[#181c28] overflow-hidden shadow-xs"
              >
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/40 dark:bg-gray-800/20">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      {group.title}
                    </h3>
                    <span className="px-1.5 py-0.2 rounded-md bg-gray-200/80 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] font-semibold">
                      📄 {group.badge}
                    </span>
                  </div>

                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs flex items-center gap-1 font-medium">
                    <SlidersHorizontal className="h-3 w-3" />
                    <span>Filter</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800 text-[11px] font-semibold text-gray-400 bg-gray-50/20 dark:bg-gray-800/10">
                        <th className="py-3 px-4 font-semibold">Task name</th>
                        <th className="py-3 px-4 font-semibold">People</th>
                        <th className="py-3 px-4 font-semibold">Type</th>
                        <th className="py-3 px-4 font-semibold">Timeline</th>
                        <th className="py-3 px-4 font-semibold">Priority</th>
                        <th className="py-3 px-4 font-semibold">Progress</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {group.items.map((item) => {
                        const TypeIcon = item.typeIcon;
                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40 transition-colors cursor-pointer"
                          >
                            <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center -space-x-1.5">
                                {item.people.map((p, pIdx) => (
                                  <Avatar
                                    key={pIdx}
                                    name={p.name}
                                    src={p.avatarUrl}
                                    size="xs"
                                    className="ring-1 ring-white dark:ring-gray-800"
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-[11px] font-medium">
                                <TypeIcon className="h-3 w-3 text-gray-500" />
                                {item.type}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-[11px]">
                              {item.timeline}
                            </td>
                            <td className="py-3 px-4">
                              {getPriorityBadge(item.priority)}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                                  {item.progress}%
                                </span>
                                <div className="w-16 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${item.progressColor} rounded-full`}
                                    style={{ width: `${item.progress}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DEPARTMENT BOARD VIEW */}
      {activeTab === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in">
          {['Engineering', 'Product', 'Design', 'Operations'].map((dept) => {
            const deptUsers = users.filter((u) => u.departmentName.toLowerCase().includes(dept.toLowerCase()));

            return (
              <div
                key={dept}
                className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/40 dark:bg-gray-800/20 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    {dept}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {deptUsers.length} Members
                  </span>
                </div>

                <div className="space-y-2">
                  {deptUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedEmployee(user)}
                      className="p-3 rounded-xl bg-white dark:bg-[#181c28] border border-gray-200/70 dark:border-gray-800 hover:border-gray-300 cursor-pointer shadow-xs space-y-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <Avatar name={user.name} src={user.avatarUrl} size="xs" />
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-[10px] text-gray-500">{user.jobTitle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Global Modals */}
      <NewTaskModal isOpen={isNewTaskOpen} onClose={() => setIsNewTaskOpen(false)} />
      <LeaveRequestModal isOpen={isLeaveModalOpen} onClose={() => setIsLeaveModalOpen(false)} />
    </div>
  );
}
