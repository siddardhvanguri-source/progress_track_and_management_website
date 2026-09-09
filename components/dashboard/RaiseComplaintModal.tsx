'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { AlertOctagon, X, CheckCircle2, ShieldAlert, Send } from 'lucide-react';

interface RaiseComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName?: string;
  employeeId?: string;
  defaultReason?: string;
}

export function RaiseComplaintModal({
  isOpen,
  onClose,
  employeeName = 'Rahul Sharma',
  employeeId = 'usr-3',
  defaultReason = 'Uninformed Absence — Failed to attend scheduled Engineering Standup at 10:00 AM without filing leave or duty notice.',
}: RaiseComplaintModalProps) {
  const { auditLogs } = useStore();
  const [complaintType, setComplaintType] = useState('UNEXCUSED_ABSENCE');
  const [escalationTier, setEscalationTier] = useState('HR_INVESTIGATION');
  const [notes, setNotes] = useState(defaultReason);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-rose-500/30 bg-[#0C0F17] p-6 shadow-2xl shadow-rose-950/40 text-white space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Raise Attendance Complaint</h3>
              <p className="text-[11px] font-mono text-rose-400 uppercase">
                DIRECTOR DISCIPLINARY & HR ESCALATION
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Complaint Logged & Escalated</h4>
            <p className="text-xs text-[hsl(215_16%_65%)] max-w-xs mx-auto">
              Formal complaint against {employeeName} dispatched to People & Culture and recorded in immutable audit logs.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Subject: {employeeName}</span> (Uninformed Absence)
                <p className="text-[11px] text-rose-300/80 mt-0.5">
                  The employee is marked with Red because no prior duty leave was filed.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/70">Complaint Category</label>
              <select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500"
              >
                <option value="UNEXCUSED_ABSENCE" className="bg-[#0C0F17]">Unexcused Absence without Notice</option>
                <option value="MISSED_STANDUP" className="bg-[#0C0F17]">Missed Sprint Standup / Client Demo</option>
                <option value="UNEXPLAINED_OFFLINE" className="bg-[#0C0F17]">Unexplained Offline during Critical Deployment</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/70">Recommended Director Action</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'HR_INVESTIGATION', label: 'Escalate to HR for Inquiry' },
                  { id: 'FORMAL_WARNING', label: 'Issue Written Warning' },
                  { id: 'DEDUCT_LEAVE', label: 'Convert to Loss of Pay' },
                  { id: 'REQUEST_EXPLANATION', label: 'Request Explanation First' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setEscalationTier(tier.id)}
                    className={`p-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                      escalationTier === tier.id
                        ? 'border-rose-500 bg-rose-500/20 text-white font-bold'
                        : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/70">Disciplinary Details / Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-rose-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Dispatch Complaint to HR
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
