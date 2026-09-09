'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Priority, TaskStatus } from '@/lib/types';
import { FolderKanban, Plus, CheckSquare } from 'lucide-react';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectId?: string;
}

export function NewTaskModal({ isOpen, onClose, defaultProjectId }: NewTaskModalProps) {
  const { projects, users, currentUser, createTask } = useStore();

  const [projectId, setProjectId] = useState(defaultProjectId || (projects[0]?.id ?? ''));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState(currentUser.id);
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [estimatedHours, setEstimatedHours] = useState('16');
  const [subtasksInput, setSubtasksInput] = useState('Design API schema\nAuthor automated tests\nDeploy to staging');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const subtasks = subtasksInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((title, idx) => ({ id: `sub-${Date.now()}-${idx}`, title, isCompleted: false }));

    createTask({
      projectId,
      title,
      description,
      assigneeId,
      priority,
      dueDate: new Date(dueDate).toISOString(),
      estimatedHours: parseInt(estimatedHours) || 8,
      subtasks,
      status: 'PLANNED',
      progress: 0,
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
        <div className="flex items-center gap-2 text-foreground">
          <FolderKanban className="h-5 w-5 text-primary" />
          <span>Create New Task</span>
        </div>
      }
      description="Add a task with milestones, subtask checklist, and estimated effort."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project selector */}
        <Select
          label="Project"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              [{p.code}] {p.name}
            </option>
          ))}
        </Select>

        {/* Task Title */}
        <Input
          label="Task Title"
          placeholder="e.g. Implement Multi-Region Redis Failover Sentinel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <Textarea
          label="Description & Acceptance Criteria"
          placeholder="Detailed requirements, architecture goals, and validation criteria..."
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Assignee, Priority, Due Date, Hours */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Select
            label="Assignee"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.jobTitle})
              </option>
            ))}
          </Select>

          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </Select>

          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        {/* Subtasks */}
        <Textarea
          label="Subtasks Checklist (One item per line)"
          rows={3}
          value={subtasksInput}
          onChange={(e) => setSubtasksInput(e.target.value)}
        />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
