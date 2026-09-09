'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Meeting, MeetingAttendance, MissedMeetingReason } from '@/lib/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate, formatTime } from '@/lib/utils';
import {
  CalendarDays,
  Clock,
  Video,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Shield,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { MissedMeetingDialog } from '@/components/meetings/MissedMeetingDialog';
import { MeetingTriageModal } from '@/components/meetings/MeetingTriageModal';
import { RaiseComplaintModal } from '@/components/dashboard/RaiseComplaintModal';

export default function MeetingsPage() {
  const { meetings, currentUser } = useStore();

  const [selectedMeeting, setSelectedMeeting] = useState<Meeting>(meetings[0]);
  const [explainDialog, setExplainDialog] = useState<{
    isOpen: boolean;
    meetingId: string;
    meetingTitle: string;
    userId: string;
    userName: string;
  }>({
    isOpen: false,
    meetingId: '',
    meetingTitle: '',
    userId: '',
    userName: '',
  });

  const [triageModalData, setTriageModalData] = useState<
    (MeetingAttendance & { meetingTitle?: string }) | null
  >(null);
  const [complaintTarget, setComplaintTarget] = useState<{ name: string; id: string } | null>(null);

  const activeMeeting = meetings.find((m) => m.id === selectedMeeting.id) || meetings[0];

  const presentCount = activeMeeting.attendances.filter((a) => a.status === 'PRESENT').length;
  const lateCount = activeMeeting.attendances.filter((a) => a.status === 'LATE').length;
  const absentCount = activeMeeting.attendances.filter((a) => a.status === 'ABSENT').length;
  const excusedCount = activeMeeting.attendances.filter((a) => a.status === 'EXCUSED').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <CalendarDays className="h-6 w-6 text-primary" />
            Meetings & Attendance Intelligence
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Empathetic absence workflows, clear reason explanations, and managerial follow-ups.
          </p>
        </div>
      </div>

      {/* Main Grid: Meeting List & Attendance Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Scheduled & Past Meetings List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            All Organization Meetings ({meetings.length})
          </h3>

          <div className="space-y-2.5">
            {meetings.map((m) => {
              const isSelected = activeMeeting.id === m.id;
              const hasAbsent = m.attendances.some((a) => a.status === 'ABSENT' && !a.isManagerExcused);

              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMeeting(m)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 bg-card ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary/20 shadow-md'
                      : 'border-border/80 hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Badge variant={m.status === 'Completed' ? 'secondary' : 'info'} className="text-[10px]">
                      {m.status}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">{formatDate(m.scheduledAt, 'MMM d, p')}</span>
                  </div>

                  <h4 className="text-sm font-bold text-foreground leading-snug">{m.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{m.description}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-border/40 text-xs">
                    <span className="text-[11px] text-muted-foreground">
                      {m.attendances.length} Participants
                    </span>
                    {hasAbsent && (
                      <Badge variant="warning" className="text-[10px] gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Absence Triage
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Selected Meeting Details & Attendance Roster */}
        <div className="lg:col-span-2 rounded-2xl border border-border/80 bg-card p-6 space-y-6 shadow-xs">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/60 pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">{activeMeeting.title}</h2>
                <Badge variant="outline">{activeMeeting.durationMins} Mins</Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{activeMeeting.description}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1 font-medium text-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  {formatDate(activeMeeting.scheduledAt, 'PPP p')}
                </span>
                <span>Organizer: {activeMeeting.organizerName}</span>
              </div>
            </div>

            {activeMeeting.meetingUrl && (
              <a
                href={activeMeeting.meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90 flex-shrink-0"
              >
                <Video className="h-3.5 w-3.5" />
                Join Video Link
              </a>
            )}
          </div>

          {/* Agenda & Attendance Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-400">Present (Green)</span>
              <p className="text-xl font-black text-emerald-400">{presentCount}</p>
            </div>
            <div className="p-3 rounded-xl border border-sky-400/30 bg-sky-400/5 space-y-1">
              <span className="text-[11px] font-semibold text-sky-400">Leave on Duty (Light Blue)</span>
              <p className="text-xl font-black text-sky-400">{excusedCount}</p>
            </div>
            <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-1">
              <span className="text-[11px] font-semibold text-rose-400">Uninformed Absent (Red)</span>
              <p className="text-xl font-black text-rose-400">{absentCount}</p>
            </div>
            <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1">
              <span className="text-[11px] font-semibold text-amber-400">Late (Amber)</span>
              <p className="text-xl font-black text-amber-400">{lateCount}</p>
            </div>
          </div>

          {/* Participant Roster & Absence Workflow */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Participant Attendance & Explanations ({activeMeeting.attendances.length})
            </h3>

            <div className="space-y-2.5">
              {activeMeeting.attendances.map((att) => {
                const isAbsent = att.status === 'ABSENT';
                const hasExplanation = !!att.missedReason;

                return (
                  <div
                    key={att.id}
                    className={`p-4 rounded-xl border transition-all space-y-2 bg-card ${
                      isAbsent && !att.isManagerExcused
                        ? 'border-amber-500/40 bg-amber-500/[0.02]'
                        : 'border-border/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Avatar name={att.userName} src={att.userAvatar} size="sm" />
                        <div>
                          <p className="text-xs font-bold text-foreground">{att.userName}</p>
                          <p className="text-[11px] text-muted-foreground">{att.userRole}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            att.status === 'PRESENT'
                              ? 'success'
                              : att.status === 'EXCUSED'
                              ? 'purple'
                              : att.status === 'LATE'
                              ? 'warning'
                              : 'danger'
                          }
                          className="text-[10px]"
                        >
                          {att.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Absence Explanation Note & Manager Triage Action */}
                    {isAbsent && (
                      <div className="rounded-lg bg-muted/20 border border-border/60 p-3 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-amber-500" />
                            Reason: {att.missedReason ? att.missedReason.replace('_', ' ') : 'Unexplained'}
                          </span>
                          {!hasExplanation && att.userId === currentUser.id && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                setExplainDialog({
                                  isOpen: true,
                                  meetingId: activeMeeting.id,
                                  meetingTitle: activeMeeting.title,
                                  userId: att.userId,
                                  userName: att.userName,
                                })
                              }
                              className="h-6 text-[10px]"
                            >
                              Provide Explanation
                            </Button>
                          )}
                        </div>

                        {att.explanationNote && (
                          <p className="text-foreground italic bg-background/60 p-2 rounded-md border border-border/40">
                            "{att.explanationNote}"
                          </p>
                        )}

                        {/* Manager Triage Button & Raise Complaint */}
                        <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px]">
                          <span className="text-muted-foreground">
                            {att.isManagerExcused
                              ? 'Excused by Manager'
                              : 'Pending Manager Acceptance'}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setComplaintTarget({ name: att.userName, id: att.userId })}
                              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold transition-all cursor-pointer shadow-xs"
                            >
                              Raise Complaint
                            </button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                setTriageModalData({
                                  ...att,
                                  meetingTitle: activeMeeting.title,
                                })
                              }
                              className="h-6 text-[11px] gap-1 text-primary hover:bg-primary/10"
                            >
                              <Shield className="h-3 w-3" />
                              Manager Triage
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Missed Meeting Dialog & Triage Modal */}
      <MissedMeetingDialog
        isOpen={explainDialog.isOpen}
        onClose={() => setExplainDialog({ ...explainDialog, isOpen: false })}
        meetingId={explainDialog.meetingId}
        meetingTitle={explainDialog.meetingTitle}
        userId={explainDialog.userId}
        userName={explainDialog.userName}
      />
      <MeetingTriageModal
        attendance={triageModalData}
        onClose={() => setTriageModalData(null)}
      />
      {complaintTarget && (
        <RaiseComplaintModal
          isOpen={!!complaintTarget}
          onClose={() => setComplaintTarget(null)}
          employeeName={complaintTarget.name}
          employeeId={complaintTarget.id}
        />
      )}
    </div>
  );
}
