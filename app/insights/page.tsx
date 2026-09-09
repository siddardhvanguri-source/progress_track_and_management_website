'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Zap,
  Sparkles,
  AlertOctagon,
  CalendarCheck,
  Clock,
  TrendingDown,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InsightsPage() {
  const { insights, setSelectedEmployee, setSelectedTask, setSelectedLeave, users, tasks, leaves } = useStore();
  const router = useRouter();

  const handleCitationClick = (citation: { entityType: string; entityId: string }) => {
    switch (citation.entityType) {
      case 'User': {
        const u = users.find((x) => x.id === citation.entityId);
        if (u) setSelectedEmployee(u);
        break;
      }
      case 'Task': {
        const t = tasks.find((x) => x.id === citation.entityId);
        if (t) setSelectedTask(t);
        break;
      }
      case 'LeaveRequest': {
        const l = leaves.find((x) => x.id === citation.entityId);
        if (l) setSelectedLeave(l);
        break;
      }
      case 'Blocker': {
        router.push('/blockers');
        break;
      }
      case 'Meeting': {
        router.push('/meetings');
        break;
      }
      case 'Project': {
        router.push('/work');
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Zap className="h-6 w-6 text-primary" />
            Proactive Operations Intelligence
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Evidence-backed operational insights. Every recommendation cites underlying telemetry without opaque scoring.
          </p>
        </div>

        <Badge variant="outline" className="text-xs font-semibold px-3 py-1">
          {insights.length} Proactive Signals
        </Badge>
      </div>

      {/* Insights Cards Feed */}
      <div className="space-y-4">
        {insights.map((ins) => (
          <div
            key={ins.id}
            className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4 hover:border-primary/40 transition-all"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5">
                <Badge
                  variant={
                    ins.severity === 'critical'
                      ? 'danger'
                      : ins.severity === 'warning'
                      ? 'warning'
                      : 'info'
                  }
                  dot
                >
                  {ins.category.toUpperCase()}
                </Badge>
                <h3 className="text-base font-bold text-foreground">{ins.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {ins.description}
            </p>

            {/* Evidence Citations (Clickable badges linking to records) */}
            <div className="space-y-2 rounded-xl bg-muted/20 border border-border/60 p-3.5 text-xs">
              <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider block">
                Evidence Citations (Underlying Data Sources):
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {ins.evidenceCitations.map((cit, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCitationClick(cit)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background border border-border/70 text-foreground hover:border-primary hover:text-primary transition-colors text-xs font-medium cursor-pointer shadow-2xs"
                  >
                    <span>{cit.label}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/40 text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-foreground">Recommended Next Action:</span>
                <p className="text-muted-foreground">{ins.suggestedAction}</p>
              </div>

              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  if (ins.category === 'blockers') router.push('/blockers');
                  else if (ins.category === 'leave') router.push('/leave');
                  else if (ins.category === 'velocity') router.push('/work');
                  else router.push('/meetings');
                }}
                className="gap-1.5 text-xs font-semibold flex-shrink-0"
              >
                <span>{ins.actionLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
