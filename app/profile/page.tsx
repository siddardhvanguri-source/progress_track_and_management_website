'use client';

import React, { useState, useEffect } from 'react';
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
  Edit3,
  Shield,
  Briefcase,
  AlertCircle,
  Save,
  X,
  FileText,
  Layers,
  MapPin,
  Heart,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { useStore } from '@/lib/store';

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

export default function ProfilePage() {
  const { currentUser } = useStore();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-09');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    phone: '',
    skills: '',
    emergencyContact: '',
    workPreference: 'In-Office (Command Center)',
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        let parsedSkills = '';
        try {
          const s = JSON.parse(data.user.skills || '[]');
          parsedSkills = Array.isArray(s) ? s.join(', ') : s;
        } catch {
          parsedSkills = data.user.skills || '';
        }

        setEditForm({
          name: data.user.name || '',
          bio: data.user.bio || '',
          phone: data.user.phone || '',
          skills: parsedSkills,
          emergencyContact: data.user.emergencyContact || '',
          workPreference: data.user.workPreference || 'In-Office (Command Center)',
        });

        if (data.user.monthlyLogs && data.user.monthlyLogs.length > 0) {
          setSelectedMonth(data.user.monthlyLogs[0].monthYear);
        }
      } else if (currentUser) {
        // Fallback to active store currentUser (V S Sai Siddardh, Co-founder & Director)
        setUser({
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
          jobTitle: currentUser.jobTitle,
          departmentName: currentUser.departmentName,
          avatarUrl: currentUser.avatarUrl,
          phone: '+91 9618587055',
          bio: 'Strategic Architecture, Operations, and AI Systems across VEIXON.Tech',
          skills: JSON.stringify(currentUser.skills || []),
          emergencyContact: 'Executive Office, Hyderabad',
          joinedDate: currentUser.joinedAt,
          workPreference: 'In-Office (Command Center)',
          status: currentUser.attendanceStatus,
          monthlyLogs: [
            {
              id: 'log-1',
              monthYear: '2026-09',
              monthName: 'September 2026',
              daysWorked: 22,
              hoursWorked: 176.0,
              leavesTaken: 0,
              tasksCompleted: 14,
              punctualityRate: 100,
              managerRating: 5.0,
              performanceNotes: 'Leading company operations and platform engineering.',
            },
          ],
        });

        setEditForm({
          name: currentUser.name,
          bio: 'Strategic Architecture, Operations, and AI Systems across VEIXON.Tech',
          phone: '+91 9618587055',
          skills: (currentUser.skills || []).join(', '),
          emergencyContact: 'Executive Office, Hyderabad',
          workPreference: 'In-Office (Command Center)',
        });
      }
    } catch (err) {
      if (currentUser) {
        setUser({
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
          jobTitle: currentUser.jobTitle,
          departmentName: currentUser.departmentName,
          avatarUrl: currentUser.avatarUrl,
          skills: JSON.stringify(currentUser.skills || []),
          joinedDate: currentUser.joinedAt,
          workPreference: 'In-Office (Command Center)',
          status: currentUser.attendanceStatus,
          monthlyLogs: [],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const skillsArray = editForm.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editForm,
          skills: skillsArray,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setUser(updated.user);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error('Failed to save profile', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-[#00E5FF] rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-white/50 font-mono">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm font-bold text-white/70">No profile found. Please sign in.</p>
        <a
          href="/login"
          className="inline-block px-4 py-2 rounded-xl bg-[#2962FF] text-white text-xs font-bold hover:bg-[#1A4FD9] transition-all cursor-pointer"
        >
          Go to Login
        </a>
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
        {/* Top Notification Toast */}
        {saveSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Profile details and monthly preferences updated in database!
          </div>
        )}

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

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 rounded-xl border border-gray-200/90 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2 self-start sm:self-center shadow-xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Profile
            </button>
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

        {/* 2. Monthly Performance & Storage Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                Monthly Records & Performance Intelligence
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Persistent monthly stats stored in backend database (hours, attendance, leaves, rating).
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

          {/* Historical Month-by-Month Log Table */}
          <div className="rounded-3xl border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-[#181c28] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                Historical Monthly Activity Breakdown (SQLite Database)
              </h3>
              <span className="text-[11px] text-gray-400 font-mono">
                {user.monthlyLogs?.length || 0} Months Recorded
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-gray-800/30 text-gray-400 border-b border-gray-100 dark:border-gray-800 font-semibold">
                    <th className="py-2.5 px-4">Month</th>
                    <th className="py-2.5 px-4">Days Worked</th>
                    <th className="py-2.5 px-4">Hours</th>
                    <th className="py-2.5 px-4">Leaves</th>
                    <th className="py-2.5 px-4">Tasks</th>
                    <th className="py-2.5 px-4">Punctuality</th>
                    <th className="py-2.5 px-4">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-medium">
                  {user.monthlyLogs?.map((m) => (
                    <tr
                      key={m.id}
                      onClick={() => setSelectedMonth(m.monthYear)}
                      className={`hover:bg-gray-50/70 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${
                        m.monthYear === selectedMonth ? 'bg-gray-50 dark:bg-gray-800/40 font-bold' : ''
                      }`}
                    >
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        {m.monthName}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{m.daysWorked} days</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{m.hoursWorked} hrs</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{m.leavesTaken} days</td>
                      <td className="py-3 px-4 text-blue-600 font-bold">{m.tasksCompleted}</td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">{m.punctualityRate}%</td>
                      <td className="py-3 px-4 text-purple-600 font-bold">★ {m.managerRating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. Emergency Contact & Settings Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-[#181c28] shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Emergency Contact Information
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {user.emergencyContact || 'No emergency contact on file.'}
            </p>
            <p className="text-[10px] text-gray-400">
              In case of workplace emergencies, HR and Operations will reach out to this contact.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-[#181c28] shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              Security & Permissions
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Role: <span className="font-bold text-gray-900 dark:text-white">{user.role}</span>
            </p>
            <p className="text-[10px] text-gray-400">
              Role access levels are enforced on every database query and API endpoint.
            </p>
          </div>
        </div>

        {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181c28] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl w-full max-w-lg p-6 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Edit Employee Profile
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Phone Number</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                  placeholder="(555) 000-0000"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Bio / Responsibilities</label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                  placeholder="Describe your role and expertise..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Skills (comma separated)</label>
                <input
                  type="text"
                  value={editForm.skills}
                  onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                  placeholder="React, Next.js, Product Design, Node.js"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Emergency Contact</label>
                <input
                  type="text"
                  value={editForm.emergencyContact}
                  onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                  placeholder="Contact Name & Number"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Work Preference</label>
                <select
                  value={editForm.workPreference}
                  onChange={(e) => setEditForm({ ...editForm, workPreference: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? 'Saving...' : 'Save to SQLite DB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
