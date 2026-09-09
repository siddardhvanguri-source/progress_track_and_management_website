'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LeaveType } from '@/lib/types';
import { Calendar, UserCheck, ShieldCheck } from 'lucide-react';

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeaveRequestModal({ isOpen, onClose }: LeaveRequestModalProps) {
  const { users, currentUser, requestLeave } = useStore();

  const [leaveType, setLeaveType] = useState<LeaveType>('ANNUAL');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [reason, setReason] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');
  const [handoverNotes, setHandoverNotes] = useState('');
  const [backupUserId, setBackupUserId] = useState(users[1]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || !handoverNotes.trim()) return;

    requestLeave({
      userId: currentUser.id,
      leaveType,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      isHalfDay,
      reason,
      privateNotes: privateNotes || undefined,
      handoverNotes,
      backupUserId,
    });

    onClose();
    setReason('');
    setHandoverNotes('');
    setPrivateNotes('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <Calendar className="h-5 w-5" />
          <span>Submit Leave Request</span>
        </div>
      }
      description="WorkPulse automates workload coverage and handover so your team stays supported while you are away."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Leave Type & Half day */}
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Leave Type"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value as LeaveType)}
          >
            <option value="ANNUAL">Annual Vacation</option>
            <option value="CASUAL">Casual Leave</option>
            <option value="SICK">Sick Leave</option>
            <option value="PERSONAL">Personal Time Off</option>
            <option value="WORK_FROM_HOME">Work From Home (Remote)</option>
            <option value="MATERNITY_PATERNITY">Parental Leave</option>
            <option value="BEREAVEMENT">Bereavement</option>
          </Select>

          <Select
            label="Duration Type"
            value={isHalfDay ? 'half' : 'full'}
            onChange={(e) => setIsHalfDay(e.target.value === 'half')}
          >
            <option value="full">Full Day(s)</option>
            <option value="half">Half Day (4 hours)</option>
          </Select>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        {/* Backup person */}
        <Select
          label="Designated Backup Teammate (For questions & escalations)"
          value={backupUserId}
          onChange={(e) => setBackupUserId(e.target.value)}
          required
        >
          {users
            .filter((u) => u.id !== currentUser.id)
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.jobTitle} - {u.departmentName})
              </option>
            ))}
        </Select>

        {/* Work Handover Checklist */}
        <Textarea
          label="Work Handover Plan & Active Tasks Coverage"
          placeholder="e.g. All current PRs merged. Handed over deployment monitor checks to Siddharth Rao. Emergency contact available on Slack."
          rows={3}
          value={handoverNotes}
          onChange={(e) => setHandoverNotes(e.target.value)}
          required
        />

        {/* General Reason */}
        <Input
          label="General Reason (Visible to Team)"
          placeholder="e.g. Family vacation / Personal travel"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        {/* Private Confidential Notes (Gated by RBAC) */}
        <div className="space-y-1 pt-1">
          <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Confidential Medical / HR Notes (Only visible to HR & Admin)
          </label>
          <Textarea
            placeholder="Optional sensitive medical context or documentation protected under privacy policy..."
            rows={2}
            value={privateNotes}
            onChange={(e) => setPrivateNotes(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" className="gap-1.5">
            <UserCheck className="h-4 w-4" />
            Submit Request
          </Button>
        </div>
      </form>
    </Modal>
  );
}
