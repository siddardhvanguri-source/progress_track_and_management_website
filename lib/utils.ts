import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, pattern: string = 'MMM dd, yyyy'): string {
  try {
    const d = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(d, pattern);
  } catch {
    return dateString;
  }
}

export function formatTime(dateString: string): string {
  try {
    const d = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(d, 'h:mm a');
  } catch {
    return dateString;
  }
}

export function formatRelativeTime(dateString: string): string {
  try {
    const d = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return formatDistanceToNow(d, { addSuffix: true });
  } catch {
    return dateString;
  }
}

export function getStatusColor(status: string): { bg: string; text: string; border: string; dot: string } {
  const s = status.toUpperCase();
  switch (s) {
    case 'WORKING':
    case 'PRESENT':
    case 'COMPLETED':
    case 'APPROVED':
    case 'ON_TRACK':
    case 'RESOLVED':
    case 'HEALTHY':
    case 'HIGH': // For confidence
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800/60',
        dot: 'bg-emerald-500',
      };
    case 'IN_PROGRESS':
    case 'REMOTE':
    case 'SCHEDULED':
    case 'INFORMATIONAL':
    case 'MEDIUM':
      return {
        bg: 'bg-blue-50 dark:bg-blue-950/40',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800/60',
        dot: 'bg-blue-500',
      };
    case 'PENDING_APPROVAL':
    case 'SUBMITTED':
    case 'LATE':
    case 'AT_RISK':
    case 'REVIEW':
    case 'ACKNOWLEDGED':
    case 'PLANNED':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800/60',
        dot: 'bg-amber-500',
      };
    case 'BLOCKED':
    case 'ABSENT':
    case 'REJECTED':
    case 'BEHIND':
    case 'CRITICAL':
    case 'LOW': // For confidence
    case 'DANGER':
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        text: 'text-rose-700 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800/60',
        dot: 'bg-rose-500',
      };
    case 'ON_LEAVE':
    case 'EXCUSED':
      return {
        bg: 'bg-purple-50 dark:bg-purple-950/40',
        text: 'text-purple-700 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800/60',
        dot: 'bg-purple-500',
      };
    default:
      return {
        bg: 'bg-zinc-100 dark:bg-zinc-800/60',
        text: 'text-zinc-700 dark:text-zinc-300',
        border: 'border-zinc-200 dark:border-zinc-700',
        dot: 'bg-zinc-400',
      };
  }
}

export function getPriorityColor(priority: string): { bg: string; text: string } {
  switch (priority.toUpperCase()) {
    case 'CRITICAL':
      return { bg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20', text: 'text-rose-600' };
    case 'HIGH':
      return { bg: 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/20', text: 'text-orange-600' };
    case 'MEDIUM':
      return { bg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20', text: 'text-blue-600' };
    case 'LOW':
    default:
      return { bg: 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20', text: 'text-zinc-600' };
  }
}

export function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function truncate(text: string, length: number = 80): string {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}
