'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatRelativeTime } from '@/lib/utils';
import {
  Bell,
  CheckCheck,
  AlertOctagon,
  Calendar,
  Clock,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore();
  const router = useRouter();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.isRead : true));

  const getIcon = (type: string) => {
    switch (type) {
      case 'BLOCKER':
        return <AlertOctagon className="h-4 w-4 text-rose-500" />;
      case 'LEAVE_REQUEST':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'MISSED_MEETING':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Bell className="h-6 w-6 text-primary" />
            Notifications Center
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time updates on blocker escalations, leave approvals, check-ins, and meeting triage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={markAllNotificationsRead}
            className="gap-1.5 text-xs font-semibold"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filter === 'unread' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground'
          }`}
        >
          Unread ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {filtered.map((notif) => (
          <div
            key={notif.id}
            onClick={() => {
              markNotificationRead(notif.id);
              if (notif.link) router.push(notif.link);
            }}
            className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
              notif.isRead
                ? 'bg-card border-border/70 hover:bg-accent/40'
                : 'bg-primary/[0.03] border-primary/40 shadow-xs'
            }`}
          >
            <div className="p-2 rounded-xl bg-background border border-border/60 shadow-xs flex-shrink-0">
              {getIcon(notif.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className={`text-xs font-bold ${notif.isRead ? 'text-foreground' : 'text-primary font-black'}`}>
                  {notif.title}
                </h3>
                <span className="text-[10px] text-muted-foreground">{formatRelativeTime(notif.createdAt)}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{notif.message}</p>
            </div>

            {notif.link && (
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 self-center opacity-70" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
