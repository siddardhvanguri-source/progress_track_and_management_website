'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MissedMeetingReason } from '@/lib/types';
import { Clock, Send, ShieldAlert, HeartHandshake } from 'lucide-react';

interface MissedMeetingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  meetingId: string;
  meetingTitle: string;
  userId: string;
  userName: string;
}

export function MissedMeetingDialog({
  isOpen,
  onClose,
  meetingId,
  meetingTitle,
  userId,
  userName,
}: MissedMeetingDialogProps) {
  const { submitMissedMeetingExplanation } = useStore();
  const [reason, setReason] = useState<MissedMeetingReason>('TECHNICAL_ISSUE');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMissedMeetingExplanation(meetingId, userId, reason, note || 'No additional note.');
    onClose();
    setNote('');
  };

  const reasonOptions: { value: MissedMeetingReason; label: string }[] = [
    { value: 'TECHNICAL_ISSUE', label: 'Technical Issue (Network / Power / Hardware)' },
    { value: 'WORK_CONFLICT', label: 'Work Conflict (Production incident / Urgent bug)' },
    { value: 'CLIENT_COMMITMENT', label: 'Client Commitment / Partner Call' },
    { value: 'SICK', label: 'Sick / Medical Appointment' },
    { value: 'EMERGENCY', label: 'Personal / Family Emergency' },
    { value: 'APPROVED_LEAVE', label: 'Approved Leave / Out of Office' },
    { value: 'FORGOT', label: 'Calendar Overshoot / Forgot' },
    { value: 'OTHER', label: 'Other (Specify below)' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
          <Clock className="h-5 w-5" />
          <span>Provide Missed Meeting Context</span>
        </div>
      }
      description={`Meeting: "${meetingTitle}"`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 rounded-xl border border-border/80 bg-muted/20 flex items-start gap-2.5 text-xs text-muted-foreground">
          <HeartHandshake className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
          <span>
            WorkPulse treats absences with transparency and respect. Providing context helps your team adjust schedules without assumptions.
          </span>
        </div>

        <Select
          label="What was the reason for missing this meeting?"
          value={reason}
          onChange={(e) => setReason(e.target.value as MissedMeetingReason)}
          required
        >
          {reasonOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>

        <Textarea
          label="Additional Context / Follow-up (Optional)"
          placeholder="e.g. ISP cable cut in neighborhood from 9:30 to 10:45. Reviewed notes and async update posted on Slack."
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" className="gap-1.5">
            <Send className="h-4 w-4" />
            Submit Context
          </Button>
        </div>
      </form>
    </Modal>
  );
}
