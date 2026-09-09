'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LeaveType } from '@/lib/types';
import { Calendar, CheckCircle2, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LogLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogLeaveModal({ isOpen, onClose }: LogLeaveModalProps) {
  const { users, currentUser, requestLeave } = useStore();

  const [selectedUserId, setSelectedUserId] = useState(currentUser.id);
  const [leaveType, setLeaveType] = useState<LeaveType>('ANNUAL');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [reason, setReason] = useState('');
  const [handoverNotes, setHandoverNotes] = useState('');
  const [backupUserId, setBackupUserId] = useState(users[1]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    requestLeave({
      userId: selectedUserId,
      leaveType,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      isHalfDay: false,
      reason,
      handoverNotes: handoverNotes || 'Handover confirmed with team.',
      backupUserId: backupUserId || users[0].id,
    });

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {}

    onClose();
    setReason('');
    setHandoverNotes('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2 text-primary font-bold">
          <Calendar className="h-5 w-5" />
          <span>Log Employee Leave</span>
        </div>
      }
      description="Add upcoming time off to the company operations calendar."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Employee */}
        <Select
          label="Employee"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          required
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.jobTitle} - {u.departmentName})
            </option>
          ))}
        </Select>

        {/* Leave Type */}
        <Select
          label="Leave Type"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value as LeaveType)}
        >
          <option value="ANNUAL">Annual Vacation</option>
          <option value="CASUAL">Casual Leave</option>
          <option value="SICK">Sick Leave</option>
          <option value="WORK_FROM_HOME">Work From Home (Remote)</option>
          <option value="PERSONAL">Personal Time Off</option>
          <option value="MATERNITY_PATERNITY">Parental Leave</option>
        </Select>

        {/* Dates */}
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

        {/* Reason */}
        <Input
          label="Reason for Leave"
          placeholder="e.g. Family vacation / Medical appointment / Personal rest"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        {/* Handover & Backup Person */}
        <div className="space-y-3 pt-1 border-t border-border">
          <Select
            label="Designated Backup Teammate"
            value={backupUserId}
            onChange={(e) => setBackupUserId(e.target.value)}
          >
            {users
              .filter((u) => u.id !== selectedUserId)
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.jobTitle})
                </option>
              ))}
          </Select>

          <Textarea
            label="Handover Note (Optional)"
            placeholder="e.g. PRs reviewed and merged. Vikram will handle escalations."
            rows={2}
            value={handoverNotes}
            onChange={(e) => setHandoverNotes(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" className="gap-1.5 font-bold">
            <CheckCircle2 className="h-4 w-4" />
            Log & Save Leave
          </Button>
        </div>
      </form>
    </Modal>
  );
}
