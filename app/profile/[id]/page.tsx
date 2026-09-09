'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  Award,
  BarChart3,
  TrendingUp,
  Shield,
  Briefcase,
  AlertCircle,
  FileText,
  Layers,
  MapPin,
  Heart,
  ChevronLeft,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

interface MonthlyLog {
  id: string;
  monthYear: string;
  monthName: string;
  daysWorked: number;
  hoursWorked: number;
  leavesTaken: number;
  tasksCompleted: number;
  punctualityRate: number;
  managerRating: number;
  performanceNotes?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  jobTitle: string;
  departmentName: string;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  skills: string;
  emergencyContact?: string;
  joinedDate: string;
  workPreference: string;
  status: string;
  monthlyLogs: MonthlyLog[];
  tasks?: any[];
  leaveRequests?: any[];
}

export default function EmployeeProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-09');

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          if (data.user.monthlyLogs && data.user.monthlyLogs.length > 0) {
            setSelectedMonth(data.user.monthlyLogs[0].monthYear);
          }
        }
      } catch (err) {
        console.error('Failed to fetch employee details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-[#00E5FF] rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-white/50 font-mono">Loading member record...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm font-bold text-white/70">Employee not found.</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Parse skills
  let userSkills: string[] = [];
  try {
    userSkills = JSON.parse(user.skills || '[]');
  } catch {
    userSkills = (user.skills || '').split(',').map((s) => s.trim());
  }

  // Active monthly log
  const activeLog =
    user.monthlyLogs?.find((l) => l.monthYear === selectedMonth) ||
    user.monthlyLogs?.[0] || {
      monthYear: '2026-09',
      monthName: 'September 2026',
      daysWorked: 22,
      hoursWorked: 176.0,
      leavesTaken: 0,
      tasksCompleted: 8,
      punctualityRate: 99.0,
      managerRating: 4.9,
      performanceNotes: 'Consistent high quality execution and teamwork.',
    };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in">
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Directory
        </button>

        {/* 1. Profile Header Banner */}
        <div className="rounded-3xl border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-[#181c28] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <Avatar name={user.name} src={user.avatarUrl} size="lg" />
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">
                    {user.name}
                  </h1>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                    {user.role}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {user.workPreference}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {user.jobTitle} • <span className="text-gray-700 dark:text-gray-300 font-semibold">{user.departmentName}</span>
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {user.email}
                  </span>
                  {user.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {user.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Joined {user.joinedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Box */}
          {user.bio && (
            <div className="p-4 rounded-2xl bg-gray-50/60 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="font-semibold text-gray-900 dark:text-white mb-1">About & Responsibilities</p>
              {user.bio}
            </div>
          )}

          {/* Skills Badges */}
          {userSkills.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Expertise & Skills
              </span>
              <div className="flex flex-wrap gap-2">
                {userSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Monthly Performance Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                Monthly Performance History
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Track hours, leaves, and quality metrics across months.
              </p>
            </div>

            {/* Month Selector Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Select Month:</span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl border border-gray-200/90 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer shadow-xs"
              >
                {user.monthlyLogs?.map((log) => (
                  <option key={log.id} value={log.monthYear}>
                    {log.monthName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 6 Monthly Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#181c28] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Hours Logged</p>
              <p className="text-xl font-extrabold text-gray-900 dark:text-white">
                {activeLog.hoursWorked} <span className="text-xs font-normal text-gray-400">hrs</span>
              </p>
              <p className="text-[10px] text-emerald-600 font-semibold">100% target met</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#181c28] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Days Worked</p>
              <p className="text-xl font-extrabold text-gray-900 dark:text-white">
                {activeLog.daysWorked} <span className="text-xs font-normal text-gray-400">days</span>
              </p>
              <p className="text-[10px] text-gray-400 font-semibold">Full schedule</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#181c28] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Leaves Taken</p>
              <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
                {activeLog.leavesTaken} <span className="text-xs font-normal text-gray-400">days</span>
              </p>
              <p className="text-[10px] text-gray-400 font-semibold">Approved leave</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#181c28] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Punctuality</p>
              <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {activeLog.punctualityRate}%
              </p>
              <p className="text-[10px] text-emerald-600 font-semibold">Top tier</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#181c28] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Tasks Delivered</p>
              <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                {activeLog.tasksCompleted}
              </p>
              <p className="text-[10px] text-blue-600 font-semibold">Completed</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#181c28] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Manager Rating</p>
              <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400">
                ★ {activeLog.managerRating}
              </p>
              <p className="text-[10px] text-purple-600 font-semibold">Exceeds expectations</p>
            </div>
          </div>

          {/* Monthly Feedback Box from DB */}
          {activeLog.performanceNotes && (
            <div className="p-4 rounded-2xl bg-white dark:bg-[#181c28] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
              <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                Manager Review for {activeLog.monthName}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                "{activeLog.performanceNotes}"
              </p>
            </div>
          )}
        </div>
      </div>
  );
}
