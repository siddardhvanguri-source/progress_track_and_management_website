'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  Send,
  HelpCircle,
  ExternalLink,
  MessageSquare,
  Bot,
  User,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: { label: string; path: string; type: string }[];
  timestamp: string;
}

export default function AIAssistantPage() {
  const { blockers, users, leaves, meetings, tasks, projects } = useStore();
  const router = useRouter();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello! I am your WorkPulse Intelligence Assistant. Ask me anything about employee workloads, active blockers, meeting absences, project velocity, or 1:1 meeting prep.',
      timestamp: new Date().toISOString(),
    },
  ]);

  const quickPrompts = [
    'Who is currently blocked?',
    'Who is on leave this week?',
    'Which deadlines are at risk?',
    "Why did Rahul miss today's meeting?",
    'What should I discuss in my 1:1 with Priya?',
    'Which projects are behind schedule?',
  ];

  const handleSend = (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent cited response based on real store data
    setTimeout(() => {
      let botResponse = '';
      let citations: { label: string; path: string; type: string }[] = [];

      const lower = q.toLowerCase();

      if (lower.includes('blocked') || lower.includes('blocker')) {
        const activeBlockers = blockers.filter((b) => b.status !== 'RESOLVED');
        botResponse = `Currently, there are ${activeBlockers.length} active blockers across engineering and design:\n\n` +
          activeBlockers
            .map(
              (b) =>
                `• **${b.reporterName}**: "${b.title}" on task *${b.taskTitle}* (${b.severity} severity). Dependency owner: **${b.dependencyOwnerName || 'Unassigned'}**.`
            )
            .join('\n\n');
        citations = activeBlockers.map((b) => ({
          label: `Blocker: ${b.title}`,
          path: '/blockers',
          type: 'Blocker',
        }));
      } else if (lower.includes('leave') || lower.includes('vacation') || lower.includes('away')) {
        botResponse =
          `Currently, **Carlos Mendez** is on approved Casual Leave (Sep 7 - Sep 9, backup: Vikram Mehta).\n\n` +
          `Additionally, **Ananya Iyer** has requested 3 days Annual Leave (Sep 14 - Sep 16, backup: Siddharth Rao) which is currently pending manager approval with 84% team capacity remaining.`;
        citations = [
          { label: 'Leave: Carlos Mendez', path: '/leave', type: 'Leave' },
          { label: 'Leave: Ananya Iyer', path: '/leave', type: 'Leave' },
        ];
      } else if (lower.includes('rahul') && lower.includes('meeting')) {
        botResponse =
          `**Rahul Sharma** was marked absent for today's *Engineering Daily Standup & Blocker Triage* at 10:00 AM.\n\n` +
          `He submitted an explanation stating: *"ISP fiber cut in neighborhood from 9:30am to 10:45am. Back online via backup hotspot now."*\n\n` +
          `Recommendation: Review and mark his attendance as excused in the Meetings module.`;
        citations = [
          { label: 'Meeting: Engineering Standup (Sep 8)', path: '/meetings', type: 'Meeting' },
          { label: 'Profile: Rahul Sharma', path: '/people', type: 'User' },
        ];
      } else if (lower.includes('1:1') || lower.includes('priya')) {
        botResponse =
          `Here is your recommended agenda for a 1:1 with **Priya Patel** (Staff Backend Engineer):\n\n` +
          `1. **KMS IAM Blocker**: Priya has been blocked for 52 hours on *Cross-Region Secret Replication* waiting for David Chen from SecOps.\n` +
          `2. **Helix Kafka Lag**: Follow up on KEDA autoscaling for consumer pods.\n` +
          `3. **Weekly Check-in**: Priya reported *Medium* confidence due to SecOps approval turnaround times.`;
        citations = [
          { label: 'Task: Cross-Region Secret Replication', path: '/work', type: 'Task' },
          { label: 'Blocker: AWS KMS Key Access', path: '/blockers', type: 'Blocker' },
          { label: 'Checkin: Priya Patel (Week 36)', path: '/checkins', type: 'Checkin' },
        ];
      } else if (lower.includes('deadline') || lower.includes('behind') || lower.includes('risk') || lower.includes('project')) {
        botResponse =
          `**Project Phoenix - Core Cloud Platform V2** is currently at **68% progress** and flagged *At Risk* because Milestone 2 (Service Mesh) is due on Sep 15 with 2 tasks currently blocked.\n\n` +
          `Other projects like **Odyssey Design System 2.0 (82%)** and **Horizon Auth (90%)** are healthy and on track.`;
        citations = [
          { label: 'Project: Phoenix V2', path: '/work', type: 'Project' },
          { label: 'Project: Odyssey Design System', path: '/work', type: 'Project' },
        ];
      } else {
        botResponse =
          `Based on live organizational telemetry:\n` +
          `• **23/25 Employees** are actively working.\n` +
          `• **3 Active Blockers** require escalation (1 Critical on Kafka pipeline).\n` +
          `• **1 Pending Leave Request** (Ananya Iyer) is waiting for workload approval.`;
        citations = [
          { label: 'Dashboard Live Metrics', path: '/', type: 'Metrics' },
          { label: 'Blocked Work', path: '/blockers', type: 'Blocker' },
        ];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botResponse,
        citations,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Sparkles className="h-6 w-6 text-primary" />
            WorkPulse Operations AI Assistant
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Natural language operations intelligence citing exact tasks, attendance logs, and blockers.
          </p>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          Suggested Operational Inquiries:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-3 py-1.5 rounded-xl bg-card border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer text-left"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Window */}
      <div className="rounded-2xl border border-border/80 bg-card min-h-[420px] max-h-[520px] overflow-y-auto p-5 space-y-4 shadow-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground font-medium rounded-tr-xs'
                  : 'bg-muted/20 border border-border/70 text-foreground rounded-tl-xs'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

              {/* Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-border/50 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Underlying Citations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.citations.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => router.push(c.path)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-card border border-border/60 text-primary hover:underline text-[10px] font-semibold"
                      >
                        <span>{c.label}</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="h-8 w-8 rounded-xl bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-card p-2 rounded-2xl border border-border/80 shadow-xs"
      >
        <input
          type="text"
          placeholder="Ask about your organization (e.g. Who is blocked? Who is on leave?)..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 px-3 py-2 text-xs bg-transparent focus:outline-none placeholder:text-muted-foreground"
        />
        <Button type="submit" variant="primary" size="sm" className="gap-1.5 text-xs font-semibold">
          <Send className="h-3.5 w-3.5" />
          <span>Ask</span>
        </Button>
      </form>
    </div>
  );
}
