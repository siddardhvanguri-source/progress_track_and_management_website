'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Blocker } from '@/lib/types';
import { CheckCircle2, AlertOctagon, User, Clock } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface BlockerResolveModalProps {
  blocker: Blocker | null;
  onClose: () => void;
}

export function BlockerResolveModal({ blocker, onClose }: BlockerResolveModalProps) {
  const { resolveBlocker, acknowledgeBlocker, currentUser } = useStore();
  const [notes, setNotes] = useState('');

  if (!blocker) return null;

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    resolveBlocker(blocker.id, notes || 'Blocker cleared and verified.');
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch {}
    onClose();
    setNotes('');
  };

  const handleAcknowledge = () => {
    acknowledgeBlocker(blocker.id);
    onClose();
  };

  return (
    <Modal
      isOpen={!!blocker}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
          <AlertOctagon className="h-5 w-5" />
          <span>Triage Blocker: {blocker.title}</span>
        </div>
      }
      description={`Task: ${blocker.taskTitle} • Reported ${formatRelativeTime(blocker.reportedAt)}`}
    >
      <form onSubmit={handleResolve} className="space-y-4">
        <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2 text-xs">
          <div>
            <span className="font-semibold text-muted-foreground">Reported by:</span>
            <span className="ml-1.5 font-bold text-foreground">{blocker.reporterName}</span>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground">Root Cause / Roadblock:</span>
            <p className="mt-0.5 text-foreground leading-relaxed">{blocker.description}</p>
          </div>
          {blocker.dependencyOwnerName && (
            <div>
              <span className="font-semibold text-muted-foreground">Dependency Owner:</span>
              <span className="ml-1.5 font-bold text-primary">{blocker.dependencyOwnerName}</span>
            </div>
          )}
        </div>

        <Textarea
          label="Resolution Notes & Action Taken"
          placeholder="e.g. Granted IAM KMS decryption policy on target AWS account and verified worker nodes..."
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />

        <div className="flex items-center justify-between pt-3 border-t border-border">
          {blocker.status === 'OPEN' ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAcknowledge}
            >
              Acknowledge Blocker
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="success" size="sm" className="gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Mark Resolved
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
