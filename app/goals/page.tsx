'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Goal, GoalTier } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { formatDate } from '@/lib/utils';
import { Target, CheckCircle2, TrendingUp, Layers, ChevronRight, Plus } from 'lucide-react';

export default function GoalsPage() {
  const { goals, updateGoalProgress } = useStore();

  const [selectedTier, setSelectedTier] = useState<string>('ALL');

  const filteredGoals = goals.filter((g) =>
    selectedTier === 'ALL' ? true : g.tier === selectedTier
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Target className="h-6 w-6 text-primary" />
            Goals & OKRs Intelligence
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Cascading strategic objectives from Company → Department → Team → Individual.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="h-8 px-2.5 text-xs rounded-xl bg-card border border-input text-foreground cursor-pointer"
          >
            <option value="ALL">All Levels ({goals.length})</option>
            <option value="COMPANY">Company Level</option>
            <option value="DEPARTMENT">Department Level</option>
            <option value="TEAM">Team Level</option>
            <option value="INDIVIDUAL">Individual Level</option>
          </select>
        </div>
      </div>

      {/* OKR Hierarchy Stream */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => (
          <div
            key={goal.id}
            className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4 hover:border-primary/40 transition-all"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase font-mono">
                    {goal.tier}
                  </Badge>
                  <Badge variant={goal.status === 'ON_TRACK' ? 'success' : 'warning'}>
                    {goal.status}
                  </Badge>
                  {goal.departmentName && (
                    <span className="text-xs text-muted-foreground">• {goal.departmentName}</span>
                  )}
                </div>
                <h3 className="text-base font-bold text-foreground">{goal.title}</h3>
                <p className="text-xs text-muted-foreground">{goal.description}</p>
              </div>

              <div className="text-left sm:text-right space-y-1 min-w-[120px]">
                <span className="text-lg font-black text-foreground">{goal.progress}%</span>
                <Progress value={goal.progress} size="md" />
              </div>
            </div>

            {/* Key Results Grid */}
            <div className="space-y-2 pt-2 border-t border-border/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Measurable Key Results ({goal.keyResults.length})
              </h4>

              <div className="space-y-2">
                {goal.keyResults.map((kr) => (
                  <div
                    key={kr.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-muted/20 border border-border/60 text-xs"
                  >
                    <div className="space-y-0.5 max-w-lg">
                      <span className="font-semibold text-foreground">{kr.title}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-foreground">
                        {kr.currentValue} / {kr.targetValue} {kr.metricUnit}
                      </span>
                      <div className="w-24">
                        <Progress value={kr.progress} size="sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
