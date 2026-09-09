'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Check,
  CheckCheck,
  AlertTriangle,
  Calendar,
  AlertOctagon,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatRelativeTime } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';

interface NotificationFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationFlyout({ isOpen, onClose }: NotificationFlyoutProps) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore();
  const flyoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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

  const handleNotificationClick = (notif: (typeof notifications)[0]) => {
    markNotificationRead(notif.id);
    if (notif.link) {
      router.push(notif.link);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={flyoutRef}
        initial={{ opacity: 0, scale: 0.95, y: -5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -5 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="absolute right-0 top-12 z-50 w-96 rounded-2xl bg-card border border-border shadow-2xl overflow-hidden flex flex-col max-h-[520px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 px-4 py-3 bg-muted/20">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="danger" className="text-[10px] px-1.5 py-0">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-primary hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <div className="p-2 overflow-y-auto space-y-1 divide-y divide-border/30">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No notifications right now.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer text-left ${
                  notif.isRead
                    ? 'hover:bg-muted/40 text-muted-foreground'
                    : 'bg-primary/5 hover:bg-primary/10 text-foreground border-l-2 border-primary'
                }`}
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-background border border-border/50 shadow-xs flex-shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs ${notif.isRead ? 'font-medium' : 'font-semibold'}`}>
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {formatRelativeTime(notif.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-border/60 bg-muted/30 text-center">
          <button
            onClick={() => {
              router.push('/notifications');
              onClose();
            }}
            className="text-xs text-muted-foreground hover:text-foreground font-medium py-1 w-full text-center"
          >
            View all notification settings
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
