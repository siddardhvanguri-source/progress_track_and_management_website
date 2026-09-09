'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AlertOctagon, Sparkles } from 'lucide-react';

interface ReportBlockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTaskId?: string;
}

export function ReportBlockerModal({ isOpen, onClose, defaultTaskId }: ReportBlockerModalProps) {
  const { tasks, users, currentUser, reportBlocker } = useStore();

  const [taskId, setTaskId] = useState(defaultTaskId || (tasks[0]?.id ?? ''));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('HIGH');
  const [dependencyOwnerId, setDependencyOwnerId] = useState('');
  const [expectedHours, setExpectedHours] = useState('24');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    reportBlocker({
      taskId,
      title,
      description,
      severity,
      dependencyOwnerId: dependencyOwnerId || undefined,
      expectedResolution: new Date(Date.now() + parseInt(expectedHours) * 60 * 60 * 1000).toISOString(),
    });

    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={
        <div className="flex items-center gap-2 text-rose-500">
          <AlertOctagon className="h-5 w-5" />
          <span>Report a Work Blocker</span>
        </div>
      }
      description="Surface what is stopping progress, why it is happening, and who can help resolve it."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task selector */}
        <Select
          label="Which task is blocked?"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          required
        >
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>
              [{t.projectName}] {t.title} (Assigned to {t.assigneeName})
            </option>
          ))}
        </Select>

        {/* Blocker Title */}
        <Input
          label="Blocker Summary"
          placeholder="e.g. AWS KMS Key IAM access policy mismatch"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Severity */}
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as any)}
          >
            <option value="CRITICAL">Critical (Blocks core release/deploy)</option>
            <option value="HIGH">High (Blocks key milestone)</option>
            <option value="MEDIUM">Medium (Degrades velocity)</option>
            <option value="LOW">Low (Minor impediment)</option>
          </Select>

          <Select
            label="Dependency Owner (Who can resolve?)"
            value={dependencyOwnerId}
            onChange={(e) => setDependencyOwnerId(e.target.value)}
          >
            <option value="">-- Select Teammate / Lead --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.jobTitle} - {u.departmentName})
              </option>
            ))}
          </Select>
        </div>

        {/* Detailed Root Cause Description */}
        <Textarea
          label="What is the root cause? (What is happening & why?)"
          placeholder="Describe the exact error, external dependency, missing credentials, or API roadblock..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="danger" size="sm" className="gap-1.5">
            <AlertOctagon className="h-4 w-4" />
            Report Blocker
          </Button>
        </div>
      </form>
    </Modal>
  );
}
