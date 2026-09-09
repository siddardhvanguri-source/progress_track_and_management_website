'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { WeeklyCheckin, ConfidenceLevel } from '@/lib/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';
import {
  CheckCircle2,
  Sparkles,
  Send,
  HelpCircle,
  AlertOctagon,
  MessageSquare,
  Smile,
  Meh,
  Frown,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckinsPage() {
  const { checkins, currentUser, submitWeeklyCheckin, reviewWeeklyCheckin, currentRole } = useStore();

  const [activeTab, setActiveTab] = useState<'submit' | 'feed'>('feed');

  // Form State
  const [completed, setCompleted] = useState('');
  const [upcoming, setUpcoming] = useState('');
  const [blockers, setBlockers] = useState('');
  const [support, setSupport] = useState('');
  const [confidence, setConfidence] = useState<ConfidenceLevel>('HIGH');

  // Manager Review State
  const [reviewNote, setReviewNote] = useState<Record<string, string>>({});

  const handleSubmitCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completed.trim() || !upcoming.trim()) return;

    submitWeeklyCheckin({
      userId: currentUser.id,
      completedHighlights: completed,
      upcomingPriorities: upcoming,
      activeBlockers: blockers,
      supportNeeded: support,
      confidence,
    });

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}

    setCompleted('');
    setUpcoming('');
    setBlockers('');
    setSupport('');
    setActiveTab('feed');
  };

  const handleReview = (checkinId: string) => {
    const note = reviewNote[checkinId] || 'Acknowledged and reviewed.';
    reviewWeeklyCheckin(checkinId, note);
  };

  const isManager = currentRole === 'MANAGER' || currentRole === 'ADMIN' || currentRole === 'HR';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            Weekly Progress Check-ins
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            5-question weekly reflections aligning progress, next milestones, blockers, and confidence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-border/70 p-0.5 bg-card">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${
                activeTab === 'feed'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Team Stream ({checkins.length})
            </button>
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${
                activeTab === 'submit'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Submit Check-in
            </button>
          </div>
        </div>
      </div>

      {/* SUBMIT TAB: 5 Questions */}
      {activeTab === 'submit' && (
        <div className="max-w-2xl mx-auto rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-5">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-base font-bold text-foreground">Week 36 Check-in Submission</h2>
            <p className="text-xs text-muted-foreground">
              Your weekly reflection provides visibility and helps managers remove roadblocks.
            </p>
          </div>

          <form onSubmit={handleSubmitCheckin} className="space-y-4">
            {/* Q1 */}
            <Textarea
              label="1. What did you complete this week?"
              placeholder="e.g. Shipped SCIM 2.0 provisioning webhooks, merged 4 PRs for distributed tracing..."
              rows={3}
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
              required
            />

            {/* Q2 */}
            <Textarea
              label="2. What are you working on next?"
              placeholder="e.g. Pen-testing remediations for PKCE and CORS on auth gateway..."
              rows={3}
              value={upcoming}
              onChange={(e) => setUpcoming(e.target.value)}
              required
            />

            {/* Q3 */}
            <Textarea
              label="3. What is blocking you? (Optional)"
              placeholder="e.g. AWS KMS key IAM trust delegation from SecOps..."
              rows={2}
              value={blockers}
              onChange={(e) => setBlockers(e.target.value)}
            />

            {/* Q4 */}
            <Textarea
              label="4. Do you need help or escalation?"
              placeholder="e.g. Need Aisha from SecOps to re-scan staging after Friday deployment."
              rows={2}
              value={support}
              onChange={(e) => setSupport(e.target.value)}
            />

            {/* Q5: Confidence Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                5. How confident are you about next week's goals & deadlines?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { level: 'HIGH' as const, label: 'High Confidence', icon: Smile, color: 'text-emerald-500' },
                  { level: 'MEDIUM' as const, label: 'Medium (Some Risks)', icon: Meh, color: 'text-amber-500' },
                  { level: 'LOW' as const, label: 'Low (Heavy Blockers)', icon: Frown, color: 'text-rose-500' },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.level}
                      type="button"
                      onClick={() => setConfidence(c.level)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                        confidence === c.level
                          ? 'border-primary bg-primary/10 text-primary shadow-xs'
                          : 'border-border/70 hover:bg-accent text-muted-foreground'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${c.color}`} />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-border">
              <Button type="submit" variant="primary" size="md" className="gap-2">
                <Send className="h-4 w-4" />
                Submit Weekly Reflection
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* FEED TAB: Manager Review Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
          {checkins.map((chk) => (
            <div
              key={chk.id}
              className={`rounded-2xl border p-5 shadow-xs transition-all space-y-4 bg-card ${
                !chk.isReviewed ? 'border-primary/40 bg-primary/[0.01]' : 'border-border/80'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex items-center gap-3">
                  <Avatar name={chk.userName} src={chk.userAvatar} size="sm" />
                  <div>
                    <h3 className="text-xs font-bold text-foreground">{chk.userName}</h3>
                    <p className="text-[11px] text-muted-foreground">
                      {chk.userJobTitle} • {chk.departmentName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={chk.confidence === 'HIGH' ? 'success' : 'warning'}>
                    Confidence: {chk.confidence}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">
                    Week {chk.weekNumber}, {chk.year}
                  </span>
                </div>
              </div>

              {/* 4 Answers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 bg-muted/15 p-3 rounded-xl border border-border/50">
                  <span className="font-bold text-muted-foreground uppercase text-[10px]">
                    1. Completed This Week:
                  </span>
                  <p className="text-foreground leading-relaxed">{chk.completedHighlights}</p>
                </div>

                <div className="space-y-1 bg-muted/15 p-3 rounded-xl border border-border/50">
                  <span className="font-bold text-muted-foreground uppercase text-[10px]">
                    2. Next Priorities:
                  </span>
                  <p className="text-foreground leading-relaxed">{chk.upcomingPriorities}</p>
                </div>

                {chk.activeBlockers && (
                  <div className="space-y-1 bg-rose-500/5 p-3 rounded-xl border border-rose-500/20 md:col-span-2">
                    <span className="font-bold text-rose-500 uppercase text-[10px]">
                      3. Active Blockers:
                    </span>
                    <p className="text-foreground leading-relaxed">{chk.activeBlockers}</p>
                  </div>
                )}
              </div>

              {/* Manager Feedback */}
              {chk.managerNotes ? (
                <div className="p-3 rounded-xl bg-muted/30 border border-border text-xs space-y-1">
                  <span className="font-bold text-primary flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Manager Review Note:
                  </span>
                  <p className="text-foreground">{chk.managerNotes}</p>
                </div>
              ) : (
                isManager && (
                  <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                    <input
                      type="text"
                      placeholder="Add manager feedback & acknowledge check-in..."
                      value={reviewNote[chk.id] || ''}
                      onChange={(e) => setReviewNote({ ...reviewNote, [chk.id]: e.target.value })}
                      className="flex-1 px-3 py-1.5 text-xs bg-muted/20 border border-input rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleReview(chk.id)}
                      className="text-xs h-8"
                    >
                      Acknowledge
                    </Button>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
