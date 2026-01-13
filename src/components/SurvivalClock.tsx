'use client';

import { useState, useEffect } from 'react';
import { Clock, AlertTriangle, Info, PartyPopper, Bell } from 'lucide-react';

const DEADLINES = [
  // --- SPRING 2026 ---
  { name: "Classes Begin 🚀", date: "2026-01-12T08:00:00", type: "info" },
  { name: "Last Day to Add Classes", date: "2026-01-18T23:59:00", type: "warning" },
  { name: "Drop Deadline (100% Refund) 💸", date: "2026-01-25T23:59:00", type: "urgent" },
  { name: "Tuition Payment Deadline", date: "2026-01-25T17:00:00", type: "critical" },
  { name: "Spring Break! 🌴", date: "2026-03-08T00:00:00", type: "fun" },
  { name: "Course Withdrawal Deadline (W Grade) ⚠️", date: "2026-04-05T23:59:00", type: "critical" },
  { name: "Classes End", date: "2026-05-01T23:59:00", type: "warning" },
  { name: "Finals Week Begins 📝", date: "2026-05-04T00:00:00", type: "urgent" },
  { name: "Spring Graduation 🎓", date: "2026-05-11T10:00:00", type: "fun" },

  // --- SUMMER 2026 ---
  { name: "Summer Session C Begins ☀️", date: "2026-05-18T08:00:00", type: "info" },
  { name: "Summer Drop Deadline", date: "2026-05-22T23:59:00", type: "urgent" },
  { name: "Summer Withdrawal Deadline", date: "2026-06-07T23:59:00", type: "critical" },
  { name: "Summer Classes End", date: "2026-07-10T23:59:00", type: "warning" },

  // --- FALL 2026 ---
  { name: "Fall Classes Begin 🍂", date: "2026-08-20T08:00:00", type: "info" },
  { name: "Fall Drop Deadline (Refund)", date: "2026-09-02T23:59:00", type: "urgent" },
  { name: "Fall Break 🎃", date: "2026-10-10T00:00:00", type: "fun" },
  { name: "Fall Withdrawal Deadline", date: "2026-11-04T23:59:00", type: "critical" },
  { name: "Thanksgiving Break 🦃", date: "2026-11-26T00:00:00", type: "fun" },
  { name: "Fall Finals Week", date: "2026-12-07T00:00:00", type: "urgent" },
];

type DeadlineType = 'info' | 'warning' | 'urgent' | 'critical' | 'fun';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getNextDeadline() {
  const now = new Date();
  const upcoming = DEADLINES
    .map((d) => ({ ...d, dateObj: new Date(d.date) }))
    .filter((d) => d.dateObj > now)
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  return upcoming[0] || null;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const typeStyles: Record<DeadlineType, { bg: string; border: string; text: string; icon: typeof Clock }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    icon: Info,
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-700 dark:text-yellow-300',
    icon: Bell,
  },
  urgent: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-300',
    icon: AlertTriangle,
  },
  critical: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-700 dark:text-red-300',
    icon: AlertTriangle,
  },
  fun: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-700 dark:text-green-300',
    icon: PartyPopper,
  },
};

export default function SurvivalClock() {
  const [nextDeadline, setNextDeadline] = useState<ReturnType<typeof getNextDeadline>>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNextDeadline(getNextDeadline());
  }, []);

  useEffect(() => {
    if (!nextDeadline) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(nextDeadline.dateObj);
      setTimeLeft(newTimeLeft);

      // Check if deadline passed, get next one
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setNextDeadline(getNextDeadline());
      }
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft(nextDeadline.dateObj));

    return () => clearInterval(timer);
  }, [nextDeadline]);

  if (!mounted || !nextDeadline) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="animate-pulse">
          <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-3 h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    );
  }

  const type = nextDeadline.type as DeadlineType;
  const styles = typeStyles[type];
  const Icon = styles.icon;

  return (
    <div className={`rounded-xl border ${styles.border} ${styles.bg} p-6 transition-all`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`h-5 w-5 ${styles.text}`} />
        <span className={`text-sm font-medium uppercase tracking-wide ${styles.text}`}>
          Next Deadline
        </span>
      </div>

      {/* Deadline Name */}
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {nextDeadline.name}
      </h3>

      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Mins', value: timeLeft.minutes },
          { label: 'Secs', value: timeLeft.seconds },
        ].map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center rounded-lg bg-white/60 dark:bg-zinc-800/60 p-3"
          >
            <span className="text-2xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Date Display */}
      <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
        {nextDeadline.dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
    </div>
  );
}
