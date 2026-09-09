'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MeetingAttendance } from '@/lib/types';
import { CheckCircle2, MessageSquare, Calendar, HelpCircle, Shield } from 'lucide-react';

interface MeetingTriageModalProps {
  attendance: (MeetingAttendance & { meetingTitle?: string }) | null;
  onClose: () => void;
}

export function MeetingTriageModal({ attendance, onClose }: MeetingTriageModalProps) {
  const { triageMissedMeeting } = useStore();
  const [action, setAction] = useState<'Accept' | 'Clarification' | 'Excuse' | 'Schedule 1:1'>('Accept');
  const [feedback, setFeedback] = useState('');

  if (!attendance) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isExcused = action === 'Accept' || action === 'Excuse';
    triageMissedMeeting(attendance.meetingId, attendance.userId, action, isExcused, feedback);
    onClose();
    setFeedback('');
  };

  return (
    <Modal
      isOpen={!!attendance}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-primary" />
          <span>Triage Missed Meeting: {attendance.userName}</span>
        </div>
      }
      description={`Meeting: "${attendance.meetingTitle || 'Meeting'}"`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2 text-xs">
          <div>
            <span className="font-semibold text-muted-foreground">Submitted Reason:</span>
            <span className="ml-2 font-bold text-foreground">
              {attendance.missedReason ? attendance.missedReason.replace('_', ' ') : 'Unexplained'}
            </span>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground">Employee Explanation:</span>
            <p className="mt-0.5 text-foreground leading-relaxed">
              {attendance.explanationNote || 'No extra note provided.'}
            </p>
          </div>
        </div>

        <Select
          label="Manager Action"
          value={action}
          onChange={(e) => setAction(e.target.value as any)}
        >
          <option value="Accept">Accept Explanation & Mark Excused</option>
          <option value="Excuse">Mark Excused (No action needed)</option>
          <option value="Clarification">Request Clarification / More Context</option>
          <option value="Schedule 1:1">Schedule 1:1 Sync / Follow-up</option>
        </Select>

        <Textarea
          label="Feedback / Note to Employee (Optional)"
          placeholder="e.g. Thanks for letting us know Rahul, glad power is back. Reviewed your async notes on Slack."
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" className="gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            Apply Action
          </Button>
        </div>
      </form>
    </Modal>
  );
}
